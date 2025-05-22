
document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  const toggleBtn = document.getElementById("menu-toggle");
  const menuIcon = document.getElementById("menu-icon");
  const mobileMenu = document.getElementById("mobile-menu");

  let menuOpen = false;

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle("hidden");
      menuIcon.setAttribute("data-feather", menuOpen ? "x" : "menu");
      feather.replace(); // Re-render icons
    });
  }
});
