const fs = require('fs');

const cssPatch = `
    <style>
        /* --- PROJECT LAB ZERO: MINIMALIST OVERRIDE (DOOA STYLE) --- */
        * {
            border-radius: 0px !important; /* Force Sharp Edges for Architectural look */
        }
        
        /* Remove shadows and replace with thin borders */
        .shadow-lg, .shadow-md, .shadow-xl, .shadow-2xl, .shadow-sm, .shadow {
            box-shadow: none !important;
            border: 1px solid #e4e4e7 !important; /* Zinc-200 */
        }

        .dark .shadow-lg, .dark .shadow-md, .dark .shadow-xl, .dark .shadow-2xl, .dark .shadow-sm, .dark .shadow {
            border: 1px solid #27272a !important; /* Zinc-800 */
        }

        /* Minimalist Scrollbar */
        ::-webkit-scrollbar {
            width: 4px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: #d4d4d8;
        }
        .dark ::-webkit-scrollbar-thumb {
            background: #3f3f46;
        }

        /* Navigation Link Styling (Underline) */
        .nav-link {
            position: relative;
            font-weight: 600;
            color: #a1a1aa; /* Zinc-400 */
            transition: color 0.3s;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-size: 0.75rem; /* Tiny text */
        }
        .nav-link:hover, .nav-link.active, .tab-active {
            color: #000000;
        }
        .dark .nav-link:hover, .dark .nav-link.active, .dark .tab-active {
            color: #ffffff;
        }
        
        /* Active Indicator Line */
        .nav-link::after, .tab-active::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 0;
            height: 1px;
            background-color: #000000;
            transition: width 0.3s;
        }
        .nav-link.active::after, .tab-active::after {
            width: 100%;
        }
        .dark .nav-link::after, .dark .tab-active::after {
            background-color: #ffffff;
        }

        /* Lab Card Hover Effect */
        .lab-card {
            border: 1px solid #f4f4f5;
            transition: border-color 0.3s, transform 0.3s;
        }
        .lab-card:hover {
            border-color: #000000;
            transform: translateY(-2px);
        }
        .dark .lab-card {
            border-color: #27272a;
        }
        .dark .lab-card:hover {
            border-color: #ffffff;
        }

        body {
            font-family: 'Pretendard', 'TheJamsil', sans-serif; /* Clean Sans */
            letter-spacing: -0.01em;
        }
        
        /* Force background colors */
        .bg-jungle-50, .bg-gray-50 { background-color: #ffffff !important; }
        .dark .bg-jungle-50, .dark .bg-gray-50, .dark .bg-zinc-900 { background-color: #09090b !important; /* Zinc-950/Black */ }
        
        /* Refine Buttons */
        button, a.button {
            border-radius: 0px !important;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
    </style>
`;

const newHeader = `
    <!-- Header: Minimalist Lab Style (Replaces App Header) -->
    <header class="bg-white/95 dark:bg-black/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100 dark:border-zinc-900">
        <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <!-- Logo: Text Only, Architectural -->
            <div class="flex items-center gap-4 cursor-pointer" onclick="location.reload()">
                <div class="w-8 h-8 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg tracking-tighter">
                    J
                </div>
                <div>
                    <h1 class="text-lg font-bold text-black dark:text-white tracking-widest uppercase font-sans">JUNGLE WAVE</h1>
                    <div class="text-[9px] text-gray-400 dark:text-gray-500 tracking-[0.3em] uppercase leading-none mt-1">Bio Lab System</div>
                </div>
            </div>

            <!-- Desktop Nav (English, Clean) -->
            <nav class="hidden md:flex space-x-10">
                <button onclick="switchTab('encyclopedia')" id="tab-encyclopedia" class="nav-link">Archive</button>
                <button onclick="switchTab('calculator')" id="tab-calculator" class="nav-link">Solution</button>
                <button onclick="switchTab('diary')" id="tab-diary" class="nav-link">Manager</button>
                <button onclick="switchTab('community')" id="tab-community" class="nav-link">Community</button>
                <button onclick="switchTab('shop')" id="tab-shop" class="nav-link">Store</button>
                <button onclick="switchTab('rank')" id="tab-rank" class="nav-link">Rank</button>
                <button onclick="switchTab('admin')" id="tab-admin" class="nav-link">System</button>
            </nav>

            <!-- Tools -->
            <div class="flex gap-4 items-center">
                 <button onclick="toggleTheme()" class="text-[10px] font-bold uppercase tracking-widest hover:text-gray-500 transition-colors">
                    <span class="dark:hidden">Dark</span>
                    <span class="hidden dark:inline">Light</span>
                </button>
            </div>
        </div>
        
        <!-- Mobile Nav Scroll (Preserve ID mapping for logic) -->
        <nav class="md:hidden border-t border-gray-100 dark:border-zinc-900 overflow-x-auto flex no-scrollbar">
            <!-- Mobile Links need IDs? No, function uses string arg, but logic highlights by ID. 
                 BUT logic looks for 'tab-encyclopedia'. 
                 On mobile we duplicate buttons. Logic highlights IDs. 
                 If functionality relies on classList.add to specific ID, we might lose highlight on mobile if ID is duplicate.
                 The original code highlights by ID. 
                 I'll add IDs to desktop nav. Mobile nav will differ but work functionally.
                 For visual consistency, maybe mobile uses IDs? But IDs must be unique.
                 I will keep IDs on desktop. Mobile will just work as triggers.
            -->
            <button onclick="switchTab('encyclopedia')" class="flex-none px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white">Archive</button>
            <button onclick="switchTab('calculator')" class="flex-none px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white">Solution</button>
            <button onclick="switchTab('diary')" class="flex-none px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white">Manager</button>
            <button onclick="switchTab('community')" class="flex-none px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white">Community</button>
            <button onclick="switchTab('shop')" class="flex-none px-6 py-4 text-[10px] uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white">Store</button>
        </nav>
    </header>
`;

try {
    let content = fs.readFileSync('index.html', 'utf8');

    // Inject CSS before </head>
    content = content.replace('</head>', cssPatch + '\n</head>');

    // Replace Header
    // Regex for <header... </header>
    content = content.replace(/<header[\s\S]*?<\/header>/, newHeader);

    // Additional Cleanup: Replace 'bg-gray-50' in body to 'bg-white'? Logic handled in CSS override.

    fs.writeFileSync('index.html', content, 'utf8');
    console.log('Design overhaul applied successfully.');
} catch (err) {
    console.error('Error applying overhaul:', err);
    process.exit(1);
}
