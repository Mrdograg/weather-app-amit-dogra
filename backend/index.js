const express = require('express');
const cors = require('cors');
const { getWeatherData } = require('./weatherData');
const { checkThreshold } = require('./alert');
const { calculateDailySummary } = require('./summary');
const app = express();
const PORT = 3036;

let dailyWeatherData = [];


app.use(cors());


app.use(express.static('../frontend'));


app.get('/api/weather', async (req, res) => {
  try {
    const weatherData = await getWeatherData();
    dailyWeatherData = [...dailyWeatherData, ...weatherData];
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});


app.get('/api/summary', (req, res) => {
  if (dailyWeatherData.length > 0) {
    const summary = calculateDailySummary(dailyWeatherData);
    dailyWeatherData = []; 
    res.json(summary);
  } else {
    res.json({ message: 'No data available for today' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
