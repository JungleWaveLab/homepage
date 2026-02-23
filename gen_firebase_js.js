const fs = require('fs');
const dir = 'assets/js';

// --- FIREBASE CONFIG MODULE ---
const firebaseCode = `
// assets/js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, updateDoc, increment, query, orderBy, limit, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDc5hBqdfxvTnQg-qU1FMKU76f2sjx_f6w",
    authDomain: "junglewave-app.firebaseapp.com",
    projectId: "junglewave-app",
    storageBucket: "junglewave-app.firebasestorage.app",
    messagingSenderId: "666614908112",
    appId: "1:666614908112:web:84577cea28150dfe964ad5",
    measurementId: "G-9YJ0RX37XG"
};

// Initialize ONE Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

window.db = db;
window.currentUser = null;
let viralSeeded = localStorage.getItem('viral_seeded_v2');

// --- AUTHENTICATION ---
window.googleLogin = () => {
    signInWithPopup(auth, provider).catch((error) => {
        console.error("Login Error:", error);
        alert("로그인 실패: " + error.message);
    });
};

window.googleLogout = () => {
    signOut(auth).then(() => console.log("Logged out"));
};

onAuthStateChanged(auth, async (user) => {
    const loginUI = document.getElementById('login-ui');
    const userUI = document.getElementById('user-ui');

    if (user) {
        window.currentUser = user;
        if(loginUI) loginUI.classList.add('hidden');
        if(userUI) userUI.classList.remove('hidden');

        document.getElementById('user-photo').src = user.photoURL;
        document.getElementById('user-name').innerText = user.displayName;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            document.getElementById('user-score').innerText = userSnap.data().score || 0;
        } else {
            await setDoc(userRef, { name: user.displayName, photo: user.photoURL, score: 0, lastClaimed: null });
            document.getElementById('user-score').innerText = 0;
        }
    } else {
        window.currentUser = null;
        if(loginUI) loginUI.classList.remove('hidden');
        if(userUI) userUI.classList.add('hidden');
    }
});

window.claimDailyPoints = async () => {
    if (!window.currentUser) return;
    const userRef = doc(db, "users", window.currentUser.uid);
    try {
        await updateDoc(userRef, { score: increment(10), lastClaimed: new Date() });
        const newSnap = await getDoc(userRef);
        document.getElementById('user-score').innerText = newSnap.data().score;
        alert("🎁 포인트 10점을 획득했습니다!");
    } catch (e) {
        console.error("Error updates:", e);
        alert("오류 발생: " + e.message);
    }
};

// --- COMMUNITY POST & REALTIME UPDATES ---
window.openWriteModalUI = () => {
    if (!window.currentUser) {
        alert("로그인이 필요합니다! 🏆 랭킹 탭에서 로그인해주세요.");
        window.switchTab('rank');
        return;
    }
    const modal = document.getElementById('writeModal');
    if(modal) modal.classList.remove('hidden');
};

window.closeWriteModalUI = () => {
    const modal = document.getElementById('writeModal');
    if(modal) modal.classList.add('hidden');
};

window.submitPost = async () => {
    if(!window.currentUser) return;
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const tag = document.getElementById('post-tag').value;

    if (!title || !content) return alert("내용을 입력해주세요.");

    try {
        await addDoc(collection(db, "posts"), {
            title, content, tag,
            authorName: window.currentUser.displayName,
            authorPhoto: window.currentUser.photoURL,
            uid: window.currentUser.uid,
            createdAt: serverTimestamp(),
            likes: 0
        });
        alert("게시글이 등록되었습니다!");
        document.getElementById('post-title').value = "";
        document.getElementById('post-content').value = "";
        window.closeWriteModalUI();
    } catch (e) {
        alert("업로드 실패: " + e.message);
    }
};

// --- LEADERBOARD ---
onSnapshot(query(collection(db, "users"), orderBy("score", "desc"), limit(10)), (snapshot) => {
    const list = document.getElementById('leaderboard-list');
    if(!list) return;
    list.innerHTML = "";
    
    if (snapshot.empty) {
        list.innerHTML = '<div class="p-6 text-center text-gray-500">아직 랭킹 데이터가 없습니다.</div>';
        return;
    }

    let rank = 1;
    snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const isMe = window.currentUser && window.currentUser.uid === docSnap.id;
        const item = document.createElement('div');
        item.className = \`px-6 py-4 flex items-center justify-between \${isMe ? 'bg-jungle-50 dark:bg-zinc-800' : ''}\`;
        item.innerHTML = \`
            <div class="flex items-center gap-4">
                <span class="font-bold text-lg w-6 text-center \${rank <= 3 ? 'text-yellow-500' : 'text-gray-400'}">\${rank}</span>
                <img src="\${data.photo}" class="w-8 h-8 rounded-full border border-gray-200">
                <span class="font-medium text-gray-900 dark:text-white">\${data.name} \${isMe ? '<span class="text-xs text-jungle-600">(나)</span>' : ''}</span>
            </div>
            <span class="font-bold text-jungle-600 dark:text-jungle-400">\${data.score} pts</span>\`;
        list.appendChild(item);
        rank++;
    });
});

// --- ADMIN SETTINGS LOGIC ---
async function loadAdminSettings() {
    try {
        const docRef = doc(db, "settings", "junglewave");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            
            const prod = window.storeProducts.standard;
            prod.title = data.title || prod.title;
            prod.badge = data.badge || prod.badge;
            prod.desc = data.desc || prod.desc;
            prod.basePrice = parseInt(data.basePrice) || prod.basePrice;
            prod.opt1Price = parseInt(data.opt1Price) || prod.opt1Price;
            prod.opt2Price = parseInt(data.opt2Price) || prod.opt2Price;
            prod.opt3Price = parseInt(data.opt3Price) || prod.opt3Price;

            if (data.baseImg) prod.baseImg = data.baseImg;
            if (data.opt1Img && document.getElementById('layerSoilImg')) document.getElementById('layerSoilImg').src = data.opt1Img;
            if (data.opt2Img && document.getElementById('layerPlantsImg')) document.getElementById('layerPlantsImg').src = data.opt2Img;
            if (data.opt3Img && document.getElementById('layerLightImg')) document.getElementById('layerLightImg').src = data.opt3Img;

            // Update Admin UI
            if (document.getElementById('admin-product-title')) document.getElementById('admin-product-title').value = prod.title;
            if (document.getElementById('admin-product-badge')) document.getElementById('admin-product-badge').value = prod.badge;
            if (document.getElementById('admin-product-desc')) document.getElementById('admin-product-desc').value = prod.desc;
            if (document.getElementById('admin-product-base-price')) document.getElementById('admin-product-base-price').value = prod.basePrice;
            if (document.getElementById('admin-opt1-price')) document.getElementById('admin-opt1-price').value = prod.opt1Price;
            if (document.getElementById('admin-opt2-price')) document.getElementById('admin-opt2-price').value = prod.opt2Price;
            if (document.getElementById('admin-opt3-price')) document.getElementById('admin-opt3-price').value = prod.opt3Price;
        }
    } catch (e) { console.error("Error loading settings:", e); }
}

window.saveAdminSettings = async () => {
    const btn = document.getElementById('btnSaveAdmin');
    btn.innerText = "저장 중...";
    btn.disabled = true;

    try {
        const files = {
            baseImg: document.getElementById('admin-img-base').files[0],
            opt1Img: document.getElementById('admin-img-opt1').files[0],
            opt2Img: document.getElementById('admin-img-opt2').files[0],
            opt3Img: document.getElementById('admin-img-opt3').files[0]
        };

        const urls = {};
        for (const [key, file] of Object.entries(files)) {
            if (file) {
                const fileRef = ref(storage, 'layers/' + key + '_' + Date.now());
                await uploadBytes(fileRef, file);
                urls[key] = await getDownloadURL(fileRef);
            }
        }

        const dataToSave = {
            title: document.getElementById('admin-product-title').value,
            badge: document.getElementById('admin-product-badge').value,
            desc: document.getElementById('admin-product-desc').value,
            basePrice: parseInt(document.getElementById('admin-product-base-price').value),
            opt1Price: parseInt(document.getElementById('admin-opt1-price').value),
            opt2Price: parseInt(document.getElementById('admin-opt2-price').value),
            opt3Price: parseInt(document.getElementById('admin-opt3-price').value)
        };

        if (urls.baseImg) dataToSave.baseImg = urls.baseImg;
        if (urls.opt1Img) dataToSave.opt1Img = urls.opt1Img;
        if (urls.opt2Img) dataToSave.opt2Img = urls.opt2Img;
        if (urls.opt3Img) dataToSave.opt3Img = urls.opt3Img;

        await setDoc(doc(db, "settings", "junglewave"), dataToSave, { merge: true });
        alert("설정이 성공적으로 저장되었습니다!");
        loadAdminSettings();
    } catch (e) {
        alert("저장 오류: " + e.message);
    } finally {
        btn.innerText = "변경사항 저장";
        btn.disabled = false;
    }
};

window.onload = () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }
    if (window.updateThemeIcon) window.updateThemeIcon();
    if (window.renderSpecies && typeof window.speciesData !== 'undefined') window.renderSpecies(window.speciesData);
    if (window.renderCalendar) window.renderCalendar();
    if (window.switchTab) window.switchTab('home');

    setTimeout(() => {
        if (['encyclopedia', 'calculator', 'diary'].includes(window.currentTab)) {
            if(window.toggleLabMenu) window.toggleLabMenu();
        }
    }, 500);
    
    // Inject Marketing Active Badge instead of old feed
    const oldFeed = document.getElementById('communityPostList');
    if (oldFeed && !oldFeed.classList.contains('silenced')) {
        oldFeed.classList.add('silenced', 'hidden');
        
        const newFeedWrapper = document.createElement('div');
        newFeedWrapper.id = 'marketing_feed_active';
        newFeedWrapper.className = "space-y-4";
        
        const badge = document.createElement('div');
        badge.className = "bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 animate-pulse";
        badge.innerText = "⚡ Marketing Team Active";
        
        oldFeed.parentNode.insertBefore(badge, oldFeed);
        oldFeed.parentNode.insertBefore(newFeedWrapper, oldFeed);
    }
    
    loadAdminSettings();
};

// Viral Seed & Active Feed specific to marketing requirements
onSnapshot(query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(20)), async (snap) => {
    const list = document.getElementById('marketing_feed_active') || document.getElementById('communityPostList');
    if (!list) return;

    if (snap.empty && !viralSeeded) {
        list.innerHTML = '<div class="text-center py-10 animate-pulse text-gray-400">🔥 핫한 게시글을 불러오는 중...</div>';
        const viralPosts = [
            { title: "🌿 비바리움 세팅 후기 (진짜 대박)", content: "똥손이라 걱정했는데 세트 상품으로 사니까 그냥 털어넣으면 끝나네요. 이끼 상태도 너무 좋습니다. 강추!!", tag: "자랑", user: "VivariumMaster", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
            { title: "🚚 배송 진짜 빠르네요", content: "어제 시켰는데 오늘 도착했습니다. 포장도 꼼꼼하고 서비스로 주신 먹이도 잘 먹일게요~", tag: "자유", user: "GeckoLover", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" },
            { title: "❓ 초보자 질문있습니다", content: "습도 관리는 하루에 몆 번 정도 해주면 될까요? 정글웨이브 흙이 보습력이 좋아서 덜 해도 된다던데...", tag: "질문", user: "NewbieOne", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" }
        ];

        for (const p of viralPosts) {
            try {
                await addDoc(collection(db, "posts"), {
                    title: p.title, content: p.content, tag: p.tag,
                    authorName: p.user, authorPhoto: p.photo,
                    uid: "viral_bot", createdAt: serverTimestamp(), likes: Math.floor(Math.random() * 50) + 10
                });
            } catch (e) { }
        }
        localStorage.setItem('viral_seeded_v2', 'true');
        viralSeeded = true;
    } else {
        list.innerHTML = "";
        snap.forEach(docSnap => {
            const d = docSnap.data();
            const time = d.createdAt ? new Date(d.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '방금';
            const isViral = d.uid === 'viral_bot' || d.likes > 20;

            list.innerHTML += \`
                <div class="bg-white dark:bg-zinc-900 p-5 rounded-lg border \${isViral ? 'border-pink-200 dark:border-pink-900 shadow-md' : 'border-gray-200 dark:border-zinc-800'} shadow-sm mb-4 transition hover:-translate-y-1 cursor-pointer relative overflow-hidden">
                    \${isViral ? '<div class="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold">HOT</div>' : ''}
                    <div class="flex justify-between mb-2">
                        <div class="flex items-center gap-2">
                            <img src="\${d.authorPhoto}" class="w-8 h-8 rounded-full border border-gray-100">
                            <div>
                                <span class="font-bold text-sm dark:text-white">\${d.authorName}</span>
                                <span class="text-[10px] text-gray-400 block -mt-1">\${time}</span>
                            </div>
                        </div>
                        <span class="text-xs bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded dark:text-gray-300 font-bold text-gray-600">\${d.tag}</span>
                    </div>
                    <h3 class="font-bold mb-2 dark:text-gray-200 text-md">\${d.title}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">\${d.content}</p>
                    <div class="mt-3 flex gap-3 text-xs text-gray-400 font-bold border-t border-gray-100 dark:border-zinc-800 pt-3">
                        <span class="text-pink-500 flex items-center gap-1">♥ \${d.likes || 0}</span>
                        <span>💬 댓글 0</span>
                    </div>
                </div>\`;
        });
    }
});

onSnapshot(collection(db, "users"), (snap) => {
    const el = document.getElementById('admin-user-count');
    if (el) el.innerText = snap.size;
});
onSnapshot(collection(db, "posts"), (snap) => {
    const el = document.getElementById('admin-post-count');
    if (el) el.innerText = snap.size;
});
`;

fs.writeFileSync(dir + '/firebase-config.js', firebaseCode, 'utf8');
console.log('Firebase unified logic successfully exported to assets/js/firebase-config.js');
