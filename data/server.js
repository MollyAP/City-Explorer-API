const express = require('express');
const fs = require('fs');
const Forecast = require('./forecast');
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.static(__dirname));

app.get('/weather', (req, res) => {
  const { lat, lon, searchQuery } = req.query;

  fs.readFile('./weather.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('505 ERROR READING WEATHER DATA 505');
      return;
    }

    const weatherData = JSON.parse(data);

    // Validate searchQuery against available cities
    const validCity = weatherData.find((item) => {
      if (searchQuery == item.city_name) {
        return true
      } else {
        return false
      }

    });

    if (!validCity) {
      res.status(404).send(` 
      <html>
      <head>
        <link rel="stylesheet" type="text/css" href="./error.css">
      </head>
      <body>
        <div class="outer-container">
          <div class="inner-container">
            <h1>404</h1>
            <p>Sowwy, the page you are looking for does not exist ówò</p>
          </div>
        </div>
      </body>
    </html>
  `);
      return;
    }
    res.send(validCity)
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
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});