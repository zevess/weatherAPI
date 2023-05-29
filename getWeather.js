import { ELEMENTS } from "./elements.js";
import { forecast } from "./forecast.js";

export async function getWeather() {
    if (event.key === 'Enter') {
        let cityName = ELEMENTS.INPUT.value;
        console.log(cityName);
        weatherNow(cityName);
    }
}

export async function weatherNow(cityName) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = '4e252dbc9f8bb90c7847aaa53fb2e11b';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    console.log(url);

    let responce = await fetch(url);
    if (responce.ok) {
        let commits = await responce.json();
        console.log(commits);

        Array.from(ELEMENTS.CITY_TITLE_ALL).forEach(element => {
            element.textContent = cityName;
        })
        ELEMENTS.TEMP.textContent = `${(commits.main.temp - 273.15).toFixed(0)}` + String.fromCharCode(176);
        ELEMENTS.CITY_SAVE.style.display = 'block';
        setDetails(commits);
        ELEMENTS.INPUT.value = '';
        forecast(cityName);

        
    } else {
        if (responce.status === 404) {
            alert("Ошибка! Такого города не существует или написан не правильно!");
        }
        ELEMENTS.INPUT.value = '';
    }
}


function setDetails(commits) {
    ELEMENTS.TEMPStat.textContent = "Температура: " + ELEMENTS.TEMP.textContent;
    ELEMENTS.FEELSLIKE.textContent = "Ощущается: " + `${(commits.main.feels_like - 273.15).toFixed(0)}` + String.fromCharCode(176);
    ELEMENTS.WEATHERStat.textContent = "Погода: "
    weatherTranslate(commits, ELEMENTS.WEATHERStat);

    const sunrise = new Date(1000 * `${commits.sys.sunrise}`);
    sunrise.toISOString;
    const sunriseHours = sunrise.getHours().toString().padStart(2, '0');
    const sunriseMinutes = sunrise.getMinutes().toString().padStart(2, '0');;
    ELEMENTS.SUNRISE.textContent = "Восход: " + `${sunriseHours}:${sunriseMinutes}` + " (по МСК)";

    const sunset = new Date(1000 * `${commits.sys.sunset}`);
    sunrise.toISOString;
    const sunsetHours = sunset.getHours().toString().padStart(2, '0');
    const sunsetMinutes = sunset.getMinutes().toString().padStart(2, '0');
    ELEMENTS.SUNSET.textContent = "Закат: " + `${sunsetHours}:${sunsetMinutes}` + " (по МСК)";

    
    const weatherIMG = document.querySelector('.weather__img');
    const weatherIcon = commits.weather[0].icon;
    const weatherIconURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    weatherIMG.src = weatherIconURL;
    console.log(weatherIconURL);
}


export function weatherTranslate(commits, textPlace) {
    if (commits.weather[0].main === "Clouds") {
        textPlace.textContent = textPlace.textContent + "Облачно";
    } else if (commits.weather[0].main === "Thunderstorm") {
        textPlace.textContent = textPlace.textContent + "Гроза";
    } else if (commits.weather[0].main === "Drizzle") {
        textPlace.textContent = textPlace.textContent + "Морось";
    } else if (commits.weather[0].main === "Rain") {
        textPlace.textContent = textPlace.textContent + "Дождь";
    } else if (commits.weather[0].main === "Mist") {
        textPlace.textContent = textPlace.textContent + "Туман";
    } else if (commits.weather[0].main === "Snow") {
        textPlace.textContent = textPlace.textContent + "Снег";
    } else if (commits.weather[0].main === "Smoke") {
        textPlace.textContent = textPlace.textContent + "Смог";
    } else if (commits.weather[0].main === "Haze") {
        textPlace.textContent = textPlace.textContent + "Мгла";
    } else if (commits.weather[0].main === "Dust") {
        textPlace.textContent = textPlace.textContent + "Пыль";
    } else if (commits.weather[0].main === "Fog") {
        textPlace.textContent = textPlace.textContent + "Густой туман";
    } else if (commits.weather[0].main === "Sand") {
        textPlace.textContent = textPlace.textContent + "Песчанная буря";
    } else if (commits.weather[0].main === "Ash") {
        textPlace.textContent = textPlace.textContent + "Вулканический пепел";
    } else if (commits.weather[0].main === "Squall") {
        textPlace.textContent = textPlace.textContent + "Шквал";
    } else if (commits.weather[0].main === "Tornado") {
        textPlace.textContent = textPlace.textContent + "Торнадо";
    } else if (commits.weather[0].main === "Clear") {
        textPlace.textContent = textPlace.textContent + "Ясно";
    }
}