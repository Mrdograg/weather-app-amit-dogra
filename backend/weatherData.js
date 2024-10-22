const axios = require('axios');
const { API_KEY, cities } = require('./config');

const kelvinToCelsius = (temp) => {
  return temp - 273.15;
};

const getWeatherData = async () => {
  const cityWeatherData = [];
  
  for (const city of cities) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    
    try {
      const response = await axios.get(url);
      const data = response.data;

      const temperature = kelvinToCelsius(data.main.temp);
      const feelsLike = kelvinToCelsius(data.main.feels_like);
      
      const weather = {
        city: city,
        temp: temperature.toFixed(2),
        feels_like: feelsLike.toFixed(2),
        main: data.weather[0].main,
        dt: new Date(data.dt * 1000)
      };
      
      cityWeatherData.push(weather);

    } catch (error) {
      console.error(`Failed to fetch weather data for ${city}:`, error);
    }
  }

  return cityWeatherData;
};

module.exports = { getWeatherData };
