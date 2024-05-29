const WEATHERAPP = {
  init() {
    WEATHERAPP.getWeather("acworth");
    WEATHERAPP.addListener();
  },
  addListener() {
    const form = document.querySelector("form");
    const input = document.querySelector("input");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      WEATHERAPP.getWeather(input.value);
      input.value = "";
    });
  },

  getElements() {
    const currentLocation = document.getElementById("currentLocation");
    const todaysDate = document.getElementById("todaysDate");
    const currentTemperature = document.getElementById("currentTemperature");
    const todaysHigh = document.getElementById("todaysHigh");
    const todaysLow = document.getElementById("todaysLow");
    const currentSky = document.getElementById("currentSky");
    const currentSkyIcon = document.getElementById("currentSkyIcon");
    const currentWind = document.getElementById("currentWind");
    const currentUV = document.getElementById("currentUV");
    const day2Date = document.getElementById("day2Date");
    const day3Date = document.getElementById("day3Date");
    const day2High = document.getElementById("day2High");
    const day2Low = document.getElementById("day2Low");
    const day3High = document.getElementById("day3High");
    const day3Low = document.getElementById("day3Low");
    const day2Sky = document.getElementById("day2Sky");
    const day3Sky = document.getElementById("day3Sky");
    const day2SkyIcon = document.getElementById("day2SkyIcon");
    const day3SkyIcon = document.getElementById("day3SkyIcon");

    return {
      currentLocation,
      todaysDate,
      currentTemperature,
      todaysHigh,
      todaysLow,
      currentSky,
      currentSkyIcon,
      currentWind,
      currentUV,
      day2Date,
      day3Date,
      day2High,
      day2Low,
      day3High,
      day3Low,
      day2Sky,
      day3Sky,
      day2SkyIcon,
      day3SkyIcon,
    };
  },

  formatDates(object) {
    const datesArray = object.forecast.forecastday.map((item) => {
      return new Date(item.date.split("-").join("/"));
    });

    const formattedDates = datesArray.map((date) => date.toDateString());

    return formattedDates;
  },
  getHighTemps(object) {
    const highTempsArray = object.forecast.forecastday.map(
      (item) => item.day.maxtemp_f
    );
    return highTempsArray;
  },
  getLowTemps(object) {
    const lowTempsArray = object.forecast.forecastday.map(
      (item) => item.day.mintemp_f
    );
    return lowTempsArray;
  },
  getSkyConditions(object) {
    const skyConditionsArray = object.forecast.forecastday.map(
      (item) => item.day.condition
    );
    return skyConditionsArray;
  },
  async getWeather(location) {
    const {
      currentLocation,
      todaysDate,
      currentTemperature,
      todaysHigh,
      todaysLow,
      currentSky,
      currentSkyIcon,
      currentWind,
      currentUV,
      day2Date,
      day3Date,
      day2High,
      day2Low,
      day3High,
      day3Low,
      day2Sky,
      day3Sky,
      day2SkyIcon,
      day3SkyIcon,
    } = WEATHERAPP.getElements();
    const apiKey = "c76dd3948a164f17ade144908242205";

    const forecastWeatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;
    try {
      const response = await fetch(forecastWeatherUrl);
      const object = await response.json();

      currentLocation.textContent = `Current Location: ${object.location.name}, ${object.location.region}`;
      const [date1, date2, date3] = WEATHERAPP.formatDates(object);
      const [high1, high2, high3] = WEATHERAPP.getHighTemps(object);
      const [low1, low2, low3] = WEATHERAPP.getLowTemps(object);
      const [sky1, sky2, sky3] = WEATHERAPP.getSkyConditions(object);
      todaysDate.textContent = date1;
      day2Date.textContent = date2;
      day3Date.textContent = date3;
      currentTemperature.innerHTML = `Current Temperature: ${object.current.temp_f}&degF`;
      todaysHigh.innerHTML = `Today's High: ${high1}&degF`;
      todaysLow.innerHTML = `Today's Low: ${low1}&degF`;
      currentSky.textContent = object.current.condition.text;
      currentSkyIcon.src = `https:${object.current.condition.icon}`;
      currentWind.textContent = `${object.current.wind_mph} mph ${object.current.wind_dir}`;
      currentUV.textContent = `UV: ${object.current.uv}`;
      day2High.innerHTML = `High: ${high2}&degF`;

      day2Low.innerHTML = `Low: ${low2}&degF`;

      day3High.innerHTML = `High: ${high3}&degF`;
      day3Low.innerHTML = `Low: ${low3}&degF`;
      day2Sky.textContent = sky2.text;
      day2SkyIcon.src = `https:${sky2.icon}`;

      day3Sky.textContent = sky3.text;
      day3SkyIcon.src = `https:${sky3.icon}`;
    } catch (error) {
      alert("something went wrong");
    }
  },
};

window.addEventListener("DOMContentLoaded", WEATHERAPP.init());
