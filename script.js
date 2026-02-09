/* ============================================
   TẾT VIBE - KHÔNG KHÍ TẾT
   JavaScript Logic
   ============================================ */

// Mảng câu chúc Tết
const wishes = [
    "Chúc bạn một năm mới may mắn, sức khỏe dồi dào!",
    "Năm mới, ước mơ mới, thành công mới chờ bạn!",
    "Chúc bạn và gia đình một năm thịnh vượng!",
    "Tết này, hạnh phúc ghé thăm từng ngôi nhà!",
    "Chúc bạn tiền vào như nước, sức khỏe như thép!",
    "Năm mới, tất cả những điều tốt đẹp sẽ đến với bạn!",
    "An khang, thịnh vượng là lời chúc của chúng tôi!",
    "Năm mới rực rỡ, đời bạn sáng châu!",
    "Chúc bạn luôn mỉm cười và tràn đầy năng lượng!",
    "Tết đến, lộc tới, hạnh phúc ơi hãy ghé nhà bạn!",
];

// Mảng lời chúc lì xì theo số tiền
const luckyMoneyWishes = {
    10000: "Số tiền nhỏ nhưng lòng chúc to lớn! 💝",
    20000: "Tiền nhỏ, tình thương lớn lao! 💖",
    50000: "Vạn vạn tấm lòng chúc phúc bạn! 💫",
    100000: "Tiền thật có thể dùng hết, nhưng lời chúc là vĩnh viễn! ✨",
    200000: "Lì xì to, may mắn còn to hơn! 🎊",
    500000: "Wow! May mắn rất rất lớn đang chờ bạn! 🌟",
    1000000: "Bạn là người may mắn nhất Tết này! 👑💰",
};

// ============================================
// LẤY LỜI CHÚC NGẪU NHIÊN
// ============================================

const wishText = document.getElementById("wishText");
const btnWish = document.querySelector(".btn-wish");

btnWish.addEventListener("click", () => {
    const randomIdex = Math.floor(Math.random() * wishes.length);
    wishText.textContent = wishes[randomIdex];
    
    // Thêm hiệu ứng
    wishText.style.animation = "none";
    setTimeout(() => {
        wishText.style.animation = "fadeIn 0.5s ease-out";
    }, 10);
});

// Hiển thị lời chúc ngẫu nhiên lúc trang load
window.addEventListener("load", () => {
    const randomIndex = Math.floor(Math.random() * wishes.length);
    wishText.textContent = wishes[randomIndex];

    // Nếu người dùng đã nhận lì xì rồi (lưu trong localStorage), disable nút
    // cập nhật số dư hiển thị (guest hoặc user)
    if (typeof updateBalanceUI === 'function') updateBalanceUI();
    // cập nhật trạng thái nút Lì Xì theo user hiện tại
    if (typeof updateLuckyButtonState === 'function') updateLuckyButtonState();
});

// ============================================
// ĐẾM NGƯỢC ĐẾN TẾT
// ============================================

function updateCountdown() {
    // Tết là 17/02/2026
    const tetDate = new Date("2026-02-17T00:00:00").getTime();
    
    const now = new Date().getTime();
    const distance = tetDate - now;

    if (distance >= 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = String(days).padStart(2, "0");
        document.getElementById("hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

        document.getElementById("tetMessage").textContent = "🎆 Tết đang đến gần! Hãy chuẩn bị đón tiếp! 🎆";
    } else {
        // Nếu Tết đã qua
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        
        document.getElementById("tetMessage").textContent = "🎉 Chúc mừng bạn đón Tết vui vẻ! Năm mới an khang! 🎉";
    }
}

// Cập nhật đếm ngược mỗi giây
setInterval(updateCountdown, 1000);
updateCountdown(); // Gọi ngay khi trang load

// ============================================
// LÌ XÌ MAY MẮN
// ============================================

const btnLuckyMoney = document.getElementById("btnLuckyMoney");
const luckyResult = document.getElementById("luckyResult");

const moneyAmounts = [10000, 20000, 50000, 100000, 200000, 500000, 1000000];

btnLuckyMoney.addEventListener("click", () => {
    // Chỉ cho nhận 1 lần: kiểm tra localStorage
    const user = (typeof getUser === 'function') ? getUser() : null;
    const luckyKey = user && user.username ? `receivedLucky_${user.username}` : 'receivedLucky_guest';
    if (localStorage.getItem(luckyKey)) {
        alert('Bạn đã nhận lì xì rồi!');
        btnLuckyMoney.disabled = true;
        btnLuckyMoney.textContent = '✅ Đã nhận Lì Xì';
        return;
    }

    // Random số tiền
    const randomMoney = moneyAmounts[Math.floor(Math.random() * moneyAmounts.length)];
    
    // Lấy lời chúc tương ứng
    const message = luckyMoneyWishes[randomMoney];
    
    // Hiển thị kết quả
    luckyResult.innerHTML = `
        <div class="lucky-amount">${randomMoney.toLocaleString()} đ</div>
        <div class="lucky-message">${message}</div>
    `;
    
    // Thêm hiệu ứng
    luckyResult.style.animation = "none";
    setTimeout(() => {
        luckyResult.style.animation = "fadeIn 0.5s ease-out";
    }, 10);
    
    // Hiệu ứng cho button
    btnLuckyMoney.style.transform = "scale(0.95)";
    setTimeout(() => {
        btnLuckyMoney.style.transform = "scale(1)";
    }, 100);

    // Cộng tiền vào số dư (game + user)
    if (typeof addBalance === 'function') addBalance(randomMoney);

    // Đánh dấu đã nhận và disable nút
    localStorage.setItem(luckyKey, '1');
    // Nếu đăng nhập bằng server, thông báo server rằng đã nhận lì xì
    try { syncServerSetReceivedLucky(true); } catch(e) { /* ignore */ }
    btnLuckyMoney.disabled = true;
    btnLuckyMoney.textContent = '✅ Đã nhận Lì Xì';
    btnLuckyMoney.classList.add('inactive');
});

// ============================================
// AUDIO CONTROL
// ============================================

const audioToggle = document.getElementById("audioToggle");
const tetSound = document.getElementById("tetSound");

// Gán sự kiện change cho checkbox
audioToggle.addEventListener("change", () => {
    if (audioToggle.checked) {
        tetSound.play();
    } else {
        tetSound.pause();
    }
});

// Tự động tắt âm thanh khi rời trang
window.addEventListener("beforeunload", () => {
    tetSound.pause();
    tetSound.currentTime = 0;
});

// ============================================
// ĐIỀU CHỈNH ÂM LƯỢNG
// ============================================

const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");

// Set âm lượng ban đầu
tetSound.volume = 0.7; // 70%

// Lắng nghe sự kiện thay đổi slider
volumeSlider.addEventListener("input", (e) => {
    const volume = e.target.value / 100; // Chuyển từ 0-100 thành 0-1
    tetSound.volume = volume;
    volumeValue.textContent = e.target.value + "%";
});

// ============================================
// ĐIỀU CHỈNH LẶP LẠI NHẠC
// ============================================

const repeatBtn = document.getElementById("repeatBtn");
const repeatStatus = document.getElementById("repeatStatus");

let isLooping = true;

// Bật lặp lại mặc định
tetSound.loop = true;

repeatBtn.addEventListener("click", () => {
    isLooping = !isLooping;
    tetSound.loop = isLooping;
    
    if (isLooping) {
        repeatBtn.classList.remove("inactive");
        repeatStatus.classList.remove("inactive");
        repeatStatus.textContent = "✅ Đang lặp lại";
    } else {
        repeatBtn.classList.add("inactive");
        repeatStatus.classList.add("inactive");
        repeatStatus.textContent = "❌ Không lặp lại";
    }
});

// ============================================
// TẠO HIỆU ỨNG HOA RƠI NÂNG CAO
// ============================================

function createFallingFlowers() {
    const container = document.querySelector(".falling-flowers");
    const flowers = ["🌸", "🌼", "🌻"];
    
    for (let i = 0; i < 5; i++) {
        const flower = document.createElement("div");
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.position = "fixed";
        flower.style.left = Math.random() * window.innerWidth + "px";
        flower.style.top = "-50px";
        flower.style.fontSize = Math.random() * 20 + 20 + "px";
        flower.style.opacity = Math.random() * 0.5 + 0.5;
        flower.style.pointerEvents = "none";
        flower.style.zIndex = "1";
        
        const duration = Math.random() * 5 + 8; // 8-13 giây
        const moveX = Math.random() * 200 - 100; // -100 đến 100px
        
        flower.style.animation = `fallFlower ${duration}s linear forwards`;
        
        document.body.appendChild(flower);
        
        // Xóa phần tử sau khi hiệu ứng kết thúc
        setTimeout(() => {
            flower.remove();
        }, duration * 1000);
    }
}

// Tạo hoa rơi mỗi 2 giây
setInterval(createFallingFlowers, 2000);

// CSS animation cho fallFlower
const style = document.createElement("style");
style.textContent = `
    @keyframes fallFlower {
        0% {
            transform: translateY(0) rotateZ(0deg);
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotateZ(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// HIỆU ỨNG LÌ XÌ (PHÁO HOA)
// ============================================

function createConfetti() {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.pointerEvents = "none";
    confetti.textContent = "✨";
    confetti.style.fontSize = Math.random() * 20 + 10 + "px";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "50%";
    confetti.style.zIndex = "1000";
    
    document.body.appendChild(confetti);
    
    const duration = Math.random() * 2 + 1; // 1-3 giây
    const targetX = (Math.random() - 0.5) * 400; // -200 đến 200px
    const targetY = Math.random() * -300 - 100; // Bay lên
    
    confetti.style.animation = `confettiFall ${duration}s ease-out forwards`;
    confetti.style.setProperty('--targetX', targetX + 'px');
    confetti.style.setProperty('--targetY', targetY + 'px');
    
    setTimeout(() => {
        confetti.remove();
    }, duration * 1000);
}

// Thêm CSS cho confetti
const confettiStyle = document.createElement("style");
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--targetX), var(--targetY)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Tạo confetti khi nhấn nút lì xì
btnLuckyMoney.addEventListener("click", () => {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 30);
    }
});

// ============================================
// GAMES SYSTEM - GAME SWITCHING
// ============================================
// HOW TO ADD NEW GAMES:
// 1. Add a tab button in HTML:
//    <button class="game-tab-btn" data-game="game-id">🎮 Game Name</button>
// 2. Add a game container in HTML:
//    <div class="game-container hidden" id="game-game-id">
//        <h3>Game Name</h3>
//        <!-- game content -->
//    </div>
// 3. The tab switching system will automatically handle showing/hiding
// 4. Add game logic in script.js (betting, results, etc.)

document.querySelectorAll('.game-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const gameId = btn.dataset.game;
        
        // Remove active from all tabs
        document.querySelectorAll('.game-tab-btn').forEach(b => b.classList.remove('active'));
        // Add active to clicked tab
        btn.classList.add('active');
        
        // Hide all game containers
        document.querySelectorAll('.game-container').forEach(container => {
            container.classList.add('hidden');
            container.classList.remove('active');
        });
        
        // Show selected game container
        const gameContainer = document.getElementById(`game-${gameId}`);
        if (gameContainer) {
            gameContainer.classList.remove('hidden');
            gameContainer.classList.add('active');
        }
    });
});

// ============================================
// MINIGAME - BẦU CUA
// ============================================

const bauSymbols = [
    { key: 'deer', emoji: '🦌' },
    { key: 'gourd', emoji: '🎃' },
    { key: 'fish', emoji: '🐟' },
    { key: 'crab', emoji: '🦀' },
    { key: 'rooster', emoji: '🐓' },
    { key: 'shrimp', emoji: '🦐' },
];

const bauCells = document.querySelectorAll('.bau-cell');
const btnSpin = document.getElementById('btnSpin');
const diceResult = document.getElementById('diceResult');
const betPerCellInput = document.getElementById('betPerCell');
const totalStakeEl = document.getElementById('totalStake');
const betMessageEl = document.getElementById('betMessage');
const gameBalanceEl = document.getElementById('gameBalance');

const selected = new Set();
let currentBetPerCell = 0;

// Chọn / bỏ chọn ô
bauCells.forEach(cell => {
    cell.addEventListener('click', () => {
        const sym = cell.dataset.symbol;
        if (selected.has(sym)) {
            selected.delete(sym);
            cell.classList.remove('selected');
        } else {
            // Giới hạn tối đa 2 ô được chọn
            if (selected.size >= 2) {
                if (betMessageEl) {
                    betMessageEl.textContent = 'Bạn chỉ được cược tối đa 2 ô.';
                    setTimeout(() => {
                        if (betMessageEl.textContent === 'Bạn chỉ được cược tối đa 2 ô.') betMessageEl.textContent = '';
                    }, 2000);
                } else {
                    alert('Bạn chỉ được cược tối đa 2 ô.');
                }
                return;
            }
            selected.add(sym);
            cell.classList.add('selected');
        }
        // Cập nhật tổng cược hiển thị sau khi chọn/bỏ chọn
        updateTotalStake();
    });
});

// Cập nhật tổng cược hiển thị dựa trên số ô đã chọn và bet per cell
function updateTotalStake() {
    const bet = Number(betPerCellInput.value) || 0;
    const total = bet * selected.size;
    if (totalStakeEl) totalStakeEl.textContent = `Tổng cược: ${total.toLocaleString()} đ`;
}

// Lắng nghe thay đổi giá trị cược để update tổng cược
if (betPerCellInput) {
    betPerCellInput.addEventListener('input', updateTotalStake);
}

function spinBauCua() {
    if (btnSpin.disabled) return;
    diceResult.innerHTML = '';
    // kiểm tra có chọn ô
    if (selected.size === 0) {
        alert('Vui lòng chọn ít nhất 1 ô để cược.');
        return;
    }

    // lấy giá trị cược
    const betPerCell = Number(betPerCellInput.value) || 0;
    if (betPerCell <= 0) {
        alert('Vui lòng nhập số tiền cược hợp lệ.');
        return;
    }
    currentBetPerCell = betPerCell;
    const totalStake = betPerCell * selected.size;
    // kiểm tra số dư
    const bal = getBalance();
    if (bal < totalStake) {
        alert('Số dư không đủ để đặt cược.');
        return;
    }

    // trừ ngay số dư khi đặt cược
    addBalance(-totalStake);
    updateBalanceUI();

    btnSpin.disabled = true;

    // Quay 3 lần
    const results = [];
    for (let i = 0; i < 3; i++) {
        const r = bauSymbols[Math.floor(Math.random() * bauSymbols.length)];
        results.push(r);
    }

    // Hiển thị kết quả dần dần
    let idx = 0;
    const iv = setInterval(() => {
        if (idx < results.length) {
            const res = results[idx];
            const span = document.createElement('span');
            span.className = 'dice-emoji';
            span.textContent = res.emoji;
            diceResult.appendChild(span);
            idx++;
        } else {
            clearInterval(iv);
            calculateBauResult(results);
            btnSpin.disabled = false;
            // update số dư hiển thị sau vòng
            updateBalanceUI();
        }
    }, 400);
}

function calculateBauResult(results) {
    const counts = {};
    results.forEach(r => counts[r.key] = (counts[r.key] || 0) + 1);

    let gained = 0;
    selected.forEach(sym => {
        const count = counts[sym] || 0;
        if (count > 0) {
            // tính thưởng theo cược: payout = betPerCell * count * 2
            const payout = currentBetPerCell * count * 2;
            gained += payout;
            // hiển thị chữ nổi ở vị trí ô tương ứng
            const cell = document.querySelector(`.bau-cell[data-symbol="${sym}"]`);
            if (cell) showFloatingPoints(cell, `+${payout.toLocaleString()} đ`);
        }
    });

    // Record bet transaction
    const totalStake = currentBetPerCell * selected.size;
    const selectedSymbols = Array.from(selected).join(', ') || 'none';
    addTransaction({
        type: 'bet',
        gameName: 'Bầu Cua',
        selectedCells: selectedSymbols,
        betPerCell: currentBetPerCell,
        totalStake: totalStake,
        result: results.map(r => r.emoji).join(''),
        payout: gained,
        netGain: gained - totalStake
    });

    // không sử dụng cơ chế điểm; chỉ xử lý tiền thắng/thua
    if (gained === 0) {
        showFloatingPoints(btnSpin, 'Không trúng', '#999');
        betMessageEl.textContent = 'Rất tiếc, bạn thua lượt này.';
        betMessageEl.style.color = '#999';
    } else {
        // cộng tiền vào số dư người chơi
        addBalance(gained);
        updateBalanceUI();
        betMessageEl.textContent = `Bạn thắng ${gained.toLocaleString()} đ!`;
        betMessageEl.style.color = '#006400';
        // ít confetti khi trúng
        for (let i = 0; i < 12; i++) setTimeout(createConfetti, i * 60);
    }
}

function showFloatingPoints(targetEl, text, color) {
    const rect = targetEl.getBoundingClientRect();
    const ft = document.createElement('div');
    ft.className = 'floating-text';
    ft.textContent = text;
    ft.style.color = color || '#ffd700';
    ft.style.left = (rect.left + rect.width / 2) + 'px';
    ft.style.top = (rect.top + rect.height / 2) + 'px';
    document.body.appendChild(ft);
    setTimeout(() => ft.remove(), 1800);
}

btnSpin.addEventListener('click', spinBauCua);

// ============================================
// THÔNG BAO BẢO VỆ TRANG
// ============================================

console.log("🎊 Chúc mừng bạn đến với Tết Vibe! 🎊");
console.log("✨ Tết này, hãy tận hưởng khoảnh khắc hạnh phúc cùng người thân! ✨");

// ============================================
// HAMBURGER MENU JS
// ============================================

const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');

function openMenu() {
    sideMenu.classList.add('open');
    menuOverlay.classList.add('show');
    sideMenu.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('show');
    sideMenu.setAttribute('aria-hidden', 'true');
}

hamburger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

// Scroll đến section khi click menu
document.querySelectorAll('.menu-list a').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.dataset.target;
        if (targetId === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        closeMenu();
    });
});

// ============================================
// SIMPLE AUTH (LOCAL STORAGE MOCK)

// --- Backend API helpers (fetch + JWT) ---
const API_BASE = 'http://localhost:4000/api';

async function apiRequest(path, opts = {}) {
    const url = API_BASE + path;
    const token = getAuthToken();
    const headers = opts.headers || {};
    if (token) headers['Authorization'] = 'Bearer ' + token;
    if (!(opts.body instanceof FormData)) headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    try {
        const res = await fetch(url, { ...opts, headers });
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        if (!res.ok) throw data;
        return data;
    } catch (e) {
        throw e;
    }
}

function getAuthToken() {
    const u = getUser();
    return u && u.token ? u.token : null;
}

async function serverRegister(username, password) {
    return apiRequest('/register', { method: 'POST', body: JSON.stringify({ username, password }) });
}

async function serverLogin(username, password) {
    return apiRequest('/login', { method: 'POST', body: JSON.stringify({ username, password }) });
}

function syncServerAddBalance(delta) {
    const token = getAuthToken();
    if (!token) return;
    fetch(API_BASE + '/balance', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ delta }) })
        .then(r => r.json())
        .then(data => {
            if (data && data.balance !== undefined) setBalance(data.balance);
            updateBalanceUI();
        }).catch(() => { /* ignore sync errors */ });
}

function syncServerSetReceivedLucky(value) {
    const token = getAuthToken();
    if (!token) return;
    fetch(API_BASE + '/receivedLucky', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ value }) })
        .catch(() => { /* ignore */ });
}

// --- end API helpers ---

// --- Server availability check ---
const serverStatusText = document.getElementById('serverStatusText');

async function checkServerStatus() {
    try {
        const res = await fetch(API_BASE + '/me', { method: 'GET' });
        if (res.status === 401) {
            if (serverStatusText) serverStatusText.textContent = 'Online (no auth)';
            return true;
        }
        if (res.ok) {
            const data = await res.json();
            const name = data.user && data.user.username ? data.user.username : 'signed-in';
            if (serverStatusText) serverStatusText.textContent = `Online (user: ${name})`;
            return true;
        }
        if (serverStatusText) serverStatusText.textContent = `Online (status ${res.status})`;
        return true;
    } catch (e) {
        if (serverStatusText) serverStatusText.textContent = 'Offline';
        return false;
    }
}

// Initial check and periodic polling
window.addEventListener('load', () => {
    checkServerStatus();
    setInterval(checkServerStatus, 15000);
});

// --- end server availability check ---
// ============================================

const userKey = 'tetVibeUser';
const menuLogin = document.getElementById('menuLogin');
const menuRegister = document.getElementById('menuRegister');
const menuUserInfo = document.getElementById('menuUserInfo');
const menuUserName = document.getElementById('menuUserName');
const menuAuthLinks = document.getElementById('menuAuthLinks');
const menuLogout = document.getElementById('menuLogout');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginCancel = document.getElementById('loginCancel');
const registerCancel = document.getElementById('registerCancel');

function getUser() {
    try { return JSON.parse(localStorage.getItem(userKey)); } catch(e){ return null; }
}
function setUser(obj) { localStorage.setItem(userKey, JSON.stringify(obj)); }
function clearUser() { localStorage.removeItem(userKey); }

function openModal(modal) { modal.setAttribute('aria-hidden','false'); }
function closeModal(modal) { modal.setAttribute('aria-hidden','true'); }

function updateAuthUI() {
    const user = getUser();
    if (user) {
        menuUserName.textContent = user.username || 'Người dùng';
        menuUserInfo.style.display = 'flex';
        menuAuthLinks.style.display = 'none';
        // cập nhật số dư khi có user
        updateBalanceUI();
    } else {
        menuUserInfo.style.display = 'none';
        menuAuthLinks.style.display = 'flex';
    }
    // Notify other parts that auth state changed
    try { document.dispatchEvent(new Event('userAuthChanged')); } catch(e) { /* ignore */ }
}

// ========== BALANCE HELPERS ==========
function getBalanceKeyForCurrentUser() {
    const user = getUser();
    return user && user.username ? `balance_${user.username}` : 'balance_guest';
}

function getBalance() {
    const key = getBalanceKeyForCurrentUser();
    const v = parseInt(localStorage.getItem(key));
    return isNaN(v) ? 0 : v;
}

function setBalance(amount) {
    const key = getBalanceKeyForCurrentUser();
    localStorage.setItem(key, String(Number(amount) || 0));
}

function addBalance(amount) {
    const cur = getBalance();
    const next = cur + Number(amount || 0);
    setBalance(next);
    updateBalanceUI();
    // If logged in, sync change to server asynchronously
    try { syncServerAddBalance(Number(amount || 0)); } catch(e) { /* ignore */ }
}

function updateBalanceUI() {
    const bal = getBalance();
    const el = document.getElementById('menuUserBalance');
    if (el) el.textContent = `Số dư: ${bal.toLocaleString()} đ`;
    const gb = document.getElementById('gameBalance');
    if (gb) gb.textContent = `Số dư chơi: ${bal.toLocaleString()} đ`;
}

// ========== LUCKY BUTTON HELPERS ==========
function getLuckyKeyForCurrentUser() {
    const user = getUser();
    return user && user.username ? `receivedLucky_${user.username}` : 'receivedLucky_guest';
}

function updateLuckyButtonState() {
    const key = getLuckyKeyForCurrentUser();
    if (localStorage.getItem(key)) {
        btnLuckyMoney.disabled = true;
        btnLuckyMoney.textContent = '✅ Đã nhận Lì Xì';
        btnLuckyMoney.classList.add('inactive');
    } else {
        btnLuckyMoney.disabled = false;
        btnLuckyMoney.textContent = '💰 Nhận Lì Xì';
        btnLuckyMoney.classList.remove('inactive');
    }
}

// Open login/register
menuLogin.addEventListener('click', () => openModal(loginModal));
menuRegister.addEventListener('click', () => openModal(registerModal));

// Cancel handlers
loginCancel.addEventListener('click', () => closeModal(loginModal));
registerCancel.addEventListener('click', () => closeModal(registerModal));

// Submit login (mock): just check username/password non-empty
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    if (!username || !password) return alert('Vui lòng nhập tên và mật khẩu');
    // Try server login first
    try {
        const res = await serverLogin(username, password);
        if (res && res.user && res.token) {
            setUser({ username: res.user.username, token: res.token });
            if (res.user.balance !== undefined) setBalance(res.user.balance);
            // sync received lucky flag locally
            if (res.user.receivedLucky) localStorage.setItem(getLuckyKeyForCurrentUser(), '1');
        }
    } catch (err) {
        // fallback to local mock auth
        setUser({ username });
        const key = getBalanceKeyForCurrentUser();
        if (localStorage.getItem(key) === null) localStorage.setItem(key, '0');
    }
    closeModal(loginModal);
    updateAuthUI();
    closeMenu();
});

// Submit register (mock)
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    if (!username || !password) return alert('Vui lòng nhập tên và mật khẩu');
    try {
        const res = await serverRegister(username, password);
        if (res && res.user && res.token) {
            setUser({ username: res.user.username, token: res.token });
            if (res.user.balance !== undefined) setBalance(res.user.balance);
            if (res.user.receivedLucky) localStorage.setItem(getLuckyKeyForCurrentUser(), '1');
        }
    } catch (err) {
        // fallback local
        setUser({ username });
        const key = getBalanceKeyForCurrentUser();
        if (localStorage.getItem(key) === null) localStorage.setItem(key, '0');
    }
    closeModal(registerModal);
    updateAuthUI();
    closeMenu();
});

// Sau khi đăng nhập/đăng ký, đảm bảo số dư khởi tạo nếu chưa có
// balance init handled in handlers above (server or local)

menuLogout.addEventListener('click', () => {
    clearUser();
    updateAuthUI();
});

// Sau khi auth thay đổi, cập nhật trạng thái nút Lì Xì
// After login/register handlers already call updateAuthUI
// Ensure lucky button state updated on auth changes
document.addEventListener('userAuthChanged', () => {
    updateBalanceUI();
    updateLuckyButtonState();
});
// trigger initial event
document.dispatchEvent(new Event('userAuthChanged'));

// ============================================
// RECHARGE (NẠP TIỀN)
// ============================================

const menuRecharge = document.getElementById('menuRecharge');
const rechargeModal = document.getElementById('rechargeModal');
const rechargeForm = document.getElementById('rechargeForm');
const rechargeAmount = document.getElementById('rechargeAmount');
const rechargeCancel = document.getElementById('rechargeCancel');
const rechargeMessage = document.getElementById('rechargeMessage');
const paymentInstruction = document.getElementById('paymentInstruction');

// ============================================
// TRANSACTION HISTORY HELPERS
// ============================================

const historyKey = 'tetVibeTransactionHistory';

function getTransactionHistory() {
    try { 
        const h = localStorage.getItem(historyKey);
        return h ? JSON.parse(h) : [];
    } catch(e) { 
        return [];
    }
}

function addTransaction(tx) {
    const history = getTransactionHistory();
    const entry = {
        id: Date.now(),
        timestamp: new Date().toLocaleString('vi-VN'),
        ...tx
    };
    history.unshift(entry);
    // Keep only last 100 transactions
    if (history.length > 100) history.pop();
    localStorage.setItem(historyKey, JSON.stringify(history));
    return entry;
}

function clearTransactionHistory() {
    localStorage.removeItem(historyKey);
}

// ============================================
// PAYMENT METHODS & INSTRUCTIONS
// ============================================
const paymentInstructions = {
    bank: '🏦 Ngân hàng: Chuyển khoản đến số tài khoản được cung cấp. Nạp tiền sẽ được cộng trong vòng 1-2 giờ làm việc.',
    momo: '📱 Ví Momo: Quét mã QR hoặc nhập số điện thoại. Nạp tiền được cộng ngay lập tức sau khi thanh toán.',
    card: '🎟️ Thẻ nạp: Bạn sẽ nhận được mã PIN. Nhập mã PIN để hoàn thành nạp tiền (được cộng ngay lập tức).'
};

// Show instruction when payment method is selected
document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const method = e.target.value;
        paymentInstruction.textContent = paymentInstructions[method];
        paymentInstruction.classList.add('show');
    });
});

// Open recharge modal
menuRecharge.addEventListener('click', () => {
    openModal(rechargeModal);
    closeMenu();
    rechargeMessage.textContent = '';
    paymentInstruction.classList.remove('show');
    paymentInstruction.textContent = '';
    // Reset payment method selection
    document.querySelectorAll('input[name="paymentMethod"]')[0].checked = false;
    rechargeAmount.value = '100000';
});

// Preset amount buttons
document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        rechargeAmount.value = btn.dataset.amount;
    });
});

// Submit recharge form
rechargeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Check payment method is selected
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!selectedMethod) {
        rechargeMessage.style.color = '#c00';
        rechargeMessage.textContent = 'Vui lòng chọn phương thức thanh toán';
        return;
    }
    
    const amount = Number(rechargeAmount.value) || 0;
    const method = selectedMethod.value;
    
    if (amount <= 0) {
        rechargeMessage.style.color = '#c00';
        rechargeMessage.textContent = 'Vui lòng nhập số tiền lớn hơn 0';
        return;
    }
    
    // Simulate payment (just add to balance)
    addBalance(amount);
    
    // Record transaction
    const methodNames = { bank: 'Ngân hàng', momo: 'Ví Momo', card: 'Thẻ nạp' };
    addTransaction({
        type: 'recharge',
        amount: amount,
        method: methodNames[method]
    });
    
    rechargeMessage.style.color = '#006400';
    rechargeMessage.textContent = `✅ Nạp thành công ${amount.toLocaleString()} đ qua ${methodNames[method]}!`;
    
    // Close modal after 2 seconds
    setTimeout(() => {
        closeModal(rechargeModal);
    }, 2000);
});

// Close recharge modal
rechargeCancel.addEventListener('click', () => closeModal(rechargeModal));

// ============================================
// HISTORY MODAL
// ============================================

const menuHistory = document.getElementById('menuHistory');
const historyModal = document.getElementById('historyModal');
const historyList = document.getElementById('historyList');
const historyCloseBtn = document.getElementById('historyCloseBtn');
const historyClearBtn = document.getElementById('historyClearBtn');
let currentHistoryFilter = 'all';

function renderHistoryList(filter = 'all') {
    const history = getTransactionHistory();
    const filtered = filter === 'all' ? history : history.filter(t => t.type === filter);
    
    if (filtered.length === 0) {
        historyList.innerHTML = '<p class="empty-message">Không có giao dịch nào</p>';
        return;
    }
    
    historyList.innerHTML = filtered.map(tx => {
        const isRecharge = tx.type === 'recharge';
        const typeIcon = isRecharge ? '💳' : tx.gameName ? '🎮' : '🎲';
        const amountStr = isRecharge ? `+${tx.amount.toLocaleString()}` : `${tx.netGain > 0 ? '+' : ''}${tx.netGain.toLocaleString()}`;
        
        let details = '';
        if (isRecharge) {
            details = `${tx.method}`;
        } else if (tx.gameName === 'Bầu Cua') {
            details = `Ô: ${tx.selectedCells} | Cược: ${tx.totalStake.toLocaleString()} | Kết quả: ${tx.result} | Thắng: ${tx.payout.toLocaleString()}`;
        } else if (tx.gameName === 'Xóc Đĩa') {
            const choiceText = tx.choice === 'even' ? 'Chẵn' : 'Lẻ';
            const resultText = tx.result === 'even' ? 'Chẵn' : 'Lẻ';
            details = `Chọn: ${choiceText} | Tổng: ${tx.sum} (${resultText}) | Cược: ${tx.betAmount.toLocaleString()} | Thắng: ${tx.payout.toLocaleString()}`;
        } else if (tx.gameName === 'Tài Xỉu') {
            const choiceText = tx.choice === 'tai' ? 'Tài' : 'Xỉu';
            details = `Chọn: ${choiceText} | Xúc xắc: ${tx.dices} = ${tx.sum} | Cược: ${tx.betAmount.toLocaleString()} | Thắng: ${tx.payout.toLocaleString()}`;
        } else {
            details = `Cược: ${tx.betAmount || tx.totalStake.toLocaleString()} | Thắng: ${tx.payout.toLocaleString()}`;
        }
        
        const gameLabel = tx.gameName ? tx.gameName : (tx.type === 'recharge' ? 'Nạp tiền' : 'Cược');
        
        return `
            <div class="history-item ${tx.type}">
                <div class="history-item-header">
                    <span class="history-item-type">${typeIcon} ${gameLabel}</span>
                    <span class="history-item-amount">${amountStr} đ</span>
                </div>
                <div>${details}</div>
                <div class="history-item-time">${tx.timestamp}</div>
            </div>
        `;
    }).join('');
}

// Open history modal
menuHistory.addEventListener('click', () => {
    openModal(historyModal);
    closeMenu();
    renderHistoryList('all');
});

// History tabs
document.querySelectorAll('.history-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.history-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentHistoryFilter = btn.dataset.tab;
        renderHistoryList(currentHistoryFilter);
    });
});

// Clear history
historyClearBtn.addEventListener('click', () => {
    if (confirm('Bạn chắc chắn muốn xóa tất cả lịch sử giao dịch?')) {
        clearTransactionHistory();
        renderHistoryList(currentHistoryFilter);
    }
});

// Close history modal
historyCloseBtn.addEventListener('click', () => closeModal(historyModal));

// ============================================
// GAME - XÓC ĐĨA (COIN FLIP EVEN/ODD)
// ============================================

const btnXocDia = document.getElementById('btnXocDia');
const xocDiaMessage = document.getElementById('xocDiaMessage');
const xocDiaResult = document.getElementById('xocDiaResult');
const xocDiaBalance = document.getElementById('xocDiaBalance');

function updateXocDiaBalance() {
    const bal = getBalance();
    if (xocDiaBalance) xocDiaBalance.textContent = `Số dư: ${bal.toLocaleString()} đ`;
}

window.addEventListener('load', () => {
    updateXocDiaBalance();
});

btnXocDia.addEventListener('click', async () => {
    if (btnXocDia.disabled) return;
    
    // Check choice selected
    const selectedChoice = document.querySelector('input[name="xocDiaChoice"]:checked');
    if (!selectedChoice) {
        xocDiaMessage.style.color = '#c00';
        xocDiaMessage.textContent = 'Vui lòng chọn Chẵn hoặc Lẻ';
        return;
    }
    
    const choice = selectedChoice.value; // 'even' or 'odd'
    const bet = Number(document.getElementById('xocDiaBet').value) || 0;
    
    if (bet <= 0) {
        xocDiaMessage.style.color = '#c00';
        xocDiaMessage.textContent = 'Vui lòng nhập cược hợp lệ';
        return;
    }
    
    // Check balance
    const bal = getBalance();
    if (bal < bet) {
        xocDiaMessage.style.color = '#c00';
        xocDiaMessage.textContent = 'Số dư không đủ';
        return;
    }
    
    // Deduct bet
    addBalance(-bet);
    updateXocDiaBalance();
    btnXocDia.disabled = true;
    
    // Simulate coin flip: generate 3 numbers, count if sum is even/odd
    xocDiaResult.innerHTML = '<p style="font-size: 24px; margin: 10px 0;">Quay...</p>';
    
    let results = [];
    for (let i = 0; i < 3; i++) {
        results.push(Math.floor(Math.random() * 6) + 1);
    }
    
    const sum = results.reduce((a, b) => a + b, 0);
    const isEven = sum % 2 === 0;
    const resultType = isEven ? 'even' : 'odd';
    const won = choice === resultType;
    
    // Show result
    setTimeout(() => {
        xocDiaResult.innerHTML = `
            <div style="font-size: 20px; margin: 10px 0;">
                🪙 Kết quả: ${results.join(' + ')} = ${sum}
            </div>
            <div style="font-size: 16px; color: #666;">
                ${isEven ? '✅ Chẵn' : '✅ Lẻ'}
            </div>
        `;
        
        if (won) {
            const payout = bet * 2;
            addBalance(payout);
            updateXocDiaBalance();
            
            xocDiaMessage.style.color = '#006400';
            xocDiaMessage.textContent = `🎉 Bạn thắng ${payout.toLocaleString()} đ!`;
            xocDiaResult.classList.remove('lose');
            xocDiaResult.classList.add('win');
            
            // Record transaction
            addTransaction({
                type: 'bet',
                gameName: 'Xóc Đĩa',
                choice: choice,
                result: resultType,
                sum: sum,
                betAmount: bet,
                payout: payout,
                netGain: payout - bet
            });
            
            // Confetti
            for (let i = 0; i < 12; i++) setTimeout(createConfetti, i * 60);
        } else {
            xocDiaMessage.style.color = '#c00';
            xocDiaMessage.textContent = '😢 Bạn thua lượt này!';
            xocDiaResult.classList.remove('win');
            xocDiaResult.classList.add('lose');
            
            // Record transaction
            addTransaction({
                type: 'bet',
                gameName: 'Xóc Đĩa',
                choice: choice,
                result: resultType,
                sum: sum,
                betAmount: bet,
                payout: 0,
                netGain: -bet
            });
        }
        
        btnXocDia.disabled = false;
    }, 1500);
});

// ============================================
// GAME - TÀI XỈU (OVER/UNDER 3 DICE)
// ============================================

const btnTaiXiu = document.getElementById('btnTaiXiu');
const taiXiuMessage = document.getElementById('taiXiuMessage');
const taiXiuResult = document.getElementById('taiXiuResult');
const diceDisplay = document.getElementById('diceDisplay');
const taiXiuBalance = document.getElementById('taiXiuBalance');

function updateTaiXiuBalance() {
    const bal = getBalance();
    if (taiXiuBalance) taiXiuBalance.textContent = `Số dư: ${bal.toLocaleString()} đ`;
}

window.addEventListener('load', () => {
    updateTaiXiuBalance();
});

btnTaiXiu.addEventListener('click', async () => {
    if (btnTaiXiu.disabled) return;
    
    // Check choice selected
    const selectedChoice = document.querySelector('input[name="taiXiuChoice"]:checked');
    if (!selectedChoice) {
        taiXiuMessage.style.color = '#c00';
        taiXiuMessage.textContent = 'Vui lòng chọn Tài hoặc Xỉu';
        return;
    }
    
    const choice = selectedChoice.value; // 'tai' or 'xiu'
    const bet = Number(document.getElementById('taiXiuBet').value) || 0;
    
    if (bet <= 0) {
        taiXiuMessage.style.color = '#c00';
        taiXiuMessage.textContent = 'Vui lòng nhập cược hợp lệ';
        return;
    }
    
    // Check balance
    const bal = getBalance();
    if (bal < bet) {
        taiXiuMessage.style.color = '#c00';
        taiXiuMessage.textContent = 'Số dư không đủ';
        return;
    }
    
    // Deduct bet
    addBalance(-bet);
    updateTaiXiuBalance();
    btnTaiXiu.disabled = true;
    
    // Roll 3 dice
    const diceValues = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
    ];
    
    // Smooth rolling animation with sequential reveal
    const bounceDelay = 180; // ms for reset bounce
    const rollDuration = 2000; // total rolling time (ms)
    const revealDelay = 180; // delay between revealing each dice

    // Play a small bounce on existing dice (reset feel)
    const prevDice = diceDisplay.querySelectorAll('.dice');
    if (prevDice.length) {
        prevDice.forEach(d => d.classList.add('bounce'));
    }

    // After bounce, start rolling display
    setTimeout(() => {
        diceDisplay.innerHTML = diceValues.map(() => '<div class="dice rolling">🎲</div>').join('');
        const rollingEls = diceDisplay.querySelectorAll('.dice');
        rollingEls.forEach(d => {
            d.classList.remove('bounce');
            // ensure rolling class present
            d.classList.add('rolling');
        });

        const sum = diceValues.reduce((a, b) => a + b, 0);
        const isTai = sum >= 11;
        const resultType = isTai ? 'tai' : 'xiu';
        const won = choice === resultType;

        // After rollDuration, reveal each dice one-by-one
        setTimeout(() => {
            const diceEls = diceDisplay.querySelectorAll('.dice');
            diceValues.forEach((v, i) => {
                setTimeout(() => {
                    const sym = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][v - 1];
                    const el = diceEls[i];
                    if (!el) return;
                    el.classList.remove('rolling');
                    el.classList.add('reveal');
                    el.textContent = sym;
                }, i * revealDelay);
            });

            // After all reveals, show result and handle payout
            const totalRevealTime = diceValues.length * revealDelay + 140;
            setTimeout(() => {
                taiXiuResult.innerHTML = `
                    <div style="font-size: 18px; margin: 10px 0;">
                        Tổng: <strong>${sum}</strong>
                    </div>
                    <div style="font-size: 16px; color: #666;">
                        ${isTai ? '📈 TÀI (≥ 11)' : '📉 XỈU (≤ 10)'}
                    </div>
                `;

                if (won) {
                    const payout = bet * 2;
                    addBalance(payout);
                    updateTaiXiuBalance();

                    taiXiuMessage.style.color = '#006400';
                    taiXiuMessage.textContent = `🎉 Bạn thắng ${payout.toLocaleString()} đ!`;
                    taiXiuResult.classList.remove('lose');
                    taiXiuResult.classList.add('win');

                    addTransaction({
                        type: 'bet',
                        gameName: 'Tài Xỉu',
                        choice: choice,
                        dices: diceValues.join('+'),
                        sum: sum,
                        betAmount: bet,
                        payout: payout,
                        netGain: payout - bet
                    });

                    for (let i = 0; i < 12; i++) setTimeout(createConfetti, i * 60);
                } else {
                    taiXiuMessage.style.color = '#c00';
                    taiXiuMessage.textContent = '😢 Bạn thua lượt này!';
                    taiXiuResult.classList.remove('win');
                    taiXiuResult.classList.add('lose');

                    addTransaction({
                        type: 'bet',
                        gameName: 'Tài Xỉu',
                        choice: choice,
                        dices: diceValues.join('+'),
                        sum: sum,
                        betAmount: bet,
                        payout: 0,
                        netGain: -bet
                    });
                }

                btnTaiXiu.disabled = false;
            }, totalRevealTime);

        }, rollDuration);

    }, bounceDelay);
});

// Init auth UI on load
updateAuthUI();
