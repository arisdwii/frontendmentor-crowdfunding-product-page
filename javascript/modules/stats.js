import { getData } from "./localStorage.js";
import { stats } from "./appData.js";

const statsPrimary = document.querySelector(".stats-primary");
const statsLabel = document.querySelector(".label");
const statsBackers = document.querySelector(".stats-backers");
const progressFill = document.querySelector(".progress-fill");

export const statsStorage = getData("stats") || stats;

export function formatNumber(number) {
  return number.toLocaleString("en-US");
}

statsPrimary.textContent = `$${formatNumber(statsStorage.totalNow)}`;
statsLabel.textContent = `$${formatNumber(statsStorage.total)}`;
statsBackers.textContent = formatNumber(statsStorage.backers);

const percentage = Math.min(
  (statsStorage.totalNow / statsStorage.total) * 100,
  100
);

progressFill.style.width = `${percentage}%`;
