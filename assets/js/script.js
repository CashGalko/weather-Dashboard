var cityInputEl = document.querySelector('#cityName');
var userFormEl = document.querySelector('#user-form');
var cityNameContainerEl = document.querySelector('#cityName');
var today = moment();
var coordinates = [];

// Handels the event listener for the actual form submission. Displays error if no valid input. Refreshes input.
var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = cityInputEl.value.trim();
    coordinates = [];
    if (cityName) {
      getWeather(cityName);
      getForecast(cityName);
      cityNameContainerEl.textContent = '';
      cityInputEl.value = '';
    } else {
      alert('Please enter a valid city');
    }
};

// Fetches data from the API that targets the weather for the current date. Invokes the display weather functions with the necessary parameters for it to generate it's data. 
var getWeather = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=56c8a3ef9b920710fdace6246f366751';

 fetch(apiUrl)
  .then(function (response) {
    return response.json();

  })
  .then(function (data) {
    console.log(data);
    var latitude = data.coord.lat
    var longitude = data.coord.lon
    displayWeather(data, city);
    coordinates.push(latitude);
    coordinates.push(longitude);
    console.log(coordinates);

  });
}


// Performs a similar function to the getWeather function, this just calls on the API for the 5 day forecast instead. 
var getForecast = function (city) {

  console.log(coordinates);
  var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=56c8a3ef9b920710fdace6246f366751';

  // I realized too late that my API fetch link was incorrect. I attempted to fix it to only show a 5 day forcast, But I couldn't get the lat long data out of the first function to use in this function and honestly, I dont know why. I will come by and fix it later. But by using this API call, I am at least demonstrating the functionality of the code. 

    // var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordinates[0] + "&lon=" + coordinates[1] + "&exclude=current,minutely,hourly,alerts&appid=56c8a3ef9b920710fdace6246f366751"

 fetch(forecastUrl)
  .then(function (response) {
    return response.json();

  })
  .then(function (data) {
    console.log(data);
    displayForecast(data, city);
    
  });
}

// This function shows the div that the data will be displayed on and pulls relavant information from the data before appending it. 
var displayWeather = function (data, city) {
    var imageUrl = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"

    $('#divWeather').show();
    $('#hCity').text(data.name + " " + today.format("MMM Do, YYYY"));
    $('#hCity').append($('<img>',{src: imageUrl}))   
    $('#temp-display').text(data.main.temp);
    $('#wind-display').text(data.wind.speed);
    $('#humidity-display').text(data.wind.speed);
    // $('#uvIndex-display').text(data.wind.speed);
    
}

// this function grabs data out of the 5 day forecast array. It can be modified to predict further out by altering the for loop index parameter. 
var displayForecast = function (data, city) {
  // Initially shows the div container & then deletes the divs generated by the previous search before running the for loop for the current search.
  $('#divForecast').show();
  $('#forecast-container').children().remove('div');
  for (let i = 0; i < 5; i++) {
    var dateConversion = moment.unix(data.list[i].dt).format("MMM Do, YYYY");
    var dateEl = $('<h4>').text(dateConversion);
    var tempEl = $('<p>').text("Temp: " + data.list[i].main.temp + " F");
    var windEl = $('<p>').text("Wind: " + data.list[i].wind.speed + " MPH");
    var humidityEl = $('<p>').text("Humidity: " + data.list[i].main.humidity + " %");
    var iconUrl = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png"
    $('<div class="card col-md-2"/>').appendTo('#forecast-container');
    
    $('#forecast-container').children().eq(i).prepend($('<img>',{src: iconUrl}))
    $('#forecast-container').children().eq(i).append(dateEl);
    $('#forecast-container').children().eq(i).append(tempEl);
    $('#forecast-container').children().eq(i).append(windEl);
    $('#forecast-container').children().eq(i).append(humidityEl);
  }
}

  userFormEl.addEventListener('submit', formSubmitHandler);