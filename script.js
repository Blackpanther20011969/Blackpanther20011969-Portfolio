document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelector(".nav-links");
  const menuButton = document.querySelector(".menu-icon");
  const header = document.querySelector(".header");

  window.toggleMenu = function () {
    if (navLinks) {
      navLinks.classList.toggle("show");
    }
  };

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      if (navLinks && navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
      }
    });
  });

  document.addEventListener("click", function (event) {
    if (!navLinks || !menuButton) return;

    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      navLinks.classList.remove("show");
    }
  });
});
