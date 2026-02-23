const fs = require('fs');
const dir = 'assets/js';

// --- DATA MODULE ---
const dataCode = `
// assets/js/data.js
window.speciesData = [
    { "name": "크레스티드 게코", "temp_day": "24-26°C", "temp_night": "20-22°C", "humidity": "60-80%", "food": "슈퍼푸드, 귀뚜라미", "tip": "야행성이므로 강한 조명은 피하고, 저녁 시간에 분무하여 습도를 높여주세요." },
    { "name": "레오파드 게코", "temp_day": "28-32°C", "temp_night": "22-24°C", "humidity": "40-50%", "food": "귀뚜라미, 밀웜", "tip": "복부 가열이 중요하므로 전기 장판이나 히팅 매트를 활용한 핫존 구성이 필수입니다." },
    { "name": "비어디 드래곤", "temp_day": "38-42°C", "temp_night": "21-24°C", "humidity": "30-40%", "food": "귀뚜라미, 채소", "tip": "강한 UVB 조명이 필수이며, 성체로 자랄수록 채식 비중을 높여야 건강합니다." },
    { "name": "볼 파이톤", "temp_day": "30-32°C", "temp_night": "24-26°C", "humidity": "55-65%", "food": "냉동 쥐 (래트)", "tip": "겁이 많아 은신처를 여러 개 제공해야 하며, 거식증 예방을 위해 적정 습도 유지가 핵심입니다." },
    { "name": "콘 스네이크", "temp_day": "25-28°C", "temp_night": "21-23°C", "humidity": "40-50%", "food": "냉동 쥐", "tip": "탈출 능력이 뛰어나므로 사육장 잠금 장치를 반드시 확인해야 합니다." },
    { "name": "블루텅 스킨크", "temp_day": "29-32°C", "temp_night": "21-23°C", "humidity": "40-60%", "food": "잡식 (사료, 채소, 곤충)", "tip": "청경채나 치커리 같은 채소와 단백질을 균형 있게 급여하는 것이 중요합니다." },
    { "name": "베일드 카멜레온", "temp_day": "26-30°C", "temp_night": "18-22°C", "humidity": "50-70%", "food": "귀뚜라미, 바퀴벌레", "tip": "고인 물은 마시지 않으므로 드리퍼나 미스팅 시스템을 통해 흐르는 물을 제공해야 합니다." },
    { "name": "가고일 게코", "temp_day": "24-27°C", "temp_night": "20-22°C", "humidity": "60-80%", "food": "슈퍼푸드, 곤충", "tip": "크레스티드 게코와 유사하나 좀 더 건조한 환경에도 강하며, 수직 구조물이 필요합니다." },
    { "name": "펫테일 게코", "temp_day": "28-30°C", "temp_night": "22-24°C", "humidity": "60-70%", "food": "귀뚜라미, 밀웜", "tip": "레오파드 게코보다 높은 습도를 선호하므로 습식 은신처 관리에 신경 써야 합니다." },
    { "name": "호스필드 육지거북", "temp_day": "28-32°C", "temp_night": "20-22°C", "humidity": "30-50%", "food": "건초, 채소", "tip": "땅을 파는 본능이 강하므로 바닥재를 깊게 깔아주는 것이 스트레스 완화에 좋습니다." },
    { "name": "그린 트리 파이톤", "temp_day": "28-30°C", "temp_night": "24-26°C", "humidity": "70-85%", "food": "냉동 쥐", "tip": "완전한 나무 위성 뱀으로, 수평 형태의 횃대와 높은 습도 유지가 필수적입니다." },
    { "name": "아르헨티나 테구", "temp_day": "30-35°C", "temp_night": "21-24°C", "humidity": "60-80%", "food": "잡식 (고기, 과일, 곤충)", "tip": "지능이 매우 높고 크게 자라므로 대형 사육장과 꾸준한 핸들링이 필요합니다." },
    { "name": "워터 드래곤", "temp_day": "28-31°C", "temp_night": "22-24°C", "humidity": "80%+", "food": "곤충, 작은 물고기", "tip": "반수생 특성을 가지므로 몸이 완전히 잠길 수 있는 큰 물그릇이 필요합니다." },
    { "name": "사바나 모니터", "temp_day": "32-35°C", "temp_night": "22-24°C", "humidity": "40-50%", "food": "곤충, 설치류", "tip": "비만이 되기 쉬우므로 식단 관리가 엄격해야 하며, 매우 뜨거운 바스킹 존이 필요합니다." },
    { "name": "목도리 도마뱀", "temp_day": "29-32°C", "temp_night": "22-24°C", "humidity": "50-70%", "food": "곤충", "tip": "활동량이 많고 수직 활동을 선호하므로 높고 넓은 사육 공간이 확보되어야 합니다." },
    { "name": "토케이 게코", "temp_day": "27-30°C", "temp_night": "22-24°C", "humidity": "70-80%", "food": "곤충, 소동물", "tip": "성격이 사나운 편이므로 핸들링 시 주의가 필요하며, 높은 습도의 숲 환경을 재현해야 합니다." },
    { "name": "에메랄드 트리 스킨크", "temp_day": "27-30°C", "temp_night": "22-24°C", "humidity": "70-80%", "food": "곤충", "tip": "매우 빠르고 활발한 종으로, 유목과 식물이 풍성한 비바리움에서 가장 잘 적응합니다." },
    { "name": "웨스턴 호그노즈", "temp_day": "28-32°C", "temp_night": "21-23°C", "humidity": "30-50%", "food": "냉동 쥐", "tip": "코로 땅을 파는 습성이 있으므로 파고들기 좋은 부드러운 바닥재를 권장합니다." },
    { "name": "밀크 스네이크", "temp_day": "26-29°C", "temp_night": "21-23°C", "humidity": "40-60%", "food": "냉동 쥐", "tip": "화려한 색상만큼이나 활동성이 좋으며, 야간에 활동하는 모습을 자주 볼 수 있습니다." },
    { "name": "팩맨 개구리", "temp_day": "24-28°C", "temp_night": "20-22°C", "humidity": "70-80%", "food": "팩맨 푸드, 곤충", "tip": "움직임이 적고 매복하는 습성이 있어 바닥재의 청결도가 건강에 직결됩니다." }
];

window.storeProducts = {
    'standard': {
        title: 'Standard Edition',
        badge: 'Bio-Active Vivariums',
        desc: '크레스티드 게코가 가장 편안함을 느끼는 환경을 구현한 황금 규격',
        basePrice: 350000,
        baseImg: 'assets/layer_base.jpg',
        opt1Price: 50000,
        opt2Price: 50000,
        opt3Price: 50000
    }
};

window.portfolioData = [
    { title: "Project: Deep Forest", desc: "양서류를 위한 깊은 숲속 테마 비바리움 아트워크", img: "assets/work1.jpg", tags: ["팔루다리움", "커스텀"] },
    { title: "Project: Red Canyon", desc: "건계성 파충류를 위한 사막 협곡 테마", img: "assets/work2.jpg", tags: ["비바리움", "건조형"] },
    { title: "Project: Moss Garden", desc: "정밀하게 표현된 이끼와 소형 양서류의 조화", img: "assets/work3.jpg", tags: ["모스", "소형"] }
];
`;

// --- UI MODULE ---
const uiCode = `
// assets/js/ui.js
window.currentTab = 'home';
window.viewDate = new Date();
window.selectedDateStr = "";

// Number formatter plugin
window.formatKRW = (num) => new Intl.NumberFormat('ko-KR').format(num);

window.toggleTheme = function () {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        html.classList.remove('light');
        localStorage.setItem('theme', 'dark');
    }
    window.updateThemeIcon();
};

window.updateThemeIcon = function () {
    const isDark = document.documentElement.classList.contains('dark');
    const sun = document.getElementById('icon-sun');
    const moon = document.getElementById('icon-moon');
    if(sun && moon) {
        if (isDark) {
            sun.classList.remove('hidden');
            moon.classList.add('hidden');
        } else {
            sun.classList.add('hidden');
            moon.classList.remove('hidden');
        }
    }
};

window.toggleLabMenu = function () {
    const menu = document.getElementById('lab-menu');
    const arrow = document.getElementById('lab-arrow');
    if(menu && arrow) {
        if (menu.style.maxHeight) {
            menu.style.maxHeight = null;
            arrow.style.transform = "rotate(0deg)";
        } else {
            menu.style.maxHeight = menu.scrollHeight + "px";
            arrow.style.transform = "rotate(180deg)";
        }
    }
};

window.toggleMobileMenu = function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if(sidebar && overlay) {
        if (sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
        } else {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        }
    }
};

window.switchTab = function (tabName) {
    console.log("Sidebar SwitchTab:", tabName);

    // 1. Hide Sections
    const tabs = ['home', 'process', 'encyclopedia', 'calculator', 'diary', 'community', 'shop', 'rank', 'admin', 'product-detail'];
    tabs.forEach(t => {
        const sec = document.getElementById('content-' + t);
        if (sec) sec.classList.add('hidden');

        // Deactivate Nav
        const nav = document.getElementById('nav-' + t);
        if (nav) {
            nav.classList.remove('text-black', 'dark:text-white', 'border-black', 'dark:border-white', 'bg-gray-50', 'dark:bg-zinc-900');
            nav.classList.add('text-gray-500', 'border-transparent');
        }
    });

    // 2. Hide specific product detail logic
    const stickyBar = document.getElementById('floatingOrderBar');
    if (tabName !== 'product-detail' && stickyBar) {
        stickyBar.classList.add('translate-y-full');
        // Reset state
        if(window.toggleOption) {
            document.getElementById('optSoil') && (document.getElementById('optSoil').checked = false);
            document.getElementById('optPlants') && (document.getElementById('optPlants').checked = false);
            document.getElementById('optLight') && (document.getElementById('optLight').checked = false);
            window.toggleOption('layerSoil', 0);
            window.toggleOption('layerPlants', 0);
            window.toggleOption('layerLight', 0);
        }
    }

    // 3. Show Target Section
    const target = document.getElementById('content-' + tabName);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('animate-fade-in');
        window.scrollTo(0, 0);
    }

    // 4. Activate Nav
    const targetNav = document.getElementById('nav-' + tabName);
    if (targetNav) {
        targetNav.classList.remove('text-gray-500', 'border-transparent');
        targetNav.classList.add('text-black', 'dark:text-white', 'border-black', 'dark:border-white', 'bg-gray-50', 'dark:bg-zinc-900');
    }

    // 5. Auto-Expand Lab Menu if child is selected
    const labChildren = ['encyclopedia', 'calculator', 'diary'];
    const labMenu = document.getElementById('lab-menu');
    const labArrow = document.getElementById('lab-arrow');
    if (labChildren.includes(tabName)) {
        if (labMenu && !labMenu.style.maxHeight) {
            labMenu.style.maxHeight = labMenu.scrollHeight + "px";
            if (labArrow) labArrow.style.transform = "rotate(180deg)";
        }
    }

    // 6. Close Mobile Menu on Selection
    const sidebar = document.getElementById('sidebar');
    if (sidebar && !sidebar.classList.contains('-translate-x-full') && window.innerWidth < 768) {
        window.toggleMobileMenu();
    }

    // 7. Specific Functions
    if (tabName === 'diary' && window.renderCalendar) window.renderCalendar();
    if (tabName === 'encyclopedia' && window.renderSpecies && typeof window.speciesData !== 'undefined') window.renderSpecies(window.speciesData);

    window.currentTab = tabName;
};
`;

// --- ENCYCLOPEDIA & DIARY MODULE (No Firebase) ---
const utilCoreCode = `
// assets/js/encyclopedia.js
window.renderSpecies = function (list) {
    const grid = document.getElementById('speciesGrid');
    const noResults = document.getElementById('noResults');
    if (!grid) return;

    grid.innerHTML = '';

    if (!list || list.length === 0) {
        if (noResults) noResults.classList.remove('hidden');
        return;
    }
    if (noResults) noResults.classList.add('hidden');

    list.forEach(sp => {
        const card = document.createElement('div');
        // Minimalist Card Style (Lab Zero)
        card.className = "bg-white dark:bg-black p-5 border border-gray-200 dark:border-zinc-800 cursor-pointer hover:border-black dark:hover:border-white transition-colors group";
        card.onclick = () => window.showSpeciesDetail(sp);
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
        </div>\`;
        grid.appendChild(card);
    });
};

window.filterSpecies = function () {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = window.speciesData.filter(sp => sp.name.toLowerCase().includes(query));
    window.renderSpecies(filtered);
};

window.showSpeciesDetail = function (sp) {
    document.getElementById('detailName').innerText = sp.name;
    document.getElementById('detailTempDay').innerText = sp.temp_day;
    document.getElementById('detailTempNight').innerText = sp.temp_night;
    document.getElementById('detailHumidity').innerText = sp.humidity;
    document.getElementById('detailFood').innerText = sp.food;
    document.getElementById('detailTip').innerText = sp.tip;
    document.getElementById('speciesModal').classList.remove('hidden');
};

// assets/js/diary.js
window.changeMonth = function (delta) {
    window.viewDate.setMonth(window.viewDate.getMonth() + delta);
    window.renderCalendar();
};

window.todayMonth = function () {
    window.viewDate = new Date();
    window.renderCalendar();
};

window.renderCalendar = function () {
    if (!window.viewDate) window.viewDate = new Date();

    const year = window.viewDate.getFullYear();
    const month = window.viewDate.getMonth();
    const label = document.getElementById("currentMonthLabel");
    if (label) label.innerText = \`\${year}. \${String(month + 1).padStart(2, "0")}\`;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const grid = document.getElementById("calendarGrid");
    if (!grid) return;
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

window.openFeedModal = function (dateStr) {
    if (!window.viewDate) window.viewDate = new Date();

    window.selectedDateStr = dateStr;
    const titleEl = document.getElementById("modalDateTitle");
    if(titleEl) titleEl.innerText = dateStr;

    // 1. Check if Container needs population
    const container = document.getElementById('checkboxContainer');
    if (container) {
        container.innerHTML = ''; // Force Clean Re-render
        const feedTypes = [
            { val: "귀뚜라미", label: "CRICKETS (귀뚜라미)" },
            { val: "밀웜", label: "MEALWORMS (밀웜)" },
            { val: "슈퍼푸드", label: "PANGEA (슈퍼푸드)" },
            { val: "냉동", label: "FROZEN (냉동먹이)" },
            { val: "영양제", label: "CALCIUM (영양제)" }
        ];

        feedTypes.forEach(ft => {
            const label = document.createElement('label');
            label.className = "flex items-center space-x-3 p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 cursor-pointer hover:border-black dark:hover:border-white transition-colors group";
            label.innerHTML = \`<input type="checkbox" class="w-4 h-4 text-black rounded focus:ring-black border-gray-300 dark:border-zinc-700" value="\${ft.val}" onchange="updateFeedData()">
            <span class="text-[10px] uppercase font-bold tracking-widest text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">\${ft.label}</span>\`;
            container.appendChild(label);
        });
    }

    // 2. Load Saved Data
    const saved = JSON.parse(localStorage.getItem("feed_" + dateStr) || "[]");
    document.querySelectorAll("#feedModal input[type='checkbox']").forEach(cb => {
        cb.checked = saved.some(s => s.includes(cb.value));
    });

    const weight = localStorage.getItem("feed_weight_" + dateStr) || "";
    const memo = localStorage.getItem("feed_memo_" + dateStr) || "";

    const weightEl = document.getElementById("feedWeight");
    const memoEl = document.getElementById("feedMemo");
    if (weightEl) weightEl.value = weight;
    if (memoEl) memoEl.value = memo;

    const modal = document.getElementById("feedModal");
    if(modal) {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    }
};

window.closeModal = function () {
    const feed = document.getElementById('feedModal');
    if(feed) {
        feed.classList.add('hidden');
        feed.classList.remove('flex');
    }
    const species = document.getElementById('speciesModal');
    if(species) species.classList.add('hidden');
    window.renderCalendar();
};

window.updateFeedData = () => {
    const checkboxes = document.querySelectorAll('#feedModal input[type="checkbox"]');
    const selected = Array.from(checkboxes).filter(cb => cb.checked);
    const nudgeEl = document.getElementById('restock-nudge');

    if (nudgeEl) {
        if (selected.some(cb => cb.value.includes('귀뚜라미') || cb.value.includes('슈퍼푸드'))) {
            nudgeEl.classList.remove('hidden');
        } else {
            nudgeEl.classList.add('hidden');
        }
    }

    const dateStr = window.selectedDateStr;
    const vals = selected.map(cb => cb.value);
    if (vals.length > 0) {
        localStorage.setItem(\`feed_\${dateStr}\`, JSON.stringify(vals));
    } else {
        localStorage.removeItem(\`feed_\${dateStr}\`);
    }
    
    const weightEl = document.getElementById("feedWeight");
    if (weightEl && weightEl.value) localStorage.setItem("feed_weight_" + dateStr, weightEl.value);
    else localStorage.removeItem("feed_weight_" + dateStr);

    const memoEl = document.getElementById("feedMemo");
    if (memoEl && memoEl.value) localStorage.setItem("feed_memo_" + dateStr, memoEl.value);
    else localStorage.removeItem("feed_memo_" + dateStr);

    if (window.renderCalendar) window.renderCalendar();
};
`;

// --- BUILDER & CALCULATOR LOGIC ---
const builderCode = `
// assets/js/builder.js
window.currentBasePrice = 0;
window.currentOpt1Price = 0;
window.currentOpt2Price = 0;
window.currentOpt3Price = 0;

window.openProductDetail = function(titleRef, priceRef, typeId) {
    const data = window.storeProducts[typeId];
    if (!data) return;

    document.getElementById('detailTitle').innerText = data.title;
    document.getElementById('detailBadge').innerText = data.badge;
    document.getElementById('detailDesc').innerText = data.desc;
    document.getElementById('detailBasePrice').innerText = window.formatKRW(data.basePrice) + '원';
    document.getElementById('detailBaseImage').src = data.baseImg;

    window.currentBasePrice = data.basePrice;
    window.currentOpt1Price = data.opt1Price;
    window.currentOpt2Price = data.opt2Price;
    window.currentOpt3Price = data.opt3Price;

    const optSoil = document.getElementById('optSoil');
    const optPlants = document.getElementById('optPlants');
    const optLight = document.getElementById('optLight');
    if (optSoil) optSoil.checked = false;
    if (optPlants) optPlants.checked = false;
    if (optLight) optLight.checked = false;
    
    const layerSoilImg = document.getElementById('layerSoilImg');
    const layerPlantsImg = document.getElementById('layerPlantsImg');
    const layerLightImg = document.getElementById('layerLightImg');
    if (layerSoilImg) layerSoilImg.style.opacity = '0';
    if (layerPlantsImg) layerPlantsImg.style.opacity = '0';
    if (layerLightImg) layerLightImg.style.opacity = '0';

    window.calculateDetailTotal();
    window.switchTab('product-detail');
};

window.toggleOption = function (layerId, fallbackPriceAmount) {
    const elImg = document.getElementById(layerId + 'Img');

    let isChecked = false;
    if (layerId === 'layerSoil') {
        isChecked = !!(document.getElementById('optSoil') && document.getElementById('optSoil').checked);
    } else if (layerId === 'layerPlants') {
        isChecked = !!(document.getElementById('optPlants') && document.getElementById('optPlants').checked);
    } else if (layerId === 'layerLight') {
        isChecked = !!(document.getElementById('optLight') && document.getElementById('optLight').checked);
    }

    if (isChecked) {
        if (elImg) elImg.style.opacity = '1';
    } else {
        if (elImg) elImg.style.opacity = '0';
    }

    window.calculateDetailTotal();
};

window.calculateDetailTotal = function () {
    let total = window.currentBasePrice;
    if (document.getElementById('optSoil') && document.getElementById('optSoil').checked) total += window.currentOpt1Price;
    if (document.getElementById('optPlants') && document.getElementById('optPlants').checked) total += window.currentOpt2Price;
    if (document.getElementById('optLight') && document.getElementById('optLight').checked) total += window.currentOpt3Price;

    const dtp = document.getElementById('detailTotalPrice');
    const stp = document.getElementById('stickyTotalPrice');
    if(dtp) dtp.innerText = window.formatKRW(total);
    if(stp) stp.innerText = window.formatKRW(total);
};

window.openOrderModal = function () {
    const modal = document.getElementById('orderModal');
    if (!modal) return;
    
    const selectedOptions = [];
    if (document.getElementById('optSoil') && document.getElementById('optSoil').checked) selectedOptions.push('배수층 제작 & 수제배합토');
    if (document.getElementById('optPlants') && document.getElementById('optPlants').checked) selectedOptions.push('이끼, 식물 식재');
    if (document.getElementById('optLight') && document.getElementById('optLight').checked) selectedOptions.push('정글웨이브 전용 슬림 LED 조명');

    document.getElementById('modalOrderPrice').innerText = document.getElementById('detailTotalPrice').innerText + '원';
    document.getElementById('modalOrderOptions').innerHTML = selectedOptions.length ? selectedOptions.map(opt => \`<li>- \${opt}</li>\`).join('') : '<li>- 선택된 옵션이 없습니다 (기본 조형)</li>';

    modal.classList.remove('hidden');
};

window.closeOrderModal = function () {
    const modal = document.getElementById('orderModal');
    if (modal) modal.classList.add('hidden');
};

window.submitOrderForm = function (e) {
    e.preventDefault();
    alert('상담 신청이 접수되었습니다. 담당자가 확인 후 남겨주신 연락처로 상담 안내해 드리겠습니다!');
    window.closeOrderModal();
};

window.setPreset = function(w, d, h) {
    document.getElementById('calcW').value = w;
    document.getElementById('calcD').value = d;
    document.getElementById('calcH').value = h;
    const inputs = [document.getElementById('calcW'), document.getElementById('calcD'), document.getElementById('calcH')];
    inputs.forEach(input => {
        if(!input) return;
        input.classList.add('bg-jungle-100', 'dark:bg-jungle-900');
        setTimeout(() => input.classList.remove('bg-jungle-100', 'dark:bg-jungle-900'), 300);
    });
};

window.calculateSoil = function () {
    const w = parseFloat(document.getElementById('calcW').value) || 0;
    const d = parseFloat(document.getElementById('calcD').value) || 0;
    const h = parseFloat(document.getElementById('calcH').value) || 0;

    if (w > 0 && d > 0 && h > 0) {
        const rawLiters = (w * d * h) / 1000;
        const safeLiters = (rawLiters * 1.1);
        document.getElementById('resultLiters').innerText = safeLiters.toFixed(1);

        const total = Math.ceil(safeLiters);
        let recommendation = "";
        if (total <= 2) recommendation = "2L 패키지 1개";
        else if (total <= 4) recommendation = "4L 패키지 1개";
        else if (total <= 6) recommendation = "4L + 2L 패키지 조합";
        else if (total <= 8) recommendation = "4L 패키지 2개";
        else recommendation = \`4L 패키지 \${Math.ceil(total / 4)}개 (대용량)\`;

        document.getElementById('recommendationText').innerText = recommendation;
        document.getElementById('calcResult').classList.remove('hidden');
    } else {
        alert("크기를 정확하게 위/아래 방향 화살표나 키보드로 입력해주세요");
    }
};

window.renderPortfolio = function() {
    const container = document.getElementById('portfolioSlideContainer');
    if (!container || !window.portfolioData) return;
    
    window.portfolioData.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'w-full flex-none snap-center';
        slide.innerHTML = \`
            <div class="relative group cursor-pointer" onclick="openPortfolioModal('\${item.title}','\${item.desc}','\${item.img}')">
                <div class="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                    <img src="\${item.img}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy">
                </div>
                <div class="absolute bottom-4 left-4 flex gap-2">
                    \${item.tags.map(t => \`<span class="bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded tracking-widest">\${t}</span>\`).join('')}
                </div>
            </div>
            <div class="mt-4 px-2">
                <h3 class="font-bold text-gray-900 dark:text-gray-100">\${item.title}</h3>
                <p class="text-sm text-gray-500 mt-1 line-clamp-2">\${item.desc}</p>
            </div>
        \`;
        container.appendChild(slide);
    });
};

window.openPortfolioModal = function(title, desc, img) {
    document.getElementById('modalPortTitle').innerText = title;
    document.getElementById('modalPortDesc').innerText = desc;
    document.getElementById('modalPortImage').src = img;
    document.getElementById('portfolioModal').classList.remove('hidden');
    document.getElementById('portfolioModal').classList.add('flex');
}
window.closePortfolioModal = function() {
    document.getElementById('portfolioModal').classList.add('hidden');
    document.getElementById('portfolioModal').classList.remove('flex');
}
`;

fs.writeFileSync(`${dir}/data.js`, dataCode, 'utf8');
fs.writeFileSync(`${dir}/ui.js`, uiCode, 'utf8');
fs.writeFileSync(`${dir}/util_core.js`, utilCoreCode, 'utf8');
fs.writeFileSync(`${dir}/builder.js`, builderCode, 'utf8');

console.log('Static standard javascript extracted gracefully.');
