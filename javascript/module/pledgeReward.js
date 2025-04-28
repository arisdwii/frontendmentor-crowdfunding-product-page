import { getData } from "../localStorage.js";
import { pledges } from "./appData.js";

const rewardCard = document.querySelectorAll(".reward-card");
const rewardTitle = document.querySelectorAll(".reward-title");
const rewardMinimum = document.querySelectorAll(".reward-minimum");
const rewardAmount = document.querySelectorAll(".reward-amount");

const pledgeStorage = getData("pledges") || pledges;

const filterPledges = pledgeStorage.filter(
  (p) => p.min !== undefined && p.stocks !== undefined
);

filterPledges.forEach((pledge, index) => {
  if (rewardTitle[index]) rewardTitle[index].textContent = pledge.name;
  if (rewardMinimum[index])
    rewardMinimum[index].textContent = `Pledge $${pledge.min} or more`;
  if (rewardAmount[index]) rewardAmount[index].textContent = pledge.stocks;

  if (pledge.stocks === 0 && rewardCard[index]) {
    rewardCard[index].classList.add("out");
  }
});
