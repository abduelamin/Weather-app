let cityName = ``;
let searchHistory = document.querySelector(`#history`);
const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);


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

        searchHistory.insertAdjacentElement('afterbegin', listItem);
    });
};

//clear localstorage

const clearLocalStorage = () => {
    localStorage.clear()
}


// Fetch weather using user input

const updateMainDisplay = (data) => {
    // Update the main display with today's current date and weather details

    const currentDate = new Date();

    const cityNameElement = document.getElementById('city-name');
    const dateElement = document.getElementById('current-date');


    dateElement.textContent = currentDate.toDateString();
    cityNameElement.textContent = cityName;
    

    cityNameElement.appendChild(dateElement)

    document.getElementById('temp').textContent = `Temp: ${kelvinToCelsius(data.list[0].main.temp)} °C ${getEmojiForWeather(data.list[0].weather[0].description)}`;
    document.getElementById('wind').textContent = `Wind: ${data.list[0].wind.speed} m/s`;
    document.getElementById('humidity').textContent = `Humidity: ${data.list[0].main.humidity}%`;


    cityNameElement.style.cssText = `text-transform: capitalize`

};

const updateFiveDayForecast = (data) => {
    // Update the 5-day forecast with weather details for each day
    const forecastSection = document.getElementById('forecast');
    forecastSection.innerHTML = ''; // Clear existing content. This is very important otherwise the HTML will duplicate and keep the previous search details

    for (let i = 1; i <= 5; i++) {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'col-md-2';
        
        // Calculate the date for each day
        const forecastDate = new Date();
        forecastDate.setDate(forecastDate.getDate() + i);
        
        forecastItem.innerHTML = `
            <h3>${forecastDate.toDateString()}</h3>
            <p>Temp: ${kelvinToCelsius(data.list[i].main.temp)} °C ${getEmojiForWeather(data.list[i].weather[0].description)}</p>
            <p>Wind: ${data.list[i].wind.speed} m/s</p>
            <p>Humidity: ${data.list[i].main.humidity}%</p>
        `;

      


        forecastSection.appendChild(forecastItem);
    }
};

const fetchWeather = (city = null) => {
    // If city is not provided, use the value from the input field
    const cityName = city || document.querySelector('.weather-search').value;

    const cityQuery = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=2&appid=77040252389976f33508f30aefd8ebd8`;

    

    let latitude = '';
    let longitude = '';

    fetch(cityQuery)
        .then(response => response.json())
        .then(data => {
            latitude = data[0].lat;
            longitude = data[0].lon;
            weatherData(latitude, longitude);
        })
        .catch(error => {
            console.error(`Failed to locate the weather of your chosen destination`);
        });
};

const weatherData = (lat, lon) => {
    const weatherDetails = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=77040252389976f33508f30aefd8ebd8`;

    fetch(weatherDetails)
        .then(response => response.json())
        .then(data => {
            updateMainDisplay(data);
            updateFiveDayForecast(data);
        })
        .catch(error => {
            console.error(`Failed to fetch weather details`);
        });
};

// function to map weather descriptions to emojis
const getEmojiForWeather = (description) => {

console.log(`Weather Description from API: ${description}`);
        
        const emojiMap = {
            'clear sky': '☀️',
            'sunny': '☀️',
            'clear': '☀️',
            'few clouds': '🌤️',
            'scattered clouds': '☁️',
            'overcast clouds': '☁️',
            'few clouds': '☁️',
            'broken clouds': '☁️',
            'shower rain': '🌧️',
            'light rain': '🌧️',
            'showers': '🌧️',
            'rain': '🌧️',
            'moderate rain': '🌧️',
            'heavy intensity rain': '🌧️🌧️',
            'thunderstorm': '⛈️',
            'snow': '❄️',
            'mist': '🌫️',
            'light snow': '❄️',
        };
    
        // Convert description to lowercase for case-insensitive matching
        const lowerCaseDescription = description.toLowerCase();
    
        // Return the emoji corresponding to the weather description
        return emojiMap[lowerCaseDescription] || '?'; 
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
    
        fetchWeather();
    } catch (error) {
        const inputField = e.target.closest('.form').querySelector('.weather-search');

        inputField.value = ``;
    }
}
)


// Event listener for the entire search history container
searchHistory.addEventListener('click', (e) => {
    // Check if the clicked element is an <li> inside #history
    if (e.target.tagName === 'LI') {
        const clickedCity = e.target.textContent;
        
        // Update the search input with the clicked city
        document.querySelector('.weather-search').value = clickedCity;
    }

// Tried multiple ways to update the DOM by clicking on the recent searches. It all gets updated correctly but the city name on the DOM doesn't get update or it uses the previously maunally searched name. I couldn't figure out how to address this issue and each method I tried ended up affecting the orginial funcitonaility of the code

});



// clear search history function + event listener

const clearHistory = () => {

    searchHistory.textContent = ``
    clearLocalStorage();
}

let clearHistoryButton = document.getElementById(`clearHistory`)

clearHistoryButton.addEventListener(`click`, clearHistory)

pageLoad()
