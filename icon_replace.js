const fs = require('fs');

// Minimalist SVG Icons (Heroicons Outline Style)
const icons = {
    archive: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="square" stroke-linejoin="miter" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>`, // Cube
    solution: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="square" stroke-linejoin="miter" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" /></svg>`, // Sliders
    manager: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="square" stroke-linejoin="miter" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>`, // Calendar
    community: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="square" stroke-linejoin="miter" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.286 3.423.379.35.028.71.042 1.065.057.568.026 1.144.051 1.718.069.97.03 1.94.048 2.916.046 1.037-.002 2.073-.028 3.102-.075.45-.02.9-.046 1.348-.078.68-.048 1.363-.12 2.035-.224 1.583-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>`, // Bubble
    store: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="square" stroke-linejoin="miter" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>`, // Bag
    rank: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="square" stroke-linejoin="miter" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 15.375a7.454 7.454 0 01.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m1.172-2.836a9.009 9.009 0 00-3.92 4.186m0 0a9.009 9.009 0 003.92 4.186m5.278-8.372a9.009 9.009 0 013.92 4.186m0 0a9.009 9.009 0 01-3.92 4.186m-5.462-8.372a6.726 6.726 0 012.748-1.35m0 0a6.003 6.003 0 015.396-5.012M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228" /></svg>`, // Trophy
    admin: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="square" stroke-linejoin="miter" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path stroke-linecap="square" stroke-linejoin="miter" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`, // Cog
    write: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="square" stroke-linejoin="miter" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>`, // Pencil
    nudge: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-4 h-4 text-yellow-600"><path stroke-linecap="square" stroke-linejoin="miter" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>`, // Bulb
    user: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.0" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="square" stroke-linejoin="miter" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>`
};

try {
    let content = fs.readFileSync('index.html', 'utf8');

    // Replacements
    // 1. Archive
    content = content.replace('🧬 사육 데이터 랩', `<div class="flex items-center gap-2">${icons.archive} DATA ARCHIVE</div>`);
    // 2. Calculator
    content = content.replace('📐', icons.solution);
    content = content.replace('최적 바닥재 용량 산출', 'SUBSTRATE SOLUTION');
    // 3. Diary
    content = content.replace('📅', icons.manager);
    content = content.replace('케어 매니저', 'CARE MANAGER'); // Careful not to break Tab name? No, section headers.
    // Replace section H2 for Diary specifically
    // It was: <h2 ...><span ...>📅</span> <span id="currentMonthLabel"></span></h2>
    // We want: <h2 ...><span ...>${icons.manager}</span> <span id="currentMonthLabel"></span> <span class="text-xs ml-2 tracking-widest text-gray-400">LOG</span></h2>
    content = content.replace(/<span class="mr-2">📅<\/span>/, `<span class="mr-2 text-jungle-600 dark:text-white">${icons.manager}</span>`);

    // 4. Community
    content = content.replace('🗣️ 커뮤니티', `<div class="flex items-center gap-2">${icons.community} COMMUNITY</div>`);
    // Write Button
    content = content.replace('<span>✏️</span> 글쓰기', `${icons.write} WRITE`);

    // 5. Shop
    // Header for Shop was: "Jungle Wave Premium Shop" (Line 405)
    // There was no emoji in the header <h2 class="text-2xl font-bold mb-2 relative z-10">...
    // But there might be "🌿 수제 배합토" (Line 415)
    content = content.replace('🌿 수제', `<span class="inline-block mr-1 text-jungle-600">${icons.solution}</span> PREMIUM SOIL`);
    content = content.replace('🦎 프리미엄 비바리움', `<span class="inline-block mr-1 text-jungle-600">${icons.archive}</span> PREMIUM VIVARIUM`);

    // 6. Rank
    content = content.replace('🏆 정글 랭킹 (Leaderboard)', `<div class="flex items-center gap-2">${icons.rank} LEADERBOARD</div>`);

    // 7. Admin
    content = content.replace('⚙️ 관리자 대시보드', `<div class="flex items-center gap-2">${icons.admin} SYSTEM ADMIN</div>`);

    // Misc Emojis
    content = content.replace('💡', icons.nudge);
    content = content.replace('🦗', ''); // Remove cricket emoji (too cartoonish)
    content = content.replace('🐛', '');
    content = content.replace('🥣', '');
    content = content.replace('🐭', '');
    content = content.replace('💊', '');
    content = content.replace('❓', '');
    content = content.replace('자랑', 'SHOWCASE');

    // Clean up scattered emojis
    content = content.replace(/🗣️/g, ''); // Remove leftover speaking heads

    fs.writeFileSync('index.html', content, 'utf8');
    console.log('Icon overhaul applied successfully.');
} catch (err) {
    console.error('Error applying icons:', err);
    process.exit(1);
}
