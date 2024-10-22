// alert.js
const { alertThreshold } = require('./config');

// Function to check if the latest temperature breaches the alert threshold
const checkThreshold = (weatherData) => {
  for (const data of weatherData) {
    if (data.temp > alertThreshold) {
      console.log(`ALERT! In ${data.city}, temperature exceeded ${alertThreshold}°C: Current temp = ${data.temp}°C`);
    }
  }
};

module.exports = { checkThreshold };
