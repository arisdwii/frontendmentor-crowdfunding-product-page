function getAllData() {
  return JSON.parse(localStorage.getItem("appData")) || {};
}

function saveNewData(key, data) {
  const allData = getAllData();
  allData[key] = data;
  localStorage.setItem("appData", JSON.stringify(allData));
}

function getData(key) {
  const allData = getAllData();
  return allData ? allData[key] : null;
}

export { getAllData, saveNewData, getData };
