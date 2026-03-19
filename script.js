// ============================================================
// ILLUSORY — Main Script
// ============================================================

// Pricing tab switching
const pricingTabs = document.querySelectorAll('.pricing-tab');
const pricingTables = document.querySelectorAll('.pricing-table-wrapper');

pricingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        pricingTabs.forEach(t => t.classList.remove('active'));
        pricingTables.forEach(table => table.classList.remove('active'));
        tab.classList.add('active');
        const targetTable = document.getElementById(tab.getAttribute('data-tab'));
        if (targetTable) targetTable.classList.add('active');
    });
});

// Proxy functionality (only runs if proxy elements exist)
const proxyUrl = document.getElementById('proxyUrl');
const proxySubmit = document.getElementById('proxySubmit');
const quickLinks = document.querySelectorAll('.quick-link');

if (proxySubmit && proxyUrl) {
    proxySubmit.addEventListener('click', handleProxySubmit);
    proxyUrl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleProxySubmit();
    });
}

function handleProxySubmit() {
    if (!proxyUrl) return;
    const url = proxyUrl.value.trim();
    if (!url) {
        proxyUrl.focus();
        return;
    }
    let cleanUrl = url;
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
        cleanUrl = 'https://' + cleanUrl;
    }
    const removeAds = document.getElementById('removeAds')?.checked;
    const removeScripts = document.getElementById('removeScripts')?.checked;
    const removeCookies = document.getElementById('removeCookies')?.checked;

    const params = new URLSearchParams();
    if (removeAds) params.append('no-ads', 'true');
    if (removeScripts) params.append('no-scripts', 'true');
    if (removeCookies) params.append('no-cookies', 'true');

    // Redirect to account signup if not signed in
    window.location.href = 'https://myaccount.ilusory.com/signup';
}

quickLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (proxyUrl) {
            proxyUrl.value = link.getAttribute('data-url');
            proxyUrl.focus();
            proxyUrl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (navLinks && mobileMenuBtn) {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    }
});

// Smooth scrolling for hash links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn && mobileMenuBtn.classList.remove('active');
            }
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (navbar) {
        if (currentScroll > 60) {
            navbar.style.background = 'rgba(15, 23, 42, 0.97)';
            navbar.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    }
}, { passive: true });

// Parallax effect on hero (desktop only)
window.addEventListener('scroll', () => {
    if (window.innerWidth < 968) return;
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    if (heroContent && scrolled < 700) {
        heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
        heroContent.style.opacity = 1 - (scrolled / 550);
    }
    if (heroVisual && scrolled < 700) {
        heroVisual.style.transform = `translateY(calc(-50% + ${scrolled * 0.15}px))`;
    }
}, { passive: true });

// Intersection observer for scroll animations
const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .stat-card, .step-card, .use-case-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target, suffix = '', duration = 1800) {
    const increment = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const value = entry.target.textContent.trim();
            const numMatch = value.match(/[\d.]+/);
            if (numMatch) {
                const num = parseFloat(numMatch[0]);
                const prefix = value.slice(0, value.indexOf(numMatch[0]));
                const suffix = value.slice(value.indexOf(numMatch[0]) + numMatch[0].length);
                if (value.includes('K')) {
                    let c = 0;
                    const target = num * 1000;
                    const timer = setInterval(() => {
                        c += target / (1800 / 16);
                        if (c >= target) {
                            entry.target.textContent = num + 'K+';
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = Math.floor(c / 1000) + 'K+';
                        }
                    }, 16);
                } else if (value.includes('%')) {
                    let c = 0;
                    const timer = setInterval(() => {
                        c += num / (1800 / 16);
                        if (c >= num) {
                            entry.target.textContent = num + '%';
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = c.toFixed(1) + '%';
                        }
                    }, 16);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value, .stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Mobile sticky CTA — hide after scrolling to final CTA
const mobileStickyCtA = document.getElementById('mobileStickyCtA');
const finalCta = document.querySelector('.final-cta');

if (mobileStickyCtA && finalCta) {
    const stickyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            mobileStickyCtA.style.opacity = entry.isIntersecting ? '0' : '1';
            mobileStickyCtA.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
        });
    }, { threshold: 0.1 });
    stickyObserver.observe(finalCta);
}

// Button ripple effect
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Inject styles for mobile menu, ripple, spinner
const style = document.createElement('style');
style.textContent = `
    button { position: relative; overflow: hidden; }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.25);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to { transform: scale(4); opacity: 0; }
    }

    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 64px;
        left: 0;
        right: 0;
        background: rgba(15, 23, 42, 0.99);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        padding: 1.5rem 1.5rem 2rem;
        gap: 0.25rem;
        border-bottom: 1px solid rgba(100, 116, 139, 0.2);
        z-index: 998;
        max-height: calc(100vh - 64px);
        overflow-y: auto;
    }

    .nav-links.active a {
        padding: 0.875rem 0.5rem;
        font-size: 1.05rem;
        border-bottom: 1px solid rgba(100, 116, 139, 0.1);
        color: var(--text);
    }

    .nav-links.active a:last-child {
        border-bottom: none;
    }

    .nav-links.active .btn-primary,
    .nav-links.active .btn-secondary {
        margin-top: 0.5rem;
        width: 100%;
        text-align: center;
        padding: 1rem;
    }

    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
        transform: translateX(-8px);
    }

    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    .spinner {
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        vertical-align: middle;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    button.loading {
        pointer-events: none;
        opacity: 0.7;
    }

    .mobile-sticky-cta {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Console welcome
console.log('%cILLUSORY', 'font-size: 48px; font-weight: bold; background: linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cSecure Web Proxy & VPN Service', 'font-size: 16px; color: #94a3b8;');
console.log('%cInterested in our API? Contact us at api@illusory.io', 'font-size: 12px; color: #64748b;');
