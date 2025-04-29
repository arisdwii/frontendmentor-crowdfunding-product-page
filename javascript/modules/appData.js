import { saveNewData, getAllData } from "./localStorage.js";

export const bookmark = false;

export const stats = {
  totalNow: 89914,
  total: 100000,
  backers: 5007,
};

export const pledges = [
  { id: 1, name: "Pledge with no reward" },
  { id: 2, name: "Bamboo Stand", min: 25, stocks: 101 },
  { id: 3, name: "Black Edition Stand", min: 75, stocks: 64 },
  { id: 4, name: "Mahogany Special Edition", min: 200, stocks: 2 },
];

const defaults = {
  bookmark,
  stats,
  pledges,
};

export function initAppData() {
  const appData = getAllData();

  for (const key in defaults) {
    if (appData[key] === undefined) {
      saveNewData(key, defaults[key]);
    }
  }
}
