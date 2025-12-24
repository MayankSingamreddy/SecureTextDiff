document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initFAQ();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initProgressBar();
    initTypingAnimation();
    initNewsletterForm();
    initProductInteractions();
    initParallax();
});

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = navLinks.style.display === 'flex';
            
            if (isOpen) {
                navLinks.style.display = 'none';
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'fixed';
                navLinks.style.top = '60px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.bottom = '0';
                navLinks.style.background = 'white';
                navLinks.style.padding = '32px 24px';
                navLinks.style.gap = '20px';
                navLinks.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
                navLinks.style.overflowY = 'auto';
                mobileMenuBtn.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    navLinks.style.display = 'none';
                    mobileMenuBtn.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
}

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function(e) {
                const isActive = item.classList.contains('active');
                const clickedItem = this.closest('.faq-item');
                
                faqItems.forEach(faq => {
                    if (faq !== clickedItem) {
                        faq.classList.remove('active');
                    }
                });
                
                if (!isActive) {
                    clickedItem.classList.add('active');
                    e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    clickedItem.classList.remove('active');
                }
            });
        }
    });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {};
            
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            const btn = form.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span>Submitting...</span>';
            btn.disabled = true;
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.innerHTML = '<span>✓ Success!</span>';
                btn.style.background = '#22c55e';
                btn.style.opacity = '1';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    btn.style.opacity = '';
                    form.reset();
                }, 3000);
            }, 1500);
        });
        
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim()) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        });
    }
}

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll(
        '.feature-card, .step, .product-card-large, .news-card, .faq-item, .platform-card, .testimonial-card, .pricing-card'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`;
        observer.observe(el);
    });
    
    let ticking = false;
    document.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    handleScroll();
}

function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            const clientHeight = document.documentElement.clientHeight || window.innerHeight;
            
            const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
}

function initTypingAnimation() {
    const typingIndicator = document.querySelector('.typing-indicator');
    const assistantMessage = document.querySelector('.message.assistant');
    
    if (typingIndicator && assistantMessage) {
        setTimeout(() => {
            typingIndicator.style.opacity = '0';
            typingIndicator.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                assistantMessage.style.opacity = '1';
                assistantMessage.style.transform = 'translateY(0)';
            }, 300);
        }, 2000);
    }
    
    const agentStatus = document.querySelector('.agent-status');
    if (agentStatus) {
        const steps = agentStatus.querySelectorAll('.step');
        let currentStep = 1;
        
        setInterval(() => {
            if (currentStep < steps.length) {
                steps.forEach((step, index) => {
                    if (index < currentStep) {
                        step.classList.remove('active');
                        step.classList.add('completed');
                    } else if (index === currentStep) {
                        step.classList.add('active');
                    }
                });
                currentStep++;
            } else {
                steps.forEach(step => {
                    step.classList.remove('active', 'completed');
                });
                currentStep = 0;
            }
        }, 3000);
    }
}

function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = this.querySelector('input');
            const button = this.querySelector('button');
            const originalButtonText = button.textContent;
            
            if (input.value.trim()) {
                button.textContent = 'Subscribing...';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = '✓ Subscribed!';
                    button.style.background = '#22c55e';
                    input.value = '';
                    
                    setTimeout(() => {
                        button.textContent = originalButtonText;
                        button.disabled = false;
                        button.style.background = '';
                    }, 3000);
                }, 1500);
            }
        });
    }
}

function initProductInteractions() {
    const buyButtons = document.querySelectorAll('.buy-btn, .btn-cart');
    const wishlistButtons = document.querySelectorAll('.btn-wishlist');
    
    buyButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.background = '#22c55e';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 2000);
        });
    });
    
    wishlistButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.textContent === '♡') {
                this.textContent = '♥';
                this.style.background = '#fce7f3';
                this.style.color = '#ec4899';
                this.style.borderColor = '#ec4899';
            } else {
                this.textContent = '♡';
                this.style.background = '';
                this.style.color = '';
                this.style.borderColor = '';
            }
        });
    });
}

function initParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

document.documentElement.classList.add('loaded');

function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card-large');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                productCards.forEach(card => {
                    if (filter === 'all' || card.classList.contains(filter)) {
                        card.style.display = 'block';
                        card.style.animation = 'slideIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

function initModal() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
}

function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateInput(this);
                }
            });
        });
        
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
}

function validateInput(input) {
    const errorClass = 'error';
    const successClass = 'success';
    
    if (input.hasAttribute('required') && !input.value.trim()) {
        showError(input, 'This field is required');
        return false;
    }
    
    if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            showError(input, 'Please enter a valid email');
            return false;
        }
    }
    
    if (input.type === 'url' && input.value.trim()) {
        try {
            new URL(input.value);
        } catch {
            showError(input, 'Please enter a valid URL');
            return false;
        }
    }
    
    showSuccess(input);
    return true;
}

function showError(input, message) {
    input.classList.add('error');
    input.classList.remove('success');
    
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '4px';
    errorElement.style.display = 'block';
}

function showSuccess(input) {
    input.classList.remove('error');
    input.classList.add('success');
    
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
}

function initCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const hasPrefix = target.startsWith('$');
        const hasSuffix = target.includes('+');
        const hasK = target.includes('K');
        const hasM = target.includes('M');
        
        const numericValue = parseFloat(target.replace(/[$,K+,M+]/g, ''));
        
        let current = 0;
        const increment = numericValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const counter = setInterval(() => {
            current += increment;
            
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(counter);
            }
            
            let displayValue = current;
            
            if (hasM) {
                displayValue = (current / 1000000).toFixed(1) + 'M';
            } else if (hasK) {
                displayValue = (current / 1000).toFixed(0) + 'K';
            } else {
                displayValue = Math.floor(current).toLocaleString();
            }
            
            let result = '';
            if (hasPrefix) result += '$';
            result += displayValue;
            if (hasSuffix) result += '+';
            
            stat.textContent = result;
        }, stepTime);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat-number');
            if (stats.length > 0) {
                initCountUp();
                observer.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    observer.observe(heroStats);
}

window.lornAI = {
    initMobileMenu,
    initFAQ,
    initSmoothScroll,
    initContactForm,
    initScrollAnimations,
    initProgressBar,
    initTypingAnimation,
    initNewsletterForm,
    initProductInteractions,
    initParallax
};