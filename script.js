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
        const cardHeader = card.querySelector(".risk-header");
        const cardBody = card.querySelector(".risk-body");

        if (!cardHeader || !cardBody) return;

        /* Erste Karte offen, Rest geschlossen */
        if (index === 0) {
            cardBody.style.display = "block";
            card.classList.add("active");
        } else {
            cardBody.style.display = "none";
        }

        cardHeader.style.cursor = "pointer";

        cardHeader.addEventListener("click", function (event) {
            event.stopPropagation();

            const isOpen = card.classList.contains("active");

            if (isOpen) {
                card.classList.remove("active");
                cardBody.style.display = "none";
            } else {
                card.classList.add("active");
                cardBody.style.display = "block";
            }
        });
    });
});
