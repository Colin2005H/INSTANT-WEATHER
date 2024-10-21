//ALL FUNCTION FETCHING FOR API


const  INSEECodeRequest = "https://geo.api.gouv.fr/communes?codePostal=";
//RETURN an array with the INSEE code and name of each commune with the postal code given
// Array[
// 0: Array[insee code, name]
// 1: ...
// ]
//
async function getINSEECodeFromCP(cp) {
    const request = INSEECodeRequest + cp;
    const codeINSEE = [];
    try {
        const promise = await fetch(request);
        const result = await promise.json();
        for (let i = 0; i < result.length; i++) {
            codeINSEE[i] = [result[i].code, result[i].nom];
        }
    } catch (e) {
        console.error("Error went fetching for code INSEE info :", e);
    }
    return codeINSEE;
}

const forcastInfoRequest = "https://api.meteo-concept.com/api/forecast/daily?token=7050a2dc76b480256fd4900fccf153567217d6f6fe483ed12f3af3e5dce6d687&insee="
//RETURN an array of WeatherCard for each day starting from today up to <nbDay> (max 14 day)
//access days by the array index (sorted chronologically starting from today)
//Array[
//0: WeatherCard,  today
//1: WeatherCard,  tomorrow
//2: ...
//
async function getForcastInfo(codeINSEE, NBDay) {
    if (NBDay < 1 || NBDay > 14) {
        throw new Error("Can get forcast for 1 to 14 days");
    }
    const request = forcastInfoRequest + codeINSEE;
    let forcastInfo = [];
    try {
        const promise = await fetch(request);
        const result = await promise.json();
        for (i = 0; i < NBDay; i++) {
            let newDay = new WeatherCard
            (
                result.city.latitude, //latitude
                result.city.longitude, //longitude
                result.forecast[i].weather, //int to convert using weatherToText.get(int)
                result.forecast[i].tmin, //minimum temperature from
                result.forecast[i].tmax, //minimum temperature from the day
                result.forecast[i].probarain, //probability of rain
                result.forecast[i].etp, //quantity of rain in mm
                result.forecast[i].sun_hours, //number of hour of sun exposure
                result.forecast[i].wind10m, //average wind at 10 m in km/h
                result.forecast[i].dirwind10m, //direction the wind is comming in degree
            );
            forcastInfo[i] = newDay;
        }
    } catch (e) {
        console.log("Error went fetching for forcast info :", e);
    }
    return forcastInfo;
}