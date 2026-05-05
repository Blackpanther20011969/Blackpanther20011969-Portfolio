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
   DRAG & DROP JIRA BOARD
========================= */

const cards = document.querySelectorAll('.risk-card');
const columns = document.querySelectorAll('.jira-column');

let draggedCard = null;

cards.forEach(card => {
    card.addEventListener('dragstart', () => {
        draggedCard = card;
        card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        draggedCard = null;
    });
});

columns.forEach(column => {
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
        column.classList.add('drag-over');
    });

    column.addEventListener('dragleave', () => {
        column.classList.remove('drag-over');
    });

    column.addEventListener('drop', () => {
        column.classList.remove('drag-over');

        if (draggedCard) {
            column.appendChild(draggedCard);
        }
    });
});

<script>
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('show');
}
</script>
