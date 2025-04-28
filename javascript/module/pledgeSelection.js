import { getData, saveNewData } from "../localStorage.js";
import { pledges } from "./appData.js";
import { statsStorage } from "./stats.js";

// ==== DOM SELECTORS ====
const pledgeRadios = document.querySelectorAll(".pledge-input-radio");
const pledgeForm = document.querySelector(".pledge-form");

const pledgeStorage = getData("pledges") || pledges;
let selectedPledgeId = null;

pledgeStorage.forEach((pledge, index) => {
  if (pledgeRadios[index]) pledgeRadios[index].value = pledge.id;
});

// ===== Function to handle pledge selection =====
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

document.querySelectorAll(".pledge-enter input").forEach((input) => {
  input.addEventListener("input", () => {
    const pledgeEnter = input.closest(".pledge-enter");
    const inputMsg = pledgeEnter.querySelector(".input-msg");
    inputMsg.textContent = "";
    pledgeEnter.classList.remove("error");
  });
});

export { pledgeRadios, pledgeForm, selectedPledgeId };
