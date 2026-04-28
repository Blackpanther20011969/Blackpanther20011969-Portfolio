document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelector(".nav-links");
    const menuButton = document.querySelector(".menu-icon");
    const header = document.querySelector(".header");

    /* =========================
       Mobile Navigation
    ========================= */
    window.toggleMenu = function () {
        if (navLinks) {
            navLinks.classList.toggle("show");
        }
    };

    /* =========================
       Sanftes Scrollen zu internen Links
    ========================= */
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

            /* Mobiles Menü nach Klick schließen */
            if (navLinks && navLinks.classList.contains("show")) {
                navLinks.classList.remove("show");
            }
        });
    });

    /* =========================
       Menü schließen bei Klick außerhalb
    ========================= */
    document.addEventListener("click", function (event) {
        if (!navLinks || !menuButton) return;

        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedMenuButton = menuButton.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {
            navLinks.classList.remove("show");
        }
    });

    /* =========================
       Risk Cards ein-/ausklappen
    ========================= */
    const riskCards = document.querySelectorAll(".risk-card");

    riskCards.forEach(function (card, index) {
        const header = card.querySelector(".risk-header");
        const body = card.querySelector(".risk-body");

        if (!header || !body) return;

        /* Standard: erste Karte offen, alle anderen zu */
        if (index === 0) {
            body.style.display = "block";
            card.classList.add("active");
        } else {
            body.style.display = "none";
        }

        header.style.cursor = "pointer";

        header.addEventListener("click", function (event) {
            event.stopPropagation();

            const isOpen = card.classList.contains("active");

            if (isOpen) {
                card.classList.remove("active");
                body.style.display = "none";
            } else {
                card.classList.add("active");
                body.style.display = "block";
            }
        });
    });
});
``
