/** @format */

const bgColors = [
  "hsl(15, 100%, 70%)",
  "hsl(195, 74%, 62%)",
  "hsl(348, 100%, 68%)",
  "hsl(145, 58%, 55%)",
  "hsl(264, 64%, 52%)",
  "hsl(43, 84%, 65%)",
];

const dailyBtn = document.querySelector("#daily");
const weeklyBtn = document.querySelector("#weekly");
const monthlyBtn = document.querySelector("#monthly");
const secondSection = document.querySelector(".second-section");

function loadData() {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      const dailyArray = data.map((item) => item.timeframes.daily);
      const weeklyArray = data.map((item) => item.timeframes.weekly);
      const monthlyArray = data.map((item) => item.timeframes.monthly);

      drawElements(data, dailyArray);

      dailyBtn.addEventListener("click", () => drawElements(data, dailyArray));
      weeklyBtn.addEventListener("click", () =>
        drawElements(data, weeklyArray)
      );
      monthlyBtn.addEventListener("click", () =>
        drawElements(data, monthlyArray)
      );
    })
    .catch((error) => console.error("Error cargando JSON:", error));
}

function drawElements(data, array) {
  secondSection.innerHTML = "";
  array.forEach((element, index) => {
    let title = data[index].title;
    let titleLowerCase = title.toLowerCase().replace(" ", "-");

    secondSection.innerHTML += `
          <div class="card">
              <div class="card__background" style="background-color: ${bgColors[index]};">
                  <img class="card__image" src="./images/icon-${titleLowerCase}.svg" alt="">
              </div>
              <div class="card__details">
                  <div class="card__activity">
                      <p class="card__title">${title}</p>
                      <img class="card__dots" src="./images/icon-ellipsis.svg" alt="three dots">
                  </div>
                  <div class="card__time">
                      <p class="card__hour">${element.current}hrs</p>
                      <p class="card__previous">Previous - ${element.previous}hrs</p>
                  </div>
              </div>
          </div>
      `;
  });
}

loadData();
