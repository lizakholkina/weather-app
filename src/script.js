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
  //  let unit = "metric";
  //  let apiKey = "7917ebc82cf63d690dd0000ac2ff6bd6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
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
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = `Sunrise <br/> ${sunrise.getHours()}:${sunrise.getMinutes()}`;
  let sunset = new Date(response.data.sys.sunset * 1000);
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = `Sunset <br/> ${sunset.getHours()}:${sunset.getMinutes()}`;
  let weatherDescription = response.data.weather[0].main;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = weatherDescription;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
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
