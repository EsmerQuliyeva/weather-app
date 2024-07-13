const inputCity = document.querySelector(".input-city");
const mainPicture = document.querySelector(".picture");
const temp = document.querySelector(".temp");
const city = document.querySelector("#city");
const humidityPercent = document.querySelector(".humidity-percent");
const windSpeed = document.querySelector(".wind-speed");
const searchBtn = document.querySelector("button");

const apiKey = "9a942e518348f796bd198a0c03120818";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

function displayWeather(info) {
  temp.textContent = Math.round(info.main.temp) + "°C";
  city.textContent = info.name;
  humidityPercent.textContent = info.main.humidity + "%";
  windSpeed.textContent = info.wind.speed + "km/h";
  if (info.weather[0].main == "Clear") {
    mainPicture.src = "images/clear.png";
  } else if (info.weather[0].main == "Rain") {
    mainPicture.src = "images/rain.png";
  } else if (info.weather[0].main === "Mist") {
    mainPicture.src = "images/mist.png";
  } else if (info.weather[0].main == "Clouds") {
    mainPicture.src = "images/clouds.png";
  } else if (info.weather[0].main === "Drizzle") {
    mainPicture.src = "images/drizzle.png";
  } else if (info.weather[0].main === "Snow") {
    mainPicture.src = "images/snow.png";
  }
}
searchBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(`${apiUrl}${inputCity.value}&appid=${apiKey}`);
    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".main-part").style.display = "none";
    } else {
      const data = await response.json();
      displayWeather(data);
      document.querySelector(".main-part").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error("Fetch xetasi:", error);
    document.querySelector(".main-part").style.display = "none";
    document.querySelector(".error").style.display = "block";
  }
});
inputCity.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const locationData = await response.json();
    const defaultCity = locationData.city;
    console.log("City you live in: " + defaultCity);

    const weatherResponse = await fetch(
      `${apiUrl}${defaultCity}&appid=${apiKey}`
    );
    const weatherData = await weatherResponse.json();

    if (weatherResponse.ok) {
      displayWeather(weatherData);
      document.querySelector(".main-part").style.display = "block";
      document.querySelector(".error").style.display = "none";
    } else {
      console.error("API hatası:", weatherData);
      document.querySelector(".main-part").style.display = "none";
      document.querySelector(".error").style.display = "block";
    }
  } catch (error) {
    console.error("xeta:", error);
    document.querySelector(".main-part").style.display = "none";
    document.querySelector(".error").style.display = "block";
  }
});
