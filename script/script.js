//RETURN an array with the INSEE code and name of each commune with the postal code given
// Array[
// 0: Array[insee code, name]
// 1: ...
// ]
async function get_INSEE_code_from_CP(cp) {
  request = "https://geo.api.gouv.fr/communes?codePostal=" + cp;
  code_INSEE = [];
  try {
    promise = await fetch(request);
    result = await promise.json();
  } catch (e) {}

  for (i = 0; i < result.length; i++) {
    code_INSEE[i] = [result[i].code, result[i].nom];
  }
  return code_INSEE;
}

document
  .getElementById("buttonCodePostal")
  .addEventListener("click", async function () {
    cp = document.getElementById("inputCodePostal").textContent;
    insee_code = await get_INSEE_code_from_CP(+cp);
    console.log(insee_code);
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
  } catch (e) {}
  weather_info = result;
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
  } catch (e) {}
  location_info = result;
  return location_info;
}

//for function test
window.onload = async function () {
  insee_code = await get_INSEE_code_from_CP(14123);
  console.log(insee_code);
  weather_info = await get_weather_info_from_insee_code(insee_code[0][0], 0);
  console.log(weather_info);
  location_info = await get_location_info_from_insee_code(insee_code);
  console.log(location_info);
};
