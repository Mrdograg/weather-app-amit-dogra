// summary.js

const calculateDailySummary = (weatherData) => {
    const temps = weatherData.map(data => parseFloat(data.temp));
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    const avgTemp = (temps.reduce((acc, val) => acc + val, 0) / temps.length).toFixed(2);
  
    // Dominant weather condition (most frequent main condition)
    const weatherCounts = weatherData.reduce((acc, data) => {
      acc[data.main] = (acc[data.main] || 0) + 1;
      return acc;
    }, {});
    const dominantWeather = Object.keys(weatherCounts).reduce((a, b) => weatherCounts[a] > weatherCounts[b] ? a : b);
  
    console.log(`Daily Summary:
    Average Temp: ${avgTemp}°C
    Max Temp: ${maxTemp}°C
    Min Temp: ${minTemp}°C
    Dominant Weather: ${dominantWeather}`);
  };
  
  module.exports = { calculateDailySummary };
  