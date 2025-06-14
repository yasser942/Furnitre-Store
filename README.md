# FurniShop - Modern Furniture E-commerce Website

A beautiful, responsive furniture e-commerce website built with **HTML**, **CSS**, **Tailwind CSS**, and **TypeScript**. Features smooth animations, interactive elements, and a modern design based on the provided Figma design.

## 🚀 Features

### Design & Layout
- **Fully Responsive Design** - Adapts to all screen sizes (mobile, tablet, desktop)
- **Modern UI/UX** - Clean, professional design with smooth transitions
- **Glassmorphism Effects** - Modern glass-like elements with backdrop blur
- **Gradient Backgrounds** - Beautiful gradient overlays and text effects

### Animations & Interactions
- **Smooth Scroll Animations** - Elements animate in as they come into view
- **Hover Effects** - Interactive cards, buttons, and links with smooth transitions
- **Parallax Scrolling** - Subtle parallax effect on hero background
- **Loading Animations** - Skeleton loading and fade-in effects
- **Counter Animations** - Statistics numbers count up when visible

### Functionality
- **Interactive Product Cards** - Hover effects, add to cart functionality
- **Shopping Cart System** - Add items with visual feedback and notifications
- **Mobile Navigation** - Responsive mobile menu with smooth transitions
- **Image Lazy Loading** - Optimized loading for better performance
- **Smooth Navigation** - Smooth scrolling between sections

### Technical Features
- **TypeScript Support** - Type definitions for better development experience
- **Modern CSS** - Custom properties, grid, flexbox, and modern selectors
- **Accessibility** - ARIA labels, keyboard navigation, and screen reader support
- **Performance Optimized** - Efficient animations and optimized images
- **Browser Compatibility** - Works on all modern browsers

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎨 Color Palette

- **Primary**: #286F6C (Teal)
- **Dark**: #23262F (Dark Gray)
- **Light Gray**: #EAEEF3
- **White**: #FFFFFF
- **Black**: #000000

## 🏗️ Project Structure

```
furnishop-website/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── styles.css          # Custom CSS styles
├── types.ts            # TypeScript definitions
├── package.json        # Project dependencies
└── README.md          # Project documentation
```

## 🚀 Getting Started

### Method 1: Simple Setup (Recommended)
1. **Clone or download the project files**
2. **Open `index.html` in your browser**
3. **That's it!** The website uses CDN links for all dependencies.

### Method 2: Development Setup
1. **Install Node.js** (v16 or higher)
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start development server**:
   ```bash
   npm run dev
   ```
4. **Open** http://localhost:3000

### Method 3: Python Server
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000

## 📋 Sections Overview

### 1. Hero Section
- **Background**: Modern living room image with gradient overlay
- **Navigation**: Responsive navbar with mobile menu
- **Content**: Main heading, description, and CTA button
- **Statistics**: Animated counters showing company achievements
- **Scroll Indicator**: Animated scroll indicator

### 2. Categories Section
- **Grid Layout**: 2x2 on mobile, 4x1 on desktop
- **Categories**: Chair, Bed, Cupboard, Lighting
- **Hover Effects**: Image scale and overlay effects
- **CTA**: "Check All" button with arrow animation

### 3. Features Section
- **Two-column Layout**: Image and content side by side
- **Content**: Company benefits and services
- **Checkmarks**: Animated checkmark icons
- **Responsive**: Stacks on mobile devices

### 4. Products Section
- **Product Grid**: 1-4 columns based on screen size
- **Product Cards**: Image, name, price, add to cart button
- **Interactions**: Hover effects, cart animations
- **Pagination**: Page indicators and navigation arrows

### 5. Testimonial Section
- **Customer Review**: Quote and customer information
- **Profile Image**: Customer photo with details
- **Navigation**: Slider controls for multiple testimonials
- **Background**: Featured image with overlay

### 6. CTA Section
- **Newsletter Signup**: Email input with submit button
- **Background**: Hero image with dark overlay
- **Responsive Form**: Stacks on mobile devices

### 7. Footer
- **Multi-column Layout**: Links organized by category
- **Social Icons**: Social media links with hover effects
- **Copyright**: Bottom section with rights information
- **Responsive**: Adapts to mobile layout

## 🎯 Key Animations

### Scroll Animations
- **Fade In**: Elements fade in as they enter viewport
- **Slide Up**: Elements slide up from bottom
- **Slide Left/Right**: Elements slide in from sides
- **Scale In**: Elements scale up from smaller size
- **Stagger**: Child elements animate with delays

### Hover Animations
- **Transform**: Scale, translate, and rotate effects
- **Color Transitions**: Smooth color changes
- **Shadow Effects**: Dynamic shadow animations
- **Image Scale**: Image zoom on hover

### Interactive Elements
- **Button Effects**: Scale, glow, and color transitions
- **Card Hover**: Lift effect with shadow
- **Loading States**: Skeleton and spinner animations
- **Notification**: Toast notifications for user actions

## 🛠️ Customization

### Colors
Update the Tailwind config in `index.html`:
```javascript
colors: {
    primary: '#286F6C',    // Change primary color
    dark: '#23262F',       // Change dark color
    gray: '#EAEEF3'        // Change gray color
}
```

### Fonts
Update the font imports and config:
```javascript
fontFamily: {
    'saira': ['Saira', 'sans-serif'],
    'raleway': ['Raleway', 'sans-serif'],
    'inter': ['Inter', 'sans-serif']
}
```

### Products
Update the products array in `script.js`:
```javascript
const products = [
    {
        id: 1,
        name: "Product Name",
        price: 99.00,
        originalPrice: 120.00,
        image: "image-url"
    }
    // Add more products...
];
```

## 📱 Mobile Optimization

- **Touch Gestures**: Swipe support for sliders
- **Responsive Images**: Optimized for different screen densities
- **Mobile Menu**: Hamburger menu for navigation
- **Touch Targets**: Properly sized interactive elements
- **Performance**: Optimized for mobile networks

## ♿ Accessibility Features

- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color combinations
- **Focus Indicators**: Clear focus states for navigation
- **Alternative Text**: Descriptive alt text for images

## 🌐 Browser Support

- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+
- **Mobile Browsers**: iOS Safari 13+, Chrome Mobile 80+

## 📊 Performance

- **Optimized Images**: WebP format with fallbacks
- **Lazy Loading**: Images load as needed
- **Efficient Animations**: GPU-accelerated transforms
- **Minified Assets**: Compressed CSS and JavaScript
- **CDN Usage**: Fast loading from global CDNs

## 🔧 Development Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Lint JavaScript
npm run format     # Format code
npm run type-check # Check TypeScript types
```

## 📝 License

This project is licensed under the MIT License. Feel free to use it for personal or commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using modern web technologies**
