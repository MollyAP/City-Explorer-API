const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;
const weatherData = require("./weather.json");
const cors = require("cors")

app.use(
  cors({
    origin:"https://dacityexplorer.netlify.app"
  })
);

app.use(express.static(__dirname));

app.get('/weather', (req, res) => {
  const { lat, lon, searchQuery } = req.query;

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


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});