document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".art-piece");

  function applyHighlight(id) {
    items.forEach(item => item.classList.remove("highlighted"));
    const target = document.querySelector(id);
    if (target) {
      target.classList.add("highlighted");
      setTimeout(() => {
        target.classList.remove("highlighted");
      }, 2500); // 2.5 seconds
    }
  }

  // On page load (if there's a hash)
  if (window.location.hash) {
    applyHighlight(window.location.hash);
  }

  // On hash change (when a banner is clicked)
  window.addEventListener("hashchange", () => {
    applyHighlight(window.location.hash);
  });
});
