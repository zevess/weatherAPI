import { ELEMENTS } from "./elements.js";
import { forecast } from "./forecast.js";
import { weatherTitles } from "./elements.js";

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
    // console.log(url);

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

    const weatherIMG = document.querySelector('.weather__img');
    const weatherIcon = commits.weather[0].icon;
    const weatherIconURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    weatherIMG.src = weatherIconURL;

    setSunsetRise(commits, sunrise);
    setSunsetRise(commits, sunset);
}

function setSunsetRise(commits, typeTime) {
    if (typeTime == sunrise) {
        const time = new Date(1000 * `${commits.sys.sunrise}`);
        setTime(time, sunrise);
    }
    if (typeTime == sunset){
        const time = new Date(1000 * `${commits.sys.sunset}`);
        setTime(time, sunset);
    }
    
}

function setTime(time, typeTime){
    time.toISOString;
    const timeHours = time.getHours().toString().padStart(2, '0');
    const timeMinutes = time.getMinutes().toString().padStart(2, '0');
    if (typeTime == sunrise){
        ELEMENTS.SUNRISE.textContent = "Восход: " + `${timeHours}:${timeMinutes}` + " (по МСК)";
    } 
    if (typeTime == sunset){
        ELEMENTS.SUNSET.textContent = "Закат: " + `${timeHours}:${timeMinutes}` + " (по МСК)";
    }

}

export function weatherTranslate(commits, textPlace) {
    for (let key in weatherTitles) {
        if (commits.weather[0].main === key) {
            textPlace.textContent = textPlace.textContent + weatherTitles[key];
        }
    }
}