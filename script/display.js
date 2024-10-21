function displayResultsCities(codeINSEE) {
    const resultSelect = document.getElementById("resultSelect");
    resultSelect.innerHTML = "";

    if (codeINSEE.length === 0) {
        const noResultOption = document.createElement("option");
        noResultOption.textContent = "Aucun code INSEE trouvé pour ce code postal";
        noResultOption.disabled = true;
        resultSelect.appendChild(noResultOption);
    } else {
        codeINSEE.forEach(([code, nom]) => {
            const option = document.createElement("option");
            option.value = code;
            option.textContent = `${nom} : ${code}`;
            resultSelect.appendChild(option);
        });
    }
}


//Update main weather forcast display
function displayWeatherForecast(weatherCard, windSpeedB, latLongB, rainAmontB, windDirectionB) {

    const forecastDiv = document.getElementById("forecast");

    // Empty previous div content
    forecastDiv.innerHTML = "";

    const weatherForTheDay = document.createElement("div");
    weatherForTheDay.classList.add("weather-for-the-day");
    const cityNameImage = document.createElement("div");
    cityNameImage.classList.add("city-name-image");

    const cityName_settings = document.createElement("div");
    cityName_settings.classList.add("city-name-settings");

    const cityName = document.createElement("p");
    cityName.classList.add("city-name");
    const selectedOption = document.getElementById("resultSelect").selectedOptions[0];
    cityName.textContent = selectedOption.textContent.split(" : ")[0];

    //settings
    const iconSettings = document.createElement("i");
    iconSettings.classList.add("fa-solid", "fa-gear");
    iconSettings.setAttribute("id", "settings");

    //temperature
    const temperature = document.createElement("div");
    temperature.classList.add("temperature");

    const temperatureMin = document.createElement("p");
    temperatureMin.classList.add("temperature_min");
    temperatureMin.textContent = `${weatherCard.tempMin}°C`;

    const iconUp = document.createElement("i");
    iconUp.classList.add("fa-solid", "fa-up-long");

    const iconDown = document.createElement("i");
    iconDown.classList.add("fa-solid", "fa-down-long");

    const temperatureMax = document.createElement("p");
    temperatureMax.classList.add("temperature_max");
    temperatureMax.textContent = `${weatherCard.tempMax}°C`;

    const weatherImageText = document.createElement("div");
    weatherImageText.classList.add("weather-image-text");

    //weather icon
    const imageWeather = document.createElement("img");
    imageWeather.classList.add("image-weather");

    if (weatherCard.weatherText().includes("Soleil")) {
        imageWeather.src = "image/weather-icon/clear-day.svg";
    } else if (
        weatherCard.weatherText().includes("pluie") ||
        weatherCard.weatherText().includes("Pluie")
    ) {
        imageWeather.src = "image/weather-icon/rainy-3.svg";
    } else if (
        weatherCard.weatherText().includes("Nuageux") ||
        weatherCard.weatherText().includes("voilé") ||
        weatherCard.weatherText().includes("nuageux")
    ) {
        imageWeather.src = "image/weather-icon/cloudy.svg";
    } else {
        imageWeather.style.display = "none";
    }
    //weather text
    const secondLineWeather = document.createElement("div");
    secondLineWeather.classList.add("second-line-weather");
    const weather = document.createElement("p");
    weather.classList.add("weather");
    weather.textContent = weatherCard.weatherText();

    //rain-prob
    const rainProb = document.createElement("div");
    rainProb.classList.add("rain-prob");
    const iconRainProb = document.createElement("i");
    iconRainProb.classList.add("fa-solid", "fa-cloud-rain");

    //rain-prob value
    const rainProbText = document.createElement("p");
    rainProbText.classList.add("rain-prob-text");
    rainProbText.textContent = `${weatherCard.rainProb}%`;

    //rain-amount
    const rainAmount = document.createElement("div");
    rainAmount.classList.add("rain-amount");
    const iconRainAmount = document.createElement("i");
    const rainAmountText = document.createElement("p");
    rainAmountText.classList.add("rain-amount-text");
    if(rainAmontB){
        iconRainAmount.classList.add("fa-solid", "fa-droplet");
        rainAmountText.textContent = `${weatherCard.rainAmont}mm`;
    }

    //sun-hour
    const sunDiv = document.createElement("div");
    sunDiv.classList.add("sun-div");
    const iconSun = document.createElement("i");
    iconSun.classList.add("fa-regular", "fa-sun");

    //sun-hour value
    const sunHours = document.createElement("p");
    sunHours.classList.add("sun-hours");
    sunHours.textContent = `${weatherCard.sunshineHour}h`;

    //wind
    const windDiv = document.createElement("div");
    windDiv.classList.add("wind-div");
    const iconWind = document.createElement("i");
    
    //wind speed
    const windSpeed = document.createElement("p");
    windSpeed.classList.add("wind-speed");
    if(windSpeedB){
        windSpeed.textContent = `${weatherCard.avgWind}km/h`;
        iconWind.classList.add("fa-solid", "fa-wind");
    }
    
    
    //wind dirction
    const windDirection = document.createElement("p");
    windDirection.classList.add("wind-direction");
    const directions = [
        "Nord",
        "Nord-Est",
        "Est",
        "Sud-Est",
        "Sud",
        "Sud-Ouest",
        "Ouest",
        "Nord-Ouest",
    ];
    const index = Math.round(weatherCard.windDirection / 45) % 8;
    const iconWindDirection = document.createElement("i");
    if(windDirectionB){
        windDirection.textContent = directions[index];
        iconWindDirection.classList.add("fa-solid", "fa-compass");
        iconWindDirection.style.transform = `rotate(${weatherCard.windDirection}deg)`;
    }
    

    
    

    const moreInfo = document.createElement("div");
    moreInfo.classList.add("more-info");

    //Add element to DOM
    sunDiv.appendChild(iconSun);
    sunDiv.appendChild(sunHours);

    rainProb.appendChild(iconRainProb);
    rainProb.appendChild(rainProbText);

    rainAmount.appendChild(iconRainAmount);
    rainAmount.appendChild(rainAmountText);

    windDiv.appendChild(iconWind);
    windDiv.appendChild(windSpeed);
    windDiv.appendChild(iconWindDirection);
    windDiv.appendChild(windDirection);

    temperature.appendChild(iconDown);
    temperature.appendChild(temperatureMin);
    temperature.appendChild(iconUp);
    temperature.appendChild(temperatureMax);

    const rainInfo = document.createElement("div");
    rainInfo.classList.add("rain-info");
    rainInfo.appendChild(rainProb);
    rainInfo.appendChild(rainAmount);

    cityName_settings.appendChild(cityName);
    cityName_settings.appendChild(iconSettings);

    weatherImageText.appendChild(imageWeather);
    weatherImageText.appendChild(weather);

    weatherForTheDay.appendChild(cityName_settings);
    weatherForTheDay.appendChild(weatherImageText);
    weatherForTheDay.appendChild(temperature);
    weatherForTheDay.appendChild(rainInfo);
    weatherForTheDay.appendChild(sunDiv);
    weatherForTheDay.appendChild(windDiv);

    forecastDiv.appendChild(weatherForTheDay);

    forecastDiv.style.display = "flex";
}




function displayWeatherCard(weatherForcastInfo, NBTotalDay) {
    const forecastCards = document.getElementById("forecast_cards");
    forecastCards.innerHTML = "";
    for (day = 0; day < NBTotalDay; day++) {
        card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute('id', day);

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

        if (weatherForcastInfo[day].weatherText().includes("Soleil")) {
            CardImageWeather.src = "image/weather-icon/clear-day.svg";
        } else if (
            weatherForcastInfo[day].weatherText().includes("pluie") ||
            weatherForcastInfo[day].weatherText().includes("Pluie")
        ) {
            CardImageWeather.src = "image/weather-icon/rainy-3.svg";
        } else if (
            weatherForcastInfo[day].weatherText().includes("Nuageux") ||
            weatherForcastInfo[day].weatherText().includes("voilé") ||
            weatherForcastInfo[day].weatherText().includes("nuageux") ||
            weatherForcastInfo[day].weatherText().includes("Couvert")
        ) {
            CardImageWeather.src = "image/weather-icon/cloudy.svg";
        } else {
            CardImageWeather.style.display = "none";
        }

        //weather
        weather = document.createElement("p");
        weather.classList.add("card_weather");
        weather.textContent = weatherForcastInfo[day].weatherText();

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
