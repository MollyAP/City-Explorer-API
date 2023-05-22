const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;
require("dotenv").config();
const cors = require("cors");

app.use(
  cors({
    origin: "https://dacityexplorer.netlify.app"
  })
);

app.use(express.static(__dirname));

const { getWeather } = require('./Weather');
const { getMovies } = require('./Movies');

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  try {
    let dailyForecasts = await getWeather(lat, lon);
    res.send(dailyForecasts);
  } catch (error) {
    res.send(error.message);
  }
});

app.get('/movies', async (req, res) => {
  const { searchQuery } = req.query;

  try {
    let localMovies = await getMovies(searchQuery);
    res.send(localMovies);
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
