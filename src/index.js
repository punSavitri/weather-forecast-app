//console.log("hello testing....");
function updateCityTemperature(response) {
  //console.log(response.data);
  //console.log(response.data.temperature.current);

  //assigning variables to DOM elements
  let currentTemperatureElement = document.querySelector("#current-weather-temperature-value");
  let cityElement = document.querySelector("#current-weather-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#current-weather-icon");

  //inject into HTML page
  let temperature = response.data.temperature.current;
  currentTemperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
  let description = response.data.condition.description;
  descriptionElement.innerHTML = description;
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `${humidity}%`;
  let windSpeed = response.data.wind.speed;
  windElement.innerHTML = `${windSpeed}km/h`;
  let icon = response.data.condition.icon_url;
  iconElement.innerHTML = `<img src="${icon}" class="current-weather-icon">`;
}

function formatDate(date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}

function searchCity(city) {
  //make api call and update the UI 
  let api_key = "4c3a38t82d64bfo4330f17ff02bfbd97";
  let api_url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${api_key}`;
  //console.log(api_url);

  //request axios to update UI
  axios.get(api_url).then(updateCityTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-form-input");
  //console.log(searchInputElement);

  //calling searchCity() function
  searchCity(searchInputElement.value);
}
//added submit event
let searchForm = document.querySelector("#search-form");
// console.log(searchForm);
searchForm.addEventListener("submit", handleSearchSubmit);

//as soon page load default city would be london weather
searchCity("London");