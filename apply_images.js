const fs = require('fs');
const path = require('path');

try {
    let content = fs.readFileSync('index.html', 'utf8');

    // MAPPING STRATEGY
    // 1. Hero Image (Home) -> The "Adjusted" Main Shot
    const heroImage = "assets/250409 정글웨이브110877(조절).jpg";

    // 2. Process Images (Step 1-4)
    const proc1 = "assets/[꾸미기]250409 정글웨이브110916.jpg";
    const proc2 = "assets/[꾸미기]250409 정글웨이브110919.jpg";
    const proc3 = "assets/[꾸미기]250409 정글웨이브110923.jpg";
    const proc4 = "assets/20241111_183148.jpg"; // Fallback to date file

    // Helper: Escape for HTML src
    // Browsers handle spaces/hangul in src if local, but standard is URL encoded.
    // However, if we blindly encode entire path "assets/...", the slash might be encoded?
    // encodeURIComponent encodes slash.
    // So we encode filename only.

    function getSrc(relativePath) {
        const parts = relativePath.split('/');
        return parts.map(p => encodeURIComponent(p)).join('/');
    }

    // Actually, for local file system serving via firebase hosting, just spaces/special chars are the concern.
    // But modern browsers handle raw strings in src="" quite well.
    // Let's try raw string first. If it breaks, we encode. 
    // Actually, spaces in src are generally bad practice.
    // I will replace spaces with %20 manually? No, I'll let JS logic handle it if possible.
    // But since I am writing to HTML file source code:
    // ref: src="assets/foo.jpg"
    // I will simply string replace.

    // TARGETS (Unsplash Placeholders)
    const targets = [
        // Hero
        {
            old: 'https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05?q=80&w=2574&auto=format&fit=crop',
            new: heroImage
        },
        // Process Steps
        {
            old: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80',
            new: proc1
        },
        {
            old: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80',
            new: proc2
        },
        {
            old: 'https://images.unsplash.com/photo-1596711914656-749e79af4749?auto=format&fit=crop&q=80',
            new: proc3
        },
        {
            old: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80',
            new: proc4
        }
    ];

    targets.forEach(t => {
        // Use exact string replacement
        // Note: The placeholders might appear multiple times (e.g. Hero image was also used in Youtube thumbnails in my previous script?)
        // Yes, in `enterprise_update.js`, I reused `photo-1543599538...` for YT thumbnails.
        // So global replace will update thumbnails too. This is GOOD (Consistent Branding).

        // However, I need to ensure the `new` path is URL encoded for HTML attribute.
        // e.g. "assets/foo bar.jpg" -> "assets/foo%20bar.jpg"
        // I will use a simple utility for this.

        const encodedNew = t.new.split('/').map(segment => encodeURIComponent(segment)).join('/');

        // Replace ALL occurrences
        content = content.split(t.old).join(encodedNew);
    });

    fs.writeFileSync('index.html', content, 'utf8');
    console.log('Images applied successfully.');

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
