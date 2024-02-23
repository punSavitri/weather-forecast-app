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
  humidityElement.innerHTML = `Humidity:<strong>${humidity}%</strong>`;
  let windSpeed = response.data.wind.speed;
  windElement.innerHTML = `Wind:<strong>${windSpeed}km/h</strong>`;
  let icon = response.data.condition.icon_url;
  iconElement.innerHTML = `<img src="${icon}" class="current-weather-icon">`;

  //call getForecastWeather()function to show five days weather forecast of the city
  getForecastWeather(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];

}
function displayForecastWeather(response) {
  console.log(response.data);
  let forecast = ""
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecast += `
            <div class="col-2 me-1  text-center rounded bg-light">            
              <div class="weather-forecast-day">${formatDay(day.time)}</div>                      
                <img
                  src="${day.condition.icon_url}"
                  class="forecast-icon"
                  alt="weather icon"
                />             
              <div class="weather-forecast-temperature">
              <div class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}°</div>
              <div class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</div>
              </div>                
           </div>
          `;
    }
  })
  let forecastElement = document.querySelector("#forecast-weather");
  forecastElement.innerHTML = forecast;

}
function getForecastWeather(city) {
  let api_key = "4c3a38t82d64bfo4330f17ff02bfbd97";
  let api_url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${api_key}`;
  console.log(api_url);

  //axios request to fetch data from API
  axios.get(api_url).then(displayForecastWeather);
}

//added submit event
let searchForm = document.querySelector("#search-form");
// console.log(searchForm);
searchForm.addEventListener("submit", handleSearchSubmit);

//as soon page load default city would be london weather
searchCity("London");