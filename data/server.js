const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3005;
// const weatherData = require("./weather.json");
require("dotenv").config();
const cors = require("cors")

app.use(
  cors({
    origin:"https://dacityexplorer.netlify.app"
  })
);

class Forecast{
  constructor(date,description){
    this.date = date;
    this.description = description;
  }
}

app.use(express.static(__dirname));

app.get('/weather', async (req, res) => {
  const { lat, lon, searchQuery } = req.query;

  try {
    let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`)
        // Validate searchQuery against available cities
        const validCity = weatherData.data.data.find((item) => {
          if (searchQuery == item.city_name) {
            return true
          } else {
            return false
          }
    
        });
    
        if (!validCity) {
          res.status(500).send(` 
          <html>
          <head>
            <link rel="stylesheet" type="text/css" href="./error.css">
          </head>
          <body>
            <div class="outer-container">
              <div class="inner-container">
                <h1>500</h1>
                <p>Sowwy, the page you are looking for does not exist ówò</p>
              </div>
            </div>
          </body>
        </html>
      `);
          return;
        }
    
        let dailyForecasts = validCity.data.map(day=>{
          return new Forecast(day.datetime, day.weather.description);
        })
    
        res.send(dailyForecasts)
  } catch (error) {
    res.send(error.message)
  }
    // Filter the weather data based on lat, lon, and searchQuery
    const forcastData = validCity.data

    // Create an array of Forecast objects
    const forecasts = forcastData.map((item) => new Forecast(item));

    // Format the data to look like the example
    const responseData = forecasts.map((forecast) => {
      return {
        description: forecast.getDescription(),
        date: forecast.getDate(),
      };
    });
  });


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});