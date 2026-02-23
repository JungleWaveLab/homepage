$content = @"

<script>
    console.log("Care Manager Logic v2 Loaded");

    // Override openFeedModal to load Weight & Memo
    const originalOpen = window.openFeedModal;
    window.openFeedModal = function(dateStr) {
        selectedDateStr = dateStr;
        document.getElementById("modalDateTitle").innerText = dateStr;
        
        // Load Checkboxes
        const saved = JSON.parse(localStorage.getItem("feed_" + dateStr) || "[]");
        document.querySelectorAll("#feedModal input[type='checkbox']").forEach(cb => {
            cb.checked = saved.includes(cb.value);
        });

        // Load Weight & Memo
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

    // Override updateFeedData to save Weight & Memo
    window.updateFeedData = function() {
        // Save Checkboxes
        const checkboxes = document.querySelectorAll("#feedModal input[type='checkbox']");
        const selected = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
        if (selected.length > 0) {
            localStorage.setItem("feed_" + selectedDateStr, JSON.stringify(selected));
        } else {
            localStorage.removeItem("feed_" + selectedDateStr);
        }

        // Save Weight
        const weightEl = document.getElementById("feedWeight");
        if(weightEl && weightEl.value) localStorage.setItem("feed_weight_" + selectedDateStr, weightEl.value);
        else localStorage.removeItem("feed_weight_" + selectedDateStr);

        // Save Memo
        const memoEl = document.getElementById("feedMemo");
        if(memoEl && memoEl.value) localStorage.setItem("feed_memo_" + selectedDateStr, memoEl.value);
        else localStorage.removeItem("feed_memo_" + selectedDateStr);

        // Refresh Calendar
        if(typeof renderCalendar === 'function') renderCalendar();
    };

    // Override renderCalendar to show dots
    window.renderCalendar = function() {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const label = document.getElementById("currentMonthLabel");
        if(label) label.innerText = `${year}. ${String(month + 1).padStart(2, "0")}`;

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const grid = document.getElementById("calendarGrid");
        if(!grid) return;
        grid.innerHTML = "";

        for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement("div"));

        for (let d = 1; d <= lastDate; d++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
            
            const feedData = localStorage.getItem("feed_" + dateStr);
            const weightData = localStorage.getItem("feed_weight_" + dateStr);
            const memoData = localStorage.getItem("feed_memo_" + dateStr);
            
            const hasData = (feedData && JSON.parse(feedData).length > 0) || (weightData) || (memoData);

            const cell = document.createElement("div");
            cell.className = `aspect-square bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all ${hasData ? "ring-2 ring-jungle-500 dark:ring-white border-transparent" : ""}`;
            cell.onclick = () => window.openFeedModal(dateStr);

            const dayNum = document.createElement("span");
            dayNum.className = `text-sm font-bold ${hasData ? "text-jungle-600 dark:text-white" : "text-gray-400 dark:text-gray-500"}`;
            dayNum.innerText = d;
            cell.appendChild(dayNum);
            
            // Red Dot for Detail
            if (weightData || memoData) {
                 const dot = document.createElement("div");
                 dot.className = "w-1 h-1 bg-red-500 rounded-full mt-1";
                 cell.appendChild(dot);
            }

            grid.appendChild(cell);
        }
    };
</script>
"@

Add-Content -Path "index.html" -Value $content -Encoding UTF8
