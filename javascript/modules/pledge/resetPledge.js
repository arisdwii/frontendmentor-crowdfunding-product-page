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
