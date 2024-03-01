const apiURL = "https://api.openweathermap.org/data/2.5/"
const key = "772b6f12739fa32db88850273db46510"
const searchDOM = document.querySelector("#search")

const getQuery = (a) => {
    if(a.keyCode == "13") {
        getResult(searchDOM.value)
    }
}
searchDOM.addEventListener("keypress", getQuery)

const getResult = (city) => {
    queryURL = `${apiURL}weather?q=${city}&appid=${key}&lang=en&units=metric`
    fetch(queryURL)
    .then(weather => {
        return weather.json()
    })
    .then(showResult)
}

/* capitalize the description - START */
const capitalizeDesc = (desc) => {
    let words = desc.split(" ")
    for(i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1)
    }
    words = words.join(" ")
    return `${words}`
}

/* capitalize the description - END */

const showResult = (result) => {
    let city = document.querySelector(".city");
    city.innerText = `${result.name}, ${result.sys.country}`

    let temperature = document.querySelector(".temperature");
    temperature.innerText = `Temperature: ${Math.round(result.main.temp)}°C`

    let feelsLike = document.querySelector(".feels-like");
    feelsLike.innerText = `Feels like: ${Math.round(result.main.feels_like)}°C`

    let wind = document.querySelector(".wind");
    wind.innerText = `Wind speed: ${Math.round(result.wind.speed * 3.6)} km/hr`

    let description = document.querySelector(".desc");
    description.innerText = capitalizeDesc(result.weather[0].description)
    
    console.log(result)
}

/*
let words = user.split(" ")
for(i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1)
}
words = words.join(" ")
*/
