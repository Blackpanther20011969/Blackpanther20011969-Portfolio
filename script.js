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
     Optional: Drag & Drop für Risk Boards
     Wird nur aktiv, wenn Elemente vorhanden sind.
  ========================= */
  const cards = document.querySelectorAll(".risk-card");
  const columns = document.querySelectorAll(".jira-column");

  let draggedCard = null;

  if (cards.length > 0 && columns.length > 0) {
    cards.forEach(function (card) {
      card.addEventListener("dragstart", function () {
        draggedCard = card;
        card.classList.add("dragging");
      });

      card.addEventListener("dragend", function () {
        card.classList.remove("dragging");
        draggedCard = null;
      });
    });

    columns.forEach(function (column) {
      column.addEventListener("dragover", function (event) {
        event.preventDefault();
        column.classList.add("drag-over");
      });

      column.addEventListener("dragleave", function () {
        column.classList.remove("drag-over");
      });

      column.addEventListener("drop", function () {
        column.classList.remove("drag-over");

        if (draggedCard) {
          column.appendChild(draggedCard);
        }
      });
    });
  }
});
