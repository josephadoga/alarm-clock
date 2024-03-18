'use strict';

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
  
function select(selector) {
    return document.querySelector(selector);
}

const currentTimeOutput = select('.current-time');
const form = select('form');
const inputHour = select('.hour');
const inputMinutes = select('.minutes');
const setAlarm = select('.set');
const message = select('.message');
const output = select('.alarm-set-text');

function isValid(input) {
    if (input.length > 0 && input.length <= 2 && !isNaN(input) && input < 60 ) return true;
    return false;
}

function clearInputs() {
    inputHour.value = '';
    inputMinutes.value = '';
}

function getTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (hours < 10) {
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    currentTimeOutput.innerText = `${hours}:${minutes}`;

    setTimeout(() => {
        getTime();
    }, 1000);
}

getTime();


function getAlarm() {
    let alarm = new Date();

    let hours = inputHour.value;
    let minutes = inputMinutes.value;

    if (hours < 10) {
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    output.innerText = `${hours}:${minutes}`;
}

// listen('setAlarm', click, () => {
//     getAlarm();
// });

setAlarm.addEventListener('click', function() {
    getAlarm();
});