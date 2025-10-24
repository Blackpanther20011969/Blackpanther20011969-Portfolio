// Sanfter Scroll-Effekt für den Hero-Text
window.addEventListener("scroll", () => {
    const heroContent = document.querySelector(".hero-content");
    const cvSection = document.querySelector(".cv-section");
    if (heroContent && cvSection) {
        let scrollValue = window.scrollY * 0.3;
        let maxScroll = cvSection.getBoundingClientRect().top - heroContent.getBoundingClientRect().top;
        if (scrollValue > maxScroll) {
            scrollValue = maxScroll;
        }
        heroContent.style.transform = `translateY(${scrollValue}px)`;
    }
});

// Sanftes Scrollen zu internen Links (z. B. #projects)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Sanftes Scrollen zu internen Links beim Laden der Seite
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".download-btn");

    buttons.forEach(button => {
        button.addEventListener("mouseover", function () {
            const imageId = this.getAttribute("data-image");
            const image = document.getElementById(imageId);
            if (image) {
                image.style.display = "block";
            }
        });

        button.addEventListener("mouseout", function () {
            const imageId = this.getAttribute("data-image");
            const image = document.getElementById(imageId);
            if (image) {
                image.style.display = "none";
            }
        });
    });
});

