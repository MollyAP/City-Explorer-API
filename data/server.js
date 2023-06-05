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
  try {
    // Retrieve the latitude, longitude, and searchQuery parameters from the request
    const { lat, lon, searchQuery } = req.query;

    // Implement the logic to handle the weather request
    const weatherData = await getWeather(lat, lon);
    
    // Send the weatherData as a response
    res.json(weatherData);
  } catch (error) {
    // Handle any errors that occurred during weather data retrieval
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve weather data.' });
  }
});

app.get('/movies', async (req, res) => {
  try {
    // Retrieve the searchQuery and city parameters from the request
    const { searchQuery, city } = req.query;

    // Implement the logic to handle the movie request
    const movieData = await getMovies(searchQuery, city);
    
    // Send the movieData as a response
    res.json(movieData);
  } catch (error) {
    // Handle any errors that occurred during movie data retrieval
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve movie data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
