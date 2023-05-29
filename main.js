import { ELEMENTS } from "./elements.js";
import { addCity } from "./render.js";
import { getWeather } from "./getWeather.js";
import { render } from "./render.js";

ELEMENTS.INPUT.addEventListener('keydown', getWeather);

addCity();
render();









