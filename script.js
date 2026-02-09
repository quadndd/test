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
// THÔNG BAO BẢO VỆ TRANG
// ============================================

console.log("🎊 Chúc mừng bạn đến với Tết Vibe! 🎊");
console.log("✨ Tết này, hãy tận hưởng khoảnh khắc hạnh phúc cùng người thân! ✨");
