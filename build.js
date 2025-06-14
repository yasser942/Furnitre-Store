#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the original HTML file
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Replace CDN script with local CSS
let productionHtml = htmlContent.replace(
    '<script src="https://cdn.tailwindcss.com"></script>',
    '<link rel="stylesheet" href="dist/styles.min.css">'
);

// Replace script.js with minified version
productionHtml = productionHtml.replace(
    '<script src="script.js"></script>',
    '<script src="dist/script.min.js"></script>'
);

// Remove the tailwind config block (more robust approach)
const configStart = productionHtml.indexOf('<script>\n        tailwind.config = {');
const configEnd = productionHtml.indexOf('    </script>', configStart);
if (configStart !== -1 && configEnd !== -1) {
    productionHtml = productionHtml.substring(0, configStart) + 
                    productionHtml.substring(configEnd + '    </script>'.length);
}

// Remove the development styles.css reference
productionHtml = productionHtml.replace(
    '<link rel="stylesheet" href="styles.css">',
    ''
);

// Create public directory
if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
}

if (!fs.existsSync('public/dist')) {
    fs.mkdirSync('public/dist', { recursive: true });
}

// Write the production HTML file
fs.writeFileSync('public/index.html', productionHtml);

// Copy images directory if it exists
if (fs.existsSync('images')) {
    const copyDir = (src, dest) => {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        const files = fs.readdirSync(src);
        files.forEach(file => {
            const srcFile = path.join(src, file);
            const destFile = path.join(dest, file);
            if (fs.statSync(srcFile).isDirectory()) {
                copyDir(srcFile, destFile);
            } else {
                fs.copyFileSync(srcFile, destFile);
            }
        });
    };
    copyDir('images', 'public/images');
}

console.log('Build preparation completed successfully!');
