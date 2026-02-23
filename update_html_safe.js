const fs = require('fs');

try {
    const htmlPath = 'index.html';
    let html = fs.readFileSync(htmlPath, 'utf8');

    // Find the <body> end tag to append scripts
    const bodyEndIndex = html.lastIndexOf('</body>');

    const newScripts = '\\n<!-- Refactored Modules -->\\n' +
        '<script src="assets/js/data.js"></script>\\n' +
        '<script src="assets/js/util_core.js"></script>\\n' +
        '<script src="assets/js/ui.js"></script>\\n' +
        '<script src="assets/js/builder.js"></script>\\n' +
        '<script type="module" src="assets/js/firebase-config.js"></script>\\n';

    // Instead of replacing all script tags automatically which causes regex issues, let's just strip them via substring
    // We only want to keep <script src="https://cdn.tailwindcss.com"></script> and <script>tailwind.config = ... </script>

    // We can do this safely by matching <script to </script>
    let resultLineByLine = [];
    let lines = html.split('\\n');
    let insideScript = false;
    let keepScript = false;
    let scriptBuffer = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        if (line.includes('<script')) {
            insideScript = true;
            scriptBuffer = [];
            // Check if it's the tailwind ones we want to keep
            if (line.includes('cdn.tailwindcss.com') || line.includes('tailwind.config')) {
                keepScript = true;
            }
        }

        if (insideScript) {
            scriptBuffer.push(line);
            if (line.includes('tailwind.config')) keepScript = true;

            if (line.includes('</script>')) {
                insideScript = false;
                if (keepScript) {
                    resultLineByLine.push(...scriptBuffer);
                }
                keepScript = false;
            }
        } else {
            // Not inside a script, keep the line
            if (!line.includes('</script>')) {
                resultLineByLine.push(line);
            }
        }
    }

    let resultHtml = resultLineByLine.join('\\n');
    resultHtml = resultHtml.replace('</body>', newScripts + '</body>');

    fs.writeFileSync(htmlPath, resultHtml, 'utf8');
    console.log('index.html updated successfully via line processing.');

} catch (err) {
    console.error("Fatal Error:", err);
}
