class moodyWeatherAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "http://api.openweathermap.org/data/2.5/weather";
  }

  async getWeatherData(city) {
    try {
      const weather = await axios.get(
        `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`
      );
      return weather.data.main.temp;
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
}

function getPlaylistByTemperature(temp) {
  if (temp >= 30) {
    return "Summer Vibes 🌞 - Hot Summer Day!";
  } else if (temp >= 20) {
    return "Chill Beats 🌤️ - Still quite pleasant.";
  } else if (temp >= 10) {
    return "Getting Chilli 🍂 - Getting Chilli.";
  } else {
    return "Cozy Coffee Shop 🔥 - Better Stay In.";
  }
}
