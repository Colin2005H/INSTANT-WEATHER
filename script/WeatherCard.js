class WeatherCard {
    constructor(latitude, longitude, weather, tempMin, tempMax, rainProb, rainAmont, sunshineHour,avgWind, windDirection){
        this.latitude = latitude;           //latitude
        this.longitude = longitude;         //longitude
        this.weather = weather;             //int to convert using weatherToText.get(int)
        this.tempMin = tempMin;             //minimum temperature from the day
        this.tempMax = tempMax;             //maximum temperature from the day
        this.rainProb = rainProb;           //probability of rain
        this.rainAmont = rainAmont;         //quantity of rain in mm
        this.sunshineHour = sunshineHour;   //number of hour of sun exposure
        this.avgWind = avgWind;             //average wind at 10 m in km/h
        this.windDirection = windDirection; //direction the wind is comming in degree
    }

    weatherText(){
        return weaweatherToText.get(this.weather);
    }
}