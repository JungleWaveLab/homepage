const fs = require('fs');
const htmlPath = 'index.html';
const html = fs.readFileSync(htmlPath, 'utf8');

const scriptRegex = /<script(?:.*?)>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;

if (!fs.existsSync('assets/js')) {
    fs.mkdirSync('assets/js', { recursive: true });
}

let firebaseConfigs = [];
let appLogic = [];

while ((match = scriptRegex.exec(html)) !== null) {
    count++;
    const content = match[1].trim();
    if (content.length === 0) continue;

    // Skip external script tags src
    if (match[0].includes('src=')) continue;

    fs.writeFileSync(`assets/js/raw_script_${count}.js`, content, 'utf8');
}
console.log('Dumped all inner scripts to assets/js as raw_script_X.js for manual inspection.');
