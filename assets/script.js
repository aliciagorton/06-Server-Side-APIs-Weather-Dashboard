$(document).ready(function(){

    var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);

    var APIKey = "52c291d0b0616a47027c8d2ff0bb3261";

    function getWeather(cityName) {
        console.log(`firing getWeather with ${cityName}`);

        // current condition request from api 
        var queryURL ="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;


            $.ajax({
                    url: queryURL,
                    method: "GET",
                }).then(function(response){
       
            console.log(response);
            console.log(response.weather[0])
            // display's new date 
            var currentDate = new Date().toLocaleDateString();
            // var currentDate = new Date(response.data.dt*1000);
            // console.log(currentDate);
            // var = currentDate.getDate();
            // var month = currentDate.getMonth() + 1;
            // var year = currentDate.getFullYear();
            // $("#city-name").hmtl = response.name + " (" + month + "/" + day + "/" + year + ") ";

            $("#city-name").html(response.name);

            // weather icon 
            var weatherPic = response.weather[0].icon;
            $("#current-pic").attr("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            $("#current-pic").attr("alt",response.weather[0].description);
            $("#temperature").html("Temperature: " + convertTemp(response.main.temp) + " &#176F");
            $("#humidity").html("Humidity: " + response.main.humidity + "%");
            $("#wind-speed").html("Wind Speed: " + response.wind.speed + " MPH");

            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";

            $.ajax({
                url: UVQueryURL,
                method: "GET",
            }).then(function(response){
                console.log(response)

                var UVIndex = $("span")
                $("#UV-index").html(response[0].value)
                .addClass('badge badge-danger')
                
            })

            var cityID = response.id;
            var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;

            $.ajax({
                url: forecastQueryURL,
                method: "GET",
            }).then(function(response){
                console.log(response);
                var forecastEl = $("#forecast");
                for (i = 0; i < forecastEl.length; i++) {
                    // $("div")
                    var forecastIndex = i*8 + 4;
                    var forecastDate = new Date().toLocaleDateString();
                    var icon = response.list[forecastIndex].weather[0].icon + ".png"
                    var description = response.list[forecastIndex].weather[0].description;
                    var weather = response.list[forecastIndex].main.temp;
                    var humidity = response.list[forecastIndex].main.humidity + "%";


                    var completeDivTag = `<div class="col forecast bg-primary text-white ml-3 mb-3">
                        <p>${description}</p>
                        <p>${weather}</p>
                        <p>${humidity}</p>
                        <img href=${icon}>
                    
                    </div>`
                    console.log("response", response)

                    forecastEl.append(completeDivTag);

                    
                    //may need editing
                    // var forecastDateEl = $("p");

                    // forecastDateEl.attr("class","mt-3 mb-0 forecast-date");
                    
                    // forecastEl[i].append(forecastDate);

                    // console.log(response.list[forecastIndex].weather[0].icon)

                    // // weather -- is .png right?? 
                    // var forecastWeatherEl = $("img");
                    // forecastWeatherEl.attr("src","http://openweathermap.org/img/w/" + response.list[forecastIndex].weather[0].icon + ".png");

                    // forecastWeatherEl.attr("alt",response.list[forecastIndex].weather[0].description);
                    // forecastEl[i].append(forecastWeatherEl);

                    // // temperature 
                    // var forecastTempEl = $("p");
                    // forecastTempEl.html = "Temp: " + convertTemp(response.list[forecastIndex].main.temp) + " &#176F";
                    // forecastEl[i].append(forecastTempEl);

                    // // humidity 
                    // var forecastHumidityEl = $("p");
                    // forecastHumidityEl.html = "Humidity: " + response.list[forecastIndex].main.humidity + "%";
                    // forecastEl[i].append(forecastHumidityEl);

                }
            })
        })

    }

    // event listen for button submit
    $("#search-button").on("click", function(e){
        // ignore the submission event by preventing the default event
        e.preventDefault();
        // select the valiue of the city input field
        var city_address = $('#city-input').val();
        console.log(`city_address: ${city_address}`);

        // fire the getWeather function
        getWeather(city_address);

        // local storage 
        searchHistory.push(city_address);
        localStorage.setItem("search",JSON.stringify(searchHistory));
        renderSearchHistory();
    })

    // clear button 
    $("#clear-history").on("click", function(){
        searchHistory = [];
        renderSearchHistory();
    })

    // temperature conversion 
    function convertTemp(K){
        return Math.floor((K - 273.15) *1.8 +32);
    }

    // search history from getWeather function
    function renderSearchHistory(){
        $("#history").html = "";
        for(let i = 0; i < searchHistory.length; i++){
            // not sure about document.createElement 
            var historyVal  = $("input");

            historyVal.attr("type","text");
            historyVal.attr("readonly",true);
            historyVal.attr("class", "form-control d-block bg-white");
            historyVal.attr("value", searchHistory[i]);
            historyVal.on("click", function(){
                
            })

            $("#history").append(historyVal);
        }
        getWeather(historyVal.val());

    }

    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }

});

