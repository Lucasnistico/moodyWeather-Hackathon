const API_KEY = "c780a7f95abdda4f5ccb13af8a3ce551";
const weatherAPI = new moodyWeatherAPI(API_KEY);

const fetchWeather = async (city) => {
  try {
    const temp = await weatherAPI.getWeatherData(city);
    console.log(`Temperature in ${city} is: ${temp}°C`);
    return temp;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

const fetchDadJoke = async () => {
  try {
    const response = await axios.get("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });
    return response.data.joke;
  } catch (error) {
    console.error("Error fetching dad joke:", error);
    return "Couldn't fetch a joke!";
  }
};

const renderWeather = async (city) => {
  const weatherList = document.querySelector(".weather__response");
  const messageBox = document.querySelector(".message__box");
  const footerJoke = document.querySelector(".footer__quote");
  weatherList.innerHTML = "";
  messageBox.innerHTML = "";
  footerJoke.innerHTML = "";

  try {
    const temp = await fetchWeather(city);
    if (temp !== undefined) {
      const weatherItem = document.createElement("li");

      if (temp >= 10) {
        weatherItem.innerText = `Temperature in ${city}: ${temp}°C.`;
        messageBox.innerText = "Weather is keeping you happy!";
      } else {
        const joke = await fetchDadJoke();
        weatherItem.innerText = `Temperature in ${city}: ${temp}°C.`;
        messageBox.innerText = "It's cold! Here's a joke to keep you warm.";
        footerJoke.innerText = joke;
      }

      weatherList.appendChild(weatherItem);
    }
  } catch (error) {
    weatherList.textContent = "City must be valid!";
  }
};

const form = document.querySelector(".weather__form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = event.target.city.value;
  if (city) {
    await renderWeather(city);
  } else {
    console.error("City name is required!");
  }
});
