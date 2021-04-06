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
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=56c8a3ef9b920710fdace6246f366751';

    fetch(apiUrl)
  .then(function (response) {
    return response.json();

  })
  .then(function (data) {
    console.log(data);
    displayWeather(data, city);
    
  });
}

var displayWeather = function () {
    var weatherContainer = document.getElementById('#weather-container');

    for (var i = 0; i < data.length; i++) {
        var cityNameHeader = document.createElement('h2');
        var temper = document.createElement('p');
        var wind = document.createElement('p');
        var humidity = document.createElement('p');
        var uvIndex = document.createElement('p');
        cityNameHeader.textContent = data[i].name;
        temper.textContent = data[i].main.temp;
        wind.textContent = data[i].wind.speed;
        humidity.textContent = data[i].main.humidity;
        
        weatherContainer.append(cityNameHeader);
        weatherContainer.append(temper);
        weatherContainer.append(wind);
        weatherContainer.append(humidity);
      }
}
  
//     fetch(apiUrl)
//       .then(function (response) {
//         if (response.ok) {
//           response.json()
//           console.log(apiUrl);
//         } else {
//           alert('Error: ' + response.statusText);
//         }
//       })  
    
//       .catch(function (error) {
//         alert('Unable to connect to GitHub');
//       });
//   };

  userFormEl.addEventListener('submit', formSubmitHandler)