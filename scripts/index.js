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

      const audio = document.querySelector(".audio-player__audio");
      const playPauseBtn = document.getElementById("playPauseBtn");

      if (temp <= 0 && temp <= -1) {
        audio.src = "../assets/music/Frozen.mp3";

        const joke = await fetchDadJoke();
        weatherItem.innerText = `Temperature in ${city}: ${temp}°C.`;
        messageBox.innerText = "It's cold! Here's a joke to keep you warm.";
        footerJoke.innerText = joke;
        audio.play();
        playPauseBtn.textContent = "Pause";
      }

      if (temp >= 1 && temp <= 5) {
        audio.src = "../assets/music/LoisArmstrong.mp3";

        const joke = await fetchDadJoke();
        weatherItem.innerText = `Temperature in ${city}: ${temp}°C.`;
        messageBox.innerText = "It's cold! Here's a joke to keep you warm.";
        footerJoke.innerText = joke;
        audio.play();
        playPauseBtn.textContent = "Pause";
      }

      if (temp > 5 && temp <= 10) {
        audio.src = "../assets/music/FEEL.mp3";
        const joke = await fetchDadJoke();
        weatherItem.innerText = `Temperature in ${city}: ${temp}°C.`;
        messageBox.innerText = "It's cold! Here's a joke to keep you warm.";
        footerJoke.innerText = joke;
        audio.play();
        playPauseBtn.textContent = "Pause";
      }

      if (temp >= 11 && temp <= 15) {
        weatherItem.innerText = `Temperature in ${city}: ${temp}°C.`;
        messageBox.innerText = "Weather is keeping you happy!";
        audio.src = "../assets/music/WORK.mp3";
        audio.play();
        playPauseBtn.textContent = "Pause";
      }

      if (temp >= 16 && temp <= 18) {
        weatherItem.innerText = `Temperature in ${city}: ${temp}°C.`;
        messageBox.innerText = "Weather is keeping you happy!";
        audio.src = "../assets/music/Sublime.mp3";
        audio.play();
        playPauseBtn.textContent = "Pause";
      }

      if (temp >= 19 && temp <= 22) {
        weatherItem.innerText = `Temperature in ${city}: ${temp}°C.`;
        messageBox.innerText = "Weather is keeping you happy!";
        audio.src = "../assets/music/Rock.mp3";
        audio.play();
        playPauseBtn.textContent = "Pause";
      }

      if (temp >= 23 && temp <= 27) {
        weatherItem.innerText = `Temperature in ${city}: ${temp}°C.`;
        messageBox.innerText = "Weather is keeping you happy!";
        audio.src = "../assets/music/Bob.mp3";
        audio.play();
        playPauseBtn.textContent = "Pause";
      }

      if (temp >= 28 && temp <= 32) {
        weatherItem.innerText = `Temperature in ${city}: ${temp}°C.`;
        messageBox.innerText = "Weather is keeping you happy!";
        audio.src = "../assets/music/Bob.mp3";
        audio.play();
        playPauseBtn.textContent = "Pause";
      }

      if (temp >= 33 && temp <= 40) {
        weatherItem.innerText = `Temperature in ${city}: ${temp}°C.`;
        messageBox.innerText = "Weather is keeping you happy!";
        audio.src = "../assets/music/JhonnyCash.mp3";
        audio.play();
        playPauseBtn.textContent = "Pause";
      }

      weatherList.appendChild(weatherItem);
    }
  } catch (error) {
    console.log(error);

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
