const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
const menuOverlay = document.querySelector(".menu-overlay");
const menuLinks = document.querySelectorAll(".menu-overlay a");

menuToggle.addEventListener("click", () => {
  menuOverlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
});

menuClose.addEventListener("click", () => {
  menuOverlay.classList.remove("is-open");
  document.body.style.overflow = "";
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuOverlay.classList.remove("is-open");
    document.body.style.overflow = "";
  });
});