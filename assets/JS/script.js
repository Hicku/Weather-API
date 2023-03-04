const apiKey = "0ac5413192365b37c1761dcc05f1b01c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const searchButton = $("#search-button");
const searchInput = $("#search-input");
const weatherCards = $("#weather-cards");


$(document).ready(function () {

    

    searchButton.on("click", function () {

        const city = searchInput.val();
        const url = `${apiUrl}?q=${city}&appid=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const dataContainer = $("<div>");
                dataContainer.attr("id", "dataContainer")
                dataContainer.attr("class", "text-center")

                const name = data.name;
                const temperature = data.main.temp;
                const windy = data.wind.speed;
                const humid = data.main.humidity;
                const description = data.weather[0].description;


                dataContainer.html(`<h3>${name}</h3><p>Temperature: ${temperature}°c</p><p>Wind: ${windy}m/s</p><p>Humidity: ${humid}%</p><p>Description: ${description}</p>`);
                $(".main-weather-card").append(dataContainer);

                const lat = data.coord.lat;
                const lon = data.coord.lon;
                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

                fetch(forecastUrl)
                    .then(response => response.json())
                    .then(forecastData => {
                        console.log(forecastData);

                        const forecastContainer = $("<div>");
                        forecastContainer.attr("id", "forecastContainer")


                        const forecastItems = forecastData.list;
                        let forecastCards = [];

                        for (let i = 0; i < forecastItems.length; i += 8) { // use step 8 to get data for each day only
                            const forecastTime = moment(forecastItems[i].dt_txt).format("MMM Do");
                            const forecastTemp = forecastItems[i].main.temp;
                            const forecastWind = forecastItems[i].wind.speed;
                            const forecastHumidity = forecastItems[i].main.humidity;
                            const forecastDescription = forecastItems[i].weather[0].description;

                            // create a card for each day with required data
                            forecastCards.push(`
                            <div class="card">
                                <div class="card-body">
                                 <h5 class="card-title">${forecastTime}</h5>
                                    <p class="card-text">Temperature: ${forecastTemp}°c</p>
                                     <p class="card-text">Wind: ${forecastWind}m/s</p>
                                        <p class="card-text">Humidity: ${forecastHumidity}%</p>
                                        <p class="card-text">${forecastDescription}</p>
                                </div>
                            </div>
  `);
                        }

                        // add the forecast cards to the HTML
                        weatherCards.html("<h4>Forecast:</h4>");
                        forecastCards.forEach(card => weatherCards.append(card));
                    })
                    .catch(error => console.log(error));

            })
            .catch(error => console.log(error));
    });
});