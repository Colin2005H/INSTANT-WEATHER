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
  .getElementById("buttonCodePostal")
  .addEventListener("click", async function () {
    const inputCodePostal = document.getElementById("inputCodePostal").value;

    if (inputCodePostal) {
      const codesInsee = await get_INSEE_code_from_CP(inputCodePostal);
      displayResultsCities(codesInsee); // Appel de la fonction pour afficher les résultats dans le select
    } else {
      console.error("Veuillez entrer un code postal valide.");
    }
  });

document
  .getElementById("ButtonCityChoice")
  .addEventListener("click", function () {
    const selectedOption =
      document.getElementById("resultSelect").selectedOptions[0];
    if (selectedOption) {
      document.getElementById("city").innerHTML = selectedOption.textContent;
    } else {
      console.error("Aucune ville sélectionnée.");
    }
  });

async function get_weather_info_from_insee_code(insee_code, day_from_today) {
  request =
    "https://api.meteo-concept.com/api/forecast/daily/" +
    day_from_today +
    "?token=7050a2dc76b480256fd4900fccf153567217d6f6fe483ed12f3af3e5dce6d687&insee=" +
    insee_code;
  weather_info = [];
  try {
    promise = await fetch(request);
    result = await promise.json();
    weather_info = result;
  } catch (e) {}

  return weather_info;
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
// window.onload = async function () {
//   insee_code = await get_INSEE_code_from_CP(14123);
//   console.log(insee_code);
//   weather_info = await get_weather_info_from_insee_code(insee_code[0][0], 0);
//   console.log(weather_info);
//   location_info = await get_location_info_from_insee_code(insee_code);
//   console.log(location_info);
// };

document
  .getElementById("buttonCodePostal")
  .addEventListener("click", async function () {
    cp = document.getElementById("inputCodePostal").textContent;
    insee_code = await get_INSEE_code_from_CP(+cp);
    console.log(insee_code);
  });
