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

  // Featured ArtWork
  document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/artworks")
    .then(res => res.json())
    .then(data => {
      const carousel = document.getElementById("artwork-carousel");
      data.forEach(art => {
        const card = document.createElement("div");
        card.className = "min-w-[250px] bg-white rounded shadow hover:shadow-md transition p-4 text-left";
        card.innerHTML = `
          <img src="${art.image}" alt="${art.title}" class="rounded mb-2 w-full h-48 object-cover" />
          <h3 class="text-lg font-semibold">${art.title}</h3>
          <p class="text-sm text-gray-600">${art.description}</p>
        `;
        carousel.appendChild(card);
      });
    });

  // Carousel scrolling
  document.getElementById("prevBtn").addEventListener("click", () => {
    document.getElementById("artwork-carousel").scrollBy({
      left: -300,
      behavior: "smooth"
    });
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    document.getElementById("artwork-carousel").scrollBy({
      left: 300,
      behavior: "smooth"
    });
  });
});
