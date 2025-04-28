import { initAppData } from "./appData.js";

window.addEventListener("load", () => {
  initAppData();

  const preloader = document.getElementById("preloader");
  const spinner = preloader.querySelector(".spinner");

  spinner.style.opacity = "0";

  setTimeout(() => {
    preloader.style.top = "-100%";
  }, 500);

  this.setTimeout(() => {
    preloader.style.display = "none";
  }, 1000);
});

import "../toggleNav.js";
import "../localStorage.js";

import "./appData.js";
import "./bookmark.js";
import "./stats.js";
import "./pledgeReward.js";
import "./selectionModal.js";
import "./pledgeSelection.js";
