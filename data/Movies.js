'use strict';

const axios = require('axios');
const cache = require('./cache.js');

class Movie {
  constructor(title, overview, releaseDate) {
    this.title = title;
    this.overview = overview;
    this.releaseDate = releaseDate;
  }
}

async function getMovies(searchQuery, city) {
  const key = 'movies-' + searchQuery + '-' + city;
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${process.env.MOVIE_API_KEY}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 120000)) {
    console.log('Cache hit');
    return cache[key].data;
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseMovies(response.data));
    return cache[key].data;
  }
}

function parseMovies(movieData) {
  try {
    const localMovies = movieData.results.map(movie => {
      return new Movie(movie.title, movie.overview, movie.release_date);
    });
    return Promise.resolve(localMovies);
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = { getMovies };
