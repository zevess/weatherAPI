import { weatherTranslate } from "./getWeather.js";

export async function forecast(cityName) {
    const forecastServer = 'http://api.openweathermap.org/data/2.5/forecast';
    const apiKey = '4e252dbc9f8bb90c7847aaa53fb2e11b';
    const forecastUrl = `${forecastServer}?q=${cityName}&appid=${apiKey}`;

    const allForecast = document.querySelectorAll('.forecast');
    for (let f of allForecast){
        f.remove();
    }

    let forecastResponce = await fetch(forecastUrl);
    if (forecastResponce.ok) {
        let forecastCommits = await forecastResponce.json();
        for (let k = 0; k < (forecastCommits.list).length; k++) {
            while (k < 20) {
                k++;
                console.log(forecastCommits.list[k].weather[0].main)
                createForecast(forecastCommits.list[k]);
            } break;

        }
    }

}


function createForecast(forecastCommits) {
    const forecastAllBlock = document.querySelector('.forecast__all');

    const forecastBlock = document.createElement('div');
    forecastBlock.className = 'forecast';
    const forecastData = document.createElement('div')
    forecastData.className = 'forecast__data';

    forecastAllBlock.insertAdjacentElement('beforeend', forecastBlock);
    forecastBlock.appendChild(forecastData);


    const forecastDate = document.createElement('p');
    forecastDate.className = 'forecast__date';
    
    const forecastTime = document.createElement('p');
    forecastTime.className = 'forecast__time';
    const forecastRealDate = new Date(1000 * `${forecastCommits.dt}`);
    forecastRealDate.toISOString;
    
    const forecastDateDay = forecastRealDate.getDate().toString();
    const forecastDateMonthIndex = forecastRealDate.getMonth();
    const forecastDateMonth = monthNames[forecastDateMonthIndex];
    const forecastDateHours = forecastRealDate.getHours().toString().padStart(2, '0');
    const forecastDateMinutes = forecastRealDate.getMinutes().toString().padStart(2, '0');;

    forecastDate.textContent = `${forecastDateDay} ${forecastDateMonth}`;
    forecastTime.textContent = `${forecastDateHours}:${forecastDateMinutes}`;
    forecastData.appendChild(forecastDate);
    forecastData.appendChild(forecastTime);



    const forecastDetails = document.createElement('div');
    forecastDetails.className = 'forecast__details';
    forecastBlock.appendChild(forecastDetails);

    const forecastStat = document.createElement('div');
    forecastStat.className = 'forecast__stat';
    forecastDetails.appendChild(forecastStat);

    const forecastTemp = document.createElement('p');
    forecastTemp.className = 'forecast__temp';
    forecastTemp.textContent = 'Температура: ' + `${(forecastCommits.main.temp - 273.15).toFixed(0)}` + String.fromCharCode(176);

    const forecastFeels = document.createElement('p');
    forecastFeels.className = 'forecast__feels';
    forecastFeels.textContent = 'Ощущается: ' + `${(forecastCommits.main.feels_like - 273.15).toFixed(0)}` + String.fromCharCode(176);
    forecastStat.appendChild(forecastTemp);
    forecastStat.appendChild(forecastFeels);


    const forecastWeather = document.createElement('div');
    forecastWeather.className = 'forecast__weather';
    forecastDetails.appendChild(forecastWeather);

    const forecastWeatherName = document.createElement('p');
    forecastWeatherName.className = 'forecast__weather__name';
    weatherTranslate(forecastCommits, forecastWeatherName);


    const forecastWeatherIMG = document.createElement('img');
    forecastWeatherIMG.className = 'forecast__weather__img';
    const weatherIcon = forecastCommits.weather[0].icon;
    forecastWeatherIMG.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    forecastWeather.appendChild(forecastWeatherName);
    forecastWeather.appendChild(forecastWeatherIMG);
}


const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ];