const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3005;
require("dotenv").config();
const cors = require("cors")

app.use(
  cors({
    origin: "https://dacityexplorer.netlify.app"
  })
);

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
};

class Movie {
  constructor(title, overview, releaseDate) {
    this.title = title;
    this.overview = overview;
    this.releaseDate = releaseDate;
  }
};

app.use(express.static(__dirname));

app.get('/weather', async (req, res) => {
  const { lat, lon, searchQuery } = req.query;

  try {
    let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`)

    let dailyForecasts = weatherData.data.data.map(day => {
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

  app.get('/movies', async (req, res) => {
    const { city } = req.query;
  
    try {
      const movieData = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${city}&api_key=${process.env.MOVIE_API_KEY}`
      );
  
      const movies = movieData.data.results.map((movie) => {
        return new Movie(movie.title, movie.overview, movie.release_date);
      });
  
      res.send(movies);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});