//global variables
let date = moment().format("MMMM Do YYYY");
const searchButton = document.querySelector(".searchButton");
const searchField = document.querySelector("#city");
//event listeners
searchField.addEventListener("keypress", getTheWeather);
searchButton.addEventListener("click", getTheWeather);
//get user input
function getUserInput() {
    const inputField = document.querySelector("#city");
    const cityName = inputField.value;
    return cityName;
};
//fetch city weather API data
function getCityData(city) {
    const queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;
    //performs an API call to request and return JSON data about a city
    //calling async request returns a promise
    return fetch(queryUrl)
        //and then when data is received, return as JSON
        .then(function(response) {
            return response.json();
        });
};
//fetch city specific weather
async function getForecast(lat, lon) {
    const queryUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
    const response = await fetch(queryUrl);
    const data = await response.json();
    jsonData = data;
    return data;
};
//display current forecast
function renderCurrent(data) {
    document.querySelector(".currentWeather").innerHTML =
        `<div>
    <h1>${data.name} -- ${date}<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"/></h1>
    <p>Temp: ${data.main.temp + "°F"}</p>
    <p>Wind: ${data.wind.speed + " mph"}</p>
    <p>Humidity: ${data.main.humidity +"%"}</p>
</div>`
};
//main function rendering current and future forecasts
async function getTheWeather(event) {
    if (event.keyCode === 13 || event.type === "click") {
        const cityName = getUserInput();
        const cityData = await getCityData(cityName);
        renderCurrent(cityData);
        const lat = cityData.coord.lat;
        const lon = cityData.coord.lon;
        const forecastData = await getForecast(lat, lon);
        renderForecast(forecastData);
        saveCity(cityName);
        renderSearchHistory();

    }
};
//display 5-day forecast
function renderForecast(forecastData) {
    console.log(forecastData);
    document.querySelector("ul").innerHTML = "";
    //list.[0].weather etc. render in a loop and append 
    for (let i = 0; i < forecastData.list.length; i = i + 8) {
        let city = forecastData.list[i];
        let humidity = city.main.humidity;
        let wind = city.wind.speed;
        let temp = city.main.temp;
        let icon = city.weather[0].icon;
        let date = moment(city.dt_txt).format("LL");

        document.querySelector('ul').innerHTML +=
            `<li class = "day", 
            <h2>${date}</h2>
            <img src="http://openweathermap.org/img/wn/${icon}.png"/>
            <p>Temp: ${temp + "°F"}</p>
            <p>Wind: ${wind + "mph"}<p>
            <p>Humidity: ${humidity + "%"}</p>
        </li>`
    }
};

//local storage and clickable history
//save searched cities in local storage
function saveCity(cityName) {
    const searchHistory = getSearchHistory();
    //use inequality operator in conditional to prevent cities from appearing more than once
    if (!searchHistory.includes(cityName)) {
        searchHistory.push(cityName);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
};
//get stored searches from local storage
function getSearchHistory() {
    const searchHistory = localStorage.getItem("searchHistory");
    if (searchHistory) {
        return JSON.parse(searchHistory);
    } else {
        return [];
    }
};
//render search history as clickable buttons on page
function renderSearchHistory() {
    document.querySelector(".searchHistory").innerHTML = "";
    const cityHistory = getSearchHistory();
    for (let i = 0; i < cityHistory.length; i++) {
        const city = cityHistory[i];
        console.log(city);
        document.querySelector(".searchHistory").innerHTML +=
            `<div>
            <button>${city}</button>
            </div>`
    }
};
renderSearchHistory();

searchButton.addEventListener("click", getTheWeather);