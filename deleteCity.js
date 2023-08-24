import { addedCityArr } from "./render.js";
import { render } from "./render.js";

export function deleteClick() {
    let allAddedLocToDel = document.querySelectorAll('.deleteButton');
    Array.from(allAddedLocToDel).forEach(el2 => {
        el2.addEventListener('click', () => {
            console.log(el2.previousElementSibling.textContent);
            deleteCity(el2.previousElementSibling.textContent);
        })
    })
}

function deleteCity(city) {

    console.log(addedCityArr);
    addedCityArr.delete(city);
    localStorage.setItem('AddedCityArr', JSON.stringify(Array.from(addedCityArr)));    
    render();
    // console.log(city);
    // let index = addedCityArr.findIndex((item) => (item === city));
    // if (index !== -1){
    //     addedCityArr.splice(index, 1);
    //     localStorage.setItem('AddedCityArr', JSON.stringify(addedCityArr));
    //     render();
    // }
}