//convert weather in to text
const weather_to_text = new Map();
weather_to_text.set(0 , "Soleil");
weather_to_text.set(1 , "Peu nuageux");
weather_to_text.set(2 , "Ciel voilé");
weather_to_text.set(3 , "Nuageux");
weather_to_text.set(4 , "Très nuageux");
weather_to_text.set(5 , "Couvert");
weather_to_text.set(6 , "Brouillard");
weather_to_text.set(7 , "Brouillard givrant");
weather_to_text.set(10 , "Pluie faible");
weather_to_text.set(11 , "Pluie modérée");
weather_to_text.set(12 , "Pluie forte");
weather_to_text.set(13 , "Pluie faible verglaçante");
weather_to_text.set(14 , "Pluie modérée verglaçante");
weather_to_text.set(15 , "Pluie forte verglaçante");
weather_to_text.set(16 , "Bruine");
weather_to_text.set(20 , "Neige faible");
weather_to_text.set(21 , "Neige modérée");
weather_to_text.set(22 , "Neige forte");
weather_to_text.set(30 , "Pluie et neige mêlées faibles");
weather_to_text.set(31 , "Pluie et neige mêlées modérées");
weather_to_text.set(32 , "Pluie et neige mêlées fortes");
weather_to_text.set(40 , "Averses de pluie locales et faibles");
weather_to_text.set(41 , "Averses de pluie locales");
weather_to_text.set(42 , "Averses locales et fortes");
weather_to_text.set(43 , "Averses de pluie faibles");
weather_to_text.set(44 , "Averses de pluie");
weather_to_text.set(45 , "Averses de pluie fortes");
weather_to_text.set(46 , "Averses de pluie faibles et fréquentes");
weather_to_text.set(47 , "Averses de pluie fréquentes");
weather_to_text.set(48 , "Averses de pluie fortes et fréquentes");
weather_to_text.set(60 , "Averses de neige localisées et faibles");
weather_to_text.set(61 , "Averses de neige localisées");
weather_to_text.set(62 , "Averses de neige localisées et fortes");
weather_to_text.set(63 , "Averses de neige faibles");
weather_to_text.set(64 , "Averses de neige");
weather_to_text.set(65 , "Averses de neige fortes");
weather_to_text.set(66 , "Averses de neige faibles et fréquentes");
weather_to_text.set(67 , "Averses de neige fréquentes");
weather_to_text.set(68 , "Averses de neige fortes et fréquentes");
weather_to_text.set(70 , "Averses de pluie et neige mêlées localisées et faibles");
weather_to_text.set(71 , "Averses de pluie et neige mêlées localisées");
weather_to_text.set(72 , "Averses de pluie et neige mêlées localisées et fortes");
weather_to_text.set(73 , "Averses de pluie et neige mêlées faibles");
weather_to_text.set(74 , "Averses de pluie et neige mêlées");
weather_to_text.set(75 , "Averses de pluie et neige mêlées fortes");
weather_to_text.set(76 , "Averses de pluie et neige mêlées faibles et nombreuses");
weather_to_text.set(77 , "Averses de pluie et neige mêlées fréquentes");
weather_to_text.set(78 , "Averses de pluie et neige mêlées fortes et fréquentes");
weather_to_text.set(100 , "Orages faibles et locaux");
weather_to_text.set(101 , "Orages locaux");
weather_to_text.set(102 , "Orages fort et locaux");
weather_to_text.set(103 , "Orages faibles");
weather_to_text.set(104 , "Orages");
weather_to_text.set(105 , "Orages forts");
weather_to_text.set(106 , "Orages faibles et fréquents");
weather_to_text.set(107 , "Orages fréquents");
weather_to_text.set(108 , "Orages forts et fréquents");
weather_to_text.set(120 , "Orages faibles et locaux de neige ou grésil");
weather_to_text.set(121 , "Orages locaux de neige ou grésil");
weather_to_text.set(122 , "Orages locaux de neige ou grésil");
weather_to_text.set(123 , "Orages faibles de neige ou grésil");
weather_to_text.set(124 , "Orages de neige ou grésil");
weather_to_text.set(125 , "Orages de neige ou grésil");
weather_to_text.set(126 , "Orages faibles et fréquents de neige ou grésil");
weather_to_text.set(127 , "Orages fréquents de neige ou grésil");
weather_to_text.set(128 , "Orages fréquents de neige ou grésil");
weather_to_text.set(130 , "Orages faibles et locaux de pluie et neige mêlées ou grésil");
weather_to_text.set(131 , "Orages locaux de pluie et neige mêlées ou grésil");
weather_to_text.set(132 , "Orages fort et locaux de pluie et neige mêlées ou grésil");
weather_to_text.set(133 , "Orages faibles de pluie et neige mêlées ou grésil");
weather_to_text.set(134 , "Orages de pluie et neige mêlées ou grésil");
weather_to_text.set(135 , "Orages forts de pluie et neige mêlées ou grésil");
weather_to_text.set(136 , "Orages faibles et fréquents de pluie et neige mêlées ou grésil");
weather_to_text.set(137 , "Orages fréquents de pluie et neige mêlées ou grésil");
weather_to_text.set(138 , "Orages forts et fréquents de pluie et neige mêlées ou grésil");
weather_to_text.set(140 , "Pluies orageuses");
weather_to_text.set(141 , "Pluie et neige mêlées à caractère orageux");
weather_to_text.set(142 , "Neige à caractère orageux");
weather_to_text.set(210 , "Pluie faible intermittente");
weather_to_text.set(211 , "Pluie modérée intermittente");
weather_to_text.set(212 , "Pluie forte intermittente");
weather_to_text.set(220 , "Neige faible intermittente");
weather_to_text.set(221 , "Neige modérée intermittente");
weather_to_text.set(222 , "Neige forte intermittente");
weather_to_text.set(230 , "Pluie et neige mêlées");
weather_to_text.set(231 , "Pluie et neige mêlées");
weather_to_text.set(232 , "Pluie et neige mêlées");
weather_to_text.set(235 , "Averses de grêle");




//RETURN an array with the INSEE code and name of each commune with the postal code given
// Array[
// 0: Array[insee code, name]
// 1: ...
// ]
//
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

//                  DELETE WENT UPDATED TO NEW FUNCTION (get_forcast_info)
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
//                   SAME AS ABOVE DELETE WENT UPDATEDTO NEW FUNCTION
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

//RETURN a list of forcast info for each day starting from today up to <nb_day> (max 14 day)
//access days by the array index (sorted chronologically starting from today)
//Array[
//0: {
//     "latitude" : ,         //latitude
//     "longitude" : ,        //longitude
//     "weather" : ,          //int to convert using weather_to_text.get(int)
//     "temp_min" : ,         //minimum temperature from the day
//     "temp_max" : ,         //maximum temperature from the day
//     "rain_prob" : ,        //probability of rain
//     "rain_amont" : ,       //quantity of rain in mm
//     "sunshine_hour" : ,    //number of hour of sun exposure 
//     "avg_wind" : ,         //average wind at 10 m in km/h 
//     "wind_direction": ,    //direction the wind is comming in degree
//    }
//1: ...
//
async function get_forcast_info(code_insee, nb_day){
  if(nb_day < 1 || nb_day > 14){throw new Error('Can get forcast for 1 to 14 days');}
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
      "latitude" : api_reponce.city.latitude,                  //latitude
      "longitude" : api_reponce.city.longitude,                //longitude
      "weather" : api_forcast_reponce[i].weather,              //int to convert using the weather_to_text constant
      "temp_min" : api_forcast_reponce[i].tmin,                //minimum temperature from 
      "temp_max" : api_forcast_reponce[i].tmax,                //
      "rain_prob" : api_forcast_reponce[i].probarain,          //
      "rain_amont" : api_forcast_reponce[i].etp,               //
      "sunshine_hour" : api_forcast_reponce[i].sun_hour,       //
      "avg_wind" : api_forcast_reponce[i].wind10m,             //
      "wind_direction": api_forcast_reponce[i].dirwind10m      //
    };
    
    
    forcast_info[i] = day_info;
  }
  return forcast_info;
}

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





