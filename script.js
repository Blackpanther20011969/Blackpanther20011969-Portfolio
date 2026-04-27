document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelector(".nav-links");
    const menuButton = document.querySelector(".menu-icon");
    const header = document.querySelector(".header");
    const heroContent = document.querySelector(".hero-content");

    // Mobile Navigation ein-/ausblenden
    window.toggleMenu = function () {
        if (navLinks) {
            navLinks.classList.toggle("show");
        }
    };

    // Sanftes Scrollen zu internen Links mit Header-Ausgleich
    document.querySelectorAll('a[href^="#"]').forEach(link => {
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

            // Mobiles Menü nach Klick schließen
            if (navLinks && navLinks.classList.contains("show")) {
                navLinks.classList.remove("show");
            }
        });
    });

    // Leichter Parallax-/Scroll-Effekt für den Hero-Text
    function handleHeroScroll() {
        if (!heroContent) return;

        const scrollValue = Math.min(window.scrollY * 0.25, 120);
        heroContent.style.transform = `translateY(${scrollValue}px)`;
    }

    window.addEventListener("scroll", handleHeroScroll);

    // Optional: Menü schließen, wenn man außerhalb klickt
    document.addEventListener("click", function (event) {
        if (!navLinks || !menuButton) return;

        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedMenuButton = menuButton.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {
            navLinks.classList.remove("show");
        }
        // Expandable Risk Rows
document.querySelectorAll('.expandable').forEach(row => {
    row.addEventListener('click', () => {
        row.classList.toggle('active');
  

    });
});

