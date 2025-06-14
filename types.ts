// TypeScript definitions for FurniShop

interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    category?: string;
    description?: string;
    inStock?: boolean;
    rating?: number;
}

interface CartItem {
    product: Product;
    quantity: number;
}

interface SliderOptions {
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showIndicators?: boolean;
    showNavigation?: boolean;
    transition?: 'slide' | 'fade';
    speed?: number;
}

interface AnimationConfig {
    duration?: number;
    delay?: number;
    easing?: string;
    threshold?: number;
}

declare class ImageSlider {
    constructor(containerSelector: string, options?: SliderOptions);
    init(): void;
    goToSlide(index: number): void;
    nextSlide(): void;
    prevSlide(): void;
    startAutoSlide(): void;
    stop(): void;
}

declare class AnimationObserver {
    constructor(config?: AnimationConfig);
    init(): void;
    observe(element: Element): void;
    unobserve(element: Element): void;
}

declare class ShoppingCart {
    items: CartItem[];
    total: number;

    constructor();
    addItem(product: Product, quantity?: number): void;
    removeItem(productId: number): void;
    updateQuantity(productId: number, quantity: number): void;
    clear(): void;
    getTotal(): number;
    getItemCount(): number;
}

// Utility functions
declare function createProductCard(product: Product, index: number): string;
declare function setupSmoothScrolling(): void;
declare function setupMobileMenu(): void;
declare function setupImageLoading(): void;
declare function setupParallax(): void;
declare function animateCounters(): void;
declare function setupHoverEffects(): void;
declare function setupPageLoader(): void;

// Global event types
interface CustomEventMap {
    'product:added': CustomEvent<{ product: Product; quantity: number }>;
    'cart:updated': CustomEvent<{ items: CartItem[]; total: number }>;
    'slider:changed': CustomEvent<{ currentIndex: number; totalSlides: number }>;
}

declare global {
    interface HTMLElement {
        addEventListener<K extends keyof CustomEventMap>(
            type: K,
            listener: (this: HTMLElement, ev: CustomEventMap[K]) => any,
            options?: boolean | AddEventListenerOptions
        ): void;
    }
}

export {
    Product,
    CartItem,
    SliderOptions,
    AnimationConfig,
    ImageSlider,
    AnimationObserver,
    ShoppingCart
};
