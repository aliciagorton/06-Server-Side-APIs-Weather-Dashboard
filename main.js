// Form group with a user input to search a city 
// grab val user inputs --> user AJAX to search the API for the Information

// User searches city we will present the user with current city data 

// UV index (if condition to change color of UV index)

// Present with current city future data ( 5day forecast)

// Use local storage for a city history 

// Click function for city history 

//  When user opens dashboard they are present with the last city they searched

$(document).ready(function(){
    $(".classofsomething").on("click", function(){
        //  grab value from the search bar

    })

    // another click function to pull out data function from search bar 
    var APIKey = "&appid=52c291d0b0616a47027c8d2ff0bb3261"

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";

    // AJAX calls 
    function weatherSearch(userInput){
        $.ajax({
            url:queryURL + userInput + APIKey,
            type: "GET", 
            dataType: "json",
        }).then(function(data){
            console.log(data)


        })
    }

    weatherSearch("Chicago");

})

// future forecast 
// make functions outside 
// then call, the functions in then. area 
