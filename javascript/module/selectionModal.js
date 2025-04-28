import {
  pledgeRadios,
  pledgeForm,
  selectedPledgeId,
} from "./pledgeSelection.js";

// ==== DOM SELECTORS ====
const btnPrimary = document.querySelector(".btn-primary");
const btnRewards = document.querySelectorAll(".btn-reward");
const modalSelection = document.querySelector(".modal-selection");
const overlaySelection = document.querySelector(".overlay-selection");
const closeSelection = document.querySelector(".close-selection");

export function resetPledge() {
  // Reset semua pledge
  document
    .querySelectorAll(".pledge")
    .forEach((el) => el.classList.remove("checked"));
  document
    .querySelectorAll(".pledge-enter")
    .forEach((el) => el.classList.remove("full"));
  document
    .querySelectorAll('input[type="text"]')
    .forEach((input) => (input.value = ""));
}

pledgeRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    const selectedArticle = radio.closest("article");
    selectedArticle.classList.add("checked");

    selectedPledgeId = Number(radio.value);

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
        // Reset kelas 'checked' dari semua elemen pledge
        document
          .querySelectorAll(".pledge")
          .forEach((el) => el.classList.remove("checked"));
        document
          .querySelectorAll(".pledge-enter")
          .forEach((el) => el.classList.remove("full"));

        targetElement.classList.add("checked");

        const radioInput = targetElement.querySelector(".pledge-input-radio");
        if (radioInput) radioInput.checked = true;

        const pledgeEnter = targetElement.querySelector(".pledge-enter");
        if (pledgeEnter) pledgeEnter.classList.add("full");
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

pledgeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const pledgeEnter = document.querySelector("article.checked .pledge-enter");
  const inputNumber = pledgeEnter?.querySelector("input");
  const inputMsg = pledgeEnter?.querySelector(".input-msg");

  if (!selectedPledgeId || !inputNumber) {
    inputMsg.textContent = "No pledge selected.";
    pledgeEnter.classList.add("error");
    return;
  }

  const pledgeAmount = Number(inputNumber.value);
  const selectedPledge = pledgeStorage.find((p) => p.id === selectedPledgeId);

  if (!pledgeAmount) {
    inputMsg.textContent = "Please input a number.";
    pledgeEnter.classList.add("error");
    return;
  }

  if (pledgeAmount < selectedPledge.min) {
    inputMsg.textContent = "Please input minimum";
    pledgeEnter.classList.add("error");
    return;
  }

  if (selectedPledge.stocks <= 0) {
    inputMsg.textContent = "Sorry, this pledge is out of stock!";
    pledgeEnter.classList.add("error");
    return;
  }

  selectedPledge.stocks -= 1;

  statsStorage.totalNow += pledgeAmount;
  statsStorage.backers += 1;

  saveNewData("pledges", pledgeStorage);
  saveNewData("stats", statsStorage);

  document.querySelector(".modal-success").classList.add("active");
  document.querySelector(".btn-close").addEventListener("click", () => {
    location.href = "/";
  });
});
