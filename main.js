async function getWeather(location) {
  const apiKey = "c76dd3948a164f17ade144908242205";
  const currentWeartherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
  const forecastWeatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;
  try {
    const response = await fetch(forecastWeatherUrl, { mode: "cors" });
    const object = await response.json();
    console.log(object);
  } catch (error) {
    console.log(error);
  }
}

getWeather("acworth");
