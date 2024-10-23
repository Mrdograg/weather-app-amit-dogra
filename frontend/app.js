const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(',', '');
};


const fetchWeatherData = async () => {
    try {
        const response = await fetch('http://localhost:3036/api/weather');
        const weatherData = await response.json();
        
        const weatherContainer = document.getElementById('weatherContainer');
        weatherContainer.innerHTML = ''; 
       
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


setInterval(fetchWeatherData, 5000);


fetchWeatherData();
