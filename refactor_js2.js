const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scriptRegex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;

let match;
let count = 0;
let regularScripts = [];
let moduleScripts = [];

while ((match = scriptRegex.exec(html)) !== null) {
    const attrs = match[1];
    const content = match[2].trim();

    if (attrs.includes('src=')) continue; // skip only if <script src="...">

    if (content.includes('tailwind.config')) {
        continue;
    }

    count++;
    if (attrs.includes('type="module"')) {
        moduleScripts.push(`// --- MODULE SCRIPT ${count} ---\n` + content);
    } else {
        regularScripts.push(`// --- REGULAR SCRIPT ${count} ---\n` + content);
    }
}

fs.writeFileSync('assets/js/combined_regular.js', regularScripts.join('\n\n'), 'utf8');
fs.writeFileSync('assets/js/combined_module.js', moduleScripts.join('\n\n'), 'utf8');

console.log(`Extracted modules and regular scripts correctly.`);
