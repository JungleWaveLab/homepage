const fs = require('fs');

try {
    let content = fs.readFileSync('index.html', 'utf8');

    // Remove specific emoji icons from the sidebar
    // Pattern: <span>[Emoji]</span>

    const iconsToRemove = [
        '<span>🏠</span>',
        '<span>🛠️</span>',
        '<span>🛒</span>',
        '<span>💬</span>'
    ];

    iconsToRemove.forEach(icon => {
        content = content.replace(icon, '');
    });

    // Also remove the "gap-4" class from these buttons to remove the spacing left behind
    // The buttons have classes: "flex items-center gap-4 px-4 py-3..."
    // We'll replace "gap-4" with "gap-0" or just remove it for sidebar nav buttons.
    // However, global replace of gap-4 might range too far.
    // Let's target the specific button lines if possible, or just accept the gap might be harmless or we replace "gap-4" in the context of the sidebar buttons.

    // Better approach: Regex replace for the specific buttons to remove gap-4 and the icon together?
    // Start with just removing the icons. The gap might just add left padding effectively, which might be fine, or look slightly off.
    // If we remove the icon, "gap-4" will put space between... nothing? No, flex gap is between items.
    // If only text remains, gap has no effect on single item.
    // So removing the span is sufficient. The text " HOME" might have a leading space in my original script?
    // Let's check `layout_shift.js`: `<span>🏠</span> HOME`. Yes, there is a space.
    // So " HOME".
    // I should trim that space too.

    // Refined replacements:
    content = content.replace('<span>🏠</span> HOME', 'HOME');
    content = content.replace('<span>🛠️</span> PROCESS', 'PROCESS');
    content = content.replace('<span>🛒</span> STORE', 'STORE');
    content = content.replace('<span>💬</span> COMMUNITY', 'COMMUNITY');

    fs.writeFileSync('index.html', content, 'utf8');
    console.log('Sidebar icons removed.');

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
