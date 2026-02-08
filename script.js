 // Proxy functionality
const proxyUrl = document.getElementById('proxyUrl');
const proxySubmit = document.getElementById('proxySubmit');
const quickLinks = document.querySelectorAll('.quick-link');

// Pricing tab switching
const pricingTabs = document.querySelectorAll('.pricing-tab');
const pricingTables = document.querySelectorAll('.pricing-table-wrapper');

pricingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and tables
        pricingTabs.forEach(t => t.classList.remove('active'));
        pricingTables.forEach(table => table.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding table
        const targetTab = tab.getAttribute('data-tab');
        const targetTable = document.getElementById(targetTab);
        if (targetTable) {
            targetTable.classList.add('active');
        }
    });
});

// Handle proxy submission
proxySubmit.addEventListener('click', handleProxySubmit);
proxyUrl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleProxySubmit();
    }
});

function handleProxySubmit() {
    const url = proxyUrl.value.trim();
    
    if (!url) {
        alert('Please enter a URL');
        return;
    }
    
    // Clean the URL
    let cleanUrl = url;
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
        cleanUrl = 'https://' + cleanUrl;
    }
    
    // Get options
    const removeAds = document.getElementById('removeAds').checked;
    const removeScripts = document.getElementById('removeScripts').checked;
    const removeCookies = document.getElementById('removeCookies').checked;
    
    // Create proxy parameters
    const params = new URLSearchParams();
    if (removeAds) params.append('no-ads', 'true');
    if (removeScripts) params.append('no-scripts', 'true');
    if (removeCookies) params.append('no-cookies', 'true');
    
    // In a real implementation, you would redirect to your proxy server
    // For demo purposes, we'll show an alert
    console.log('Proxying:', cleanUrl, 'with options:', {
        removeAds,
        removeScripts,
        removeCookies
    });
    
    // Example proxy URL structure (customize based on your backend)
    // const proxyEndpoint = `/proxy?url=${encodeURIComponent(cleanUrl)}&${params.toString()}`;
    // window.location.href = proxyEndpoint;
    
    alert(`Opening ${cleanUrl} through secure proxy...\n\nOptions:\n- Block Ads: ${removeAds}\n- Disable Scripts: ${removeScripts}\n- Block Cookies: ${removeCookies}\n\nNote: This is a demo. Connect to a real proxy backend to enable functionality.`);
}

// Quick link handlers
quickLinks.forEach(link => {
    link.addEventListener('click', () => {
        const url = link.getAttribute('data-url');
        proxyUrl.value = url;
        proxyUrl.focus();
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and pricing cards
document.querySelectorAll('.feature-card, .pricing-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent && scrolled < 800) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
    
    if (heroVisual && scrolled < 800) {
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatStatValue(target);
            clearInterval(timer);
        } else {
            element.textContent = formatStatValue(Math.floor(current));
        }
    }, 16);
}

function formatStatValue(value) {
    if (typeof value === 'string') return value;
    if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
    }
    return value.toString();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const value = entry.target.textContent.trim();
            
            // Extract numeric value
            const numMatch = value.match(/[\d.]+/);
            if (numMatch) {
                const num = parseFloat(numMatch[0]);
                const suffix = value.replace(numMatch[0], '');
                
                if (value.includes('K')) {
                    animateCounter(entry.target, num * 1000, 2000);
                } else if (value.includes('%')) {
                    let current = 0;
                    const timer = setInterval(() => {
                        current += 0.5;
                        if (current >= num) {
                            entry.target.textContent = num + suffix;
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = current.toFixed(1) + suffix;
                        }
                    }, 20);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value, .stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Form validation and enhancement
const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Button ripple effect
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 80px;
        left: 0;
        right: 0;
        background: rgba(15, 23, 42, 0.98);
        backdrop-filter: blur(20px);
        padding: 2rem;
        gap: 1.5rem;
        border-bottom: 1px solid rgba(100, 116, 139, 0.2);
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log('%cILLUSORY', 'font-size: 48px; font-weight: bold; background: linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cSecure Web Proxy & VPN Service', 'font-size: 16px; color: #94a3b8;');
console.log('%cInterested in our API? Contact us at api@illusory.io', 'font-size: 12px; color: #64748b;');

// Prevent inspect element (optional - for production)
// Uncomment if you want to add basic protection
/*
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
    }
});
*/

// Performance optimization: Lazy load images
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
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading state to buttons
document.querySelectorAll('button').forEach(button => {
    const originalText = button.innerHTML;
    
    button.addEventListener('click', function() {
        if (this.classList.contains('loading')) return;
        
        // Add loading state for buttons that trigger actions
        if (this.textContent.includes('Start') || this.textContent.includes('Browse')) {
            this.classList.add('loading');
            const loadingHTML = `<span class="spinner"></span> ${this.textContent}`;
            
            // Simulate loading (remove in production or connect to actual API)
            setTimeout(() => {
                this.classList.remove('loading');
                this.innerHTML = originalText;
            }, 2000);
        }
    });
});

// Add spinner styles
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
    .spinner {
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    button.loading {
        pointer-events: none;
        opacity: 0.7;
    }
`;
document.head.appendChild(spinnerStyle);
