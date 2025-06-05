const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const wind_speed = document.querySelector("#wind-speed");

async function checkWeather(city) {
  const api_key = "fe70064b71c378a4cd5c54b166267983";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const weather_data = await fetch(url).then((response) => response.json());

  if (weather_data.cod === "404") {
    document.querySelector(".location-not-found").style.display = "flex";
    document.querySelector(".weather-body").style.display = "none";
    return;
  }

  document.querySelector(".weather-body").style.display = "flex";
  document.querySelector(".location-not-found").style.display = "none";

  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${Math.round(weather_data.wind.speed * 3.6)} km/h`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "assets/cloud.png";
      break;
    case "Clear":
      weather_img.src = "assets/sun.png";
      break;
    case "Rain":
      weather_img.src = "assets/rain.png";
      break;
    case "Mist":
      weather_img.src = "assets/mist.png";
      break;
    case "Snow":
      weather_img.src = "assets/snow.png";
      break;
    default:
      weather_img.src = "";
  }

  console.log(weather_data);
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
