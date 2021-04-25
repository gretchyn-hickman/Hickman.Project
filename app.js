function changeCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=447e114afd01a723e3d2abd1e6baf566&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let minTemp = Math.round(response.data.main.temp_min);
  let maxTemp = Math.round(response.data.main.temp_max);
  let windSpeed = Math.round(response.data.wind.speed);
  let humid = Math.round(response.data.main.humidity);
  let newCityName = response.data.name;
  let newCountry = response.data.sys.country;
  let userCity = document.querySelector("#city");
  userCity.innerHTML = `${newCityName}, ${newCountry}`;
  let userTemp = document.querySelector("#temprature");
  userTemp.innerHTML = `${temperature}°`;
  let userHigh = document.querySelector("#high");
  userHigh.innerHTML = `${maxTemp}°`;
  let userLow = document.querySelector("#low");
  userLow.innerHTML = `${minTemp}°`;
  let userWind = document.querySelector("#wind");
  userWind.innerHTML = `${windSpeed}km/h`;
  let userHumid = document.querySelector("#humid");
  userHumid.innerHTML = `${humid}%`;
  let newIcon = response.data.weather[0].id;
  displayIcon(newIcon);
  getForcast(response.data.coord);
}
function displayIcon(iconId) {
  let newerIcon = document.querySelector("#iconNow");
  if (iconId < 300) {
    newerIcon.setAttribute("src", "Icons/08dn.svg");
  } else if (iconId < 400) {
    newerIcon.setAttribute("src", "Icons/06d.svg");
  } else if (iconId < 600) {
    newerIcon.setAttribute("src", "Icons/07dn.svg");
  } else if (iconId < 700) {
    newerIcon.setAttribute("src", "Icons/09dn.svg");
  } else if (iconId < 801) {
    newerIcon.setAttribute("src", "Icons/01d.svg");
  } else {
    newerIcon.setAttribute("src", "Icons/03dn.svg");
  }
}
function displayForcast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#weather-forcast");
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                ${day} <br /><br />
                <div><i class="fas fa-sun"></i></div>
              </h5>
              <p class="card-text">Sunny</p>
              <br />
              <p class="temp">35°/18°</p>
            </div>
          </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForcast(coord) {
  console.log(coord);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=447e114afd01a723e3d2abd1e6baf566&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForcast);
}

let now = new Date();
let formatHour = now.getHours();
if (formatHour < 10) {
  formatHour = `0${formatHour}`;
}
let formatMinutes = now.getMinutes();
if (formatMinutes < 10) {
  formatMinutes = `0${formatMinutes}`;
}
let formatDate = now.getDate();
let formatDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let formatDay = formatDays[now.getDay()];
let formatMonths = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let formatMonth = formatMonths[now.getMonth()];
let dateTimeNow = `${formatDay}, ${formatMonth} ${formatDate}, ${formatHour}:${formatMinutes} (°C)`;
let timeNow = document.querySelector("#dateTime");
timeNow.innerHTML = dateTimeNow;

let newCity = document.querySelector("form");
newCity.addEventListener("submit", changeCity);
