// Catching The Elements
let cityName = document.getElementById("city-name"),
    searchBtn = document.getElementById("search-btn"),
    result = document.getElementById("result");

///////////////////////////////////////////////////////////////////
window.onload = _ => {
  cityName.focus();
};
// Time For Funcs
let getWeatherDetails = () => {
  let cityValue = cityName.value;
  // If the input is empty
  if (cityValue.length == 0) {
    setTimeout(() => {
      result.innerHTML = `<h3 class="msg" id="aHint">Please, Enter a City Name</h3>`;
      let aHint = document.getElementById("aHint");
      cityName.focus();
      setTimeout(() => {
        aHint.style.display = "none";
      }, 3700);
    }, 700);
  } else {
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    fetch(weatherUrl).then((response) => response.json()).then((details) => {
      result.innerHTML = `
      <div class="weatherCard">
        <div class="info">
          <h2>${details.name}</h2>
          <h2>${details.sys.country}</h2>
          <h3>${details.weather[0].main}</h3>
          <h3>${details.weather[0].description}</h3>
        </div>
        <img class="img" src="https://openweathermap.org/img/w/${details.weather[0].icon}.png">
        <div class="degrees">
          <h3><span>temp</span> ${details.main.temp}&#176;</h3>
          <h3><span>Pressure</span> ${details.main.pressure}</h3>
          <h3><span>Wind Speed</span> ${details.wind.speed}</h3>
        </div>
      </div>
      `;
      cityName.value = '';
      cityName.focus();
    }).catch(() => {
      setTimeout(() => {
        result.innerHTML = `<h3 class="msg" id="warningMsg">Enter a Valid City Name</h3>`;
        cityName.value = '';
        cityName.focus();
        setTimeout(() => {
          warningMsg.style.display = "none";
        }, 3700);
      }, 700);
    })
  }
};
searchBtn.addEventListener("click", getWeatherDetails);
window.addEventListener("load", getWeatherDetails);