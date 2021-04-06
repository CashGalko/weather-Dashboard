var cityInputEl = document.querySelector('#cityName');
var userFormEl = document.querySelector('#user-form');
var cityNameContainerEl = document.querySelector('#cityName');




var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = cityInputEl.value.trim();
  
    if (cityName) {
      getWeather(cityName);
      getForecast(cityName);
      cityNameContainerEl.textContent = '';
      cityInputEl.value = '';
    } else {
      alert('Please enter a valid city');
    }
};

var getWeather = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=56c8a3ef9b920710fdace6246f366751';

 fetch(apiUrl)
  .then(function (response) {
    return response.json();

  })
  .then(function (data) {
    console.log(data);
    displayWeather(data, city);
    
  });
}

var getForecast = function (city) {
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=56c8a3ef9b920710fdace6246f366751';

 fetch(forecastUrl)
  .then(function (response) {
    return response.json();

  })
  .then(function (data) {
    console.log(data);
    displayForecast(data, city);
    
  });
}

var displayWeather = function (data, city) {
    
    $('#divWeather').show();
    $('#hCity').text(data.name);    
    $('#temp-display').text(data.main.temp);
    $('#wind-display').text(data.wind.speed);
    $('#humidity-display').text(data.wind.speed);
    // $('#uvIndex-display').text(data.wind.speed);
    
}

var displayForecast = function (data, city) {
  for (let i = 0; i < 4; i++) {
    const element = array[i];
    
  }
}

  userFormEl.addEventListener('submit', formSubmitHandler)