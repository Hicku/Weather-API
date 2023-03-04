const apiKey = "0ac5413192365b37c1761dcc05f1b01c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";;
const searchButton = $("#search-button");
const searchInput = $("#search-input");



$(document).ready(function () {

    searchButton.on("click", function() {
        const city = searchInput.val();
        const url = `${apiUrl}?q=${city}&appid=${apiKey}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {

            const dataContainer = $("<div>");
            dataContainer.attr("id", "dataContainer")
            dataContainer.attr("class", "text-center")

            const name = data.name;
            const temperature = data.main.temp;
            const description = data.weather[0].description;

            dataContainer.html(`<h3>${name}</h3><p>Temperature: ${temperature}°c</p><p>Description: ${description}</p>`);
            $(".main-weather-card").append(dataContainer);
            
          })
          .catch(error => console.log(error));
      });
    });