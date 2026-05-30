

import '@lottiefiles/lottie-player';

function initUptimeCounter() {
    const startDate = new Date('2025-06-18T00:00:00+05:00'); 

    function updateCounter() {
        const now = new Date();
        
        const msPerSec = 1000;
        const msPerMin = msPerSec * 60;
        const msPerHour = msPerMin * 60;
        const msPerDay = msPerHour * 24;

        let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());

        let anniversary = new Date(startDate);
        anniversary.setMonth(startDate.getMonth() + months);

        if (now < anniversary) {
            months--;
            anniversary = new Date(startDate);
            anniversary.setMonth(startDate.getMonth() + months);
        }

        let diffMs = now - anniversary;
        if (diffMs < 0) diffMs = 0;

        const days = Math.floor(diffMs / msPerDay);
        diffMs %= msPerDay;

        const hours = Math.floor(diffMs / msPerHour);

        const elements = {
            'uptime-months': months,
            'uptime-days': days,
            'uptime-hours': hours.toString().padStart(2, '0')
        };

        for (const [id, val] of Object.entries(elements)) {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        }
    }

    updateCounter();
    setInterval(updateCounter, 1000);
}

class TgEmoji extends HTMLElement {
    connectedCallback() {
        const emojiId = this.getAttribute('emoji-id') || '';
        const emojiSymbol = this.textContent.trim();
        
        let glowClass = 'emoji-default';
        let lottieSrc = '';

        if (emojiId === '5992474324273995420') {
            glowClass = 'emoji-premium-lightning';
            lottieSrc = './asstes/logo.json';
        } else if (emojiId === '5468239023456722394') { 
            glowClass = 'emoji-crown';
            lottieSrc = './asstes/0.json';
        } else if (emojiId === '5468239023456722395') { 
            glowClass = 'emoji-lightning';
            lottieSrc = './asstes/1.json';
        } else if (emojiId === '5468239023456722397') { 
            glowClass = 'emoji-star';
            lottieSrc = './asstes/2.json';
        } else if (emojiId === '5468239023456722396') { 
            glowClass = 'emoji-gem';
            lottieSrc = './asstes/3.json';
        } else if (emojiId === '5231339530249845638') { 
            glowClass = 'emoji-default';
            lottieSrc = './asstes/4.json';
        } else if (emojiId === '5468239023456722398') { 
            glowClass = 'emoji-fire';
            lottieSrc = './asstes/5.json';
        } else if (emojiId === '5468239023456722399') { 
            glowClass = 'emoji-gift';
            lottieSrc = './asstes/6.json';
        }
        
        if (lottieSrc) {
            this.innerHTML = `
                <span class="premium-emoji lottie-emoji-badge ${glowClass}" data-emoji-id="${emojiId}">
                    <lottie-player src="${lottieSrc}" background="transparent" speed="1.2" style="width: 100%; height: 100%;" loop autoplay></lottie-player>
                </span>
            `;
        } else {
            if (emojiSymbol === '👑') glowClass = 'emoji-crown';
            else if (emojiSymbol === '⚡') glowClass = 'emoji-lightning';
            else if (emojiSymbol === '💎') glowClass = 'emoji-gem';
            else if (emojiSymbol === '⭐') glowClass = 'emoji-star';
            
            this.innerHTML = `
                <span class="premium-emoji ${glowClass}" data-emoji-id="${emojiId}">
                    ${emojiSymbol}
                </span>
            `;
        }
    }
}
customElements.define('tg-emoji', TgEmoji);

const admins = [
    { username: 'xolid', name: 'Xolid', role: 'Ega', color: 'from-orange-400 to-red-500', text: 'Ega' },
    { username: 'tonchivoy', name: 'Tonchivoy', role: 'Admin', color: 'from-blue-400 to-indigo-500', text: 'Admin' },
    { username: 'jama_0432', name: 'Jama', role: 'Admin', color: 'from-emerald-400 to-teal-600', text: 'Admin' },
    { username: 'bbaxttt', name: 'Baxt', role: 'Admin', color: 'from-rose-400 to-pink-500', text: 'Admin' },
    { username: 'kafilhub', name: 'Kafil Hub', role: 'Admin', color: 'from-purple-400 to-violet-600', text: 'Admin' },
    { username: 'kaylora', name: 'Kaylora', role: 'Admin', color: 'from-cyan-400 to-blue-500', text: 'Admin' }
];

let currAngle = 0;
let isDragging = false;
let startX = 0;
let currentRotationY = 0;
let autoRotateActive = true;
let radius = 230; 

function setupTeamCarousel() {
    const container = document.getElementById('carousel-container');
    if (!container) return;

    container.innerHTML = '';

    if (window.innerWidth < 768) {
        radius = 135; 
    } else if (window.innerWidth < 1024) {
        radius = 195; 
    } else {
        radius = 260; 
    }

    admins.forEach((admin, i) => {
        const card = document.createElement('div');
        card.className = 'carousel-card flex flex-col items-center justify-between p-3.5 cursor-pointer select-none';
        card.setAttribute('data-index', i);
        const initials = admin.name.substring(0, 2).toUpperCase();

        const directAvatarUrl = `https://t.me/i/userpic/320/${admin.username}.jpg`;

        card.innerHTML = `
            <div class="w-full flex items-center justify-between">
                <span class="px-1.5 py-0.5 text-[8px] font-extrabold rounded bg-tggreen-neon/10 text-tggreen-neon border border-tggreen-neon/20">
                    ${admin.text}
                </span>
                <i class="fab fa-telegram text-tgblue text-xs"></i>
            </div>
            
            <div class="relative flex flex-col items-center">
                <!-- Auto fetching profile pictures directly from t.me/i/userpic/320/ format -->
                <div class="relative w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${admin.color} border border-white/10 shadow mb-1.5 overflow-hidden">
                    <img src="${directAvatarUrl}" 
                         alt="${admin.name}"
                         class="absolute inset-0 w-full h-full object-cover"
                         onerror="this.style.display='none'" />
                    <span class="text-xs md:text-sm font-black text-white tracking-wider">${initials}</span>
                </div>
                <h3 class="font-bold text-[10px] md:text-xs text-slate-800 leading-tight">${admin.name}</h3>
                <span class="text-[8px] md:text-[9px] text-slate-500 font-medium">@${admin.username}</span>
            </div>
            
            <a href="https://t.me/${admin.username}" 
               target="_blank" 
               class="w-full text-center py-1 md:py-1.5 px-2 rounded-lg bg-tgblue/10 hover:bg-tgblue/20 border border-tgblue/15 text-tgblue text-[8px] md:text-[9px] font-extrabold transition-all duration-300">
                Yozish <i class="fas fa-paper-plane ml-0.5"></i>
            </a>
        `;
        container.appendChild(card);
    });

    updateCardsPosition();

    if (!container.getAttribute('data-initialized')) {
        container.addEventListener('mousedown', dragStart);
        window.addEventListener('mousemove', dragMove);
        window.addEventListener('mouseup', dragEnd);
        container.addEventListener('touchstart', dragStart, { passive: true });
        window.addEventListener('touchmove', dragMove, { passive: false });
        window.addEventListener('touchend', dragEnd);
        container.setAttribute('data-initialized', 'true');
    }

    container.querySelectorAll('.carousel-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (Math.abs(startX - (e.clientX || e.touches?.[0]?.clientX || 0)) > 5) return;
            const idx = parseInt(card.getAttribute('data-index'));
            const targetAngle = -idx * 60;
            
            autoRotateActive = false;
            animateRotation(targetAngle);
            setTimeout(() => { autoRotateActive = true; }, 8000);
        });
    });
}

function animateRotation(targetAngle) {
    let diff = (targetAngle - currAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    let step = 0;
    const duration = 20; 
    
    function anim() {
        if (step < duration && !isDragging) {
            currAngle += diff / duration;
            updateCardsPosition();
            step++;
            requestAnimationFrame(anim);
        } else if (!isDragging) {
            currAngle = targetAngle;
            updateCardsPosition();
        }
    }
    anim();
}

function updateCardsPosition() {
    const cards = document.querySelectorAll('.carousel-card');
    const total = cards.length;
    if (total === 0) return;

    const activeIdx = Math.round(-currAngle / 60) % total;
    const normalizedActiveIdx = activeIdx < 0 ? total + activeIdx : activeIdx;

    cards.forEach((card, i) => {
        const cardAngle = i * 60;
        const currentCardRot = cardAngle + currAngle;
        
        card.style.transform = `rotateY(${currentCardRot}deg) translateZ(${radius}px) rotateY(${-currentCardRot}deg)`;
        
        const rad = (currentCardRot * Math.PI) / 180;
        const cosVal = Math.cos(rad);
        card.style.zIndex = Math.round((cosVal + 1) * 10);

        if (i === normalizedActiveIdx) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

function dragStart(e) {
    isDragging = true;
    autoRotateActive = false;
    startX = e.clientX || e.touches?.[0]?.clientX || 0;
    currentRotationY = currAngle;
}

function dragMove(e) {
    if (!isDragging) return;

    if (e.touches && e.cancelable) {
        e.preventDefault();
    }
    
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
    const deltaX = clientX - startX;
    const sensitivity = 0.25;
    
    currAngle = currentRotationY + deltaX * sensitivity;
    updateCardsPosition();
}

function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    
    const targetAngle = Math.round(currAngle / 60) * 60;
    animateRotation(targetAngle);
    
    setTimeout(() => {
        if (!isDragging) autoRotateActive = true;
    }, 6000);
}

function autoRotateLoop() {
    if (autoRotateActive && !isDragging && document.getElementById('team-page')?.classList.contains('active')) {
        currAngle -= 0.12; 
        updateCardsPosition();
    }
    requestAnimationFrame(autoRotateLoop);
}

const productsData = {
    premium: [
        { name: "Telegram Premium (3 oylik)", price: "95,000 UZS", label: "Sovg'a", icon: "🎁" },
        { name: "Telegram Premium (6 oylik)", price: "165,000 UZS", label: "Hamyonbop", icon: "✨" },
        { name: "Telegram Premium (12 oylik)", price: "290,000 UZS", label: "Eng zo'r narx", icon: "👑" }
    ],
    stars: [
        { name: "50 Telegram Stars", price: "15,000 UZS", label: "Tezkor", icon: "⭐" },
        { name: "100 Telegram Stars", price: "29,000 UZS", label: "Ommabop", icon: "⭐" },
        { name: "250 Telegram Stars", price: "69,000 UZS", label: "Eng yaxshi", icon: "⭐" },
        { name: "500 Telegram Stars", price: "135,000 UZS", label: "Ko'p sotilgan", icon: "⭐" },
        { name: "1000 Telegram Stars", price: "260,000 UZS", label: "Katta paket", icon: "⭐" }
    ]
};

function renderProducts(category) {
    const view = document.getElementById('products-view');
    if (!view) return;

    view.innerHTML = '';
    const items = productsData[category] || [];

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'p-3 rounded-xl bg-white/60 hover:bg-white/95 border border-slate-200/50 flex items-center justify-between transition-all hover:border-tgpremium/30 hover:scale-[1.01] hover:shadow-sm shadow-xs';
        
        itemDiv.innerHTML = `
            <div class="flex items-center space-x-2">
                <span class="text-base">${item.icon}</span>
                <div>
                    <span class="block text-[10.5px] font-bold text-slate-800">${item.name}</span>
                    <span class="text-[8px] text-slate-500 font-semibold tracking-wide uppercase">${item.label}</span>
                </div>
            </div>
            <span class="text-[8.5px] text-tgpremium bg-tgpremium/10 px-2 py-0.5 rounded-md font-extrabold uppercase tracking-wider flex items-center gap-1 transition-all hover:bg-tgpremium hover:text-white border border-tgpremium/10">
                Botda <i class="fab fa-telegram-plane"></i>
            </span>
        `;
        view.appendChild(itemDiv);
    });
}

function initShopWidget() {
    const btnPremium = document.getElementById('prod-tab-premium');
    const btnStars = document.getElementById('prod-tab-stars');

    if (!btnPremium || !btnStars) return;

    const tabs = [btnPremium, btnStars];

    function selectTab(activeBtn, category) {
        tabs.forEach(btn => {
            btn.classList.remove('text-slate-900', 'border-tgpremium');
            btn.classList.add('text-slate-400', 'border-transparent');
        });
        activeBtn.classList.remove('text-slate-400', 'border-transparent');
        activeBtn.classList.add('text-slate-900', 'border-tgpremium');

        renderProducts(category);
    }

    btnPremium.addEventListener('click', () => selectTab(btnPremium, 'premium'));
    btnStars.addEventListener('click', () => selectTab(btnStars, 'stars'));

    selectTab(btnPremium, 'premium');
}

function createBackgroundParticles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = document.getElementById('particles-container') || document.body;
    const colors = ['rgba(0, 255, 102, 0.04)', 'rgba(0, 152, 234, 0.03)', 'rgba(142, 45, 226, 0.03)'];
    const limit = window.innerWidth < 768 ? 3 : 6;
    
    for (let i = 0; i < limit; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 120 + 50;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.bottom = `-${Math.random() * 20 + 5}vh`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${Math.random() * 18 + 12}s`;
        
        particle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]} 0%, rgba(0,0,0,0) 70%)`;
        
        container.appendChild(particle);
    }
}

function initNavigation() {
    const desktopTabs = document.querySelectorAll('header nav button');
    const mobileTabs = document.querySelectorAll('.mobile-bottom-nav button');
    const pages = document.querySelectorAll('.page-section');
    const indicator = document.querySelector('.bottom-nav-active-indicator');

    function syncActivePage(pageId) {
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });

        desktopTabs.forEach(tab => {
            if (tab.getAttribute('data-page') === pageId) {
                tab.classList.add('text-tggreen-neon', 'bg-green-950/20');
                tab.classList.remove('text-slate-400');
            } else {
                tab.classList.remove('text-tggreen-neon', 'bg-green-950/20');
                tab.classList.add('text-slate-400');
            }
        });

        let activeMobileTab = null;
        mobileTabs.forEach(tab => {
            if (tab.getAttribute('data-page') === pageId) {
                tab.classList.add('nav-tab-active');
                activeMobileTab = tab;
                const icon = tab.querySelector('i');
                if (icon) icon.classList.add('scale-115');
            } else {
                tab.classList.remove('nav-tab-active');
                const icon = tab.querySelector('i');
                if (icon) icon.classList.remove('scale-115');
            }
        });

        if (indicator && activeMobileTab) {
            const rect = activeMobileTab.getBoundingClientRect();
            const parentRect = activeMobileTab.parentElement.getBoundingClientRect();
            const leftOffset = rect.left - parentRect.left + (rect.width - 20) / 2;
            indicator.style.left = `${leftOffset}px`;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (pageId === 'team-page') {
            setTimeout(setupTeamCarousel, 100);
        }
    }

    function handleRouting() {
        const hash = window.location.hash.replace('#', '');
        const validPages = ['home-page', 'hub-page', 'market-page', 'team-page'];
        if (validPages.includes(hash)) {
            syncActivePage(hash);
        } else {
            syncActivePage('home-page');
        }
    }

    desktopTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const pageId = tab.getAttribute('data-page');
            window.location.hash = pageId;
        });
    });

    mobileTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const pageId = tab.getAttribute('data-page');
            window.location.hash = pageId;
        });
    });

    const switchBtns = document.querySelectorAll('.nav-tab-switch');
    switchBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const pageId = btn.getAttribute('data-target-page') || 'hub-page';
            window.location.hash = pageId;
        });
    });

    window.addEventListener('hashchange', handleRouting);

    handleRouting();

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
        const activeTab = document.querySelector('.nav-tab-active');
        if (activeTab) {
            const pageId = activeTab.getAttribute('data-page');
            syncActivePage(pageId);
        }
        setupTeamCarousel();
        }, 120);
    });
}

function initStickerShowcase() {
    const p1 = document.getElementById('showcase-anim-1');
    const p2 = document.getElementById('showcase-anim-2');
    if (!p1 || !p2) return;

    const stickerAssets = [
        './stickers/0_0.json',
        './stickers/1_1.json',
        './stickers/2_3.json',
        './stickers/3_5.json',
        './stickers/4_6.json',
        './stickers/5_8.json',
        './stickers/6_10.json',
        './stickers/7_12.json',
        './stickers/8_14.json',
        './stickers/9_16.json',
        './stickers/10_18.json',
        './stickers/11_20.json',
        './stickers/12_22.json',
        './stickers/13_24.json',
        './stickers/14_26.json',
        './stickers/15_28.json',
        './stickers/16_30.json',
        './stickers/17_32.json',
        './stickers/18_34.json',
        './stickers/19_36.json',
        './stickers/20_38.json',
        './stickers/21_40.json',
        './stickers/22_42.json',
        './stickers/23_44.json',
        './stickers/24_46.json',
        './stickers/25_48.json',
        './stickers/26_50.json',
        './stickers/27_52.json',
        './stickers/28_54.json',
        './stickers/29_56.json',
        './stickers/30_58.json',
        './stickers/31_60.json',
        './stickers/32_62.json',
        './stickers/33_64.json'
    ];

    let currentIndex = 0;
    let activePlayer = 1; 

    setInterval(() => {
        
        currentIndex = (currentIndex + 1) % stickerAssets.length;
        const nextAsset = stickerAssets[currentIndex];

        if (activePlayer === 1) {
            
            p2.innerHTML = `<lottie-player src="${nextAsset}" background="transparent" speed="1.2" style="width: 100%; height: 100%;" loop autoplay></lottie-player>`;
            
            p1.style.opacity = '0';
            p1.style.transform = 'scale(0.75)';
            p2.style.opacity = '1';
            p2.style.transform = 'scale(1)';
            activePlayer = 2;
        } else {
            
            p1.innerHTML = `<lottie-player src="${nextAsset}" background="transparent" speed="1.2" style="width: 100%; height: 100%;" loop autoplay></lottie-player>`;
            
            p2.style.opacity = '0';
            p2.style.transform = 'scale(0.75)';
            p1.style.opacity = '1';
            p1.style.transform = 'scale(1)';
            activePlayer = 1;
        }
    }, 1800);
}

function hideLoader() {
    const loader = document.getElementById('premium-loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(() => {
            loader.remove();
        }, 700);
    }
}

function startApp() {
    initUptimeCounter();
    createBackgroundParticles();
    initNavigation();
    initShopWidget();
    setupTeamCarousel();
    initStickerShowcase();
    autoRotateLoop();

    if (document.readyState === 'complete') {
        setTimeout(hideLoader, 1000); 
    } else {
        window.addEventListener('load', () => {
            setTimeout(hideLoader, 1000);
        });
        
        setTimeout(hideLoader, 3000);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}
