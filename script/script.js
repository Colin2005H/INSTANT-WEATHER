function regex(input) {
  if (input < 99999) {
    return true;
  }
  return false;
}

function cardListener(allCard){
  for(cardIndex = 0 ; cardIndex < allCard.length; cardIndex++){
    cardElement = allCard[cardIndex];
    const id = cardElement.id;
    cardElement.addEventListener("click", () => {
      displayWeatherForecast(weatherForcastInfoAllDay[id]);
    })
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

      if (weatherForcastInfoAllDay) {
        displayWeatherForecast(weatherForcastInfoAllDay[0]);
        displayWeatherCard(weatherForcastInfoAllDay, 7);
        cardListener(document.getElementsByClassName("card"));
      }
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