const APIkey = 'ba9bcf4f4e1396ead860b9554bf409d3';
var searchBtn = document.querySelector('#searchBtn');
var current = document.querySelector('#current');
var forecast = document.querySelector('#forecast');
var history = ['Adelaide'];
console.log(searchBtn)
// fetch weather forcast data
function search() {
    current.innerHTML='';
    forecast.innerHTML='';
    var city = document.querySelector('#searchTerm').value;
    storeHistory(city);
    console.log(city)
    var link5day = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&cnt=6&appid='+APIkey+'&units=metric';
    console.log(link5day)
    fetch(link5day)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
    
      var lat = data.city.coord.lat;
      var lon = data.city.coord.lon; 
      searchedCity= data.city.name;
      fetchOnecall(lat,lon) ;
      
      });
}
// fetch current weather data
function fetchOnecall(lat,lon) {
    var oneCall = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=hourly,minutely,alerts&appid='+APIkey+ '&units=metric';
    fetch(oneCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Use the console to examine the response
      var APIonecall = data;
      console.log(APIonecall);
      currentWeather(APIonecall);
      futureWeather(APIonecall);
      });  
}
// display current weather
function currentWeather(data) {
    var cityName = document.createElement('h3');
    cityName.classList.add('row')
    var img = document.createElement('img');
    icon = 'http://openweathermap.org/img/wn/'+data.current.weather[0].icon+'@2x.png'
    img.setAttribute("src", icon);
    console.log(data.current.weather[0].icon)
    console.log(icon);
    img.classList.add('row')
    var conditions = document.createElement('ul');
    conditions.classList.add('row')
    var temp = document.createElement('li');
    var wind = document.createElement('li');
    var humidity = document.createElement('li');
    var UV = document.createElement('li');
    cityName.textContent= searchedCity;
    console.log(data)
    temp.textContent= "Temp: "+ data.current.temp+ " \xB0C";
    wind.textContent= "Wind: "+ data.current.wind_speed+ " m/s";
    humidity.textContent= "Humidity: "+ data.current.humidity+ " %";
    UV.textContent= "UV Index: "+ data.current.uvi;
    current.appendChild(cityName);
    current.appendChild(img);
    current.appendChild(conditions);
    conditions.appendChild(temp);
    conditions.appendChild(wind);
    conditions.appendChild(humidity);
    conditions.appendChild(UV);
    // temp wind humidity UV index
}
// display 5-day forecast
function futureWeather(data) {
    for (var i=1; i<5;i++){
        box = document.createElement('div');
        box.className ='col text-light bg_custom mr-3';
        date = document.createElement('h4')
        date.classList.add('row')
        var img = document.createElement('img');
        img.setAttribute("src", 'http://openweathermap.org/img/wn/'+data.daily[i].weather[0].icon+'@2x.png');
        img.classList.add('row')
        futureConditions = document.createElement('ul');
        futureConditions.classList.add('row')
        futureTemp= document.createElement('li');
        futureWind= document.createElement('li');
        futureHumidity= document.createElement('li');
        date.textContent= "Comming Soon";
        futureTemp.textContent= "Temp: "+ data.daily[i].temp.day+ " \xB0C";
        futureWind.textContent= "Wind: "+ data.daily[i].wind_speed+ " m/s";
        futureHumidity.textContent= "Humidity: "+ data.daily[i].humidity+ " %";
        forecast.appendChild(box);
        box.appendChild(date);
        box.appendChild(img);
        box.appendChild(futureConditions);
        futureConditions.appendChild(futureTemp);
        futureConditions.appendChild(futureWind);
        futureConditions.appendChild(futureHumidity);

    }
}

//Store search hisoty
function storeHistory(infor) {
  console.log(infor);
  history.push(infor);
  localStorage.setItem("weatherSearch", JSON.stringify(infor));
}

//Render search history
function render() {
   // Get search history from localStorage
   var searchHistory = JSON.parse(localStorage.getItem("weatherSearch"));
   // If search history were retrieved from localStorage, update the todos array to it
   if (searchHistory !== null) {
     history = searchHistory;
   }
   history.forEach(element => {
    var button= document.createElement('button');
    button.innerHTML=element;
    button.className = 'btn btn-secondary btn-block'
   });
}

// init
function init() {
  render()
}
searchBtn.addEventListener('click', search);

