const fs = require('fs');
const htmlPath = 'index.html';
const html = fs.readFileSync(htmlPath, 'utf8');

const scriptRegex = /<script(?:.*?)>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;

while ((match = scriptRegex.exec(html)) !== null) {
    count++;
    const content = match[1].trim();
    console.log(`Script [${count}]: length=${content.length}, preview=${content.substring(0, 50).replace(/\s+/g, ' ')}`);
}
