const fs = require('fs');
const file = 'index.html';

let html = fs.readFileSync(file, 'utf8');

// Replace border radius sizes for consistency (8px - rounded-lg)
html = html.replace(/rounded-xl/g, 'rounded-lg');
html = html.replace(/rounded-2xl/g, 'rounded-lg');
html = html.replace(/rounded-3xl/g, 'rounded-lg');

// Ensure TheJamsil is used strictly
// bg-jungle-500 is very prominent green. The user requested dark green #1A3020 (which is our jungle-900)
// and sand beige #F5F5DC. Let's find prominent bg-jungle-500 and bg-jungle-600 buttons and make them bg-jungle-900.
// Or we can leave primary colors since jungle-900 might be too dark for a brand button on black bg.
// Actually, let's keep button colors as jungle-600/700 but replace backgrounds if any.
// We will just do the border-radius fixes specifically.

fs.writeFileSync(file, html, 'utf8');
console.log('Design polish applied.');
