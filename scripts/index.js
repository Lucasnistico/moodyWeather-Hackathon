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
  const weatherList = document.querySelector(".weather__responses");
  const messageBox = document.querySelector(".message__box");
  const footerJoke = document.querySelector(".footer__quote");
  const audio = document.querySelector(".audio-player__audio");
  const playPauseBtn = document.getElementById("playPauseBtn");

  weatherList.innerHTML = "";
  messageBox.innerHTML = "";
  footerJoke.innerHTML = "";

  const weatherItem = document.createElement("li");
  weatherItem.classList.add("li-response");
  weatherList.appendChild(weatherItem);

  try {
    const temp = await fetchWeather(city);

    if (temp !== undefined) {
      const setWeatherResponse = async (
        message,
        musicPath,
        fetchJoke = false
      ) => {
        weatherItem.innerText = `Temperature in ${city}: ${temp}°C.`;
        messageBox.innerText = message;

        if (musicPath) {
          audio.src = musicPath;
          audio.play();
          playPauseBtn.textContent = "Pause";
        }

        if (fetchJoke) {
          const joke = await fetchDadJoke();
          footerJoke.innerText = joke;
        } else {
          footerJoke.innerText = "";
        }
      };

      if (temp <= 0) {
        await setWeatherResponse(
          "❄️ It's cold! Here's a joke to keep you warm. 🤣",
          "../assets/music/Frozen.mp3",
          true
        );
      } else if (temp <= 3) {
        await setWeatherResponse(
          "❄️ It's cold! Here's a joke to keep you warm.🤣",
          "../assets/music/LoiusArmstrong.mp3",
          true
        );
      } else if (temp <= 7) {
        await setWeatherResponse(
          "❄️ It's cold! Here's a joke to keep you warm.🤣",
          "../assets/music/EdSheeren.mp3",
          true
        );
      } else if (temp <= 11) {
        await setWeatherResponse(
          "❄️ It's cold! Here's a joke to keep you warm.🤣",
          "../assets/music/FEEL.mp3",
          true
        );
      } else if (temp <= 15) {
        await setWeatherResponse(
          "😎 Weather is keeping you happy!🌞",
          "../assets/music/WORK.mp3",
          false
        );
      } else if (temp <= 18) {
        await setWeatherResponse(
          "😎 Weather is keeping you happy!🌞",
          "../assets/music/Rock.mp3",
          false
        );
      } else if (temp <= 22) {
        await setWeatherResponse(
          "😎 Weather is keeping you happy!🌞",
          "../assets/music/CalvinHarris.mp3",
          false
        );
      } else if (temp <= 25) {
        await setWeatherResponse(
          "😎 Weather is keeping you happy!🌞",
          "../assets/music/CalvinHarris.mp3",
          false
        );
      } else if (temp <= 28) {
        await setWeatherResponse(
          "😎 Weather is keeping you happy!🌞",
          "../assets/music/Bob.mp3",
          false
        );
      } else if (temp <= 29) {
        await setWeatherResponse(
          "😎 Weather is keeping you happy!🌞",
          "../assets/music/Sublime.mp3",
          false
        );
      } else if (temp <= 31) {
        await setWeatherResponse(
          "😎 Ok it's too hot!🌞",
          "../assets/music/JhonnyCash.mp3",
          false
        );
      } else if (temp > 34) {
        await setWeatherResponse(
          "🔥 It's really hot! Here's something smooth to chill. 🎶",
          "../assets/music/Sade.mp3",
          false
        );
      } else {
        weatherItem.innerText = `Temperature in ${city}: ${temp}°C. No specific weather conditions found.`;
      }
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    weatherList.textContent = "City must be valid! ¬¬";
  }
};

const form = document.querySelector(".weather__form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = event.target.city.value.trim();
  const messageBox = document.querySelector(".message__box");

  if (city) {
    messageBox.innerHTML = "";
    await renderWeather(city);
  } else {
    messageBox.innerText = "City name is required!";
    console.error("City name is required!");
  }
});
