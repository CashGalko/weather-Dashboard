var cityInputEl = document.querySelector('#cityName');
var userFormEl = document.querySelector('#user-form');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');



var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = cityInputEl.value.trim();
  
    if (cityName) {
      getWeather(cityName);
  
      repoContainerEl.textContent = '';
      cityInputEl.value = '';
    } else {
      alert('Please enter a GitHub username');
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

var displayWeather = function (data, city) {
    
    $('#divWeather').show();
    
    $('#hCity').text(data.name);    
    $('#temp-display').text(data.main.temp);
    $('#wind-display').text(data.wind.speed);
    $('#humidity-display').text(data.wind.speed);
    // $('#uvIndex-display').text(data.wind.speed);
}

  userFormEl.addEventListener('submit', formSubmitHandler)