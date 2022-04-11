const APIKey = "d41c6401532e56c103b33e23b2f309a6";
const testData = { "coord": { "lon": -75.1638, "lat": 39.9523 }, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "base": "stations", "main": { "temp": 281.12, "feels_like": 278.6, "temp_min": 279.33, "temp_max": 282.29, "pressure": 1015, "humidity": 49 }, "visibility": 10000, "wind": { "speed": 4.12, "deg": 300 }, "clouds": { "all": 75 }, "dt": 1649641346, "sys": { "type": 2, "id": 2037403, "country": "US", "sunrise": 1649586615, "sunset": 1649633592 }, "timezone": -14400, "id": 4560349, "name": "Philadelphia", "cod": 200 };
let date = moment().format("MMMM Do YYYY");




// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


const searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", getTheWeather);
document.querySelector(".searchHistory").innerHTML


function getUserInput() {
    const inputField = document.querySelector("#city");
    const cityName = inputField.value;
    return cityName;
}

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

async function getForecast(lat, lon) {
    const queryUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    const response = await fetch(queryUrl);
    const data = await response.json();
    return data;
}


function renderCurrent(data) {
    document.querySelector(".currentWeather").innerHTML =
        `<div>
    <h1>${data.name} ${date} ${data.weather.icon}</h1>
    <p>Temp:${data.main.temp + "°F"}</p>
    <p>Wind: ${data.wind.speed + "MPH"}</p>
    <p>Humidity: ${data.main.humidity +"%"}</p>
    <p>UV Index: 1</p>
</div>`


}

function getTheWeather() {
    const cityName = getUserInput();
    getCityData(cityName).then(renderCurrent);
}