class moodyWeatherAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  }

  async getWeatherData(city) {
    try {
      const response = await axios.get(
        `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`
      );
      return response.data.main.temp;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }
}
