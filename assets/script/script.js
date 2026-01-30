document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");
  const contents = document.querySelectorAll(".content-block");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const target = card.dataset.target;
      let targetElement = null;

      contents.forEach(content => {
        content.classList.remove("active");

        if (content.dataset.type === target) {
          content.classList.toggle("active");
          targetElement = content;
        }
      });

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});
