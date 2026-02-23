const fs = require('fs');

// --- 1. NEW CONTENT SECTIONS (Designed by Content & Design Team) ---

const homeContent = `
<section id="content-home" class="animate-fade-in space-y-12 pb-20">
    <!-- Hero Section -->
    <div class="relative h-[80vh] w-full overflow-hidden rounded-none md:rounded-b-3xl">
        <div class="absolute inset-0 bg-black">
            <!-- Cinematic Placeholder -->
            <img src="https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05?q=80&w=2574&auto=format&fit=crop" class="w-full h-full object-cover opacity-60">
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
        </div>
        <div class="absolute bottom-20 left-6 md:left-20 max-w-2xl">
            <div class="flex items-center gap-3 mb-4">
                 <span class="bg-jungle-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Season 2024</span>
                 <span class="text-white/80 text-[10px] uppercase tracking-widest border border-white/30 px-3 py-1">Cinematic Mode</span>
            </div>
            <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-hand">
                NATURE<br>REDEFINED.
            </h1>
            <p class="text-gray-300 text-sm md:text-base max-w-md leading-relaxed mb-8">
                정글웨이브는 단순한 사육장을 넘어,<br>가장 완벽한 '작은 지구'를 설계합니다.<br>
                당신의 공간에 숨쉬는 예술을 초대하세요.
            </p>
            <div class="flex gap-4">
                <button onclick="switchTab('process')" class="bg-white text-black text-xs font-bold px-8 py-4 uppercase tracking-widest hover:bg-gray-200 transition-colors">
                    OUR PROCESS
                </button>
                <button onclick="switchTab('shop')" class="border border-white text-white text-xs font-bold px-8 py-4 uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                    SHOP COLLECTION
                </button>
            </div>
        </div>
    </div>

    <!-- YouTube / Content Section -->
    <div class="max-w-6xl mx-auto px-6">
        <div class="flex justify-between items-end mb-8 border-b border-gray-100 dark:border-zinc-800 pb-4">
            <div>
                <span class="text-jungle-600 font-bold text-xs tracking-widest uppercase mb-2 block">Jungle Wave TV</span>
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white">FEATURED CONTENT</h2>
            </div>
            <a href="https://youtube.com" target="_blank" class="text-xs font-bold text-gray-400 hover:text-black dark:hover:text-white uppercase tracking-widest flex items-center gap-2">
                Youtube Channel <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- YT Card 1 -->
            <div class="group cursor-pointer">
                <div class="relative aspect-video bg-gray-100 overflow-hidden mb-4">
                    <img src="https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    <div class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                        <div class="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/50">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                    </div>
                </div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:underline decoration-1 underline-offset-4">303045 Moss Wall Setting Guide</h3>
                <p class="text-xs text-gray-500">How to set up a beginner vivarium within 30 mins.</p>
            </div>
             <!-- YT Card 2 -->
             <div class="group cursor-pointer">
                <div class="relative aspect-video bg-gray-100 overflow-hidden mb-4">
                    <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    <div class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                        <div class="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/50">
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                    </div>
                </div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:underline decoration-1 underline-offset-4">Artist Interview: 'The Forest'</h3>
                <p class="text-xs text-gray-500">Exclusive interview with our lead aquascaper.</p>
            </div>
             <!-- YT Card 3 -->
             <div class="group cursor-pointer">
                <div class="relative aspect-video bg-gray-100 overflow-hidden mb-4">
                    <img src="https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    <div class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                        <div class="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/50">
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                    </div>
                </div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:underline decoration-1 underline-offset-4">Crested Gecko Care 101</h3>
                <p class="text-xs text-gray-500">Essential tips for keeping healthy geckos.</p>
            </div>
        </div>
    </div>
</section>
`;

const processContent = `
<section id="content-process" class="hidden animate-fade-in space-y-16 pb-20 pt-10 px-6 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-16">
        <span class="text-jungle-600 font-bold text-xs tracking-[0.3em] uppercase mb-4 block">Our Standard</span>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-hand">THE PROCESS</h2>
        <p class="text-gray-500 mt-6 max-w-xl mx-auto">정글웨이브의 비바리움은 단순한 제품이 아닙니다.<br>생물의 생태 습성과 당신의 미적 취향을 완벽하게 조율하는 엔지니어링 프로젝트입니다.</p>
    </div>

    <!-- Steps -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
        <!-- Center Line (Desktop) -->
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-zinc-800 -translate-x-1/2"></div>

        <!-- Step 1 -->
        <div class="md:text-right pr-0 md:pr-12">
            <h3 class="text-6xl font-black text-gray-100 dark:text-zinc-800 mb-2">01</h3>
            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">CONSULTATION</h4>
            <p class="text-sm text-gray-500">사육할 생물의 종, 공간의 크기, 예산을 분석합니다.<br>전문 매니저가 1:1로 배정되어 상담을 진행합니다.</p>
        </div>
        <div class="pl-0 md:pl-12 flex items-center">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80" class="w-full h-40 object-cover grayscale hover:grayscale-0 transition-all duration-500">
        </div>

        <!-- Step 2 -->
        <div class="md:text-right pr-0 md:pr-12 flex items-center justify-end">
             <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80" class="w-full h-40 object-cover grayscale hover:grayscale-0 transition-all duration-500">
        </div>
        <div class="pl-0 md:pl-12">
            <h3 class="text-6xl font-black text-gray-100 dark:text-zinc-800 mb-2">02</h3>
            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">DESIGN & LAYOUT</h4>
            <p class="text-sm text-gray-500">하드스케이프(Hardscape) 설계를 통해 구조를 잡습니다.<br>유목과 돌의 배치를 미리 3D 시뮬레이션하거나 스케치로 제안합니다.</p>
        </div>

        <!-- Step 3 -->
        <div class="md:text-right pr-0 md:pr-12">
            <h3 class="text-6xl font-black text-gray-100 dark:text-zinc-800 mb-2">03</h3>
            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">PLANTING & AGING</h4>
            <p class="text-sm text-gray-500">식물을 식재하고, 뿌리가 활착될 때까지 '에이징(Aging)' 기간을 거칩니다.<br>가장 건강한 상태로 인도하기 위한 필수 과정입니다.</p>
        </div>
        <div class="pl-0 md:pl-12 flex items-center">
             <img src="https://images.unsplash.com/photo-1596711914656-749e79af4749?auto=format&fit=crop&q=80" class="w-full h-40 object-cover grayscale hover:grayscale-0 transition-all duration-500">
        </div>
        
        <!-- Step 4 -->
        <div class="md:text-right pr-0 md:pr-12 flex items-center justify-end">
             <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80" class="w-full h-40 object-cover grayscale hover:grayscale-0 transition-all duration-500">
        </div>
        <div class="pl-0 md:pl-12">
            <h3 class="text-6xl font-black text-gray-100 dark:text-zinc-800 mb-2">04</h3>
            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">DELIVERY & CARE</h4>
            <p class="text-sm text-gray-500">특수 운송 차량으로 안전하게 배송합니다.<br>이후 '케어 매니저' 앱을 통해 지속적인 관리를 지원합니다.</p>
        </div>
    </div>

    <!-- CTA -->
    <div class="text-center pt-10">
        <a href="https://talk.naver.com/" target="_blank" class="inline-block bg-black dark:bg-white text-white dark:text-black font-bold text-sm px-10 py-5 uppercase tracking-widest hover:bg-jungle-600 dark:hover:bg-gray-200 transition-colors">
            Start Your Custom Order
        </a>
    </div>
</section>
`;

try {
    let content = fs.readFileSync('index.html', 'utf8');

    // 2. REFACTOR HEADER (The Hierarchy)
    // Add IDs to new tabs.
    // Group "Encyclopedia, Calculator, Diary" into "LAB" logic?
    // No, for simple Tab Logic, we will keep them as IDs but visually group them or add new IDs.
    // I will rewrite the Header to include HOME and PROCESS.

    // Replacement Regex for the <nav> block inside <header>
    const desktopNavRegex = /<nav class="hidden md:flex space-x-10">[\s\S]*?<\/nav>/;

    // New Navigation Structure (Flat for now to work with existing switchTab, but reordered)
    // Visually: HOME | PROCESS  |  [LAB TOOLS]  | COMMUNITY | STORE | SYSTEM
    const newNav = `
            <nav class="hidden md:flex space-x-8">
                <button onclick="switchTab('home')" id="tab-home" class="nav-link font-bold text-black dark:text-white">HOME</button>
                <button onclick="switchTab('process')" id="tab-process" class="nav-link">PROCESS</button>
                
                <!-- Spacer -->
                <div class="w-px h-4 bg-gray-200 dark:bg-zinc-800 my-auto"></div>
                
                <button onclick="switchTab('encyclopedia')" id="tab-encyclopedia" class="nav-link">ARCHIVE</button>
                <button onclick="switchTab('calculator')" id="tab-calculator" class="nav-link">SOLUTION</button>
                <button onclick="switchTab('diary')" id="tab-diary" class="nav-link">MANAGER</button>
                
                <!-- Spacer -->
                <div class="w-px h-4 bg-gray-200 dark:bg-zinc-800 my-auto"></div>

                <button onclick="switchTab('community')" id="tab-community" class="nav-link">COMMUNITY</button>
                <button onclick="switchTab('shop')" id="tab-shop" class="nav-link">STORE</button>
                <button onclick="switchTab('admin')" id="tab-admin" class="nav-link">SYSTEM</button>
            </nav>`;

    content = content.replace(desktopNavRegex, newNav);

    // 3. INJECT HTML SECTIONS
    // Inject Home and Process content after <main class="..."> ...
    // Finding <main> tag.
    // Main starts: <main class="max-w-4xl mx-auto px-4 py-6 space-y-6"> (Line 220 approx)
    // I will replace `<main class="max-w-4xl mx-auto px-4 py-6 space-y-6">` 
    // to `<main class="w-full pb-20"> <!-- Full Width for Home -->`
    // And inject sections immediately after.
    // NOTE: Current sections (encyclopedia etc) are inside main.

    // Fix container width constraint for Home page.
    content = content.replace('max-w-4xl mx-auto px-4 py-6 space-y-6', 'w-full pb-10');
    // Note: The inner sections (Encyclopedia etc) might need "max-w-4xl mx-auto" applied to THEM if main loses it.
    // Previously main handled centering.
    // Now MAIN is Full Width.
    // I must wrap existing sections in a container?
    // OR, I define `content-home` as full width, and `content-encyclopedia` etc as max-w-4xl.
    // Existing sections don't have max-w classes.
    // I will Use Regex to add `max-w-4xl mx-auto px-4` to existing sections?
    // `<section id="content-encyclopedia"` -> `<section id="content-encyclopedia" class="max-w-4xl mx-auto px-4 ..."`

    const sections = ['encyclopedia', 'calculator', 'diary', 'community', 'shop', 'rank', 'admin'];
    sections.forEach(sec => {
        // Find section start and append container classes
        const regex = new RegExp(`<section id="content-${sec}" class="(.*?)"`, 'g');
        content = content.replace(regex, `<section id="content-${sec}" class="$1 max-w-4xl mx-auto px-6 py-8"`);
    });

    // NOW inject Home and Process at the top of Main.
    const mainTag = '<main class="w-full pb-10">';
    const injection = mainTag + '\n' + homeContent + '\n' + processContent + '\n';

    // Replace the main tag (which we already renamed above) with itself + injection?
    // No, I replaced the CLASS of main tag.
    // Now I find the TAG itself.
    // Wait, I replaced class string.
    // So `<main class="w-full pb-10">` exists.
    content = content.replace('<main class="w-full pb-10">', injection);

    // 4. UPDATE JS (Tabs)
    // I need to add 'home' and 'process' to the `tabs` array.
    // `const tabs = ['encyclopedia', ...];`
    content = content.replace("['encyclopedia', 'calculator', 'diary', 'community', 'shop', 'rank', 'admin']",
        "['home', 'process', 'encyclopedia', 'calculator', 'diary', 'community', 'shop', 'rank', 'admin']");

    // 5. SET DEFAULT TAB TO HOME
    // `let currentTab = 'encyclopedia';` -> `let currentTab = 'home';`
    content = content.replace("let currentTab = 'encyclopedia';", "let currentTab = 'home';");

    fs.writeFileSync('index.html', content, 'utf8');
    console.log('Enterprise Architecture Applied.');

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
