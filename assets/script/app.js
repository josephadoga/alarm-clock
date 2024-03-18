'use strict';

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
  
function select(selector) {
    return document.querySelector(selector);
}

const currentTime = select('.current-time');
const form = select('form');
const inputHour = select('.hours');
const inputMinutes = select('.minutes');
const setAlarm = select('.set');
