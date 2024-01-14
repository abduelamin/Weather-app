let cityName = ``
// const apikey = `77040252389976f33508f30aefd8ebd8`

const saveToLocalStorage = () => {
    // Retrieve existing data from local storage
    let cityArray = JSON.parse(localStorage.getItem('search')) || [];

    // Add the new city name to the data
    cityArray.push(cityName);

    // Save the updated data back to local storage
    localStorage.setItem('search', JSON.stringify(cityArray));
};

const pageLoad = () => {
    // Retrieve data from local storage
    const storedData = JSON.parse(localStorage.getItem('search')) || [];

    // Update the searchHistory element with the retrieved data
    storedData.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        listItem.style.cssText = `listStyle: none; padding: 5px; border: 1px solid black; border-radius: 3px; margin-bottom: 2px; display:inline-block; background: #778899; color: white; text-align: center; text-transform: capitalize`;

        // Use 'afterbegin' to insert items at the top of the list
        searchHistory.insertAdjacentElement('afterbegin', listItem);
    });
};

//clear localstorage

const clearLocalStorage = () => {
    localStorage.clear()
}

let searchHistory = document.querySelector(`#history`)


// Fetch weather using user input

const fetchWeather = () => {
    const cityQuery = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=2&appid=77040252389976f33508f30aefd8ebd8`;
  
    fetch(cityQuery)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => {
        console.error(`Failed to locate the weather of your chosen destination`);
      });
  };

const searchBtn = document.getElementById(`search-button`)

// Search button event listener
searchBtn.addEventListener(`click`, (e) => {
    e.preventDefault();

    try {
        cityName = e.target.closest('.form').querySelector('.weather-search').value;
    
        // Check if the input is valid
        if (typeof cityName !== "string" || cityName === "" || isNaN(cityName) === false ) {
            throw new Error(`You have not entered a valid city`);
        }
    
        // Create a new list item for search history
        const listItem = document.createElement('li');
        listItem.textContent = cityName;
        listItem.style.cssText = `listStyle: none; padding: 5px; border: 1px solid black; border-radius: 3px; margin-bottom: 2px; display:inline-block; background: #778899; color: white; text-align: center; text-transform: capitalize`;
        searchHistory.insertAdjacentElement(`afterbegin`, listItem);
    
        saveToLocalStorage();
    
        // If the input is valid, fetch weather data
        fetchWeather();
    } catch (error) {
        // Handle the error here (e.g., display a message to the user)
        const inputField = e.target.closest('.form').querySelector('.weather-search');
        inputField.value = ``;
    }
}
)


// clear search history function + event listener

const clearHistory = () => {

    searchHistory.textContent = ``
    clearLocalStorage();
}

let clearHistoryButton = document.getElementById(`clearHistory`)

clearHistoryButton.addEventListener(`click`, clearHistory)


/* Next steps:

   - Oncw you've grabbed that url, locate temp, wind and humidity and display it on the html using the element ID's (I already have those written in HTML)

   - Add image + descriptionof weather

   - Display 5 cards containg the next 5 days worth of forecast. each day must also contain wind, temp and humididtiy and description/image of weather


*/

pageLoad()