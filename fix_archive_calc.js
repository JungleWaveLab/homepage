const fs = require('fs');

try {
    let content = fs.readFileSync('index.html', 'utf8');

    // 1. Fix Calculator Presets (User Defined Depths: 3cm, 5cm, 7cm)
    // Note: User said "202030 > 3cm", etc.
    // Original: setPreset(20, 20, 30) -> setPreset(20, 20, 3)
    content = content.replace(/setPreset\(20, 20, 30\)/g, 'setPreset(20, 20, 3)');
    content = content.replace(/setPreset\(30, 30, 45\)/g, 'setPreset(30, 30, 5)');
    content = content.replace(/setPreset\(45, 45, 60\)/g, 'setPreset(45, 45, 7)');

    // 2. Append Robust renderSpecies Logic
    // We append this at the end of body to ensure it runs and overrides any previous logic.
    const robustLogic = `
<script>
    // --- ROBUST RENDER LOGIC (Archive Fix) ---
    window.renderSpecies = function(list) {
        const grid = document.getElementById('speciesGrid');
        const noResults = document.getElementById('noResults');
        if(!grid) return;
        
        grid.innerHTML = '';
        
        if (!list || list.length === 0) {
            if(noResults) noResults.classList.remove('hidden');
            return;
        }
        if(noResults) noResults.classList.add('hidden');

        list.forEach(sp => {
            const card = document.createElement('div');
            // Minimalist Card Style (Lab Zero)
            card.className = "bg-white dark:bg-black p-5 border border-gray-200 dark:border-zinc-800 cursor-pointer hover:border-black dark:hover:border-white transition-colors group";
            card.onclick = () => showSpeciesDetail(sp);
            card.innerHTML = \`
                <div class="flex justify-between items-start mb-6">
                    <h3 class="font-bold text-base text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white tracking-wide">\${sp.name}</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-4 h-4 text-gray-400 group-hover:text-black dark:group-hover:text-white"><path stroke-linecap="square" stroke-linejoin="miter" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </div>
                <div class="grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-zinc-900 pt-4">
                    <div>
                        <span class="block text-gray-400 dark:text-zinc-600 uppercase tracking-widest text-[9px] mb-1">Temp</span>
                        <span class="font-mono text-xs text-gray-600 dark:text-gray-400">\${sp.temp_day.split(' ')[0]}</span>
                    </div>
                     <div>
                        <span class="block text-gray-400 dark:text-zinc-600 uppercase tracking-widest text-[9px] mb-1">Humidity</span>
                        <span class="font-mono text-xs text-gray-600 dark:text-gray-400">\${sp.humidity}</span>
                    </div>
                </div>
            \`;
            grid.appendChild(card);
        });
    };

    // Force Render on Load
    // Ensure speciesData is available
    if(typeof speciesData !== 'undefined') {
        console.log("Forcing initial render of species data...");
        renderSpecies(speciesData);
    }
</script>
`;

    if (content.includes('</body>')) {
        content = content.replace('</body>', robustLogic + '\n</body>');
    } else {
        content += robustLogic;
    }

    fs.writeFileSync('index.html', content, 'utf8');
    console.log('Archive and Calculator logic fixed.');

} catch (err) {
    console.error('Error applying fixes:', err);
    process.exit(1);
}
