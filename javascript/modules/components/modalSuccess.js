const overlaySuccess = document.querySelector(".overlay-success");
const btnCloseSuccess = document.querySelector(".btn-close");

function locationHref(element) {
  element.addEventListener("click", () => {
    location.href = "https://arisdwii.github.io/frontendmentor-crowdfunding-product-page/index.html";
  });
}

export function modalSuccess() {
  document.querySelector(".modal-success").classList.add("active");
  locationHref(overlaySuccess);
  locationHref(btnCloseSuccess);
}
