// Products data
const products = [
    {
        id: 1,
        name: "Ceiling Light",
        price: 75.00,
        originalPrice: 82.00,
        image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        name: "Treos Seroes 911",
        price: 200.00,
        originalPrice: 210.00,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        name: "XORA corner desk",
        price: 320.00,
        originalPrice: 325.00,
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        name: "Multi bilderman slibber...",
        price: 45.00,
        originalPrice: 50.00,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 5,
        name: "Black Forest Series wo...",
        price: 225.00,
        originalPrice: 240.00,
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 6,
        name: "Wood Chair",
        price: 50.00,
        originalPrice: 70.00,
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 7,
        name: "Papper Cupboard",
        price: 105.00,
        originalPrice: 120.00,
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 8,
        name: "Ole Gundorse Spring...",
        price: 82.00,
        originalPrice: 100.00,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

// Slider/Carousel functionality
class ImageSlider {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.slides = [];
        this.currentIndex = 0;
        this.autoSlideInterval = null;
        this.init();
    }

    init() {
        if (!this.container) return;

        this.slides = Array.from(this.container.children);
        this.createIndicators();
        this.setupEventListeners();
        this.startAutoSlide();
    }

    createIndicators() {
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2';

        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `w-3 h-3 rounded-full transition-all duration-300 ${index === 0 ? 'bg-white' : 'bg-white/50'
                }`;
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });

        this.container.appendChild(indicatorsContainer);
        this.indicators = indicatorsContainer.children;
    }

    setupEventListeners() {
        // Touch/swipe support
        let startX = 0;
        let startY = 0;

        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        this.container.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;

            const diffX = startX - endX;
            const diffY = startY - endY;

            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }

            startX = 0;
            startY = 0;
        });
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
        this.updateIndicators();
        this.resetAutoSlide();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlider();
        this.updateIndicators();
    }

    prevSlide() {
        this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
        this.updateSlider();
        this.updateIndicators();
    }

    updateSlider() {
        this.slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${(index - this.currentIndex) * 100}%)`;
            slide.style.transition = 'transform 0.5s ease-in-out';
        });
    }

    updateIndicators() {
        if (!this.indicators) return;

        Array.from(this.indicators).forEach((indicator, index) => {
            indicator.className = `w-3 h-3 rounded-full transition-all duration-300 ${index === this.currentIndex ? 'bg-white' : 'bg-white/50'
                }`;
        });
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    resetAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }

    stop() {
        clearInterval(this.autoSlideInterval);
    }
}

// Animation Observer
class AnimationObserver {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        this.init();
    }

    init() {
        const animatedElements = document.querySelectorAll('[class*="animate-"]');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.animationPlayState = 'paused';
            this.observer.observe(el);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animationPlayState = 'running';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Product Card Component
function createProductCard(product, index) {
    return `
        <div class="product-card bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-scale-in" style="animation-delay: ${index * 0.1}s;">
            <div class="relative overflow-hidden">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <h3 class="text-dark font-semibold text-lg mb-3 hover:text-primary transition-colors duration-300">${product.name}</h3>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <span class="text-dark font-medium text-lg">$${product.price.toFixed(2)}</span>
                        <span class="text-dark/50 line-through text-sm">$${product.originalPrice.toFixed(2)}</span>
                    </div>
                    
                    <button class="add-to-cart w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-all duration-300 transform hover:scale-110 group">
                        <i class="fas fa-plus text-white text-sm group-hover:rotate-180 transition-transform duration-300"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Shopping Cart functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart')) {
                e.preventDefault();
                const productCard = e.target.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = parseFloat(productCard.querySelector('.text-lg').textContent.replace('$', ''));

                this.addItem({
                    name: productName,
                    price: productPrice
                });

                this.animateAddToCart(e.target.closest('.add-to-cart'));
            }
        });
    }

    addItem(item = {}) {
        this.items.push(item);
        this.updateTotal();
        this.showNotification(`${item.name} added to cart!`);
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + item.price, 0);
    }

    animateAddToCart(button) {
        button.classList.add('animate-ping');
        setTimeout(() => {
            button.classList.remove('animate-ping');
        }, 600);
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Animate out
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        mobileMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                mobileMenu.classList.add('hidden');
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Loading animation for images
function setupImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function () {
            this.classList.add('animate-fade-in');
        });
    });
}

// Parallax effect for hero section
function setupParallax() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        const bgImage = hero.querySelector('img');
        if (bgImage) {
            bgImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.text-3xl, .text-4xl');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const text = counter.textContent;
                const number = parseInt(text.replace(/\D/g, ''));

                if (number && number > 0) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        counter.textContent = text.replace(number.toString(), Math.floor(current).toString());

                        if (current >= number) {
                            counter.textContent = text;
                            clearInterval(timer);
                        }
                    }, 30);
                }

                observer.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

// Enhanced hover effects with magnetic interaction
function setupHoverEffects() {
    // Product cards hover effect
    document.addEventListener('mouseover', (e) => {
        const productCard = e.target.closest('.product-card');
        if (productCard) {
            productCard.classList.add('group');
        }
    });

    // Category cards hover effect with magnetic interaction
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Magnetic effect
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 100;

            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                const moveX = x * strength * 0.1;
                const moveY = y * strength * 0.1;

                this.style.transform = `translateY(-10px) scale(1.02) translate(${moveX}px, ${moveY}px)`;
            }
        });
    });

    // Feature items animation with stagger
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        item.style.setProperty('--stagger-index', index);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-slide-in-left');
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(item);
    });

    // Magnetic buttons
    const buttons = document.querySelectorAll('button, .magnetic-btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Particle animation system
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.maxParticles = 20;
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            setTimeout(() => {
                this.addParticle();
            }, i * 200);
        }
    }

    addParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        this.container.appendChild(particle);
        this.particles.push(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                const index = this.particles.indexOf(particle);
                if (index > -1) {
                    this.particles.splice(index, 1);
                }
            }
        }, (duration + delay) * 1000);
    }

    animate() {
        // Continuously add new particles
        setInterval(() => {
            if (this.particles.length < this.maxParticles) {
                this.addParticle();
            }
        }, 1000);
    }
}

// Text reveal animation
function setupTextReveal() {
    const textElements = document.querySelectorAll('h1, h2, h3');

    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';

        // Split text into spans
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.05}s`;
            element.appendChild(span);
        });

        // Observe element
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('text-reveal');
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(element);
    });
}

// Advanced loading system
class LoadingManager {
    constructor() {
        this.loadedResources = 0;
        this.totalResources = 0;
        this.callbacks = [];
        this.init();
    }

    init() {
        this.countResources();
        this.setupImageLoading();
        this.setupFontLoading();
    }

    countResources() {
        this.totalResources = document.querySelectorAll('img').length;
        this.totalResources += document.querySelectorAll('link[href*="font"]').length;
    }

    setupImageLoading() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                this.resourceLoaded();
            } else {
                img.addEventListener('load', () => this.resourceLoaded());
                img.addEventListener('error', () => this.resourceLoaded());
            }
        });
    }

    setupFontLoading() {
        if (document.fonts) {
            document.fonts.ready.then(() => {
                this.resourceLoaded();
            });
        } else {
            setTimeout(() => this.resourceLoaded(), 1000);
        }
    }

    resourceLoaded() {
        this.loadedResources++;
        const progress = this.loadedResources / this.totalResources;

        this.callbacks.forEach(callback => callback(progress));

        if (this.loadedResources >= this.totalResources) {
            this.onComplete();
        }
    }

    onProgress(callback) {
        this.callbacks.push(callback);
    }

    onComplete() {
        document.body.classList.add('loaded');

        // Trigger page entrance animations
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('animate-fade-in');
            }, index * 100);
        });
    }
}

// Scroll-triggered animations with performance optimization
class ScrollAnimationManager {
    constructor() {
        this.elements = new Map();
        this.ticking = false;
        this.init();
    }

    init() {
        this.setupElements();
        this.bindEvents();
    }

    setupElements() {
        // Statistics counters
        document.querySelectorAll('[data-counter]').forEach(el => {
            this.elements.set(el, {
                type: 'counter',
                target: parseInt(el.dataset.counter),
                current: 0,
                animated: false
            });
        });

        // Parallax elements
        document.querySelectorAll('[data-parallax]').forEach(el => {
            this.elements.set(el, {
                type: 'parallax',
                speed: parseFloat(el.dataset.parallax) || 0.5,
                offset: 0
            });
        });

        // Reveal elements
        document.querySelectorAll('[data-reveal]').forEach(el => {
            this.elements.set(el, {
                type: 'reveal',
                direction: el.dataset.reveal || 'up',
                animated: false
            });
        });
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.updateAnimations();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }

    updateAnimations() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;

        this.elements.forEach((data, element) => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementVisible = elementTop < scrollY + windowHeight && elementTop + rect.height > scrollY;

            switch (data.type) {
                case 'counter':
                    if (elementVisible && !data.animated) {
                        this.animateCounter(element, data);
                        data.animated = true;
                    }
                    break;

                case 'parallax':
                    if (elementVisible) {
                        const offset = (scrollY - elementTop) * data.speed;
                        element.style.transform = `translateY(${offset}px)`;
                    }
                    break;

                case 'reveal':
                    if (elementVisible && !data.animated) {
                        this.animateReveal(element, data);
                        data.animated = true;
                    }
                    break;
            }
        });
    }

    animateCounter(element, data) {
        const duration = 2000;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const current = Math.floor(data.target * this.easeOutCubic(progress));
            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    animateReveal(element, data) {
        const directions = {
            up: 'animate-slide-up',
            down: 'animate-slide-down',
            left: 'animate-slide-in-left',
            right: 'animate-slide-in-right',
            scale: 'animate-scale-in'
        };

        element.classList.add(directions[data.direction] || directions.up);
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
}

// Category Slider Functionality
let currentSlide = 0;
const totalSlides = 2;

function initCategorySlider() {
    const slider = document.getElementById('categorySlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideDots = document.querySelectorAll('.slide-dot');

    if (!slider || !prevBtn || !nextBtn) return;

    function updateSlider() {
        const translateX = -currentSlide * 100;
        slider.style.transform = `translateX(${translateX}%)`;

        // Update slide dots
        slideDots.forEach((dot, index) => {
            dot.classList.remove('bg-dark');
            dot.classList.add('bg-gray-300');
            if (index === currentSlide) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-dark');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Slide dot navigation
    slideDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Auto-slide functionality (optional)
    let autoSlideInterval = setInterval(nextSlide, 5000); // 5 seconds

    // Pause auto-slide on hover
    const categorySection = document.getElementById('categories');
    if (categorySection) {
        categorySection.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        categorySection.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        });
    }

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {
    // Render products
    const productsContainer = document.querySelector('#products .grid');
    if (productsContainer) {
        productsContainer.innerHTML = products.map((product, index) =>
            createProductCard(product, index)
        ).join('');
    }

    // Initialize advanced systems
    const loadingManager = new LoadingManager();
    const scrollAnimationManager = new ScrollAnimationManager();

    // Initialize components
    new AnimationObserver();
    new ShoppingCart();

    // Initialize category slider
    initCategorySlider();

    // Setup particle system for hero
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        heroSection.appendChild(particlesContainer);
        new ParticleSystem(particlesContainer);
    }

    // Setup functionality
    setupSmoothScrolling();
    setupMobileMenu();
    setupImageLoading();
    setupParallax();
    setupHoverEffects();
    setupTextReveal();

    // Enhanced counter animation with scroll manager
    const counterElements = document.querySelectorAll('.text-3xl, .text-4xl');
    counterElements.forEach((el, index) => {
        const text = el.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        if (number && number > 0) {
            el.setAttribute('data-counter', number);
            el.textContent = '0';
        }
    });

    // Add scroll-based navbar styling with improved performance
    let lastScrollY = 0;
    let ticking = false;

    const updateNavbar = () => {
        const nav = document.querySelector('nav');
        const scrollY = window.pageYOffset;

        if (scrollY > 100 && scrollY > lastScrollY) {
            // Scrolling down
            nav.classList.add('bg-white/95', 'backdrop-blur-lg', 'shadow-lg', 'text-dark');
            nav.classList.remove('bg-transparent');
            nav.querySelectorAll('a').forEach(link => {
                if (!link.classList.contains('text-primary')) {
                    link.classList.add('text-dark');
                    link.classList.remove('text-white');
                }
            });
        } else if (scrollY <= 100) {
            // At top
            nav.classList.remove('bg-white/95', 'backdrop-blur-lg', 'shadow-lg', 'text-dark');
            nav.classList.add('bg-transparent');
            nav.querySelectorAll('a').forEach(link => {
                link.classList.remove('text-dark');
                link.classList.add('text-white');
            });
        }

        lastScrollY = scrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Setup loading progress indicator
    loadingManager.onProgress((progress) => {
        console.log(`Loading progress: ${Math.round(progress * 100)}%`);
    });

    // Add data attributes for enhanced animations
    document.querySelectorAll('img').forEach(img => {
        if (img.closest('#hero')) {
            img.setAttribute('data-parallax', '0.3');
        }
    });

    // Setup intersection observer for reveal animations
    const revealElements = document.querySelectorAll('.animate-slide-up, .animate-slide-in-left, .animate-slide-in-right, .animate-scale-in');
    revealElements.forEach((el, index) => {
        el.setAttribute('data-reveal', 'up');
        el.style.animationDelay = `${index * 0.1}s`;
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Performance monitoring
    const performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
            if (entry.entryType === 'paint') {
                console.log(`${entry.name}: ${entry.startTime.toFixed(2)}ms`);
            }
        });
    });

    if (typeof PerformanceObserver !== 'undefined') {
        performanceObserver.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
    }

    console.log('🪑 FurniShop website loaded successfully! ✨');
    console.log('🚀 All animations and interactions are ready!');
    console.log('📱 Responsive design activated for all screen sizes!');

    // Initialize category slider
    initCategorySlider();

    // Category slider functionality
    const slider = document.getElementById('categories-slider');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');

    if (slider && prevBtn && nextBtn) {
        // Function to get responsive card dimensions
        function getCardDimensions() {
            const screenWidth = window.innerWidth;
            let cardWidth, gap;

            if (screenWidth < 640) { // Mobile
                cardWidth = 200;
                gap = 16; // 4 * 4px = 16px
            } else if (screenWidth < 768) { // Small tablets
                cardWidth = 240;
                gap = 16;
            } else { // Desktop
                cardWidth = 265;
                gap = 24; // 6 * 4px = 24px
            }

            return { cardWidth, gap };
        }

        function scrollSlider(direction) {
            const { cardWidth, gap } = getCardDimensions();
            const scrollAmount = cardWidth + gap;

            slider.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }

        prevBtn.addEventListener('click', function () {
            scrollSlider(-1);
        });

        nextBtn.addEventListener('click', function () {
            scrollSlider(1);
        });

        // Hide/show navigation buttons based on scroll position
        function updateNavigationButtons() {
            const isAtStart = slider.scrollLeft <= 10; // Small threshold for precision
            const isAtEnd = slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 10;

            prevBtn.style.opacity = isAtStart ? '0.5' : '1';
            nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
            prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
            nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        }

        // Check navigation buttons on scroll
        slider.addEventListener('scroll', updateNavigationButtons);

        // Update on window resize
        let resizeTimeout;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateNavigationButtons, 100);
        });

        // Initial check
        updateNavigationButtons();
    }
});
