document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".art-piece");
  const frames = document.querySelectorAll(".gallery-banner .frame");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      cards.forEach((card) => {
        const tags = card.getAttribute("data-tags").split(" ");
        card.style.display = (filter === "all" || tags.includes(filter)) ? "block" : "none";
      });

      frames.forEach((frame) => {
        const tags = frame.getAttribute("data-tags").split(" ");
        if (filter === "all" || tags.includes(filter)) {
          frame.classList.remove("faded");
        } else {
          frame.classList.add("faded");
        }
      });
    });
  });
});
