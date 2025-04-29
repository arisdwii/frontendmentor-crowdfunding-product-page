import { getData } from "../localStorage.js";
import { pledges } from "../appData.js";

// ==== DOM SELECTORS ====
const pledgeCards = document.querySelectorAll(".pledge");

// ==== DATA ====
const pledgeData = getData("pledges") || pledges;

// ==== RENDER FUNCTION ====
pledgeCards.forEach((card, index) => {
  const pledge = pledgeData[index];
  const inputRadio = card.querySelector(".pledge-input-radio");
  const title = card.querySelector(".pledge-title");
  const min = card.querySelector(".pledge-minimum");
  const stocks = card.querySelector(".pledge-amount");

  if (inputRadio) inputRadio.value = pledge.id;

  if (title) title.textContent = pledge.name;

  if (pledge.min !== undefined && min) {
    min.textContent = `Pledge $${pledge.min} or more`;
  }

  if (pledge.stocks !== undefined && stocks) {
    stocks.textContent = pledge.stocks;

    if (pledge.stocks === 0) {
      card.classList.add("out");
    }
  }
});

export default pledgeData;
