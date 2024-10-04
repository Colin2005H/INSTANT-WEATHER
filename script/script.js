//RETURN an array with the INSEE code and name of each commune with the postal code given
//the first element of the array is egal to 1 if everything went as entended else 0 if an error is catch
// Array[
// 0: error indicator
// 1: Array[insee code, name]
// 2: ...
// ]
async function get_INSEE_code_from_CP(cp){

    request = "https://geo.api.gouv.fr/communes?codePostal="+ cp;
    code_INSEE = [1];
    try{
        promise = await fetch(request);
        result = await promise.json();
    }catch (e){
        code_INSEE[0] = 0;
    }
    
    for(i = 0; i < result.length; i++){
        code_INSEE[i+1] = [result[i].code, result[i].nom];
    }
    return code_INSEE;
}

async function get_weather_info_from_insee_code(insee_code){
    request = "https://api.meteo-concept.com/api/location/city?token=7050a2dc76b480256fd4900fccf153567217d6f6fe483ed12f3af3e5dce6d687&insee="+ insee_code;
    weather_info = [1];
    try{
        promise = await fetch(request);
        result = await promise.json();
    }catch (e){
        weather_info[0] = 0;
    }
    weather_info[1] = result;
    return weather_info;
}

//for function test
window.onload = async function(){
    
    insee_code = await get_INSEE_code_from_CP(14000)
    console.log(insee_code);
    weather_info = await get_weather_info_from_insee_code(insee_code[1][0]);
    console.log(weather_info);
}
