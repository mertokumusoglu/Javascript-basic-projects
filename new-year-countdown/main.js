const dayDOM = document.querySelector("#day");
const hourDOM = document.querySelector("#hour");
const minuteDOM = document.querySelector("#minute");
const secondDOM = document.querySelector("#second");

const setTime = (timeNumber) => {
    
    if(timeNumber < 10) {
        return `0${timeNumber}`
    }
    else if(timeNumber >= 10) {
        return `${timeNumber}`
    }
}

const countFunc = () => {
    let newYear = new Date("1 Jan 2024")
    let currentYear = new Date()
    // We will do our operations using seconds. Let's convert to seconds
    let totalSec = (newYear - currentYear) / 1000
    
    let days =  Math.floor(totalSec / 3600 / 24)
    let hours = Math.floor((totalSec / 3600) % 24)
    let minutes = Math.floor((totalSec / 60) % 60)
    let seconds = Math.floor(totalSec % 60)

    // We set our times, it's time to push it into html

    dayDOM.innerHTML = setTime(days)
    hourDOM.innerHTML = setTime(hours)
    minuteDOM.innerHTML = setTime(minutes)
    secondDOM.innerHTML = setTime(seconds)
}
setInterval(countFunc, 1000)