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
        cardResults.style.animation = "slideIn 1s forwards";
      } else {
        document.getElementById("inputCodePostal").value = "";
      }
    }
  });

let weatherForcastInfoAllDay = [];
let numberOfDayDisplayed = 1;
let windSpeedB = false;
let latLongB = false;
let rainAmontB = false;
let windDirectionB = false;



document
  .getElementById("check")
  .addEventListener("click", async function checkBouton() {
    const selectedOption =
      document.getElementById("resultSelect").selectedOptions[0];
      
    if (selectedOption) {
      document.getElementById("search-button").style.display = "none";
      document.getElementById("reset-button").style.display = "flex";
      document.getElementById("forecast_cards").style.display = "flex";
      console.log(selectedOption);
      weatherForcastInfoAllDay = await getForcastInfo(selectedOption.value, 8);

      console.log(weatherForcastInfoAllDay);

      if (weatherForcastInfoAllDay) {
        displayWeatherForecast(weatherForcastInfoAllDay[0], false, false, false, false);
        displayWeatherCard(weatherForcastInfoAllDay, 0);
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
      if(document.getElementsByClassName("settings-menu").length != 0){
        document.body.removeChild(document.getElementsByClassName("settings-menu")[0]);
      }
        document.getElementById("forecast").style.display = "none";
        document.getElementById("forecast_cards").style.display = "none";
        document.getElementById("head-bar").style.display = "none";
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
        daysRange.classList.add("days-range");
        daysRange.setAttribute("type", "range");
        daysRange.setAttribute("id", "daysRange");
        daysRange.setAttribute("name", "daysRange");
        daysRange.setAttribute("min", "1");
        daysRange.setAttribute("max", "7");
        daysRange.setAttribute("value", numberOfDayDisplayed);

        const daysValue = document.createElement("span");
        daysValue.setAttribute("id", "daysValue");
        daysValue.textContent = numberOfDayDisplayed + " jours";

        daysRange.addEventListener("input", function () {
          daysValue.textContent = `${daysRange.value} jours`;
        });

        const submitButton = document.createElement("i");
        submitButton.classList.add("fa-solid", "fa-check");
        submitButton.setAttribute("id", "submit");

        settingsForm.appendChild(daysLabel);
        settingsForm.appendChild(daysRange);
        settingsForm.appendChild(daysValue);

        settingsMenu.appendChild(settingsTitle);
        settingsMenu.appendChild(settingsForm);

        const fieldset = document.createElement("fieldset"); 
        fieldset.classList.add("fieldset");
        const legend = document.createElement("legend");
        legend.textContent = "Quelles informations voulez-vous afficher ?";
        fieldset.appendChild(legend);
        const options = [ //checkbox
          { id: "windSpeed", label: "Vitesse du vent" , checkedStatus : windSpeedB},
          { id: "latLong", label: "Latitude/Longitude", checkedStatus : latLongB },
          { id: "rainAmount", label: "Cumul de pluie", checkedStatus : rainAmontB},
          { id: "windDirection", label: "Direction du vent", checkedStatus : windDirectionB},
        ];
        options.forEach(option => { //add checkbox
          const div = document.createElement("div");
          const input = document.createElement("input");
          input.type = "checkbox";
          input.id = option.id;
          input.name = option.id;
          input.checked = option.checkedStatus;
          const label = document.createElement("label"); 
          label.setAttribute("for", option.id);
          label.textContent = option.label;
          div.appendChild(input);
          div.appendChild(label);
          fieldset.appendChild(div);
        });
        settingsMenu.appendChild(fieldset);

        settingsMenu.appendChild(submitButton);
        document.body.appendChild(settingsMenu);
        settingsMenu.style.animation = "slideInXLeft 0.5s forwards";
    }

  });

document.addEventListener("click", async function (event) {
  if (event.target && event.target.id === "submit") {

    document.getElementById("forecast").style.display = "flex";
    document.getElementById("head-bar").style.display = "flex";
    document.getElementById("search").style.display = "flex";
    document.getElementById("card-results").style.display = "flex";

    const selectedOption = document.getElementById("resultSelect").selectedOptions[0];
    if (selectedOption) {
      const inseeCode = selectedOption.value;
      document.getElementById("search-button").style.display = "none";
      document.getElementById("reset-button").style.display = "flex";
      document.getElementById("forecast_cards").style.display = "flex";


      if (weatherForcastInfoAllDay) {
        windSpeedB = document.getElementById("windSpeed").checked;
        latLongB = document.getElementById("latLong").checked;
        rainAmontB = document.getElementById("rainAmount").checked;
        windDirectionB = document.getElementById("windDirection").checked;
        numberOfDayDisplayed= document.getElementById("daysRange").value;
        displayWeatherForecast(weatherForcastInfoAllDay[0], windSpeedB, latLongB, rainAmontB, windDirectionB);
        if(numberOfDayDisplayed > 1){
          displayWeatherCard(weatherForcastInfoAllDay, numberOfDayDisplayed);
        }else{
          displayWeatherCard(weatherForcastInfoAllDay, 0);
        }
        
        document.querySelector(".settings-menu").remove();
        cardListener(document.getElementsByClassName("card"));
      } else {
        console.error("Impossible de récupérer les informations météo");
      }
    } else {
      console.error("Aucune ville sélectionnée.");
    }
  }
});