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
    '/static/images/hero3.jpg',
    '/static/images/hero4.jpg'
  ];
  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    hero.style.backgroundImage = `url('${images[currentIndex]}')`;
  }, 2000);
