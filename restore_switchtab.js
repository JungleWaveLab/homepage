const fs = require('fs');

try {
    let content = fs.readFileSync('index.html', 'utf8');

    const switchLogic = `
<script>
    console.log("Restoring Tab System...");

    window.switchTab = function(tabName) {
        console.log("Switching tab to:", tabName);
        
        // 1. Hide All Sections
        const sections = ['home', 'process', 'encyclopedia', 'calculator', 'diary', 'community', 'shop', 'rank', 'admin'];
        sections.forEach(s => {
            const section = document.getElementById('content-' + s);
            if(section) {
                // For Home, we don't 'hide' it if it's default? No, logic is exclusive.
                section.classList.add('hidden');
                section.classList.remove('animate-fade-in'); 
            }
            
            // 2. Reset Nav Buttons
            const btn = document.getElementById('tab-' + s);
            if(btn) {
                btn.classList.remove('font-bold', 'border-b-2', 'border-black', 'dark:border-white', 'text-black', 'dark:text-white');
                btn.classList.add('text-gray-500', 'dark:text-gray-400');
            }
        });
        
        // 3. Show Target Section
        const target = document.getElementById('content-' + tabName);
        if(target) {
            target.classList.remove('hidden');
            // Trigger Reflow for Animation replay
            void target.offsetWidth;
            target.classList.add('animate-fade-in');
        } else {
            console.error("Target section not found:", tabName);
        }
        
        // 4. Highlight Nav Button
        const targetBtn = document.getElementById('tab-' + tabName);
        if(targetBtn) {
            targetBtn.classList.remove('text-gray-500', 'dark:text-gray-400');
            targetBtn.classList.add('font-bold', 'border-b-2', 'border-black', 'dark:border-white', 'text-black', 'dark:text-white');
        }
        
        // 5. Specific Logic Execution
        if(tabName === 'diary' && window.renderCalendar) window.renderCalendar();
        if(tabName === 'encyclopedia' && window.renderSpecies && typeof speciesData !== 'undefined') window.renderSpecies(speciesData);
        
        // 6. Update State
        window.currentTab = tabName;
        window.scrollTo(0,0);
    };

    // Initialize Default Tab (Home)
    setTimeout(() => {
        if(window.switchTab) window.switchTab('home');
    }, 100);

</script>
`;

    if (content.includes('</body>')) {
        content = content.replace('</body>', switchLogic + '\n</body>');
    } else {
        content += switchLogic;
    }

    fs.writeFileSync('index.html', content, 'utf8');
    console.log('Tab System restored.');

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
