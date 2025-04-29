// ==== DOM SELECTORS ====
const siteHeader = document.querySelector(".site-header");
const hamburgerBtn = document.querySelector(".hamburger-button");
const overlayNav = document.querySelector(".header-overlay");

// ==== NAVIGATION TOGGLE ====
function toggleHeader(element) {
  element.addEventListener("click", () => {
    siteHeader.classList.toggle("active");
    hamburgerBtn.classList.toggle("active");
    document.body.classList.toggle("over-hide");
  });
}

if (hamburgerBtn) toggleHeader(hamburgerBtn);
if (overlayNav) toggleHeader(overlayNav);

// ==== HEADER SCROLL EFFECT ====
window.addEventListener("scroll", () => {
  siteHeader.classList.toggle("scroll", window.scrollY > 10);
});

window.addEventListener("load", () => {
  siteHeader.classList.toggle("scroll", window.scrollY > 10);
});
