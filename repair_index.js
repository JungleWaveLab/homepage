const fs = require('fs');

try {
    let content = fs.readFileSync('index.html', 'utf8');

    // 1. Locate the beginning of corruption.
    // The file seems to have </body> followed by invalid </html><script>...
    // We will look for </body> and truncate everything after it, then append the Clean Logic.

    const bodyEndIndex = content.lastIndexOf('</body>');
    if (bodyEndIndex === -1) {
        throw new Error('Could not find </body> tag');
    }

    // Truncate
    content = content.substring(0, bodyEndIndex);

    // 2. Define the Clean Logic Scripts
    const cleanLogic = `
<script>
    console.log("System Logic Patched & Reloaded");

    // --- 1. CARE MANAGER LOGIC (Calendar & Feeding) ---
    // Ensure viewDate is accessible. If strictly scoped, we redeclare or use global if available.
    // In legacy scripts, viewDate might be global. If not, we define a fallback or getter.
    // Assuming viewDate is available or we can access it.
    // If viewDate is not defined in this scope, let's look for it.
    // If it fails, Calendar won't render. 
    // We'll add a safety check.

    window.renderCalendar = function() {
        if (typeof viewDate === 'undefined') {
            console.error("viewDate is undefined. Defining global viewDate.");
            window.viewDate = new Date();
        }

        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const label = document.getElementById("currentMonthLabel");
        // FIX: Proper String Interpolation
        if(label) label.innerText = \`\${year}. \${String(month + 1).padStart(2, "0")}\`;

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const grid = document.getElementById("calendarGrid");
        if(!grid) return;
        grid.innerHTML = "";

        for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement("div"));

        for (let d = 1; d <= lastDate; d++) {
            const dateStr = \`\${year}-\${String(month + 1).padStart(2, "0")}-\${String(d).padStart(2, "0")}\`;
            
            const feedData = localStorage.getItem("feed_" + dateStr);
            const weightData = localStorage.getItem("feed_weight_" + dateStr);
            const memoData = localStorage.getItem("feed_memo_" + dateStr);
            
            const hasData = (feedData && JSON.parse(feedData).length > 0) || (weightData) || (memoData);

            const cell = document.createElement("div");
            cell.className = \`aspect-square bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all \${hasData ? "ring-2 ring-jungle-500 dark:ring-white border-transparent" : ""}\`;
            cell.onclick = () => window.openFeedModal(dateStr);

            const dayNum = document.createElement("span");
            dayNum.className = \`text-sm font-bold \${hasData ? "text-jungle-600 dark:text-white" : "text-gray-400 dark:text-gray-500"}\`;
            dayNum.innerText = d;
            cell.appendChild(dayNum);
            
            if (weightData || memoData) {
                 const dot = document.createElement("div");
                 dot.className = "w-1 h-1 bg-red-500 rounded-full mt-1";
                 cell.appendChild(dot);
            }

            grid.appendChild(cell);
        }
    };

    window.openFeedModal = function(dateStr) {
        selectedDateStr = dateStr;
        document.getElementById("modalDateTitle").innerText = dateStr;
        
        const saved = JSON.parse(localStorage.getItem("feed_" + dateStr) || "[]");
        document.querySelectorAll("#feedModal input[type='checkbox']").forEach(cb => {
            cb.checked = saved.includes(cb.value);
        });

        const weight = localStorage.getItem("feed_weight_" + dateStr) || "";
        const memo = localStorage.getItem("feed_memo_" + dateStr) || "";
        
        const weightEl = document.getElementById("feedWeight");
        const memoEl = document.getElementById("feedMemo");
        if(weightEl) weightEl.value = weight;
        if(memoEl) memoEl.value = memo;

        const modal = document.getElementById("feedModal");
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    };

    window.updateFeedData = function() {
        const checkboxes = document.querySelectorAll("#feedModal input[type='checkbox']");
        const selected = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
        if (selected.length > 0) {
            localStorage.setItem("feed_" + selectedDateStr, JSON.stringify(selected));
        } else {
            localStorage.removeItem("feed_" + selectedDateStr);
        }

        const weightEl = document.getElementById("feedWeight");
        if(weightEl && weightEl.value) localStorage.setItem("feed_weight_" + selectedDateStr, weightEl.value);
        else localStorage.removeItem("feed_weight_" + selectedDateStr);

        const memoEl = document.getElementById("feedMemo");
        if(memoEl && memoEl.value) localStorage.setItem("feed_memo_" + selectedDateStr, memoEl.value);
        else localStorage.removeItem("feed_memo_" + selectedDateStr);

        if(window.renderCalendar) window.renderCalendar();
    };


    // --- 2. ARCHIVE RENDER LOGIC ---
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

    // --- INITIALIZATION ---
    // Re-run initialization logic that might have been skipped or broken.
    if(typeof speciesData !== 'undefined') renderSpecies(speciesData);
    if(typeof renderCalendar === 'function') renderCalendar();

</script>
</body>
</html>
`;

    fs.writeFileSync('index.html', content + cleanLogic, 'utf8');
    console.log('Index.html repaired successfully.');

} catch (err) {
    console.error('Reform failed:', err);
    process.exit(1);
}
