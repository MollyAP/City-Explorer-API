const axios = require('axios');

class Movie {
  constructor(title, overview, releaseDate) {
    this.title = title;
    this.overview = overview;
    this.releaseDate = releaseDate;
  }
}

async function getMovies(searchQuery) {
  try {
    let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${process.env.MOVIE_API_KEY}`);

    let localMovies = movieData.data.results.map(movie => {
      return new Movie(movie.title, movie.overview, movie.release_date);
    });

    return localMovies;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getMovies };