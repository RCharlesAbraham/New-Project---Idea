// ===================================
// ADMIN PANEL - CONTENT MANAGEMENT SYSTEM
// ===================================

class ContentManager {
    constructor() {
        this.storageKey = 'yireh_website_content';
        this.defaultContent = this.getDefaultContent();
        this.currentContent = this.loadContent();
        this.init();
    }

    init() {
        this.initNavigation();
        this.initMobileToggle();
        this.initFormHandlers();
        this.initImageHandlers();
        this.loadAllSections();
        this.updateDashboard();
    }

    // ===================================
    // DEFAULT CONTENT STRUCTURE
    // ===================================
    getDefaultContent() {
        return {
            hero: {
                name: 'ADAMS',
                subtitle: 'Business Connector',
                tagline: 'Supply Chain | Logistics | IT | Growth & Funding Facilitation',
                company: 'Yireh Trading Pvt. Ltd.',
                cta1: 'Get Connected',
                cta2: 'View Profile'
            },
            stats: {
                stat1: { number: '500+', label: 'Partnerships' },
                stat2: { number: '50+', label: 'Sectors' },
                stat3: { number: '100%', label: 'Transparency' }
            },
            about: {
                summary: 'I operate as a strategic business connector and growth facilitator, bridging manufacturers, suppliers, service providers, IT firms, logistics partners, financial institutions, and brand enablers with large buyers, factories, infrastructure projects, institutions, and corporate clients.',
                strength: 'My strength lies in end-to-end execution — from sourcing and supply to logistics, funding facilitation, IT enablement, branding, and market expansion — through a transparent, result-oriented B2B and project-based model.',
                background: 'Yireh Trading Private Limited is led by Adams, a seasoned media professional, filmmaker, and entrepreneur with extensive experience across television, cinema, and business development. Adams began his career with Sun Music and Sun TV as a VJ and television host, where he built strong industry credibility through high-profile interviews with leading Indian film personalities including Dhanush, Vijay, and Sivakarthikeyan. With a clear vision for growth, Adams transitioned into film direction and successfully completed his first feature film as a director titled CAN (C-A-N). He is currently developing a major web series project featuring Yogi Babu, which is under production.'
            },
            functions: [
                {
                    icon: 'fa-handshake',
                    title: 'Business Connections',
                    description: 'Identify, verify, and onboard manufacturers, suppliers, IT firms, logistics partners, and service providers'
                },
                {
                    icon: 'fa-network-wired',
                    title: 'Strategic Partnerships',
                    description: 'Connect with bulk buyers, factories, builders, institutions, corporates, and government-linked projects'
                },
                {
                    icon: 'fa-cogs',
                    title: 'End-to-End Execution',
                    description: 'Facilitate bulk sourcing, vendor coordination, execution, compliance, and follow-ups'
                },
                {
                    icon: 'fa-shipping-fast',
                    title: 'Logistics Solutions',
                    description: 'Arrange complete logistics and transportation solutions'
                },
                {
                    icon: 'fa-dollar-sign',
                    title: 'Funding Facilitation',
                    description: 'Enable business funding for eligible projects and companies'
                },
                {
                    icon: 'fa-chart-line',
                    title: 'Growth Support',
                    description: 'Support sales growth, branding, digital presence, and market access'
                }
            ],
            sectors: [
                {
                    icon: '🏗️',
                    title: 'Construction & Infrastructure',
                    items: ['Ready-mix concrete (RMC) supply', 'Road work & construction materials', 'Project-based bulk material sourcing', 'Vendor coordination for infrastructure projects']
                },
                {
                    icon: '🥛',
                    title: 'Food, Dairy & FMCG',
                    items: ['Milk & milk-based products', 'Bulk supply for institutions', 'Private-label & institutional sourcing', 'Hospital & corporate supply chains']
                },
                {
                    icon: '🧪',
                    title: 'Industrial & Manufacturing',
                    items: ['Petrochemicals & industrial raw materials', 'Polymers, plastics & chemical intermediates', 'Polyester, textile & synthetic fibre inputs', 'Factory-to-factory raw material sourcing']
                },
                {
                    icon: '🚛',
                    title: 'Logistics & Transportation',
                    items: ['Complete logistics outsourcing', 'End-to-end transportation solutions', 'Factory-to-factory logistics', 'Route optimization & cost planning']
                },
                {
                    icon: '💻',
                    title: 'IT & Technology Services',
                    items: ['Website, mobile app development', 'AI tools & automation solutions', 'CRM, ERP & business systems', 'Digital marketing & branding']
                },
                {
                    icon: '🎯',
                    title: 'Branding & Marketing',
                    items: ['Brand launches & campaigns', 'Celebrity endorsements', 'Event-based promotions', 'Online + offline promotion strategy']
                }
            ],
            values: [
                'Ready access to verified buyers, suppliers & partners',
                'Single-window solution: materials + logistics + IT + funding + marketing',
                'Strong execution focus at factory & project level',
                'Reduced time, effort & risk for all stakeholders',
                'Clear commercials, documentation & accountability',
                'Long-term relationship driven, not one-time deals'
            ],
            work: {
                principles: [
                    {
                        title: 'B2B | Factory-to-Factory | Project-Based Model',
                        description: 'Focused on business-to-business relationships and large-scale project execution'
                    },
                    {
                        title: 'Transparent Communication',
                        description: 'Clear, honest communication throughout the entire process'
                    },
                    {
                        title: 'Defined Scope & Timelines',
                        description: 'Well-defined deliverables with realistic timelines'
                    },
                    {
                        title: 'Professional Coordination',
                        description: 'Comprehensive follow-through on all commitments'
                    }
                ],
                commercial: [
                    { icon: 'fa-handshake', text: 'Introduction / Facilitation fee' },
                    { icon: 'fa-percent', text: 'Commission-based model' },
                    { icon: 'fa-calendar', text: 'Monthly retainer options' },
                    { icon: 'fa-trophy', text: 'Success-fee structure' }
                ]
            },
            contact: {
                name: 'Adams',
                title: 'Business Connector & Growth Facilitator',
                company: 'Yireh Trading Pvt. Ltd.',
                phone: '+91 98841 02093',
                email: 'adamsthedirector@gmail.com',
                location: 'Based in Chennai, Tamil Nadu'
            },
            images: {
                heroImages: [],
                mainLogo: 'https://via.placeholder.com/100x100/0066cc/ffffff?text=LOGO',
                navLogo: 'https://via.placeholder.com/50x50/0066cc/ffffff?text=Y'
            },
            lastUpdated: null
        };
    }

    // ===================================
    // STORAGE MANAGEMENT
    // ===================================
    loadContent() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Error loading content:', e);
                return this.defaultContent;
            }
        }
        return this.defaultContent;
    }

    saveContent() {
        this.currentContent.lastUpdated = new Date().toISOString();
        localStorage.setItem(this.storageKey, JSON.stringify(this.currentContent));
        this.showToast('Content saved successfully!', 'success');
        this.updateDashboard();
    }

    resetContent() {
        if (confirm('Are you sure you want to reset all content to default? This cannot be undone.')) {
            this.currentContent = JSON.parse(JSON.stringify(this.defaultContent));
            this.saveContent();
            this.loadAllSections();
            this.showToast('Content reset to default', 'success');
        }
    }

    // ===================================
    // NAVIGATION
    // ===================================
    initNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.content-section');
        const pageTitle = document.getElementById('pageTitle');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = item.dataset.section;

                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                // Show corresponding section
                sections.forEach(section => section.classList.remove('active'));
                const targetSection = document.getElementById(`section-${sectionId}`);
                if (targetSection) {
                    targetSection.classList.add('active');
                }

                // Update page title
                const title = item.querySelector('span').textContent;
                pageTitle.textContent = title;

                // Close mobile sidebar
                document.getElementById('adminSidebar').classList.remove('mobile-open');
            });
        });

        // Quick action navigation
        document.querySelectorAll('[data-navigate]').forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.navigate;
                const navItem = document.querySelector(`[data-section="${section}"]`);
                if (navItem) navItem.click();
            });
        });
    }

    initMobileToggle() {
        const mobileToggle = document.getElementById('mobileToggle');
        const sidebar = document.getElementById('adminSidebar');

        if (mobileToggle && sidebar) {
            mobileToggle.addEventListener('click', () => {
                sidebar.classList.toggle('mobile-open');
            });
        }
    }

    // ===================================
    // FORM HANDLERS
    // ===================================
    initFormHandlers() {
        // Save buttons
        document.querySelectorAll('[data-save]').forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.save;
                this.saveSection(section);
            });
        });

        // Save all button
        document.getElementById('saveAllBtn')?.addEventListener('click', () => {
            this.saveAllSections();
        });

        // Preview button
        document.getElementById('previewBtn')?.addEventListener('click', () => {
            window.open('index.html', '_blank');
        });

        // Reset button
        document.getElementById('resetContentBtn')?.addEventListener('click', () => {
            this.resetContent();
        });

        // Add function button
        document.getElementById('addFunctionBtn')?.addEventListener('click', () => {
            this.addFunction();
        });

        // Add sector button
        document.getElementById('addSectorBtn')?.addEventListener('click', () => {
            this.addSector();
        });

        // Add value button
        document.getElementById('addValueBtn')?.addEventListener('click', () => {
            this.addValue();
        });
    }

    // ===================================
    // SECTION LOADERS
    // ===================================
    loadAllSections() {
        this.loadHeroSection();
        this.loadStatsSection();
        this.loadAboutSection();
        this.loadFunctionsSection();
        this.loadSectorsSection();
        this.loadValuesSection();
        this.loadWorkSection();
        this.loadContactSection();
        this.loadImagesSection();
    }

    loadHeroSection() {
        const hero = this.currentContent.hero;
        document.getElementById('heroName').value = hero.name || '';
        document.getElementById('heroSubtitle').value = hero.subtitle || '';
        document.getElementById('heroTagline').value = hero.tagline || '';
        document.getElementById('heroCompany').value = hero.company || '';
        document.getElementById('heroCTA1').value = hero.cta1 || '';
        document.getElementById('heroCTA2').value = hero.cta2 || '';
    }

    loadStatsSection() {
        const stats = this.currentContent.stats;
        document.getElementById('stat1Number').value = stats.stat1.number || '';
        document.getElementById('stat1Label').value = stats.stat1.label || '';
        document.getElementById('stat2Number').value = stats.stat2.number || '';
        document.getElementById('stat2Label').value = stats.stat2.label || '';
        document.getElementById('stat3Number').value = stats.stat3.number || '';
        document.getElementById('stat3Label').value = stats.stat3.label || '';
    }

    loadAboutSection() {
        const about = this.currentContent.about;
        document.getElementById('aboutSummary').value = about.summary || '';
        document.getElementById('aboutStrength').value = about.strength || '';
        document.getElementById('companyBackground').value = about.background || '';
    }

    loadFunctionsSection() {
        const container = document.getElementById('functionsContainer');
        container.innerHTML = '';

        this.currentContent.functions.forEach((func, index) => {
            container.innerHTML += this.createFunctionCard(func, index);
        });

        // Add remove handlers
        container.querySelectorAll('.btn-remove').forEach((btn, index) => {
            btn.addEventListener('click', () => this.removeFunction(index));
        });
    }

    createFunctionCard(func, index) {
        return `
            <div class="dynamic-card">
                <div class="dynamic-card-header">
                    <h4>Function Card ${index + 1}</h4>
                    <button class="btn-remove" data-index="${index}">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Icon (Font Awesome class)</label>
                        <input type="text" class="function-icon" value="${func.icon || ''}" placeholder="fa-handshake">
                    </div>
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="function-title" value="${func.title || ''}" placeholder="Function Title">
                    </div>
                    <div class="form-group full-width">
                        <label>Description</label>
                        <textarea class="function-description" rows="3" placeholder="Function description">${func.description || ''}</textarea>
                    </div>
                </div>
            </div>
        `;
    }

    loadSectorsSection() {
        const container = document.getElementById('sectorsContainer');
        container.innerHTML = '';

        this.currentContent.sectors.forEach((sector, index) => {
            container.innerHTML += this.createSectorCard(sector, index);
        });

        container.querySelectorAll('.btn-remove').forEach((btn, index) => {
            btn.addEventListener('click', () => this.removeSector(index));
        });
    }

    createSectorCard(sector, index) {
        const itemsHtml = sector.items.map((item, i) =>
            `<div class="form-group full-width">
                <input type="text" class="sector-item" value="${item}" placeholder="Bullet point ${i + 1}">
            </div>`
        ).join('');

        return `
            <div class="dynamic-card">
                <div class="dynamic-card-header">
                    <h4>Sector Card ${index + 1}</h4>
                    <button class="btn-remove" data-index="${index}">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Icon (Emoji)</label>
                        <input type="text" class="sector-icon" value="${sector.icon || ''}" placeholder="🏗️">
                    </div>
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="sector-title" value="${sector.title || ''}" placeholder="Sector Title">
                    </div>
                    ${itemsHtml}
                </div>
            </div>
        `;
    }

    loadValuesSection() {
        const container = document.getElementById('valuesContainer');
        container.innerHTML = '';

        this.currentContent.values.forEach((value, index) => {
            container.innerHTML += `
                <div class="dynamic-card">
                    <div class="dynamic-card-header">
                        <h4>Value ${index + 1}</h4>
                        <button class="btn-remove" data-index="${index}">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                    <div class="form-grid">
                        <div class="form-group full-width">
                            <input type="text" class="value-text" value="${value}" placeholder="Value proposition text">
                        </div>
                    </div>
                </div>
            `;
        });

        container.querySelectorAll('.btn-remove').forEach((btn, index) => {
            btn.addEventListener('click', () => this.removeValue(index));
        });
    }

    loadWorkSection() {
        const container = document.getElementById('workContainer');
        const work = this.currentContent.work;

        let html = '<div class="dynamic-card"><h3>Work Principles</h3><div class="form-grid">';

        work.principles.forEach((principle, index) => {
            html += `
                <div class="form-group full-width">
                    <label>Principle ${index + 1} - Title</label>
                    <input type="text" class="principle-title" data-index="${index}" value="${principle.title}">
                </div>
                <div class="form-group full-width">
                    <label>Principle ${index + 1} - Description</label>
                    <textarea class="principle-desc" data-index="${index}" rows="2">${principle.description}</textarea>
                </div>
            `;
        });

        html += '</div></div>';
        container.innerHTML = html;
    }

    loadContactSection() {
        const contact = this.currentContent.contact;
        document.getElementById('contactName').value = contact.name || '';
        document.getElementById('contactTitle').value = contact.title || '';
        document.getElementById('contactCompany').value = contact.company || '';
        document.getElementById('contactPhone').value = contact.phone || '';
        document.getElementById('contactEmail').value = contact.email || '';
        document.getElementById('contactLocation').value = contact.location || '';
    }

    loadImagesSection() {
        const images = this.currentContent.images;

        // Display hero images
        const heroPreview = document.getElementById('heroImagesPreview');
        heroPreview.innerHTML = '';
        images.heroImages.forEach((img, index) => {
            heroPreview.innerHTML += this.createImagePreview(img, index, 'hero');
        });

        // Display main logo
        const mainLogoPreview = document.getElementById('mainLogoPreview');
        mainLogoPreview.innerHTML = '';
        if (images.mainLogo) {
            mainLogoPreview.innerHTML = this.createImagePreview(images.mainLogo, 0, 'main');
        }

        // Display nav logo
        const navLogoPreview = document.getElementById('navLogoPreview');
        navLogoPreview.innerHTML = '';
        if (images.navLogo) {
            navLogoPreview.innerHTML = this.createImagePreview(images.navLogo, 0, 'nav');
        }

        // Update total images count
        const totalImages = images.heroImages.length + (images.mainLogo ? 1 : 0) + (images.navLogo ? 1 : 0);
        document.getElementById('totalImages').textContent = totalImages;
    }

    createImagePreview(src, index, type) {
        return `
            <div class="image-preview-item">
                <img src="${src}" alt="Preview">
                <button class="remove-image" data-type="${type}" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }

    // ===================================
    // SECTION SAVERS
    // ===================================
    saveSection(section) {
        switch (section) {
            case 'hero':
                this.saveHeroSection();
                break;
            case 'stats':
                this.saveStatsSection();
                break;
            case 'about':
                this.saveAboutSection();
                break;
            case 'functions':
                this.saveFunctionsSection();
                break;
            case 'sectors':
                this.saveSectorsSection();
                break;
            case 'values':
                this.saveValuesSection();
                break;
            case 'work':
                this.saveWorkSection();
                break;
            case 'contact':
                this.saveContactSection();
                break;
            case 'images':
                this.saveContent();
                break;
        }
    }

    saveHeroSection() {
        this.currentContent.hero = {
            name: document.getElementById('heroName').value,
            subtitle: document.getElementById('heroSubtitle').value,
            tagline: document.getElementById('heroTagline').value,
            company: document.getElementById('heroCompany').value,
            cta1: document.getElementById('heroCTA1').value,
            cta2: document.getElementById('heroCTA2').value
        };
        this.saveContent();
    }

    saveStatsSection() {
        this.currentContent.stats = {
            stat1: {
                number: document.getElementById('stat1Number').value,
                label: document.getElementById('stat1Label').value
            },
            stat2: {
                number: document.getElementById('stat2Number').value,
                label: document.getElementById('stat2Label').value
            },
            stat3: {
                number: document.getElementById('stat3Number').value,
                label: document.getElementById('stat3Label').value
            }
        };
        this.saveContent();
    }

    saveAboutSection() {
        this.currentContent.about = {
            summary: document.getElementById('aboutSummary').value,
            strength: document.getElementById('aboutStrength').value,
            background: document.getElementById('companyBackground').value
        };
        this.saveContent();
    }

    saveFunctionsSection() {
        const cards = document.querySelectorAll('#functionsContainer .dynamic-card');
        this.currentContent.functions = [];

        cards.forEach(card => {
            this.currentContent.functions.push({
                icon: card.querySelector('.function-icon').value,
                title: card.querySelector('.function-title').value,
                description: card.querySelector('.function-description').value
            });
        });

        this.saveContent();
    }

    saveSectorsSection() {
        const cards = document.querySelectorAll('#sectorsContainer .dynamic-card');
        this.currentContent.sectors = [];

        cards.forEach(card => {
            const items = Array.from(card.querySelectorAll('.sector-item')).map(input => input.value);
            this.currentContent.sectors.push({
                icon: card.querySelector('.sector-icon').value,
                title: card.querySelector('.sector-title').value,
                items: items
            });
        });

        this.saveContent();
    }

    saveValuesSection() {
        const cards = document.querySelectorAll('#valuesContainer .dynamic-card');
        this.currentContent.values = Array.from(cards).map(card =>
            card.querySelector('.value-text').value
        );
        this.saveContent();
    }

    saveWorkSection() {
        const titles = document.querySelectorAll('.principle-title');
        const descs = document.querySelectorAll('.principle-desc');

        this.currentContent.work.principles = Array.from(titles).map((title, index) => ({
            title: title.value,
            description: descs[index].value
        }));

        this.saveContent();
    }

    saveContactSection() {
        this.currentContent.contact = {
            name: document.getElementById('contactName').value,
            title: document.getElementById('contactTitle').value,
            company: document.getElementById('contactCompany').value,
            phone: document.getElementById('contactPhone').value,
            email: document.getElementById('contactEmail').value,
            location: document.getElementById('contactLocation').value
        };
        this.saveContent();
    }

    saveAllSections() {
        this.saveHeroSection();
        this.saveStatsSection();
        this.saveAboutSection();
        this.saveFunctionsSection();
        this.saveSectorsSection();
        this.saveValuesSection();
        this.saveWorkSection();
        this.saveContactSection();
        this.showToast('All sections saved successfully!', 'success');
    }

    // ===================================
    // ADD/REMOVE ITEMS
    // ===================================
    addFunction() {
        this.currentContent.functions.push({
            icon: 'fa-star',
            title: 'New Function',
            description: 'Function description'
        });
        this.loadFunctionsSection();
    }

    removeFunction(index) {
        if (confirm('Remove this function card?')) {
            this.currentContent.functions.splice(index, 1);
            this.loadFunctionsSection();
        }
    }

    addSector() {
        this.currentContent.sectors.push({
            icon: '🏢',
            title: 'New Sector',
            items: ['Item 1', 'Item 2', 'Item 3', 'Item 4']
        });
        this.loadSectorsSection();
    }

    removeSector(index) {
        if (confirm('Remove this sector card?')) {
            this.currentContent.sectors.splice(index, 1);
            this.loadSectorsSection();
        }
    }

    addValue() {
        this.currentContent.values.push('New value proposition');
        this.loadValuesSection();
    }

    removeValue(index) {
        if (confirm('Remove this value item?')) {
            this.currentContent.values.splice(index, 1);
            this.loadValuesSection();
        }
    }

    // ===================================
    // IMAGE HANDLERS
    // ===================================
    initImageHandlers() {
        // Hero images upload
        const heroImageUpload = document.getElementById('heroImageUpload');
        if (heroImageUpload) {
            heroImageUpload.addEventListener('change', (e) => {
                this.handleImageUpload(e.target.files, 'hero');
            });
        }

        // Main logo upload
        const mainLogoUpload = document.getElementById('mainLogoUpload');
        if (mainLogoUpload) {
            mainLogoUpload.addEventListener('change', (e) => {
                this.handleImageUpload(e.target.files, 'main');
            });
        }

        // Nav logo upload
        const navLogoUpload = document.getElementById('navLogoUpload');
        if (navLogoUpload) {
            navLogoUpload.addEventListener('change', (e) => {
                this.handleImageUpload(e.target.files, 'nav');
            });
        }

        // Remove image handlers
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove-image')) {
                const btn = e.target.closest('.remove-image');
                const type = btn.dataset.type;
                const index = parseInt(btn.dataset.index);
                this.removeImage(type, index);
            }
        });
    }

    handleImageUpload(files, type) {
        if (!files || files.length === 0) return;

        Array.from(files).forEach(file => {
            if (file.size > 5 * 1024 * 1024) {
                this.showToast('File too large! Max 5MB', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target.result;

                if (type === 'hero') {
                    this.currentContent.images.heroImages.push(dataUrl);
                } else if (type === 'main') {
                    this.currentContent.images.mainLogo = dataUrl;
                } else if (type === 'nav') {
                    this.currentContent.images.navLogo = dataUrl;
                }

                this.loadImagesSection();
                this.saveContent();
            };
            reader.readAsDataURL(file);
        });
    }

    removeImage(type, index) {
        if (type === 'hero') {
            this.currentContent.images.heroImages.splice(index, 1);
        } else if (type === 'main') {
            this.currentContent.images.mainLogo = 'https://via.placeholder.com/100x100/0066cc/ffffff?text=LOGO';
        } else if (type === 'nav') {
            this.currentContent.images.navLogo = 'https://via.placeholder.com/50x50/0066cc/ffffff?text=Y';
        }

        this.loadImagesSection();
        this.saveContent();
    }

    // ===================================
    // DASHBOARD
    // ===================================
    updateDashboard() {
        const lastUpdated = document.getElementById('lastUpdated');
        if (this.currentContent.lastUpdated) {
            const date = new Date(this.currentContent.lastUpdated);
            lastUpdated.textContent = date.toLocaleString();
        } else {
            lastUpdated.textContent = 'Never';
        }

        const totalImages = this.currentContent.images.heroImages.length +
            (this.currentContent.images.mainLogo ? 1 : 0) +
            (this.currentContent.images.navLogo ? 1 : 0);
        document.getElementById('totalImages').textContent = totalImages;
    }

    // ===================================
    // TOAST NOTIFICATIONS
    // ===================================
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.className = `toast ${type} show`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize Content Manager
document.addEventListener('DOMContentLoaded', () => {
    window.contentManager = new ContentManager();
});
