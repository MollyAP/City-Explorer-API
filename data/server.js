const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3005;
require("dotenv").config();
const cors = require("cors");

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
}

class Movie {
  constructor(title, overview, releaseDate) {
    this.title = title;
    this.overview = overview;
    this.releaseDate = releaseDate;
  }
}

app.use(express.static(__dirname));

app.get('/weather', async (req, res) => {
  const { lat, lon, searchQuery } = req.query;

  try {
    let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);

    let dailyForecasts = weatherData.data.data.map(day => {
      return new Forecast(day.datetime, day.weather.description);
    });

    res.send(dailyForecasts);
  } catch (error) {
    res.send(error.message);
  }
});

app.get('/movies', async (req, res) => {
  const { searchQuery } = req.query;

  try {
    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${process.env.MOVIE_API_KEY}`);

    let localMovies = movieData.data.results.map(movie => {
      return new Movie(movie.title, movie.overview, movie.release_date);
    });


    res.send(localMovies);
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
