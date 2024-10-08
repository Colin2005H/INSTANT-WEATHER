//RETURN an array with the INSEE code and name of each commune with the postal code given
// Array[
// 0: Array[insee code, name]
// 1: ...
// ]

async function get_INSEE_code_from_CP(cp) {
  const request = "https://geo.api.gouv.fr/communes?codePostal=" + cp;
  const code_INSEE = [];
  try {
    const promise = await fetch(request);
    const result = await promise.json();
    for (let i = 0; i < result.length; i++) {
      code_INSEE[i] = [result[i].code, result[i].nom];
    }
  } catch (e) {
    console.error("Erreur lors de la récupération du code INSEE :", e);
  }
  return code_INSEE;
}

async function get_weather_info_from_insee_code(insee_code, day_from_today) {
  const request =
    "https://api.meteo-concept.com/api/forecast/daily/" +
    day_from_today +
    "?token=7050a2dc76b480256fd4900fccf153567217d6f6fe483ed12f3af3e5dce6d687&insee=" +
    insee_code;

  let weather_info = [];
  try {
    const promise = await fetch(request);
    const result = await promise.json();
    console.log("Données météo retournées par l'API :", result);
    weather_info = result;
  } catch (e) {
    console.error("Erreur lors de la récupération des données météo :", e);
  }

  return weather_info;
}

async function get_forcast_info(code_insee, nb_day){
  request = "https://api.meteo-concept.com/api/forecast/daily?token=7050a2dc76b480256fd4900fccf153567217d6f6fe483ed12f3af3e5dce6d687&insee=" + code_insee
  api_reponce = 0;

  try {
    promise = await fetch(request);
    result = await promise.json();
    api_reponce = result;
  } catch (e) {}

  api_forcast_reponce = api_reponce.forecast;
  forcast_info = [];

  for( i = 0; i < nb_day; i++){
    day_info = 
    {
      "latitude" : api_reponce.city.latitude, 
      "longitude" : api_reponce.city.longitude,
      "weather" : api_forcast_reponce[i].weather,
      "temp_min" : api_forcast_reponce[i].tmin,
      "temp_max" : api_forcast_reponce[i].tmax,
      "rain_prob" : api_forcast_reponce[i].probarain,
      "rain_amont" : api_forcast_reponce[i].etp,
      "sunshine_hour" : api_forcast_reponce[i].sun_hour,
      "avg_wind" : api_forcast_reponce[i].wind10m,
      "wind_direction": api_forcast_reponce[i].dirwind10m
    };
    
    
    forcast_info[i] = day_info;
  }
  return forcast_info;
}

async function get_location_info_from_insee_code(insee_code) {
  request =
    "https://api.meteo-concept.com/api/location/city?token=7050a2dc76b480256fd4900fccf153567217d6f6fe483ed12f3af3e5dce6d687&insee=" +
    insee_code;
  location_info = [];
  try {
    promise = await fetch(request);
    result = await promise.json();
    location_info = result;
  } catch (e) {}
  return location_info;
}

//for function test
window.onload = async function () {
  insee_code = await get_INSEE_code_from_CP(14123);
  forcast_info = await get_forcast_info(insee_code, 3);
  console.log(forcast_info);
};

//fonction pour afficher les résultats dans le menu déroulant
function displayResultsCities(codesInsee) {
  const resultSelect = document.getElementById("resultSelect");

  resultSelect.innerHTML = "";

  //si aucun code INSEE n'est trouvé
  if (codesInsee.length === 0) {
    const noResultOption = document.createElement("option");
    noResultOption.textContent = "Aucun code INSEE trouvé pour ce code postal";
    noResultOption.disabled = true;
    resultSelect.appendChild(noResultOption);
  } else {
    //ajout des résultats sous forme d'options dans le select
    codesInsee.forEach(([code, nom]) => {
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
    const inputCodePostal = document.getElementById("inputCodePostal").value;

    if (inputCodePostal) {
      const codesInsee = await get_INSEE_code_from_CP(inputCodePostal);
      displayResultsCities(codesInsee);
      cardResults = document.getElementById("card-results");
      cardResults.style.display = "flex";
      cardResults.style.animation = "slideIn 0.5s forwards";
    } else {
      console.error("Veuillez entrer un code postal valide.");
    }
  });

// Fonction pour afficher les résultats météo dans un tableau
function displayWeatherForecast(weatherData) {
  const forecastDiv = document.getElementById("forecast");

  // Vider le contenu précédent du div
  forecastDiv.innerHTML = "";

  // créer le tableau
  const table = document.createElement("table");
  table.classList.add("weather-table");
  // Créer l'en-tête du tableau
  const header = document.createElement("tr");
  const headers = [
    "Date",
    "Température Min",
    "Température Max",
    "Probabilité de pluie",
    "Ensoleillement",
  ];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.classList.add("weather-header");
    th.textContent = headerText;
    header.appendChild(th);
  });
  table.appendChild(header);

  const row = document.createElement("tr");

  const dateCell = document.createElement("td");
  dateCell.textContent = weatherData.datetime.split("T")[0]; // Récupérer la date sans l'heure
  dateCell.classList.add("weather-data");
  row.appendChild(dateCell);

  const tempMinCell = document.createElement("td");
  tempMinCell.textContent = `${weatherData.tmin}°C`;
  tempMinCell.classList.add("weather-data");
  row.appendChild(tempMinCell);

  const tempMaxCell = document.createElement("td");
  tempMaxCell.textContent = `${weatherData.tmax}°C`;
  tempMaxCell.classList.add("weather-data");
  row.appendChild(tempMaxCell);

  const rainProbCell = document.createElement("td");
  rainProbCell.textContent = `${weatherData.probarain}%`;
  rainProbCell.classList.add("weather-data");
  row.appendChild(rainProbCell);

  const sunCell = document.createElement("td");
  sunCell.textContent = `${weatherData.sun_hours}h`;
  sunCell.classList.add("weather-data");
  row.appendChild(sunCell);

  table.appendChild(row);

  forecastDiv.appendChild(table).style.animation = "slideIn 0.5s forwards";
}

document.getElementById("check").addEventListener("click", async function () {
  const selectedOption =
    document.getElementById("resultSelect").selectedOptions[0];
  if (selectedOption) {
    const inseeCode = selectedOption.value;

    const weatherInfo = await get_weather_info_from_insee_code(inseeCode, 0);

    if (weatherInfo && weatherInfo.forecast) {
      displayWeatherForecast(weatherInfo.forecast);
    } else {
      console.error("Impossible de récupérer les informations météo");
    }
  } else {
    console.error("Aucune ville sélectionnée.");
  }
});
