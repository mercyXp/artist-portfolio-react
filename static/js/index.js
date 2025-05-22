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
