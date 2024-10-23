const API_KEY = "c780a7f95abdda4f5ccb13af8a3ce551";
const weatherAPI = new moodyWeatherAPI(API_KEY);

async function fetchWeather() {
  try {
    const temp = await weatherAPI.getWeatherData("London");
    console.log(`Temperature in ${city} is: ${temp}°C`);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

fetchWeather();
