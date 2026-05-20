document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel-slide");
    const dotsContainer = document.querySelector(".carousel-dots");
    let current = 0;

    // Génère les dots
    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.classList.add("carousel-dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".carousel-dot");

    function goTo(index) {
        slides[current].classList.remove("active");
        dots[current].classList.remove("active");
        current = (index + slides.length) % slides.length;
        slides[current].classList.add("active");
        dots[current].classList.add("active");
    }

    document.querySelector(".carousel-btn.prev").addEventListener("click", () => goTo(current - 1));
    document.querySelector(".carousel-btn.next").addEventListener("click", () => goTo(current + 1));

    // Navigation clavier
    document.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft") goTo(current - 1);
        if (e.key === "ArrowRight") goTo(current + 1);
    });
});