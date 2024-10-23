// alert.js
const { alertThreshold } = require('./config');

const checkThreshold = (weatherData) => {
  for (const data of weatherData) {
    if (data.temp > alertThreshold) {
      console.log(`ALERT! In ${data.city}, temperature exceeded ${alertThreshold}°C: Current temp = ${data.temp}°C`);
    }
  }
};

module.exports = { checkThreshold };
