/**
 * @license MIT
 * @fileoverview Menage all routes
 * @copyright basel 2023 All rights reserved
 * @author codewithsadee <shibobbasel@gmail.com>
 */

'use strict'

import { updateWeather, error404} from "./app.js";
const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474" // London

const currentLocation = function () {
    window.navigator.geolocation.getCurrentPosition(res => {
        const {latitude, longitude} = res.coords;
        // console.log(res.coords);
        // console.log("currentLocation", {latitude, longitude});
        updateWeather(`lat=${latitude}`, `lon=${longitude}`);
    }, err => {
        window.location.hash = defaultLocation
    }); 
}

/**
 * @param {string} query searched query
 */
const seachedLocation = query => updateWeather(...query.split("&"));
// updateWeather("lat=51.5073219", "lon=-0.1276474")

const routes = new Map([
    ["/current-location", currentLocation],
    ["/weather", seachedLocation]
]);

const checkHash = function () {
    console.log("checkHash");
    console.log(window.location.hash);
    const requestURL = window.location.hash.slice(1);
    console.log("requestURL", requestURL);
    console.log('requestURL.includes', requestURL.includes ? 1 : 0 );
    console.log(requestURL.slice("?"));
    const [route, query] = requestURL.includes ? requestURL.split("?") : [requestURL];
    console.log(route, query);
    routes.get(route) ? routes.get(route)(query) : error404();  

}

window.addEventListener("hashchange", checkHash)

window.addEventListener("load", function () {
    if(!window.location.hash){
        window.location.hash = '#/current-location'
    }else {
        checkHash()
    }
});