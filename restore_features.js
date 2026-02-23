const fs = require('fs');

try {
    let content = fs.readFileSync('index.html', 'utf8');

    // 1. Remove previous footer script if exists (to avoid duplicate overrides)
    // We already truncated in repair_index.js, so likely clean.
    // We will simple append the new robust logic before </body>.

    const restoreLogic = `
<script>
    console.log("Restoring Checkbox Features...");

    // Redefine openFeedModal to auto-generate checkboxes
    window.openFeedModal = function(dateStr) {
        if(!window.viewDate) window.viewDate = new Date();
        
        selectedDateStr = dateStr;
        document.getElementById("modalDateTitle").innerText = dateStr;
        
        // 1. Check if Container needs population
        const container = document.getElementById('checkboxContainer');
        if (container) {
            container.innerHTML = ''; // Force Clean Re-render
            const feedTypes = [
                {val: "귀뚜라미", label: "CRICKETS (귀뚜라미)"},
                {val: "밀웜", label: "MEALWORMS (밀웜)"},
                {val: "슈퍼푸드", label: "PANGEA (슈퍼푸드)"},
                {val: "냉동", label: "FROZEN (냉동먹이)"},
                {val: "영양제", label: "CALCIUM (영양제)"}
            ];
            
            feedTypes.forEach(ft => {
                const label = document.createElement('label');
                label.className = "flex items-center space-x-3 p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 cursor-pointer hover:border-black dark:hover:border-white transition-colors group";
                label.innerHTML = \`
                    <input type="checkbox" class="w-4 h-4 text-black rounded focus:ring-black border-gray-300 dark:border-zinc-700" value="\${ft.val}" onchange="updateFeedData()">
                    <span class="text-[10px] uppercase font-bold tracking-widest text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">\${ft.label}</span>
                \`;
                container.appendChild(label);
            });
        }
        
        // 2. Load Saved Data
        // Use 'includes' to match substring for backward compatibility
        const saved = JSON.parse(localStorage.getItem("feed_" + dateStr) || "[]");
        document.querySelectorAll("#feedModal input[type='checkbox']").forEach(cb => {
            // Check if saved array has any item that contains current value (loose match)
            const isChecked = saved.some(s => s.includes(cb.value));
            cb.checked = isChecked;
        });

        // 3. Load Details
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
</script>
`;

    if (content.includes('</body>')) {
        content = content.replace('</body>', restoreLogic + '\n</body>');
    } else {
        content += restoreLogic;
    }

    fs.writeFileSync('index.html', content, 'utf8');
    console.log('Features restored.');

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
