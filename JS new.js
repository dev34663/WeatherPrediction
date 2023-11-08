const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemE1 = document.getElementById('current-weather-item');
const timezone = document.getElementById('time-zone');
const country = document.getElementById('country');
const wetherForecastE1 = document.getElementById('weather-forecast');
const currentTempE1 = document.getElementById('current-temp');
const apiKey = '673297821bfbc40f1cbb1f632f4135ac';
const city = 'Mumbai';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


// Function to update weather information
function updateWeather() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const description = data.weather[0].description;

      // Update HTML elements with weather data, including the temperature in degrees Celsius
      document.getElementById('temperature').textContent = `Temperature: ${temperature.toFixed(1)}°C`;
      document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
      document.getElementById('description').textContent = `Description: ${description}`;

      const weatherConditions = data.weather[0].description; // Get weather conditions from API

      updateSuggestions(weatherConditions, temperature);
      fetchForecastData();
      fetchWeeklyForecastData();
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}



// Function to calculate the days and dates for an 8-day forecast, starting from today
function calculateForecastDates() {
  const forecastDates = [];
  const today = new Date();

  for (let i = 0; i < 8; i++) { // Adjusted to 8 days
    const forecastDate = new Date(today);
    forecastDate.setDate(today.getDate() + i );
    forecastDates.push(forecastDate);
  }

  return forecastDates;
}


// Function to update the forecast section with dynamic days and dates
function updateForecast() {
  const forecastDates = calculateForecastDates();
  const forecastItems = wetherForecastE1.getElementsByClassName('weather-forecast-item');
  
  for (let i = 0; i < forecastItems.length; i++) {
    const day = forecastDates[i].toLocaleString('en-US', { weekday: 'long' });
    const date = forecastDates[i].toLocaleString('en-US', { day: 'numeric', month: 'short' });

    forecastItems[i].querySelector('.day').textContent = day;
    forecastItems[i].querySelector('.date').textContent = date;
  }
}

// Call the updateWeather function initially
updateWeather();

// Call the updateForecast function to initialize the forecast section


// Update weather data every 10 minutes (600,000 milliseconds)
setInterval(updateWeather, 600000);

// Update forecast section every hour
setInterval(updateForecast, 3600000);

// Update the current time and date
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12Hrformat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const ampm = hour >= 12 ? 'PM' : 'AM';

  timeE1.innerHTML = hoursIn12Hrformat + ':' + minutes + ' ' + ampm;
  dateE1.innerHTML = days[day] + ', ' + date + ' ' + months[month];
}, 1000);

 function updateSuggestions(weatherConditions, temperature) {
  const suggestionBox = document.querySelector('.suggestion-box');

  // Remove existing suggestion items
  const suggestionItems = suggestionBox.querySelectorAll('.suggestion-item');
  for (const item of suggestionItems) {
    item.remove();
  }

  // Define the suggestion logic based on weather conditions
  let clothingSuggestion = { text: '', color: '' };
  let outdoorActivitySuggestion = { text: '', color: '' };
  let generalSuggestion = { text: '', color: '' };

  // Check for specific weather conditions and provide suggestions
  if (weatherConditions.includes('rain')) {
    clothingSuggestion.text = 'Wear a waterproof jacket and bring an umbrella.';
    clothingSuggestion.color = 'blue'; // Text color for clothing category

    outdoorActivitySuggestion.text = 'Consider indoor activities or plan for a rainy-day walk.';
    outdoorActivitySuggestion.color = 'green'; // Text color for outdoor activity category

    generalSuggestion.text = 'Stay dry and be cautious on wet surfaces.';
    generalSuggestion.color = 'red'; // Text color for general category
  } else if (weatherConditions.includes('clear')) {
    clothingSuggestion.text = 'Wear light and comfortable clothing.';
    clothingSuggestion.color = 'white'; // Text color for clothing category

    outdoorActivitySuggestion.text = 'Enjoy the clear sky with outdoor activities.';
    outdoorActivitySuggestion.color = 'orange'; // Text color for outdoor activity category

    generalSuggestion.text = 'It\'s a beautiful day, make the most of it!';
    generalSuggestion.color = 'yellow'; // Text color for general category
  } else if (weatherConditions.includes('clouds')) {
    clothingSuggestion.text = 'Dress in layers for changing cloud cover.';
    clothingSuggestion.color = 'green'; // Text color for clothing category

    outdoorActivitySuggestion.text = 'Partly cloudy weather is great for outdoor adventures.';
    outdoorActivitySuggestion.color = 'blue'; // Text color for outdoor activity category

    generalSuggestion.text = 'Expect varying cloud cover throughout the day.';
    generalSuggestion.color = 'lightgrey'; // Text color for general category
  } else if (weatherConditions.includes('thunderstorm')) {
    clothingSuggestion.text = 'Stay indoors and avoid wet clothing.';
    clothingSuggestion.color = 'yellow'; // Text color for clothing category

    outdoorActivitySuggestion.text = 'Do not engage in outdoor activities during thunderstorms.';
    outdoorActivitySuggestion.color = 'red'; // Text color for outdoor activity category

    generalSuggestion.text = 'Stay safe and wait for the storm to pass.';
    generalSuggestion.color = 'orange'; // Text color for general category
  } else if (weatherConditions.includes('snow')) {
    clothingSuggestion.text = 'Bundle up with warm clothing and wear snow boots.';
    clothingSuggestion.color = 'blue'; // Text color for clothing category

    outdoorActivitySuggestion.text = 'Enjoy snow-related activities like skiing or building a snowman.';
    outdoorActivitySuggestion.color = 'white'; // Text color for outdoor activity category

    generalSuggestion.text = 'Watch out for slippery sidewalks and roads.';
    generalSuggestion.color = 'red'; // Text color for general category
  } else if (weatherConditions.includes('fog')) {
    clothingSuggestion.text = 'Wear reflective clothing if you need to go out in the fog.';
    clothingSuggestion.color = 'orange'; // Text color for clothing category

    outdoorActivitySuggestion.text = 'Minimize outdoor activities in dense fog.';
    outdoorActivitySuggestion.color = 'yellow'; // Text color for outdoor activity category

    generalSuggestion.text = 'Be cautious while driving in low visibility conditions.';
    generalSuggestion.color = 'red'; // Text color for general category
  } else if (weatherConditions.includes('haze')) {
    clothingSuggestion.text = 'No specific clothing recommendations for haze.';
    clothingSuggestion.color = 'gray'; // Text color for clothing category

    outdoorActivitySuggestion.text = 'Avoid strenuous outdoor activities during hazy conditions.';
    outdoorActivitySuggestion.color = 'orange'; // Text color for outdoor activity category

    generalSuggestion.text = 'Air quality may be poor, consider staying indoors.';
    generalSuggestion.color = 'red'; // Text color for general category
  } else if (weatherConditions.includes('mist')) {
    clothingSuggestion.text = 'No specific clothing recommendations for misty conditions.';
    clothingSuggestion.color = 'gray'; // Text color for clothing category

    outdoorActivitySuggestion.text = 'Use caution in low visibility areas.';
    outdoorActivitySuggestion.color = 'orange'; // Text color for outdoor activity category

    generalSuggestion.text = 'Expect limited visibility due to mist.';
    generalSuggestion.color = 'red'; // Text color for general category
  }else if (weatherConditions.toLowerCase().includes('smoke')) {
    clothingSuggestion.text = 'Wear a mask and cover exposed skin.';
    clothingSuggestion.color = 'yellow'; // Text color for clothing category

    outdoorActivitySuggestion.text = 'Minimize outdoor activities during smoky conditions.';
    outdoorActivitySuggestion.color = 'orange'; // Text color for outdoor activity category

    generalSuggestion.text = 'Air quality may be poor due to smoke, consider staying indoors.';
    generalSuggestion.color = 'red'; // Text color for general category
  } else {
    // For other conditions, provide a general suggestion
    generalSuggestion.text = 'Enjoy the day and stay safe!';
    generalSuggestion.color = 'white'; // Text color for general category
  }

  // Create suggestion elements for clothing, outdoor activities, and general
  if (clothingSuggestion.text) {
    createSuggestionElement('Clothing', clothingSuggestion.text, clothingSuggestion.color);
  }

  if (outdoorActivitySuggestion.text) {
    createSuggestionElement('Outdoor', outdoorActivitySuggestion.text, outdoorActivitySuggestion.color);
  }

  if (generalSuggestion.text) {
    createSuggestionElement('General', generalSuggestion.text, generalSuggestion.color);
  }

  function createSuggestionElement(category, text, color) {
    const suggestionItem = document.createElement('div');
    suggestionItem.className = 'suggestion-item';

    const suggestionCategory = document.createElement('div');
    suggestionCategory.className = 'suggestion-category';
    suggestionCategory.textContent = category;
    suggestionCategory.style.color = color; // Set the text color

    const suggestionText = document.createElement('div');
    suggestionText.className = 'suggestion-text';
    suggestionText.textContent = text;
    suggestionText.style.color = color; // Set the text color

    suggestionItem.appendChild(suggestionCategory);
    suggestionItem.appendChild(suggestionText);
    suggestionBox.appendChild(suggestionItem);
  }
}

document.addEventListener("DOMContentLoaded", function () {
            // Get the current date
            const currentDate = new Date();
            
            // Generate date labels for the next 7 days
            const days = [];
            for (let i = 0; i < 7; i++) {
                const nextDate = new Date(currentDate);
                nextDate.setDate(currentDate.getDate() + i);
                // Format the date as "Day Month Date"
                const formattedDate = nextDate.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                days.push(formattedDate);
            }
            
            // Sample data for the chart (replace with your data)
            const temperatures = [20, 22, 25, 21, 23, 24, 26];
            const precipitation = [200, 150, 10, 0, 50, 30, 35]; // Precipitation data (e.g., in millimeters)
            
            // Create a bar chart
            const ctx = document.getElementById('prediction-chart').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: days, // Use the dynamically generated date labels
                    datasets: [
                        {
                            label: 'Temperature (°C)',
                            data: temperatures,
                            fill: true,
                            borderColor: 'rgba(255, 0, 60, 1)',
                            backgroundColor: 'rgba(255, 0, 60, 1)',
                            borderWidth: 2,
                        },
                        {
                            label: 'Precipitation (mm)',
                            data: precipitation,
                            fill: true,
                            borderColor: 'blue',
                            backgroundColor: 'blue',
                            borderWidth: 2,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true, // Set to true or false as needed
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: 'white',
                            },
                            grid: {
                                color: 'grey',
                            },
                        },
                        x: {
                            ticks: {
                                color: 'white',
                            },
                            grid: {
                                color: 'grey',
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'white',
                            },
                        },
                    },
                },
            });
        });

function displayMessage(message, success) {
    const messageContainer = document.getElementById('message-container');
    const messageElement = document.createElement('div');
    messageElement.className = success ? 'success-message' : 'error-message';
    messageElement.textContent = message;

    // Clear the previous message
    messageContainer.innerHTML = '';

    // Append the new message
    messageContainer.appendChild(messageElement);
}
// Event listener for the login button
loginButton.addEventListener('click', () => {
    // You can perform login validation here
    // For this example, always show a success message
    const successMessage = 'Successfully logged in!';
    displayMessage(successMessage, true);
});

// Event listener for the register button
registerButton.addEventListener('click', () => {
    // You can perform registration validation here
    // For this example, always show a success message
    const successMessage = 'Successfully registered!';
    displayMessage(successMessage, true);
});



function fetchForecastData() {
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(forecastApiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Clear the previous forecast data
      wetherForecastE1.innerHTML = '';

      // Get the current day (for today's date)
      const today = new Date();
      const currentDay = today.toLocaleString('en-US', { weekday: 'long' });

      // Loop through forecast items (usually 8 days)
      data.list.slice(0, 8).forEach((item, index) => {
        const timestamp = item.dt * 1000;
        const date = new Date(timestamp);

        // Calculate the day for the forecast item
        const day = new Date(today);
        day.setDate(today.getDate() + index);
        const forecastDay = day.toLocaleString('en-US', { weekday: 'long' });
        const forecastDate = calculateForecastDate(day);
      
        const temperature = item.main.temp;
        const weatherDescription = item.weather[0].description;

        // Simulate or retrieve rainfall data for each forecast item
        const rainfall = getRainfallPrediction();

        // Get appropriate weather icon based on the weather description
        const weatherIcon = getWeatherIcon(item.weather[0].icon); // Modify to get the icon based on your data

        // Create a forecast item element
        const forecastItem = document.createElement('div');
        forecastItem.className = 'weather-forecast-item';

        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = forecastDay;

        const dateElement = document.createElement('div');
        dateElement.className = 'date';
        dateElement.textContent = forecastDate;

        const temperatureElement = document.createElement('div');
        temperatureElement.className = 'temperature';
        temperatureElement.textContent = `${temperature.toFixed(1)}°C`;

        const weatherIconElement = document.createElement('img');
        weatherIconElement.className = 'weather-icon';
        weatherIconElement.src = weatherIcon; // Set the weather icon image URL

        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'description';
        descriptionElement.textContent = weatherDescription;

        const rainfallElement = document.createElement('div');
        rainfallElement.className = 'rainfall';
        rainfallElement.textContent = `Rainfall: ${rainfall} mm`;

        forecastItem.appendChild(dayElement);
        forecastItem.appendChild(dateElement);
        forecastItem.appendChild(temperatureElement);
        forecastItem.appendChild(weatherIconElement);
        forecastItem.appendChild(descriptionElement);
        forecastItem.appendChild(rainfallElement);

        wetherForecastE1.appendChild(forecastItem);
      });
    })
    .catch((error) => {
      console.error('Error fetching forecast data:', error);
    });
}


// Function to get simulated rainfall data (replace with your data)
function getRainfallPrediction() {
  // Replace this with the actual rainfall prediction for the day
  // For this example, we'll use random values between 0 and 10 mm
  return Math.floor(Math.random() * 11); // Random value between 0 and 10 mm
}

// Function to get weather icon URL based on the icon code (modify based on your source)
function getWeatherIcon(iconCode) {
  // Replace this with your weather icon source or API to fetch icons
  // For example, you can use OpenWeatherMap's icons or another weather icon source
  return `https://openweathermap.org/img/wn/${iconCode}.png`;
}

function calculateForecastDate(date) {
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  return `${month} ${day}`;
}

// Call the updateWeather function initially
updateWeather();

 