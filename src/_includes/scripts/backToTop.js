document.addEventListener("DOMContentLoaded", () => {
  const bottone = document.querySelector(".back-to-top");

  if (!bottone) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      bottone.setAttribute("data-visible", "true");
    } else {
      bottone.setAttribute("data-visible", "false");
    }
  }, { passive: true });
});