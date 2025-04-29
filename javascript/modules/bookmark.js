import { getData, saveNewData } from "./localStorage.js";
import { bookmark } from "./appData.js";

// Get the bookmark button element
const btnBookmark = document.querySelector(".btn-bookmark");

// Retrieve the persistent bookmark state from localStorage
let persistentBookmark = getData("bookmark") || bookmark;

// Set the initial state of the bookmark
let stateBookmark = persistentBookmark;

// Update the UI based on the current bookmark state
updateBookmarkUI(stateBookmark);

// Listen for a click event on the bookmark button
btnBookmark.addEventListener("click", () => {
  stateBookmark = !stateBookmark; // Toggle the bookmark state
  updateBookmarkUI(stateBookmark); // Update the UI to reflect the new state
  saveNewData("bookmark", stateBookmark); // Save the updated bookmark state in localStorage
});

// Function to update the bookmark button UI based on the state
function updateBookmarkUI(state) {
  if (state) {
    btnBookmark.classList.add("bookmarked");
  } else {
    btnBookmark.classList.remove("bookmarked");
  }
}
