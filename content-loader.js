// ===================================
// CONTENT LOADER - Dynamic Content for Main Webpage
// ===================================

class ContentLoader {
    constructor() {
        this.storageKey = 'yireh_website_content';
        this.content = this.loadContent();
        this.init();
    }

    loadContent() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Error loading content:', e);
                return null;
            }
        }
        return null;
    }

    init() {
        if (!this.content) {
            console.log('No custom content found, using default HTML content');
            return;
        }

        // Load content when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadAllContent());
        } else {
            this.loadAllContent();
        }
    }

    loadAllContent() {
        this.loadHeroContent();
        this.loadStatsContent();
        this.loadAboutContent();
        this.loadFunctionsContent();
        this.loadSectorsContent();
        this.loadValuesContent();
        this.loadWorkContent();
        this.loadContactContent();
        this.loadImagesContent();
    }

    // ===================================
    // HERO SECTION
    // ===================================
    loadHeroContent() {
        if (!this.content.hero) return;

        const hero = this.content.hero;

        // Update name highlight
        const nameHighlight = document.querySelector('.name-highlight');
        if (nameHighlight) nameHighlight.textContent = hero.name;

        // Update subtitle
        const subtitle = document.querySelector('.subtitle');
        if (subtitle) subtitle.textContent = hero.subtitle;

        // Update tagline
        const tagline = document.querySelector('.hero-tagline');
        if (tagline) tagline.textContent = hero.tagline;

        // Update company representation
        const companyText = document.querySelector('.hero-company');
        if (companyText) {
            companyText.innerHTML = `Representing: <strong>${hero.company}</strong>`;
        }

        // Update CTA buttons
        const ctaPrimary = document.querySelector('.cta-primary');
        if (ctaPrimary) ctaPrimary.textContent = hero.cta1;

        const ctaSecondary = document.querySelector('.cta-secondary');
        if (ctaSecondary) ctaSecondary.textContent = hero.cta2;
    }

    // ===================================
    // STATS SECTION
    // ===================================
    loadStatsContent() {
        if (!this.content.stats) return;

        const stats = this.content.stats;
        const statItems = document.querySelectorAll('.stat-item');

        if (statItems[0]) {
            statItems[0].querySelector('.stat-number').textContent = stats.stat1.number;
            statItems[0].querySelector('.stat-label').textContent = stats.stat1.label;
        }

        if (statItems[1]) {
            statItems[1].querySelector('.stat-number').textContent = stats.stat2.number;
            statItems[1].querySelector('.stat-label').textContent = stats.stat2.label;
        }

        if (statItems[2]) {
            statItems[2].querySelector('.stat-number').textContent = stats.stat3.number;
            statItems[2].querySelector('.stat-label').textContent = stats.stat3.label;
        }
    }

    // ===================================
    // ABOUT SECTION
    // ===================================
    loadAboutContent() {
        if (!this.content.about) return;

        const about = this.content.about;

        // Update about text paragraphs
        const aboutText = document.querySelector('.about-text');
        if (aboutText) {
            const paragraphs = aboutText.querySelectorAll('p');
            if (paragraphs[0]) paragraphs[0].textContent = about.summary;
            if (paragraphs[1]) {
                paragraphs[1].innerHTML = about.strength.replace(/end-to-end execution/gi, '<strong>end-to-end execution</strong>');
            }
        }

        // Update company background
        const backgroundSection = document.querySelector('.about-background');
        if (backgroundSection) {
            const bgParagraphs = backgroundSection.querySelectorAll('p');
            if (bgParagraphs.length > 0) {
                // Split background into paragraphs if it contains multiple sentences
                const sentences = about.background.split('. ');
                const midpoint = Math.ceil(sentences.length / 2);
                const firstPart = sentences.slice(0, midpoint).join('. ') + (sentences.length > midpoint ? '.' : '');
                const secondPart = sentences.slice(midpoint).join('. ');

                if (bgParagraphs[0]) bgParagraphs[0].innerHTML = this.highlightText(firstPart, ['CAN (C-A-N)']);
                if (bgParagraphs[1] && secondPart) bgParagraphs[1].textContent = secondPart;
            }
        }
    }

    // ===================================
    // FUNCTIONS SECTION
    // ===================================
    loadFunctionsContent() {
        if (!this.content.functions) return;

        const functionsGrid = document.querySelector('.functions-grid');
        if (!functionsGrid) return;

        functionsGrid.innerHTML = this.content.functions.map(func => `
            <div class="function-card">
                <div class="function-icon">
                    <i class="fas ${func.icon}"></i>
                </div>
                <h3>${func.title}</h3>
                <p>${func.description}</p>
            </div>
        `).join('');
    }

    // ===================================
    // SECTORS SECTION
    // ===================================
    loadSectorsContent() {
        if (!this.content.sectors) return;

        const sectorsGrid = document.querySelector('.sectors-grid');
        if (!sectorsGrid) return;

        sectorsGrid.innerHTML = this.content.sectors.map(sector => `
            <div class="sector-card">
                <div class="sector-icon">${sector.icon}</div>
                <h3>${sector.title}</h3>
                <ul>
                    ${sector.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    // ===================================
    // VALUES SECTION
    // ===================================
    loadValuesContent() {
        if (!this.content.values) return;

        const valuesGrid = document.querySelector('.value-grid');
        if (!valuesGrid) return;

        valuesGrid.innerHTML = this.content.values.map(value => `
            <div class="value-item">
                <i class="fas fa-check-circle"></i>
                <span>${value}</span>
            </div>
        `).join('');
    }

    // ===================================
    // WORK SECTION
    // ===================================
    loadWorkContent() {
        if (!this.content.work) return;

        const work = this.content.work;

        // Update principles
        const principlesContainer = document.querySelector('.work-principles');
        if (principlesContainer) {
            principlesContainer.innerHTML = work.principles.map(principle => `
                <div class="principle">
                    <h3>${principle.title}</h3>
                    <p>${principle.description}</p>
                </div>
            `).join('');
        }

        // Commercial items are usually static, but can be updated if needed
        if (work.commercial) {
            const commercialItems = document.querySelector('.commercial-items');
            if (commercialItems) {
                commercialItems.innerHTML = work.commercial.map(item => `
                    <div class="commercial-item">
                        <i class="fas ${item.icon}"></i>
                        <span>${item.text}</span>
                    </div>
                `).join('');
            }
        }
    }

    // ===================================
    // CONTACT SECTION
    // ===================================
    loadContactContent() {
        if (!this.content.contact) return;

        const contact = this.content.contact;

        const contactCard = document.querySelector('.contact-card');
        if (contactCard) {
            const h3 = contactCard.querySelector('h3');
            if (h3) h3.textContent = contact.name;

            const p = contactCard.querySelector('p');
            if (p) p.textContent = contact.title;

            const contactItems = contactCard.querySelectorAll('.contact-item');
            if (contactItems[0]) {
                contactItems[0].querySelector('span').textContent = contact.company;
            }
            if (contactItems[1]) {
                const phoneLink = contactItems[1].querySelector('a');
                if (phoneLink) {
                    phoneLink.textContent = contact.phone;
                    phoneLink.href = `tel:${contact.phone}`;
                }
            }
            if (contactItems[2]) {
                const emailLink = contactItems[2].querySelector('a');
                if (emailLink) {
                    emailLink.textContent = contact.email;
                    emailLink.href = `mailto:${contact.email}`;
                }
            }
            if (contactItems[3]) {
                contactItems[3].querySelector('span').textContent = contact.location;
            }
        }

        // Update location coverage section
        const coverageItems = document.querySelectorAll('.coverage-item');
        if (coverageItems[0]) {
            coverageItems[0].querySelector('span').textContent = contact.location;
        }

        // Update footer
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) {
            const footerSpan = footerContent.querySelector('.footer-logo span');
            if (footerSpan) footerSpan.textContent = contact.company;
        }
    }

    // ===================================
    // IMAGES SECTION
    // ===================================
    loadImagesContent() {
        if (!this.content.images) return;

        const images = this.content.images;

        // Update main logo
        if (images.mainLogo) {
            const mainLogo = document.querySelector('.main-logo-placeholder');
            if (mainLogo) mainLogo.src = images.mainLogo;
        }

        // Update nav logo
        if (images.navLogo) {
            const navLogos = document.querySelectorAll('.logo-placeholder');
            navLogos.forEach(logo => {
                logo.src = images.navLogo;
            });
        }

        // Handle hero images - if there are multiple, we could create a carousel
        // For now, we'll use the first image as a background
        if (images.heroImages && images.heroImages.length > 0) {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                // Create a subtle background with the first image
                heroSection.style.position = 'relative';

                // Check if overlay already exists
                let overlay = heroSection.querySelector('.hero-image-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'hero-image-overlay';
                    overlay.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-image: url('${images.heroImages[0]}');
                        background-size: cover;
                        background-position: center;
                        opacity: 0.05;
                        z-index: 0;
                        pointer-events: none;
                    `;
                    heroSection.insertBefore(overlay, heroSection.firstChild);
                } else {
                    overlay.style.backgroundImage = `url('${images.heroImages[0]}')`;
                }

                // Ensure hero content is above overlay
                const heroContent = heroSection.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.position = 'relative';
                    heroContent.style.zIndex = '10';
                }
                const heroStats = heroSection.querySelector('.hero-stats');
                if (heroStats) {
                    heroStats.style.position = 'relative';
                    heroStats.style.zIndex = '10';
                }
            }
        }
    }

    // ===================================
    // HELPER FUNCTIONS
    // ===================================
    highlightText(text, keywords) {
        let result = text;
        keywords.forEach(keyword => {
            const regex = new RegExp(keyword, 'gi');
            result = result.replace(regex, `<strong>${keyword}</strong>`);
        });
        return result;
    }
}

// Initialize Content Loader
new ContentLoader();
