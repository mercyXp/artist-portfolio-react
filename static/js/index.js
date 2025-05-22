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
  const response = await fetch('/api/featured-artworks');
  const artworks = await response.json();
  const container = document.getElementById('artwork-cards');

  artworks.forEach(art => {
    const card = document.createElement('div');
    card.className = 'swiper-slide';
    card.innerHTML = `
      <div class="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer" onclick="window.location.href='${art.image}'">
        <img src="${art.image}" alt="${art.title}" class="w-full h-64 object-cover" />
        <div class="p-4 text-left">
          <h3 class="text-lg font-semibold mb-1">${art.title}</h3>
          <p class="text-sm text-gray-600">${art.description}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  new Swiper('.mySwiper', {
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 500,           // 0.5 second delay
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
});
