// Three.js Scene Setup - DISABLED
/* 
class ThreeJSBackground {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('three-canvas'),
            alpha: true,
            antialias: true
        });
        
        this.particles = [];
        this.connections = [];
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
        this.createParticles();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.camera.position.z = 5;
        
        // Add subtle lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x0066cc, 0.5);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }
    
    createParticles() {
        const particleCount = 150;
        
        // Create particle geometry
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Random positions
            positions[i3] = (Math.random() - 0.5) * 10;
            positions[i3 + 1] = (Math.random() - 0.5) * 10;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;
            
            // Colors - shades of blue
            const colorIntensity = Math.random() * 0.5 + 0.5;
            colors[i3] = 0.0 * colorIntensity;     // R
            colors[i3 + 1] = 0.4 * colorIntensity; // G
            colors[i3 + 2] = 0.8 * colorIntensity; // B
            
            // Store particle data for animation
            this.particles.push({
                originalX: positions[i3],
                originalY: positions[i3 + 1],
                originalZ: positions[i3 + 2],
                velocityX: (Math.random() - 0.5) * 0.002,
                velocityY: (Math.random() - 0.5) * 0.002,
                velocityZ: (Math.random() - 0.5) * 0.002
            });
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        // Create particle material
        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });
        
        // Create particle system
        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
        
        // Create connections between particles
        this.createConnections();
    }
    
    createConnections() {
        const positions = this.particleSystem.geometry.attributes.position.array;
        const particleCount = positions.length / 3;
        const connectionGeometry = new THREE.BufferGeometry();
        const connectionPositions = [];
        
        // Create connections between nearby particles
        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                
                if (distance < 1.5) {
                    connectionPositions.push(
                        positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                        positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                    );
                }
            }
        }
        
        connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3));
        
        const connectionMaterial = new THREE.LineBasicMaterial({
            color: 0x0066cc,
            transparent: true,
            opacity: 0.2
        });
        
        this.connectionLines = new THREE.LineSegments(connectionGeometry, connectionMaterial);
        this.scene.add(this.connectionLines);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Animate particles
        const positions = this.particleSystem.geometry.attributes.position.array;
        
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            const i3 = i * 3;
            
            // Update positions with velocity
            positions[i3] += particle.velocityX;
            positions[i3 + 1] += particle.velocityY;
            positions[i3 + 2] += particle.velocityZ;
            
            // Add mouse interaction
            const mouseInfluence = 0.0001;
            positions[i3] += this.mouseX * mouseInfluence;
            positions[i3 + 1] += this.mouseY * mouseInfluence;
            
            // Boundary check and bounce
            if (Math.abs(positions[i3]) > 5) particle.velocityX *= -1;
            if (Math.abs(positions[i3 + 1]) > 5) particle.velocityY *= -1;
            if (Math.abs(positions[i3 + 2]) > 5) particle.velocityZ *= -1;
        }
        
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        
        // Rotate the entire particle system slowly
        this.particleSystem.rotation.y += 0.001;
        this.particleSystem.rotation.x += 0.0005;
        
        if (this.connectionLines) {
            this.connectionLines.rotation.y += 0.001;
            this.connectionLines.rotation.x += 0.0005;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Handle mouse movement
        document.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Handle scroll for parallax effect
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const parallaxSpeed = 0.0005;
            
            if (this.particleSystem) {
                this.particleSystem.rotation.z = scrollTop * parallaxSpeed;
            }
        });
    }
}
*/

// Smooth Scrolling for Navigation
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Intersection Observer for Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);

        // Observe all sections and cards
        const elementsToAnimate = document.querySelectorAll(
            '.function-card, .sector-card, .value-item, .principle, .contact-card, .location-coverage'
        );

        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    }
}

// Mobile Navigation Toggle
class MobileNav {
    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.navToggle.classList.toggle('active');
            });

            // Close menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.navMenu.classList.remove('active');
                    this.navToggle.classList.remove('active');
                });
            });
        }
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;

            if (scrollTop > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// Enhanced Magnetic Hover Effects
class MagneticHover {
    constructor() {
        this.init();
    }

    init() {
        const magneticElements = document.querySelectorAll('.function-card, .sector-card, .cta-primary, .cta-secondary, .stat-item');

        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                this.handleMagneticEffect(e, element);
            });

            element.addEventListener('mouseleave', () => {
                this.resetElement(element);
            });
        });
    }

    handleMagneticEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.15;
        const deltaY = (e.clientY - centerY) * 0.15;

        element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
        element.style.transition = 'transform 0.1s ease-out';
    }

    resetElement(element) {
        element.style.transform = '';
        element.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }
}

// Enhanced Cursor Follower
class CursorFollower {
    constructor() {
        this.cursor = this.createCursor();
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.init();
    }

    createCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = `
            <div class="cursor-dot"></div>
            <div class="cursor-ring"></div>
        `;
        document.body.appendChild(cursor);

        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                position: fixed;
                top: 0;
                left: 0;
                pointer-events: none;
                z-index: 9999;
            }
            
            .cursor-dot {
                width: 8px;
                height: 8px;
                background: var(--accent-color);
                border-radius: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
                transition: all 0.1s ease;
            }
            
            .cursor-ring {
                width: 30px;
                height: 30px;
                border: 2px solid rgba(0, 168, 255, 0.3);
                border-radius: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
                transition: all 0.3s ease;
            }
            
            .cursor-hover .cursor-dot {
                transform: translate(-50%, -50%) scale(2);
                background: var(--primary-color);
            }
            
            .cursor-hover .cursor-ring {
                transform: translate(-50%, -50%) scale(1.5);
                border-color: rgba(0, 102, 204, 0.6);
            }
            
            body.hide-cursor * {
                cursor: none !important;
            }
        `;
        document.head.appendChild(style);

        return cursor;
    }

    init() {
        document.body.classList.add('hide-cursor');

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Hover effects for interactive elements
        const hoverElements = document.querySelectorAll('a, button, .function-card, .sector-card, .value-item, .nav-link');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
            });
        });

        this.animate();
    }

    animate() {
        this.cursorX += (this.mouseX - this.cursorX) * 0.15;
        this.cursorY += (this.mouseY - this.cursorY) * 0.15;

        this.cursor.style.left = this.cursorX + 'px';
        this.cursor.style.top = this.cursorY + 'px';

        requestAnimationFrame(() => this.animate());
    }
}

// Advanced Parallax Effects
class AdvancedParallax {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        const parallaxElements = document.querySelectorAll('.function-card, .sector-card, .hero-content');

        parallaxElements.forEach((element, index) => {
            this.elements.push({
                element,
                speed: 0.5 + (index % 3) * 0.2,
                yPos: 0
            });
        });

        window.addEventListener('scroll', () => this.updateParallax());
    }

    updateParallax() {
        const scrollTop = window.pageYOffset;

        this.elements.forEach(item => {
            const yPos = -(scrollTop * item.speed);
            item.element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Text Reveal Animation - DISABLED
/*
class TextReveal {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealText(entry.target);
                }
            });
        });

        const textElements = document.querySelectorAll('h1, h2, h3, p');
        textElements.forEach(el => {
            observer.observe(el);
        });
    }

    revealText(element) {
        const text = element.textContent;
        element.innerHTML = '';

        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.02}s`;
            span.classList.add('char-reveal');
            element.appendChild(span);
        });

        const style = document.createElement('style');
        if (!document.querySelector('#char-reveal-style')) {
            style.id = 'char-reveal-style';
            style.textContent = `
                .char-reveal {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: charReveal 0.6s ease forwards;
                }
                
                @keyframes charReveal {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}
*/

// Typing Animation for Hero Text
class TypingAnimation {
    constructor() {
        this.init();
    }

    init() {
        const heroTagline = document.querySelector('.hero-tagline');
        if (heroTagline) {
            const text = heroTagline.textContent;
            heroTagline.textContent = '';
            heroTagline.style.opacity = '1';

            setTimeout(() => {
                this.typeWriter(heroTagline, text, 0, 50);
            }, 2000);
        }
    }

    typeWriter(element, text, i, speed) {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(() => this.typeWriter(element, text, i, speed), speed);
        }
    }
}

// Stats Counter Animation
class StatsCounter {
    constructor() {
        this.init();
    }

    init() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const targetNumber = parseInt(target.replace(/\D/g, ''));
        let current = 0;
        const increment = targetNumber / 100;
        const duration = 2000;
        const stepTime = duration / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
                current = targetNumber;
                clearInterval(timer);
            }

            element.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
        }, stepTime);
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize enhanced interactions
    new MagneticHover();
    new CursorFollower();
    new AdvancedParallax();
    // TextReveal disabled

    // Initialize other components
    new SmoothScroll();
    new ScrollAnimations();
    new MobileNav();
    new NavbarScroll();
    new TypingAnimation();
    new StatsCounter();

    // Add custom styles for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 102, 204, 0.1);
        }
        
        .nav-menu.active {
            display: flex;
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0, 102, 204, 0.1);
            z-index: 999;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .ripple-enhanced {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.1) 70%, transparent 100%);
            transform: scale(0);
            animation: ripple-enhanced-animation 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            pointer-events: none;
        }
        
        @keyframes ripple-enhanced-animation {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            50% {
                opacity: 0.7;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes highlightSection {
            0%, 100% {
                background: transparent;
            }
            50% {
                background: linear-gradient(135deg, rgba(0, 102, 204, 0.05), rgba(0, 168, 255, 0.05));
                transform: scale(1.01);
            }
        }
        
        .function-card, .sector-card, .value-item, .principle {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Add enhanced button click effects
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create enhanced ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.5;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-enhanced');

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });

    // Add contact form functionality
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Scroll to contact section with enhanced animation
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                // Add highlight effect to contact section
                contactSection.style.animation = 'highlightSection 2s ease-in-out';
                setTimeout(() => {
                    contactSection.style.animation = '';
                }, 2000);
            }
        });
    });

    // Add loading animation completion
    setTimeout(() => {
        document.body.classList.add('loaded');
        document.querySelectorAll('.loading').forEach(el => {
            el.style.animation = 'fadeInUp 0.8s ease-out forwards';
        });
    }, 1000);
});

// Performance optimization
window.addEventListener('load', () => {
    // Preload images
    const images = [
        'https://via.placeholder.com/50x50/0066cc/ffffff?text=Y',
        'https://via.placeholder.com/100x100/0066cc/ffffff?text=LOGO'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});