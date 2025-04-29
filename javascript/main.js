import { initAppData } from "./modules/appData.js";
import "./modules/bookmark.js";
import "./modules/stats.js";

import "./modules/components/toggleNav.js";
import "./modules/components/modalSuccess.js";

import "./modules/pledge/pledgeFormHandler.js";
import "./modules/pledge/pledgeReward.js";
import "./modules/pledge/modalPledge.js";
import "./modules/pledge/resetPledge.js";
import "./modules/pledge/selectionModal.js";

window.addEventListener("load", () => {
  initAppData();

  const preloader = document.getElementById("preloader");
  const spinner = preloader.querySelector(".spinner");

  spinner.style.opacity = "0";

  setTimeout(() => {
    preloader.style.top = "-100%";
  }, 500);

  setTimeout(() => {
    preloader.style.display = "none";
  }, 1000);
});
