// Feather Icons + Mobile Toggle Script 

document.addEventListener("DOMContentLoaded", () => {
  // Replace all feather icons
  feather.replace();

  const toggleBtn = document.getElementById("menu-toggle");
  const menuIcon = document.getElementById("menu-icon");
  const mobileMenu = document.getElementById("mobile-menu");

  let menuOpen = false;

  toggleBtn.addEventListener("click", () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle("hidden");

    // Toggle feather icon (menu ↔ x)
    menuIcon.setAttribute("data-feather", menuOpen ? "x" : "menu");

    // Replace icons again after DOM change
    feather.replace();
  });
});

// Background Images for the Hero Section
const hero = document.getElementById('hero');
  const images = [
    '/static/images/hero1.png',
    '/static/images/hero2.png',
    '/static/images/hero3.png',
    '/static/images/hero4.png'
  ];
  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    hero.style.backgroundImage = `url('${images[currentIndex]}')`;
  }, 2000);


//FEATURED ARTWORK
  document.addEventListener('DOMContentLoaded', async () => {
  feather.replace();

  // Menu toggle for mobile
  const toggleBtn = document.getElementById("menu-toggle");
  const menuIcon = document.getElementById("menu-icon");
  const mobileMenu = document.getElementById("mobile-menu");

  let menuOpen = false;
  toggleBtn.addEventListener("click", () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle("hidden");
    menuIcon.setAttribute("data-feather", menuOpen ? "x" : "menu");
    feather.replace();
  });

  // Background Image Rotation
  const hero = document.getElementById('hero');
  const images = [
    '/static/images/hero1.png',
    '/static/images/hero2.png',
    '/static/images/hero3.png',
    '/static/images/hero4.png'
  ];
  let currentIndex = 0;
  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    hero.style.backgroundImage = `url('${images[currentIndex]}')`;
  }, 2000);

  // Featured Artwork Cards
  const response = await fetch('/api/featured-artworks');
  const artworks = await response.json();
  const container = document.getElementById('artwork-cards');

  artworks.forEach(art => {
    const card = document.createElement('div');
    card.className = 'swiper-slide';

    card.innerHTML = `
      <a href="${art.image}" data-lightbox="featured" data-title="${art.title}">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 duration-300 w-[300px]">
          <img src="${art.image}" alt="${art.title}" class="w-full h-64 object-cover" />
          <div class="p-4 text-left">
            <h3 class="text-lg font-semibold mb-1">${art.title}</h3>
            <p class="text-sm text-gray-600">${art.description}</p>
          </div>
        </div>
      </a>
    `;
    container.appendChild(card);
  });

  // Initialize Swiper
  new Swiper('.mySwiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 150,
      modifier: 1,
      slideShadows: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
});



