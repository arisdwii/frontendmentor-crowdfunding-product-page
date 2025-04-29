import { resetPledge } from "./resetPledge.js";

// ==== DOM SELECTORS ====
const btnPrimary = document.querySelector(".btn-primary");
const btnRewards = document.querySelectorAll(".btn-reward");
const modalSelection = document.querySelector(".modal-selection");
const overlaySelection = document.querySelector(".overlay-selection");
const closeSelection = document.querySelector(".close-selection");

const pledgeRadios = document.querySelectorAll(".pledge-input-radio");

// selectionModal.js
export const pledgeState = {
  selectedPledgeId: null,
};

// ==== MODAL SELECTION TOGGLE ====
function toggleModalSelection(element) {
  element.addEventListener("click", () => {
    modalSelection.classList.toggle("active");
    document.body.classList.toggle("over-hide");

    resetPledge();

    pledgeRadios.forEach((radio) => {
      radio.checked = false;
    });

    setTimeout(() => {
      document.querySelector(".title-selection").scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 400);
  });
}

toggleModalSelection(overlaySelection);
toggleModalSelection(closeSelection);
toggleModalSelection(btnPrimary);

pledgeRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    resetPledge();
    const selectedArticle = radio.closest("article");
    selectedArticle.classList.add("checked");

    pledgeState.selectedPledgeId = Number(radio.value);

    const pledgeEnter = selectedArticle.querySelector(".pledge-enter");
    if (pledgeEnter && radio.checked) {
      pledgeEnter.classList.add("full");

      const inputNumber = pledgeEnter.querySelector("input");
      inputNumber.focus();
    }

    setTimeout(() => {
      selectedArticle.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  });
});

// ==== BTN REWARD SCROLL TO PLEDGE ====
btnRewards.forEach((btnReward) => {
  btnReward.addEventListener("click", () => {
    const targetId = btnReward.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    // Buka modal dulu
    modalSelection.classList.add("active");
    document.body.classList.add("over-hide");

    resetPledge();

    // Scroll ke pledge option setelah modal muncul
    setTimeout(() => {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Setelah scroll selesai, aktifkan radio dan pledge enter
      setTimeout(() => {
        targetElement.classList.add("checked");

        const radioInput = targetElement.querySelector(".pledge-input-radio");
        if (radioInput) radioInput.checked = true;

        pledgeState.selectedPledgeId = Number(radioInput.value);

        const pledgeEnter = targetElement.querySelector(".pledge-enter");
        if (pledgeEnter) pledgeEnter.classList.add("full");

        const inputNumber = pledgeEnter.querySelector("input");
        inputNumber.focus();

        // Scroll ulang setelah animasi height (misal 300ms)
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 400);
      }, 400); // Durasi animasi scroll
    }, 600); // Delay supaya modal sempat muncul dulu
  });
});
