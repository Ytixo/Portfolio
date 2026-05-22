document.addEventListener("DOMContentLoaded", () => {
    // ── CAROUSEL ──
    const slides = document.querySelectorAll(".carousel-slide");
    const dotsContainer = document.querySelector(".carousel-dots");
    let current = 0;

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

    document.addEventListener("keydown", e => {
        if (popupOverlay.classList.contains("open")) {
            if (e.key === "ArrowLeft") popupGoTo(popupIndex - 1);
            if (e.key === "ArrowRight") popupGoTo(popupIndex + 1);
            if (e.key === "Escape") closePopup();
        } else {
            if (e.key === "ArrowLeft") goTo(current - 1);
            if (e.key === "ArrowRight") goTo(current + 1);
        }
    });

    // ── POPUP ──
    const popupOverlay = document.getElementById("popupOverlay");
    const popupImg = document.getElementById("popupImg");
    const popupCounter = document.getElementById("popupCounter");
    let popupImages = [];
    let popupIndex = 0;

    function openPopup(images) {
        popupImages = images;
        popupIndex = 0;
        renderPopupImage();
        popupOverlay.classList.add("open");
    }

    function closePopup() {
        popupOverlay.classList.remove("open");
    }

    function popupGoTo(index) {
        popupIndex = (index + popupImages.length) % popupImages.length;
        renderPopupImage();
    }

    function renderPopupImage() {
        popupImg.src = popupImages[popupIndex];
        popupImg.alt = `Image ${popupIndex + 1}`;
        popupCounter.textContent = `${popupIndex + 1} / ${popupImages.length}`;
    }

    // Boutons "Voir plus"
    document.querySelectorAll(".see-more-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const images = JSON.parse(btn.dataset.images);
            openPopup(images);
        });
    });

    document.getElementById("closePopup").addEventListener("click", closePopup);
    document.querySelector(".pop-prev").addEventListener("click", () => popupGoTo(popupIndex - 1));
    document.querySelector(".pop-next").addEventListener("click", () => popupGoTo(popupIndex + 1));

    // Clic sur l'overlay pour fermer
    popupOverlay.addEventListener("click", e => {
        if (e.target === popupOverlay) closePopup();
    });
});