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
const alarmColor = select('.alarm-set i')
const heading = select('.alarm h1')

const sound = new Audio('./assets/audio/alarm.mp3');
sound.type = 'audio/mp3';

const alarm = new Date();

function isValid(input, expectedInput) {
    if (input.length > 0 && input.length <= 2 && !isNaN(input) && input < expectedInput ) return true;
    return false;
}

function clearInputs() {
    inputHour.value = '';
    inputMinutes.value = '';
}

function addZeros(hours, minutes) {
    if (hours < 10 && hours.toString().length < 2) {
        hours = `0${hours}`;
    }

    if (minutes < 10 && minutes.toString().length < 2) {
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

    if (isValid(hours, 24) && isValid(minutes, 60)) {
        addZeros(hours, minutes);
        const paddedTime = addZeros(hours, minutes);
        alarmColor.classList.add('set');
        output.innerText = `${paddedTime.hours}:${paddedTime.minutes}`;
        message.innerText = 'Alarm has been set!';
        clearInputs();
    } else {
        message.innerText = 'Please enter Valid times';
    }

    alarm.setHours(hours);
    alarm.setMinutes(minutes);
}

function check() {
    const now = new Date();
    if ((alarm.getHours() === now.getHours()) && (alarm.getMinutes() === now.getMinutes())) {
        sound.play();
        heading.classList.add('set');
        message.innerText = 'Its Time!';
        setTimeout(() => { 
            heading.classList.remove('set'); 
            message.innerText = '';
        }, 5000);
    } else {
        setTimeout(() => {
            check();
        }, 1000);
    }
}

listen('click', setAlarm, () => {
    getAlarm();
    check();
});
