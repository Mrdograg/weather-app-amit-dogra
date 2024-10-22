const express = require('express');
const cors = require('cors');  // Add this for CORS
const { getWeatherData } = require('./weatherData');
const { checkThreshold } = require('./alert');
const { calculateDailySummary } = require('./summary');
const app = express();
const PORT = 3036;

let dailyWeatherData = [];

// Enable CORS for frontend on different ports (e.g., localhost:5501)
app.use(cors());

// Serve the frontend files
app.use(express.static('../frontend'));

// API endpoint to get current weather data
app.get('/api/weather', async (req, res) => {
  try {
    const weatherData = await getWeatherData();
    dailyWeatherData = [...dailyWeatherData, ...weatherData];
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

// API endpoint for daily summary (just an example)
app.get('/api/summary', (req, res) => {
  if (dailyWeatherData.length > 0) {
    const summary = calculateDailySummary(dailyWeatherData);
    dailyWeatherData = [];  // Reset daily data after summary
    res.json(summary);
  } else {
    res.json({ message: 'No data available for today' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
