let cityName = ``

let cityQuery = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=2&appid=77040252389976f33508f30aefd8ebd8`
// const apikey = `77040252389976f33508f30aefd8ebd8`




let searchHistory = document.querySelector(`#history`)


// Fetch weather using user input

const fetchWeather = () => {
    
}

const searchBtn = document.getElementById(`search-button`)

// Search button event listener
searchBtn.addEventListener(`click`, (e) => {
    e.preventDefault();

    let userInput = e.target.previousSibilingElement.previousSibilingElement.value;

    searchHistory.addAdjacentElement(`afterbegin`, userInput)

    return userInput
})


// clear search history function + event listener

const clearHistory = () => {
    searchHistory.textContent = ``
}

let clearHistoryButton = document.getElementById(`clearHistory`)

clearHistoryButton.addEventListener(`click`, clearHistory)


/* Next steps:

    - connect CityName to user input. So that whenever a user types a name it immetiately goes to the fetchURL

   - Oncw you've grabbed that url, locate temp, wind and humidity and display it on the html using the element ID's (I already have those written in HTML)

   - Add image + descriptionof weather

   - Display 5 cards containg the next 5 days worth of forecast. each day must also contain wind, temp and humididtiy and description/image of weather

   - Save history to histroy tab.

*/
