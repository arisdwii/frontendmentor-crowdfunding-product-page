import { saveNewData } from "../localStorage.js";
import { statsStorage } from "../stats.js";
import pledgeData from "./modalPledge.js";
import { pledgeState } from "./selectionModal.js";

const pledgeForm = document.querySelector(".pledge-form");

pledgeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const pledgeEnter = document.querySelector("article.checked .pledge-enter");
  const inputNumber = pledgeEnter?.querySelector("input");
  const inputMsg = pledgeEnter?.querySelector(".input-msg");

  if (!pledgeState.selectedPledgeId || !inputNumber) {
    inputMsg.textContent = "No pledge selected.";
    pledgeEnter.classList.add("error");
    return;
  }

  const pledgeAmount = Number(inputNumber.value);
  const selectedPledge = pledgeData.find(
    (p) => p.id === pledgeState.selectedPledgeId
  );

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

  saveNewData("pledges", pledgeData);
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
