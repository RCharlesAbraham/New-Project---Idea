// Authentication System
class AuthManager {
    constructor() {
        this.storageKey = 'yireh_admin_session';
        this.defaultCredentials = {
            username: 'admin',
            password: 'admin123'
        };
        this.init();
    }

    init() {
        // Check if on login page
        if (window.location.pathname.includes('login.html')) {
            this.initLoginPage();
        } else if (window.location.pathname.includes('admin.html')) {
            this.protectAdminPage();
        }
    }

    initLoginPage() {
        // If already logged in, redirect to admin
        if (this.isAuthenticated()) {
            window.location.href = 'admin.html';
            return;
        }

        const loginForm = document.getElementById('loginForm');
        const togglePassword = document.querySelector('.toggle-password');
        const passwordInput = document.getElementById('password');

        // Toggle password visibility
        if (togglePassword) {
            togglePassword.addEventListener('click', () => {
                const type = passwordInput.type === 'password' ? 'text' : 'password';
                passwordInput.type = type;
                const icon = togglePassword.querySelector('i');
                icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
            });
        }

        // Handle login form submission
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Add enter key support
        passwordInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleLogin();
            }
        });
    }

    handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        const alertMessage = document.getElementById('alertMessage');

        // Clear previous messages
        alertMessage.className = 'alert-message';
        alertMessage.textContent = '';

        // Validate credentials
        if (username === this.defaultCredentials.username &&
            password === this.defaultCredentials.password) {

            // Create session
            const session = {
                username: username,
                loginTime: new Date().toISOString(),
                rememberMe: rememberMe,
                token: this.generateToken()
            };

            // Store session
            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem(this.storageKey, JSON.stringify(session));

            // Show success message
            alertMessage.className = 'alert-message success';
            alertMessage.innerHTML = '<i class="fas fa-check-circle"></i> Login successful! Redirecting...';

            // Redirect to admin panel
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1000);

        } else {
            // Show error message
            alertMessage.className = 'alert-message error';
            alertMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Invalid username or password';

            // Shake animation
            const loginCard = document.querySelector('.login-card');
            loginCard.classList.add('shake');
            setTimeout(() => loginCard.classList.remove('shake'), 500);
        }
    }

    protectAdminPage() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return;
        }

        // Add logout functionality
        this.initLogout();

        // Update user info
        this.updateUserInfo();

        // Auto-logout on session expiry (optional)
        this.checkSessionValidity();
    }

    isAuthenticated() {
        const session = this.getSession();
        return session !== null && session.token;
    }

    getSession() {
        const sessionData = localStorage.getItem(this.storageKey) ||
            sessionStorage.getItem(this.storageKey);

        if (sessionData) {
            try {
                return JSON.parse(sessionData);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    initLogout() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
    }

    logout() {
        // Clear session
        localStorage.removeItem(this.storageKey);
        sessionStorage.removeItem(this.storageKey);

        // Show logout message
        const alertDiv = document.createElement('div');
        alertDiv.className = 'logout-alert';
        alertDiv.innerHTML = '<i class="fas fa-check-circle"></i> Logged out successfully';
        document.body.appendChild(alertDiv);

        // Redirect to login
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }

    updateUserInfo() {
        const session = this.getSession();
        if (session) {
            const usernameDisplay = document.getElementById('adminUsername');
            if (usernameDisplay) {
                usernameDisplay.textContent = session.username;
            }

            const loginTimeDisplay = document.getElementById('loginTime');
            if (loginTimeDisplay) {
                const loginDate = new Date(session.loginTime);
                loginTimeDisplay.textContent = loginDate.toLocaleString();
            }
        }
    }

    checkSessionValidity() {
        const session = this.getSession();
        if (session) {
            const loginTime = new Date(session.loginTime);
            const now = new Date();
            const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);

            // Auto-logout after 24 hours if not "remember me"
            if (!session.rememberMe && hoursSinceLogin > 24) {
                this.logout();
            }
        }
    }

    generateToken() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
}

// Initialize authentication
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});
