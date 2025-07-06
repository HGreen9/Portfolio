document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("[data-filter]");
  const items = document.querySelectorAll(".art-piece");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      items.forEach((item) => {
        const itemTags = item.getAttribute("data-tags").split(" ");
        if (filter === "all" || itemTags.includes(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});
