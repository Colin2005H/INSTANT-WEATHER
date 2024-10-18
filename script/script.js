//RETURN an array with the INSEE code and name of each commune with the postal code given
// Array[
// 0: Array[insee code, name]
// 1: ...
// ]
//
async function getINSEECodeFromCP(cp) {
  const request = "https://geo.api.gouv.fr/communes?codePostal=" + cp;
  const codeINSEE = [];
  try {
    const promise = await fetch(request);
    const result = await promise.json();
    for (let i = 0; i < result.length; i++) {
      codeINSEE[i] = [result[i].code, result[i].nom];
    }
  } catch (e) {
    console.error("Erreur lors de la récupération du code INSEE :", e);
  }
  return codeINSEE;
}

//RETURN a list of forcast info for each day starting from today up to <nbDay> (max 14 day)
//access days by the array index (sorted chronologically starting from today)
//Array[
//0: {
//     "latitude" : ,         //latitude
//     "longitude" : ,        //longitude
//     "weather" : ,          //int to convert using weatherToText.get(int)
//     "tempMin" : ,         //minimum temperature from the day
//     "tempMax" : ,         //maximum temperature from the day
//     "rainProb" : ,        //probability of rain
//     "rainAmont" : ,       //quantity of rain in mm
//     "sunshineHour" : ,    //number of hour of sun exposure
//     "avgWind" : ,         //average wind at 10 m in km/h
//     "windDirection": ,    //direction the wind is comming in degree
//    }
//1: ...
//
async function getForcastInfo(codeINSEE, NBDay) {
  if (NBDay < 1 || NBDay > 14) {
    throw new Error("Can get forcast for 1 to 14 days");
  }
  request =
    "https://api.meteo-concept.com/api/forecast/daily?token=7050a2dc76b480256fd4900fccf153567217d6f6fe483ed12f3af3e5dce6d687&insee=" +
    codeINSEE;
  apiReponce = 0;

  try {
    promise = await fetch(request);
    result = await promise.json();
    apiReponce = result;
  } catch (e) {}

  apiForcastReponce = apiReponce.forecast;
  forcastInfo = [];

  for (i = 0; i < nbDay; i++) {
    dayInfo = {
      latitude: apiReponce.city.latitude, //latitude
      longitude: apiReponce.city.longitude, //longitude
      weather: apiForcastReponce[i].weather, //int to convert using weatherToText.get(int)
      tempMin: apiForcastReponce[i].tmin, //minimum temperature from
      tempMax: apiForcastReponce[i].tmax, //minimum temperature from the day
      rainProb: apiForcastReponce[i].probarain, //probability of rain
      rainAmont: apiForcastReponce[i].etp, //quantity of rain in mm
      sunshineHour: apiForcastReponce[i].sunHours, //number of hour of sun exposure
      avgWind: apiForcastReponce[i].wind10m, //average wind at 10 m in km/h
      windDirection: apiForcastReponce[i].dirwind10m, //direction the wind is comming in degree
    };

    forcastInfo[i] = dayInfo;
  }
  return forcastInfo;
}

function regex(input) {
  if (input < 99999) {
    return true;
  }
  return false;
}

//fonction pour afficher les résultats dans le menu déroulant
function displayResultsCities(codeINSEE) {
  const resultSelect = document.getElementById("resultSelect");

  resultSelect.innerHTML = "";

  //si aucun code INSEE n'est trouvé
  if (codeINSEE.length === 0) {
    const noResultOption = document.createElement("option");
    noResultOption.textContent = "Aucun code INSEE trouvé pour ce code postal";
    noResultOption.disabled = true;
    resultSelect.appendChild(noResultOption);
  } else {
    //ajout des résultats sous forme d'options dans le select
    codeINSEE.forEach(([code, nom]) => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = `${nom} : ${code}`;
      resultSelect.appendChild(option);
    });
  }
}

document
  .getElementById("search-button")
  .addEventListener("click", async function () {
    inputCodePostal = document.getElementById("inputCodePostal").value;
    if (regex(inputCodePostal)) {
      const codeINSEE = await getINSEECodeFromCP(inputCodePostal);
      displayResultsCities(codeINSEE);
      cardResults = document.getElementById("card-results");
      cardResults.style.display = "flex";
      cardResults.style.animation = "slideIn 0.5s forwards";
    } else {
      document.getElementById("inputCodePostal").value = "";
    }
  });


document
  .getElementById("inputCodePostal")
  .addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
      inputCodePostal = document.getElementById("inputCodePostal").value;
      if (regex(inputCodePostal)) {
        const codeINSEE = await getINSEECodeFromCP(inputCodePostal);
        displayResultsCities(codeINSEE);
        cardResults = document.getElementById("card-results");
        cardResults.style.display = "flex";
        cardResults.style.animation = "slideIn 0.5s forwards";
      } else {
        document.getElementById("inputCodePostal").value = "";
      }
    }
  });

//Update main weather forcast display
function displayWeatherForecast(weatherForcastInfo) {
  console.log(weatherForcastInfo);

  const forecastDiv = document.getElementById("forecast");

  // Vider le contenu précédent du div
  forecastDiv.innerHTML = "";

  const weatherForTheDay = document.createElement("div");
  weatherForTheDay.classList.add("weather-for-the-day");
  const cityNameImage = document.createElement("div");
  cityNameImage.classList.add("city-name-image");

  const cityName = document.createElement("p");
  cityName.classList.add("city-name");
  const selectedOption =
    document.getElementById("resultSelect").selectedOptions[0];
  cityName.textContent = selectedOption.textContent.split(" : ")[0];

  const temperature = document.createElement("div");
  temperature.classList.add("temperature");

  const temperatureMin = document.createElement("p");
  temperatureMin.classList.add("temperature_min");
  temperatureMin.textContent = `${weatherForcastInfo.tempMin}°C`;

  const iconUp = document.createElement("i");
  iconUp.classList.add("fa-solid", "fa-up-long");

  const iconDown = document.createElement("i");
  iconDown.classList.add("fa-solid", "fa-down-long");

  const temperatureMax = document.createElement("p");
  temperatureMax.classList.add("temperature_max");
  temperatureMax.textContent = `${weatherForcastInfo.tempMax}°C`;

  const imageWeather = document.createElement("img");
  imageWeather.classList.add("image-weather");

  if (weatherToText.get(weatherForcastInfo.weather).includes("Soleil")) {
    imageWeather.src = "image/weather-icon/clear-day.svg";
  } else if (
    weatherToText.get(weatherForcastInfo.weather).includes("pluie") ||
    weatherToText.get(weatherForcastInfo.weather).includes("Pluie")
  ) {
    imageWeather.src = "image/weather-icon/rainy-3.svg";
  } else if (
    weatherToText.get(weatherForcastInfo.weather).includes("Nuageux") ||
    weatherToText.get(weatherForcastInfo.weather).includes("voilé") ||
    weatherToText.get(weatherForcastInfo.weather).includes("nuageux")
  ) {
    imageWeather.src = "image/weather-icon/cloudy.svg";
  } else {
    imageWeather.style.display = "none";
  }

  const secondLineWeather = document.createElement("div");
  secondLineWeather.classList.add("second-line-weather");
  const weather = document.createElement("p");
  weather.classList.add("weather");
  weather.textContent = weatherToText.get(weatherForcastInfo.weather);

  const rainProb = document.createElement("div");
  rainProb.classList.add("rain-prob");
  const iconRainProb = document.createElement("i");
  iconRainProb.classList.add("fa-solid", "fa-cloud-rain");

  const rainProbText = document.createElement("p");
  rainProbText.classList.add("rain-prob-text");
  rainProbText.textContent = `${weatherForcastInfo.rainProb}%`;

  const sunDiv = document.createElement("div");
  sunDiv.classList.add("sun-div");
  const iconSun = document.createElement("i");
  iconSun.classList.add("fa-regular", "fa-sun");

  //sunHour
  const sunHours = document.createElement("p");
  sunHours.classList.add("sun-hours");
  sunHours.textContent = `${weatherForcastInfo.sunshineHour}h`;

  sunDiv.appendChild(iconSun);
  sunDiv.appendChild(sunHours);

  temperature.appendChild(iconDown);
  temperature.appendChild(temperatureMin);
  temperature.appendChild(iconUp);
  temperature.appendChild(temperatureMax);

  cityNameImage.appendChild(imageWeather);
  cityNameImage.appendChild(cityName);

  rainProb.appendChild(iconRainProb);
  rainProb.appendChild(rainProbText);

  secondLineWeather.appendChild(rainProb);
  secondLineWeather.appendChild(sunDiv);

  weatherForTheDay.appendChild(cityNameImage);
  weatherForTheDay.appendChild(temperature);
  weatherForTheDay.appendChild(weather);
  weatherForTheDay.appendChild(secondLineWeather);

  forecastDiv.appendChild(weatherForTheDay);

  forecastDiv.style.display = "flex";
}

function displayCard(weatherForcastInfo, nbTotalDay) {
  const forecastCards = document.getElementById("forecast_cards");

  for (day = 0; day < nbTotalDay; day++) {
    card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute('id',day);

    //day
    dayName = document.createElement("p");
    dayName.classList.add("card_day");
    const date = new Date();
    date.setDate(date.getDate() + day); //increment the date by the current day index
    const options = { weekday: "long", month: "long", day: "numeric" };
    dayName.textContent = date.toLocaleDateString("fr-FR", options);

    //icon
    const CardImageWeather = document.createElement("img");
    CardImageWeather.classList.add("card-image-weather");

    if (weatherToText.get(weatherForcastInfo[day].weather).includes("Soleil")) {
      CardImageWeather.src = "image/weather-icon/clear-day.svg";
    } else if (
      weatherToText.get(weatherForcastInfo[day].weather).includes("pluie") ||
      weatherToText.get(weatherForcastInfo[day].weather).includes("Pluie")
    ) {
      CardImageWeather.src = "image/weather-icon/rainy-3.svg";
    } else if (
      weatherToText.get(weatherForcastInfo[day].weather).includes("Nuageux") ||
      weatherToText.get(weatherForcastInfo[day].weather).includes("voilé") ||
      weatherToText.get(weatherForcastInfo[day].weather).includes("nuageux")
    ) {
      CardImageWeather.src = "image/weather-icon/cloudy.svg";
    } else {
      CardImageWeather.style.display = "none";
    }

    //weather
    weather = document.createElement("p");
    weather.classList.add("card_weather");
    weather.textContent = weatherToText.get(weatherForcastInfo[day].weather);

    //temp
    temp = document.createElement("div");
    temp.classList.add("temp");

    //min
    const iconUp = document.createElement("i");
    iconUp.classList.add("fa-solid", "fa-up-long");

    min = document.createElement("p");
    min.classList.add("card_min");
    min.textContent = weatherForcastInfo[day].tempMin + "°C";

    //max
    const iconDown = document.createElement("i");
    iconDown.classList.add("fa-solid", "fa-down-long");

    max = document.createElement("p");
    max.classList.add("card_max");
    max.textContent = weatherForcastInfo[day].tempMax + "°C";

    card.appendChild(dayName);
    card.appendChild(weather);
    card.appendChild(CardImageWeather);
    card.appendChild(temp);
    temp.appendChild(iconDown);
    temp.appendChild(min);

    temp.appendChild(iconUp);
    temp.appendChild(max);
    forecastCards.appendChild(card);
  }
  
}
  
function cardListener(allCard){
  cardElement = "";
  for(cardIndex = 0 ; cardIndex < allCard.length; cardIndex++){
    cardElement = allCard[cardIndex];
    const id = cardElement.id;
    cardElement.addEventListener("click", () => {
      displayWeatherForecast(weatherForcastInfoAllDay[id]);
    })
  }
}

//LISTENER
document
  .getElementById("search-button")
  .addEventListener("click", async function () {
    inputCodePostal = document.getElementById("inputCodePostal").value;
    if (regex(inputCodePostal)) {
      const codeINSEE = await getINSEECodeFromCP(inputCodePostal);
      displayResultsCities(codeINSEE);
      cardResults = document.getElementById("card-results");
      cardResults.style.display = "flex";
      cardResults.style.animation = "slideIn 0.5s forwards";
    } else {
      console.error("Veuillez entrer un code postal valide.");
    }
  });

document
  .getElementById("inputCodePostal")
  .addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
      inputCodePostal = document.getElementById("inputCodePostal").value;
      if (regex(inputCodePostal)) {
        const codeINSEE = await getINSEECodeFromCP(inputCodePostal);
        displayResultsCities(codeINSEE);
        cardResults = document.getElementById("card-results");
        cardResults.style.display = "flex";
        cardResults.style.animation = "slideIn 0.5s forwards";
      } else {
        console.error("Veuillez entrer un code postal valide.");
      }
    }
  });

document
  .getElementById("inputCodePostal")
  .addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
      inputCodePostal = document.getElementById("inputCodePostal").value;
      if (regex(inputCodePostal)) {
        const codeINSEE = await getINSEECodeFromCP(inputCodePostal);
        displayResultsCities(codeINSEE);
        cardResults = document.getElementById("card-results");
        cardResults.style.display = "flex";
        cardResults.style.animation = "slideIn 0.5s forwards";
      } else {
        console.error("Veuillez entrer un code postal valide.");
      }
    }
  });

document
  .getElementById("check")
  .addEventListener("click", async function checkBouton() {
    const selectedOption =
      document.getElementById("resultSelect").selectedOptions[0];
    if (selectedOption) {
      const inseeCode = selectedOption.value;
      document.getElementById("search-button").style.display = "none";
      document.getElementById("reset-button").style.display = "flex";
      document.getElementById("forecast_cards").style.display = "flex";
      weatherForcastInfoAllDay = await getForcastInfo(selectedOption, 7);
      console.log(weatherForcastInfoAllDay);

      if (weatherForcastInfoAllDay) {
        displayWeatherForecast(weatherForcastInfoAllDay[0]);

        displayCard(weatherForcastInfoAllDay, 7);
        console.log(document.getElementsByClassName("card"));
        cardListener(document.getElementsByClassName("card"));

      } else {
        console.error("Impossible de récupérer les informations météo");
      }
    } else {
      console.error("Aucune ville sélectionnée.");
    }
  });

document
  .getElementById("reset-button")
  .addEventListener("click", async function () {
    document.getElementById("card-results").style.display = "none";
    document.getElementById("inputCodePostal").value = "";
    document.getElementById("search-button").style.display = "flex";
    document.getElementById("reset-button").style.display = "none";
    document.getElementById("forecast").innerHTML = "";
    document.getElementById("forecast_cards").style.display = "none";
  });