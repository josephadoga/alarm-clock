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
const message = select('.message p');
const output = select('.alarm-set-text');

const sound = new Audio('./assets/audio/alarm.mp3');
sound.type = 'audio/mp3';

const alarm = new Date();

function isValid(input) {
    if (input.length > 0 && input.length <= 2 && !isNaN(input) && input < 60 ) return true;
    return false;
}

function clearInputs() {
    inputHour.value = '';
    inputMinutes.value = '';
}

function addZeros(hours, minutes) {
    if (hours < 10) {
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return { hours, minutes };
}

function getTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    const paddedTime = addZeros(hours, minutes);

    currentTimeOutput.innerText = `${paddedTime.hours}:${paddedTime.minutes}`;

    setTimeout(() => {
        getTime();
    }, 1000);
}

getTime();


function getAlarm() {
    let hours = inputHour.value;
    let minutes = inputMinutes.value;

    if (isValid(hours) && isValid(minutes)) {
        addZeros(hours, minutes);
        const paddedTime = addZeros(hours, minutes);
        output.innerText = `${paddedTime.hours}:${paddedTime.minutes}`;
        clearInputs();
    } else {
        message.innerText = 'Please enter Valid times';
    }

    alarm.setHours(hours);
    alarm.setMinutes(minutes);
}

function observe() {
    const now = new Date();
    if ((alarm.getHours() === now.getHours()) && (alarm.getMinutes() === now.getMinutes())) {
        sound.play();
    }

    setTimeout(() => {
        observe();
    }, 60000);
}

listen('click', setAlarm, () => {
    getAlarm();
});


listen('load', window, () => {
    let h = inputHour.value;
    let m = inputMinutes.value;

    alarm.setHours(h);
    alarm.setMinutes(m);
    observe();
});

window.addEventListener('load', observe());