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















document
  .getElementById("forecast")
  .addEventListener("click", function (event) {
    if (event.target && event.target.id === "settings") {
      document.getElementById("forecast").style.display = "none";
      document.getElementById("forecast_cards").style.display = "none";
      document.getElementById("search").style.display = "none";
      document.getElementById("card-results").style.display = "none";

      const settingsMenu = document.createElement("div");
      settingsMenu.classList.add("settings-menu");

      const settingsTitle = document.createElement("p");
      settingsTitle.classList.add("settings-title");
      settingsTitle.textContent = "Paramètres";

      const settingsForm = document.createElement("form");
      settingsForm.classList.add("settings-form");

      const daysLabel = document.createElement("label");
      daysLabel.setAttribute("for", "daysRange");
      daysLabel.textContent = "Nombre de jours de prévision :";

      const daysRange = document.createElement("input");
      daysRange.setAttribute("type", "range");
      daysRange.setAttribute("id", "daysRange");
      daysRange.setAttribute("name", "daysRange");
      daysRange.setAttribute("min", "2");
      daysRange.setAttribute("max", "7");
      daysRange.setAttribute("value", "7");

      const daysValue = document.createElement("span");
      daysValue.setAttribute("id", "daysValue");
      daysValue.textContent = "7 jours";

      daysRange.addEventListener("input", function () {
        daysValue.textContent = `${daysRange.value} jours`;
      });

      const submitButton = document.createElement("i");
      submitButton.classList.add("fa-solid", "fa-check");
      submitButton.setAttribute("id", "submit");
      console.log(submitButton);

      settingsForm.appendChild(daysLabel);
      settingsForm.appendChild(daysRange);
      settingsForm.appendChild(daysValue);

      settingsMenu.appendChild(settingsTitle);
      settingsMenu.appendChild(settingsForm);
      settingsMenu.appendChild(submitButton);
      document.body.appendChild(settingsMenu);
      settingsMenu.style.display = "flex";
    }
  });

document.addEventListener("click", async function (event) {
  if (event.target && event.target.id === "submit") {
    document.getElementById("forecast").style.display = "flex";
    document.getElementById("search").style.display = "flex";
    document.getElementById("card-results").style.display = "flex";

    const selectedOption =
      document.getElementById("resultSelect").selectedOptions[0];
    if (selectedOption) {
      const inseeCode = selectedOption.value;
      document.getElementById("search-button").style.display = "none";
      document.getElementById("reset-button").style.display = "flex";
      document.getElementById("forecast_cards").style.display = "flex";
      weather_forcast_info_all_day = await get_forcast_info(inseeCode, 7);
      console.log(weather_forcast_info_all_day);

      if (weather_forcast_info_all_day) {
        displayWeatherForecast(weather_forcast_info_all_day[0]);

        display_card(
          weather_forcast_info_all_day,
          document.getElementById("daysRange").value
        );
        document.querySelector(".settings-menu").remove();
        console.log(document.getElementsByClassName("card"));
        card_listener(document.getElementsByClassName("card"));
      } else {
        console.error("Impossible de récupérer les informations météo");
      }
    } else {
      console.error("Aucune ville sélectionnée.");
    }
  }
});