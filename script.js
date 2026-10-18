const photos = [
  { url: 'assets/photo1.jpg', caption: 'รูปแรกที่น่ารักกกกกกกกที่สุด' },
  { url: 'assets/photo2.jpg', caption: 'รูปที่เท่&น่ารัก ✨' },
  { url: 'assets/photo3.jpg', caption: 'ขอให้มีรอยยิ้มแบบนี้ในทุกๆ วันนะ ❤️' }
];

let currentSlide = 0;
let loveCount = 0;
let isCandleBlown = false;

// 1. เริ่มระบบเมื่อกดเปิดกล่อง
function startSurprise() {
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('main-screen').classList.remove('hidden');

  fireConfetti();
  setInterval(createFloatingHeart, 500);
}

// 2. ระบบสลับแท็บเมนู
function switchTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.add('hidden'));

  const btns = document.querySelectorAll('.tab-btn');
  btns.forEach(btn => btn.classList.remove('active'));

  const targetTab = document.getElementById(`tab-${tabName}`);
  if (targetTab) {
    targetTab.classList.remove('hidden');
  }

  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
}

// 3. ระบบเป่าเทียนวันเกิด
function blowCandle() {
  if (isCandleBlown) return;

  const flame = document.getElementById('flame');
  const instruction = document.getElementById('wish-instruction');

  if (flame) flame.style.display = 'none';
  if (instruction) instruction.innerHTML = '✨ <b>คำอธิษฐานของคุณส่งถึงดวงดาวแล้ว ขอให้สมหวังทุกประการ!</b> ✨';
  isCandleBlown = true;

  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
}

// 4. ระบบปล่อยโคมลอยคำอธิษฐาน
function releaseLantern() {
  const wishInput = document.getElementById('wish-input');
  const skyArea = document.getElementById('sky-area');
  
  if (!wishInput || !skyArea) return;

  const wishText = wishInput.value.trim();

  if (wishText === "") {
    alert("กรุณาพิมพ์คำอธิษฐานก่อนปล่อยโคมนะ ✨");
    wishInput.focus();
    return;
  }

  wishInput.classList.add('folding-box');

  setTimeout(() => {
    wishInput.classList.remove('folding-box');
    wishInput.value = "";

    const skyHint = document.getElementById('sky-hint');
    if (skyHint) {
      skyHint.style.opacity = '0';
      setTimeout(() => skyHint.style.display = 'none', 500);
    }

    const lantern = document.createElement('div');
    lantern.classList.add('floating-lantern');
    lantern.innerHTML = `🏮 "${wishText}"`;

    const randomLeft = Math.floor(Math.random() * 50) + 25;
    lantern.style.left = `${randomLeft}%`;
    skyArea.appendChild(lantern);

    const successMsg = document.createElement('div');
    successMsg.style.position = 'absolute';
    successMsg.style.bottom = '10px';
    successMsg.style.color = '#ffeaa7';
    successMsg.style.fontSize = '12px';
    successMsg.style.fontWeight = 'bold';
    successMsg.style.zIndex = '6';
    successMsg.textContent = '✨ ส่งคำอธิษฐานขึ้นสู่ท้องฟ้าเรียบร้อยแล้ว ✨';
    skyArea.appendChild(successMsg);

    setTimeout(() => {
      successMsg.remove();
    }, 4000);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    setTimeout(() => {
      lantern.remove();
    }, 7000);

  }, 600);
}

// 5. ระบบ Carousel สไลด์รูปภาพ
function updateSlide() {
  const img = document.getElementById('carousel-img');
  const caption = document.getElementById('carousel-caption');
  if (!img || !caption) return;

  img.src = photos[currentSlide].url;
  caption.textContent = photos[currentSlide].caption;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % photos.length;
  updateSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + photos.length) % photos.length;
  updateSlide();
}

// 6. ระบบวาดต้นไม้พุ่มดอกไม้รูปหัวใจหนาแน่นและเสมือนจริง
function growHeartTree() {
  const canvas = document.getElementById('treeCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(175, 260);
  ctx.quadraticCurveTo(170, 190, 175, 140);
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#5d4037';
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(175, 170);
  ctx.quadraticCurveTo(130, 150, 110, 120);
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(175, 170);
  ctx.quadraticCurveTo(220, 150, 240, 120);
  ctx.lineWidth = 4;
  ctx.stroke();

  const flowerColors = ['#ff4757', '#ff6b81', '#ff7f50', '#ffc0cb', '#e84393', '#fd79a8'];
  let particlesCount = 0;
  const maxParticles = 600;

  function drawRealisticFlowerCluster() {
    if (particlesCount >= maxParticles) return;

    for (let i = 0; i < 15; i++) {
      let angle = Math.random() * Math.PI * 2;
      
      let hx = 16 * Math.pow(Math.sin(angle), 3);
      let hy = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
      
      let x = 175 + hx * (3.5 + Math.random() * 1.5);
      let y = 105 + hy * (3.5 + Math.random() * 1.5);

      let radius = Math.random() * 6 + 4;
      let color = flowerColors[Math.floor(Math.random() * flowerColors.length)];

      let gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.3, color);
      gradient.addColorStop(1, 'rgba(0,0,0,0.1)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    particlesCount += 15;
    requestAnimationFrame(drawRealisticFlowerCluster);
  }

  drawRealisticFlowerCluster();
}

// 7. ปุ่มส่งความรัก
function sendLove() {
  loveCount++;
  const countNum = document.getElementById('count-num');
  if (countNum) countNum.textContent = loveCount;
  
  createFloatingHeart();

  if (loveCount % 10 === 0) {
    fireConfetti();
  }
}

// 8. เอฟเฟกต์หัวใจลอยพื้นหลัง
function createFloatingHeart() {
  const container = document.getElementById('hearts-container');
  if (!container) return;

  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.innerHTML = ['❤️', '💖', '🌸', '✨', '💕'][Math.floor(Math.random() * 5)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = Math.random() * 2 + 3 + 's';

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

function fireConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}