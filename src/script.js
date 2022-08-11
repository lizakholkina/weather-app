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
  let city = document.querySelector("h2");
  city.innerHTML = `${cityInput.value.toUpperCase()}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}
let currentCity = document.querySelector("#search");
currentCity.addEventListener("submit", search);

function showTemp(response) {
  let currentWeather = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${currentWeather}°C`;
  let currentHumidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity ${currentHumidity}%`;
  let currentWind = response.data.wind.speed;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind ${currentWind} km/h`;
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  //  let unit = "metric";
  //  let apiKey = "7917ebc82cf63d690dd0000ac2ff6bd6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function showCurrentWeather(response) {
  let city = response.data.name;
  let currentWeather = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("h1");
  tempElement.innerHTML = `${currentWeather}°C`;
  let cityElement = document.querySelector("h2");
  cityElement.innerHTML = `${city.toUpperCase()}`;
  let currentHumidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity ${currentHumidity}%`;
  let currentWind = response.data.wind.speed;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind ${currentWind} km/h`;
}

function currentData() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}
currentData();
let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", currentData);
