const APIKey = "d41c6401532e56c103b33e23b2f309a6";
const testData = { "coord": { "lon": -75.1638, "lat": 39.9523 }, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n" }], "base": "stations", "main": { "temp": 281.12, "feels_like": 278.6, "temp_min": 279.33, "temp_max": 282.29, "pressure": 1015, "humidity": 49 }, "visibility": 10000, "wind": { "speed": 4.12, "deg": 300 }, "clouds": { "all": 75 }, "dt": 1649641346, "sys": { "type": 2, "id": 2037403, "country": "US", "sunrise": 1649586615, "sunset": 1649633592 }, "timezone": -14400, "id": 4560349, "name": "Philadelphia", "cod": 200 };

function getCityData(city) {

    const queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    //performs an API call to request and return JSON data about a city
    //calling async request returns a promise
    return fetch(queryUrl)
        //and then when data is received, return as JSON
        .then(function(response) {
            return response.json();
            //then apply data using a callback function
        }).then(function(data) {
            // return data;
        });
    console.log(4);
};

function getForecast(lon, lat) {

}
// async function getWeatherData2() {
//     const response = await fetch(queryUrl);
//     const data = await response.json();
//     return data;
// }