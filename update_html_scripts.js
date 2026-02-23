const fs = require('fs');

try {
    const htmlPath = 'index.html';
    let html = fs.readFileSync(htmlPath, 'utf8');

    const scriptRegex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;

    html = html.replace(scriptRegex, (match, attrs, content) => {
        try {
            attrs = attrs || '';
            content = content || '';

            if (attrs.includes('cdn.tailwindcss.com')) return match;
            if (content.includes('tailwind.config = {')) return match;

            return '';
        } catch (innerErr) {
            console.error('Inner Replace Error:', innerErr);
            return match;
        }
    });

    // Remove empty spaces left behind
    html = html.replace(/<script><\/script>/gi, '');

    const newScripts = \`
    <!-- Refactored Modules -->
    <script src="assets/js/data.js"></script>
    <script src="assets/js/util_core.js"></script>
    <script src="assets/js/ui.js"></script>
    <script src="assets/js/builder.js"></script>
    <script type="module" src="assets/js/firebase-config.js"></script>
\`;

    html = html.replace('</body>', newScripts + '\n</body>');

    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('index.html updated successfully with clean module imports.');

} catch (err) {
    console.error("Fatal Error:", err);
}
