// Update the date format to "Day, date/month/year"
const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(',', '');
};

// Function to fetch and display weather data
const fetchWeatherData = async () => {
    try {
        const response = await fetch('http://localhost:3036/api/weather');
        const weatherData = await response.json();
        
        const weatherContainer = document.getElementById('weatherContainer');
        weatherContainer.innerHTML = '';  // Clear previous data
        
        // Add each city's weather data in tile format
        weatherData.forEach((weather) => {
            const weatherBox = document.createElement('div');
            weatherBox.className = 'weather-box';

            weatherBox.innerHTML = `
                <h2>${weather.city}</h2>
                <p>Temperature: ${weather.temp}°C</p>
                <p>Feels Like: ${weather.feels_like}°C</p>
                <p>Weather: ${weather.main}</p>
                <p>Updated at: ${formatDate(new Date(weather.dt))}</p>
            `;

            weatherContainer.appendChild(weatherBox);
        });

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

// Fetch weather data every 5 seconds
setInterval(fetchWeatherData, 5000);

// Initial fetch
fetchWeatherData();
