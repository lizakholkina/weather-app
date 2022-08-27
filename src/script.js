let currentDate = new Date();
function getCurrentTimeString() {
  return currentDate.toTimeString().replace(/ .*/, "").substring(0, 5);
}
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
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
  return `${days[date.getDay()]}, ${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}, ${getCurrentTimeString()}`;
}
let todayDate = document.querySelector("#today-date");
todayDate.innerHTML = formatDate(currentDate);

let apiKey = "7917ebc82cf63d690dd0000ac2ff6bd6";
let unit = "metric";

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
}
let currentCity = document.querySelector("#search");
currentCity.addEventListener("submit", search);

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<ul>`;
  // let days = ["TUE", "WED", "FRI"];
  // сколько ты будеешь писать дней столько и будет элементов
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  <li>
    ${formatDay(forecastDay.dt)}
    <br />
    <p>${Math.round(forecastDay.temp.max)}° <small>${(N = Math.round(
          forecastDay.temp.min
        ))}°</small></p>
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="cloud" />
  </li>
`;
    }
  });

  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "7917ebc82cf63d690dd0000ac2ff6bd6";
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
}

function showCurrentWeather(response) {
  let city = response.data.name;
  celsiusValue = response.data.main.temp;
  showCelsiusScale();
  let cityElement = document.querySelector("h2");
  cityElement.innerHTML = `${city.toUpperCase()}`;
  let currentHumidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity ${currentHumidity}%`;
  let currentWind = response.data.wind.speed;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind ${currentWind} km/h`;
  let sunrise = new Date(response.data.sys.sunrise * 1000);

  let hours = sunrise.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = sunrise.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = `Sunrise <br/> ${hours}:${minutes}`;
  let sunset = new Date(response.data.sys.sunset * 1000);

  hours = sunset.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  minutes = sunset.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = `Sunset <br/> ${hours}:${minutes}`;
  let weatherDescription = response.data.weather[0].main;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = weatherDescription;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);

  getForecast(response.data.coord);
}

function currentData() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}
currentData();
let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", currentData);

let celsiusValue;

function showFahrenheitScale() {
  let fahrenheit = document.querySelector("#temperature");
  fahrenheit.innerHTML = `${Math.round((9 / 5) * celsiusValue + 32)}°F`;
}
let currentFahrenheitTemp = document.querySelector("#fahrenheit");
currentFahrenheitTemp.addEventListener("click", showFahrenheitScale);

function showCelsiusScale() {
  let celsius = document.querySelector("#temperature");
  celsius.innerHTML = `${Math.round(celsiusValue)}°C`;
}
let currentCelsiusTemp = document.querySelector("#celsius");
currentCelsiusTemp.addEventListener("click", showCelsiusScale);

function cityKyiv() {
  let city = "kyiv";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
}
let kyiv = document.querySelector("#kyiv");
kyiv.addEventListener("click", cityKyiv);

function cityWarsaw() {
  let city = "warsaw";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
}
let warsaw = document.querySelector("#warsaw");
warsaw.addEventListener("click", cityWarsaw);

function cityParis() {
  let city = "paris";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
}
let paris = document.querySelector("#paris");
paris.addEventListener("click", cityParis);

function cityLondon() {
  let city = "london";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
}
let london = document.querySelector("#london");
london.addEventListener("click", cityLondon);
