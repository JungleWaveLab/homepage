const fs = require('fs');

const htmlPath = 'index.html';
const cssDir = 'assets/css';
const cssPath = 'assets/css/style.css';

if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
}

let html = fs.readFileSync(htmlPath, 'utf8');

const styleRegex = /<style>([\s\S]*?)<\/style>/g;
let match;
let combinedCss = '';

while ((match = styleRegex.exec(html)) !== null) {
    combinedCss += match[1] + '\n\n';
}

if (combinedCss) {
    fs.writeFileSync(cssPath, combinedCss, 'utf8');

    // Replace the first <style> with the link and remove the rest
    let first = true;
    html = html.replace(/<style>[\s\S]*?<\/style>\s*/g, (matched) => {
        if (first) {
            first = false;
            return '<link rel="stylesheet" href="assets/css/style.css">\n';
        }
        return '';
    });

    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('CSS extracted and saved to ' + cssPath);
} else {
    console.log('No <style> tags found.');
}
