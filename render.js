import { ELEMENTS } from "./elements.js";
import { weatherNow } from "./getWeather.js";
import { deleteClick } from "./deleteCity.js";
import { forecast } from "./forecast.js";

const savedAddedCityArr = localStorage.getItem('AddedCityArr');
export const addedCityArr = savedAddedCityArr ? JSON.parse(savedAddedCityArr) : [];

export function addCity() {
    ELEMENTS.CITY_SAVE.addEventListener('click', () => {
        let allP = ELEMENTS.ADDED_LOC.getElementsByTagName('p');
        for (let i = 0; i < allP.length; i++) {
            if (allP[i].textContent === ELEMENTS.CITY_TITLE.textContent) {
                alert('данный город уже добавлен');
                return;
            }
        }
        addedCityArr.push(ELEMENTS.CITY_TITLE.textContent);        
        ELEMENTS.INPUT.value = '';
        localStorage.setItem('AddedCityArr', JSON.stringify(addedCityArr));
        render();
    });
}

export function addedCityInfo() {
    let allAddedLoc = document.querySelectorAll('.addedLoc__list-item p');

    Array.from(allAddedLoc).forEach(el => {
        if (!el.getAttribute('data-has-event-listener')) {
            el.setAttribute('data-has-event-listener', true)
            el.addEventListener('click', (event) => {
                weatherNow(event.currentTarget.textContent);
                forecast(event.currentTarget.textContent);
            });
        };
    }
    )
};

export function render() {
    let allAddedLoc = document.querySelectorAll('.addedLoc__list-item');
    for (let t of allAddedLoc) {
        t.remove();
    }
    for (let i = 0; i < addedCityArr.length; i++) {
        const addedCity = document.createElement('div');
        addedCity.className = 'addedLoc__list-item';

        const addedCityP = document.createElement('p');
        addedCityP.className = 'addedLoc__list-item p';
        addedCityP.textContent = addedCityArr[i];
        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';
        deleteButton.textContent = '✖';
        
        ELEMENTS.ADDED_LOC.insertAdjacentElement('beforeend', addedCity);
        addedCity.appendChild(addedCityP);
        addedCity.appendChild(deleteButton);
        addedCityInfo();
    }
    console.log(addedCityArr);
    deleteClick();
}



