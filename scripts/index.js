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

const renderWeather = async (city) => {
  const weatherList = document.querySelector(".weather__response");
  weatherList.innerHTML = "";
  let temp;

  try {
    temp = await fetchWeather(city);
    if (temp !== undefined) {
      const weatherItem = document.createElement("li");
      weatherItem.innerText = `Temperature in ${city}: ${temp}°C`;
      weatherList.appendChild(weatherItem);

      const playlistName = getPlaylistByTemperature(temp);

      const playlists = await fetchDeezerPlaylist(playlistName);

      displayPlaylists(playlists);
    }
  } catch (error) {
    weatherList.textContent = "Error fetching weather data.";
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

const fetchDeezerPlaylist = async (playlistName) => {
  const corsProxy = "https://cors-anywhere.herokuapp.com/";
  const url = `${corsProxy}https://api.deezer.com/search/playlist?q=${encodeURIComponent(
    playlistName
  )}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data && data.data && data.data.length > 0) {
      return data.data;
    } else {
      console.error("No playlists found for this search.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching playlists from Deezer:", error);
    return [];
  }
};

function displayPlaylists(playlists) {
  const playlistSection = document.querySelector(".playlist__response");
  playlistSection.innerHTML = "";

  playlists.forEach((playlist) => {
    const playlistItem = document.createElement("div");
    playlistItem.classList.add("playlist-item");

    playlistItem.innerHTML = `
      <h3>${playlist.title}</h3>
      <a href="${playlist.link}" target="_blank">
        <img src="${playlist.picture_medium}" alt="${playlist.title}">
      </a>
    `;

    playlistSection.appendChild(playlistItem);
  });
}
