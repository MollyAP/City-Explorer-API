const axios = require('axios');

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

async function getWeather(lat, lon) {
  try {
    let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);

    let dailyForecasts = weatherData.data.data.map(day => {
      return new Forecast(day.datetime, day.weather.description);
    });

    return dailyForecasts;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getWeather };