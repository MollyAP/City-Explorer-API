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

require('./Weather');
require('./Movies');

app.get('/weather', async (req, res) => {
  // Retrieve the latitude, longitude, and searchQuery parameters from the request
  const { lat, lon, searchQuery } = req.query;
});

app.get('/movies', async (req, res) => {
  // Retrieve the searchQuery and city parameters from the request
  const { searchQuery, city } = req.query;
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
