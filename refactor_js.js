const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const scriptRegex = /<script.*?>([\s\S]*?)<\/script>/gi;

let match;
let count = 0;
let regularScripts = [];
let moduleScripts = [];
let tailwindConfig = '';

while ((match = scriptRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const content = match[1].trim();

    if (fullTag.includes('src=')) continue; // skip external, e.g. tailwind CDN

    if (content.includes('tailwind.config')) {
        tailwindConfig = fullTag;
        continue;
    }

    count++;
    if (fullTag.includes('type="module"')) {
        moduleScripts.push(`// --- MODULE SCRIPT ${count} ---\n` + content);
    } else {
        regularScripts.push(`// --- REGULAR SCRIPT ${count} ---\n` + content);
    }
}

fs.writeFileSync('assets/js/combined_regular.js', regularScripts.join('\n\n'), 'utf8');
fs.writeFileSync('assets/js/combined_module.js', moduleScripts.join('\n\n'), 'utf8');

console.log('Combined scripts created.');
