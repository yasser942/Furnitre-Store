#!/bin/bash

# Create public directory structure
mkdir -p public/dist

# Copy images to public directory
if [ -d "images" ]; then
    cp -r images public/
fi

# Create production HTML file
# First, replace the CDN script with CSS link
sed 's|<script src="https://cdn.tailwindcss.com"></script>|<link rel="stylesheet" href="dist/styles.min.css">|' index.html > public/index_temp1.html

# Then replace the script reference
sed 's|<script src="script.js"></script>|<script src="dist/script.min.js"></script>|' public/index_temp1.html > public/index_temp2.html

# Remove the tailwind config block (more carefully)
sed '/tailwind\.config = {/,/^[[:space:]]*};/d' public/index_temp2.html > public/index.html

# Clean up temporary files
rm -f public/index_temp1.html public/index_temp2.html

echo "Build preparation completed successfully!"
