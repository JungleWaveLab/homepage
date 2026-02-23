const fs = require('fs');

try {
    let content = fs.readFileSync('index.html', 'utf8');

    // --- 1. REMOVE OLD HEADER ---
    // Remove the entire <header> ... </header> block
    content = content.replace(/<header[\s\S]*?<\/header>/, '');

    // --- 2. PREPARE THE NEW LAYOUT WRAPPER ---
    // We need to wrap the existing <main> ... </main> in a flex container.
    // AND insert the <aside> sidebar before main.

    // Find <main ...> tag
    const mainTagRegex = /<main.*?>/;
    const match = content.match(mainTagRegex);

    if (!match) throw new Error("Main tag not found");

    const mainTag = match[0];
    // Add margin-left for desktop sidebar
    const newMainTag = mainTag.replace('class="', 'class="md:ml-64 transition-all duration-300 ');

    // Define the Sidebar HTML
    const sidebar = `
    <!-- LEFT SIDEBAR (Desktop) & MOBILE DRAWER -->
    <!-- Mobile Menu Button (Floating) -->
    <button onclick="toggleMobileMenu()" class="md:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-full shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    </button>

    <!-- Sidebar Container -->
    <aside id="sidebar" class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-black border-r border-gray-100 dark:border-zinc-800 transform -translate-x-full md:translate-x-0 transition-transform duration-300 z-40 overflow-y-auto">
        <!-- Logo Area -->
        <div class="h-20 flex items-center px-8 border-b border-gray-100 dark:border-zinc-800">
            <div class="cursor-pointer group" onclick="location.reload()">
                <h1 class="text-xl font-bold font-hand tracking-tighter text-black dark:text-white group-hover:text-jungle-600 transition-colors">JUNGLE WAVE</h1>
                <div class="text-[9px] uppercase tracking-[0.3em] text-gray-400">Bio Lab System</div>
            </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="p-6 space-y-2">
            <!-- Home -->
            <button onclick="switchTab('home')" id="nav-home" class="w-full text-left flex items-center gap-4 px-4 py-3 text-xs font-bold uppercase tracking-widest text-black dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg transition-colors border-l-2 border-transparent hover:border-black dark:hover:border-white">
                <span>🏠</span> HOME
            </button>

            <!-- Process -->
            <button onclick="switchTab('process')" id="nav-process" class="w-full text-left flex items-center gap-4 px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg transition-colors border-l-2 border-transparent hover:border-black dark:hover:border-white">
                <span>🛠️</span> PROCESS
            </button>

            <!-- LAB Accordion -->
            <div class="pt-4 pb-2">
                <button onclick="toggleLabMenu()" class="w-full text-left flex items-center justify-between px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-jungle-600 transition-colors">
                    <span>JUNGLE LAB</span>
                    <svg id="lab-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3 transform transition-transform duration-300"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </button>
                <div id="lab-menu" class="space-y-1 mt-2 overflow-hidden transition-all duration-300 max-h-0"> <!-- Default Collapsed -->
                    <button onclick="switchTab('encyclopedia')" id="nav-encyclopedia" class="w-full text-left pl-8 py-3 text-xs text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg transition-colors block">
                         ARCHIVE
                    </button>
                    <button onclick="switchTab('calculator')" id="nav-calculator" class="w-full text-left pl-8 py-3 text-xs text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg transition-colors block">
                         SOLUTION
                    </button>
                    <button onclick="switchTab('diary')" id="nav-diary" class="w-full text-left pl-8 py-3 text-xs text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg transition-colors block">
                         MANAGER
                    </button>
                </div>
            </div>

            <!-- Store -->
            <button onclick="switchTab('shop')" id="nav-shop" class="w-full text-left flex items-center gap-4 px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg transition-colors border-l-2 border-transparent hover:border-black dark:hover:border-white">
                <span>🛒</span> STORE
            </button>

            <!-- Community -->
            <button onclick="switchTab('community')" id="nav-community" class="w-full text-left flex items-center gap-4 px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg transition-colors border-l-2 border-transparent hover:border-black dark:hover:border-white">
                <span>💬</span> COMMUNITY
            </button>
            
            <!-- Rank & Admin (Small) -->
             <div class="pt-8 border-t border-gray-100 dark:border-zinc-800 mt-8">
                <button onclick="switchTab('rank')" id="nav-rank" class="w-full text-left px-4 py-2 text-[10px] uppercase text-gray-400 hover:text-black dark:hover:text-white transition-colors">Rank System</button>
                <button onclick="switchTab('admin')" id="nav-admin" class="w-full text-left px-4 py-2 text-[10px] uppercase text-gray-400 hover:text-black dark:hover:text-white transition-colors">Admin Access</button>
                <button onclick="toggleTheme()" class="w-full text-left px-4 py-2 text-[10px] uppercase text-gray-400 hover:text-black dark:hover:text-white transition-colors">Topic: Light/Dark</button>
             </div>

        </nav>
        
        <!-- Footer Info -->
        <div class="absolute bottom-0 w-full p-8 text-[9px] text-gray-300 leading-relaxed">
            © 2024 JUNGLE WAVE<br>
            Seoul, Gangnam-gu<br>
            All Rights Reserved.
        </div>
    </aside>
    
    <!-- Overlay for Mobile -->
    <div id="sidebar-overlay" onclick="toggleMobileMenu()" class="fixed inset-0 bg-black/50 z-30 hidden md:hidden backdrop-blur-sm transition-opacity"></div>
    `;

    // Inject Sidebar before Main, and update Main tag
    content = content.replace(mainTagRegex, sidebar + '\n' + newMainTag);

    // --- 3. UPDATE SCRIPTS FOR SIDEBAR LOGIC ---
    // We need to update switchTab to handle the Accordion and Sidebar Styles.
    // And add toggleLabMenu, toggleMobileMenu.

    // Check if restore_switchtab.js logic exists.
    // We will append a NEW script block that OVERRIDES specific logic or Adds helpers.

    const sidebarLogic = `
<script>
    console.log("Initializing Sidebar Logic...");

    // Accordion Logic
    window.toggleLabMenu = function() {
        const menu = document.getElementById('lab-menu');
        const arrow = document.getElementById('lab-arrow');
        if (menu.style.maxHeight) {
            menu.style.maxHeight = null;
            arrow.style.transform = "rotate(0deg)";
        } else {
            menu.style.maxHeight = menu.scrollHeight + "px";
            arrow.style.transform = "rotate(180deg)";
        }
    };
    
    // Mobile Menu Logic
    window.toggleMobileMenu = function() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
        } else {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        }
    };

    // Override switchTab to handle Sidebar Highlighting
    const originalSwitchTab = window.switchTab;
    window.switchTab = function(tabName) {
        console.log("Sidebar SwitchTab:", tabName);
        
        // Use Original Logic for Sections
        // We define the logic here fully to be safe, reusing the core concepts.
        // Or we can just modify the DOM classes after calling original?
        // Let's rewrite it to be clean.
        
        // 1. Hide Sections
        const tabs = ['home', 'process', 'encyclopedia', 'calculator', 'diary', 'community', 'shop', 'rank', 'admin'];
        tabs.forEach(t => {
            const sec = document.getElementById('content-' + t);
            if(sec) sec.classList.add('hidden');
            
            // Deactivate Nav
            const nav = document.getElementById('nav-' + t);
            if(nav) {
                nav.classList.remove('text-black', 'dark:text-white', 'border-black', 'dark:border-white', 'bg-gray-50', 'dark:bg-zinc-900');
                nav.classList.add('text-gray-500', 'border-transparent');
            }
        });
        
        // 2. Show Section
        const target = document.getElementById('content-' + tabName);
        if(target) {
            target.classList.remove('hidden');
            target.classList.add('animate-fade-in');
             window.scrollTo(0,0);
        }
        
        // 3. Activate Nav
        const targetNav = document.getElementById('nav-' + tabName);
        if(targetNav) {
            targetNav.classList.remove('text-gray-500', 'border-transparent');
            targetNav.classList.add('text-black', 'dark:text-white', 'border-black', 'dark:border-white', 'bg-gray-50', 'dark:bg-zinc-900');
        }
        
        // 4. Auto-Expand Lab Menu if child is selected
        const labChildren = ['encyclopedia', 'calculator', 'diary'];
        const labMenu = document.getElementById('lab-menu');
        const labArrow = document.getElementById('lab-arrow');
        if (labChildren.includes(tabName)) {
            if(labMenu && !labMenu.style.maxHeight) {
                labMenu.style.maxHeight = labMenu.scrollHeight + "px";
                if(labArrow) labArrow.style.transform = "rotate(180deg)";
            }
        }
        
        // 5. Close Mobile Menu on Selection
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.classList.contains('-translate-x-full') && window.innerWidth < 768) {
             toggleMobileMenu();
        }

        // 6. Specific Functions
        if(tabName === 'diary' && window.renderCalendar) window.renderCalendar();
        if(tabName === 'encyclopedia' && window.renderSpecies && typeof speciesData !== 'undefined') window.renderSpecies(speciesData);
        
        window.currentTab = tabName;
    };
    
    // Init: Open Lab Menu if default tab is inside
    setTimeout(() => {
        if(['encyclopedia', 'calculator', 'diary'].includes(window.currentTab)) {
            toggleLabMenu();
        }
    }, 500);

</script>
`;

    if (content.includes('</body>')) {
        content = content.replace('</body>', sidebarLogic + '\n</body>');
    } else {
        content += sidebarLogic;
    }

    fs.writeFileSync('index.html', content, 'utf8');
    console.log('Layout Shift Complete.');

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
