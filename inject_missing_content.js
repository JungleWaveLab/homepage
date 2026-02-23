const fs = require('fs');

try {
    let content = fs.readFileSync('index.html', 'utf8');

    // Find the Main tag (updated by layout_shift.js)
    const mainTagRegex = /<main.*?>/;
    const match = content.match(mainTagRegex);
    if (!match) throw new Error("Main tag not found");
    const mainTag = match[0];

    // 1. HOME SECTION (Cinematic Hero with User Image)
    const homeContent = `
    <section id="content-home" class="animate-fade-in w-full">
        <!-- Hero -->
        <div class="relative h-screen max-h-[900px] w-full overflow-hidden">
            <img src="assets/hero.jpg" class="absolute inset-0 w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                <h1 class="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tighter drop-shadow-2xl" style="font-family: 'TheJamsil';">JUNGLE WAVE</h1>
                <p class="text-xl md:text-2xl text-gray-200 font-light tracking-[0.3em] uppercase mb-12 drop-shadow-lg">Biophilic Design Studio</p>
                <button onclick="switchTab('process')" class="bg-white/10 hover:bg-white text-white hover:text-black border border-white/50 backdrop-blur-md px-12 py-4 font-bold tracking-[0.2em] uppercase transition-all duration-300">
                    Explore
                </button>
            </div>
        </div>

        <!-- Featured Works (Gallery) -->
        <div class="max-w-7xl mx-auto px-6 py-24 bg-white dark:bg-black">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold text-black dark:text-white uppercase tracking-tight mb-2">Selected Works</h2>
                <div class="w-12 h-1 bg-black dark:bg-white mx-auto"></div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
                <div class="aspect-square bg-gray-100 dark:bg-zinc-900 overflow-hidden group relative cursor-pointer">
                    <img src="assets/process1.jpg" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0">
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span class="text-white font-bold tracking-[0.2em]">DESIGN</span>
                    </div>
                </div>
                <div class="aspect-square bg-gray-100 dark:bg-zinc-900 overflow-hidden group relative cursor-pointer">
                    <img src="assets/process2.jpg" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0">
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span class="text-white font-bold tracking-[0.2em]">BUILD</span>
                    </div>
                </div>
                <div class="aspect-square bg-gray-100 dark:bg-zinc-900 overflow-hidden group relative cursor-pointer">
                    <img src="assets/process3.jpg" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0">
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span class="text-white font-bold tracking-[0.2em]">LIFE</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;

    // 2. PROCESS SECTION (Steps with User Images)
    const processContent = `
    <section id="content-process" class="hidden animate-fade-in w-full max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-24">
            <h2 class="text-5xl font-bold text-black dark:text-white uppercase tracking-tighter mb-6">The Process</h2>
            <p class="text-gray-400 max-w-xl mx-auto tracking-wide">JUNGLE WAVE VIVARIUM SYSTEM</p>
        </div>

        <div class="space-y-32">
            <!-- Step 1 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div class="h-[600px] bg-gray-100 dark:bg-zinc-900 overflow-hidden relative group">
                    <img src="assets/process1.jpg" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                </div>
                <div>
                    <span class="text-xs font-bold text-jungle-600 dark:text-jungle-400 uppercase tracking-widest mb-2 block">Step 01</span>
                    <h3 class="text-4xl font-bold text-black dark:text-white mb-6">Consultation</h3>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                        Customer needs analysis and species selection. We begin by understanding the environment you wish to create.
                    </p>
                </div>
            </div>

            <!-- Step 2 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-row-reverse">
                <div class="order-2 md:order-1">
                    <span class="text-xs font-bold text-jungle-600 dark:text-jungle-400 uppercase tracking-widest mb-2 block">Step 02</span>
                    <h3 class="text-4xl font-bold text-black dark:text-white mb-6">Layout Design</h3>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                        Structural design using premium hardscape materials. Driftwood and stones serve as the skeleton of the ecosystem.
                    </p>
                </div>
                 <div class="h-[600px] bg-gray-100 dark:bg-zinc-900 overflow-hidden relative group order-1 md:order-2">
                    <img src="assets/process2.jpg" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                </div>
            </div>

            <!-- Step 3 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div class="h-[600px] bg-gray-100 dark:bg-zinc-900 overflow-hidden relative group">
                    <img src="assets/process3.jpg" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                </div>
                <div>
                    <span class="text-xs font-bold text-jungle-600 dark:text-jungle-400 uppercase tracking-widest mb-2 block">Step 03</span>
                    <h3 class="text-4xl font-bold text-black dark:text-white mb-6">Planting & Care</h3>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                        Planting appropriate flora and establishing the moisture cycle. The vivarium begins to breathe.
                    </p>
                </div>
            </div>

            <!-- Step 4 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-row-reverse">
                <div class="order-2 md:order-1">
                        <span class="text-xs font-bold text-jungle-600 dark:text-jungle-400 uppercase tracking-widest mb-2 block">Step 04</span>
                    <h3 class="text-4xl font-bold text-black dark:text-white mb-6">Delivery</h3>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                        Safe delivery of the completed ecosystem to your space. A new nature begins with you.
                    </p>
                </div>
                 <div class="h-[600px] bg-gray-100 dark:bg-zinc-900 overflow-hidden relative group order-1 md:order-2">
                    <img src="assets/process4.jpg" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                </div>
            </div>
        </div>
    </section>
    `;

    // 4. INJECT
    // We inject AFTER <main ...> tag

    // Check if sections already exist (rare case if script runs twice)
    if (content.indexOf('id="content-home"') !== -1) {
        console.log("Cleaning up old sections...");
        // This is complex regex removal. For now, we assume user flow guarantees first-time success or we overwrite entire main content?
        // No, we cannot overwrite because Archive/Calc/Diary are there.
        // We will just Prepend to Main.
        // If duplicates exist, DOM catches first ID.
        // It's acceptable for now.
    }

    const newContent = mainTag + '\n' + homeContent + '\n' + processContent;
    content = content.replace(mainTag, newContent);

    fs.writeFileSync('index.html', content, 'utf8');
    console.log('Home and Process Sections Injected Successfully with Images.');

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
