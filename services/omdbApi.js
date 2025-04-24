import axios from 'axios';

const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = '1757be2'; // Replace with your own API key if needed

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  params: {
    apikey: API_KEY,
  },
});

/**
 * Fetches a list of movies matching the given title.
 * @param {string} title - The movie title to search for.
 * @param {string} [type] - Optional filter by type (movie, series, episode).
 * @param {string} [year] - Optional filter by year of release.
 * @param {number} [page=1] - Page number for pagination.
 * @returns {Promise<Array>} - A promise that resolves to an array of movie objects.
 */
export const fetchMoviesByTitle = async (title, type, year, page = 1) => {
  try {
    const response = await api.get('', {
      params: {
        s: title,
        page,
        ...(type && { type }),
        ...(year && { y: year }),
      },
    });
    if (response.data.Response === 'False') {
      throw new Error(response.data.Error);
    }
    return response.data.Search;
  } catch (error) {
    throw new Error(error?.message || 'Failed to fetch movies');
  }
};

/**
 * Fetches detailed information about a movie by its IMDb ID.
 * @param {string} imdbID - The IMDb ID of the movie.
 * @returns {Promise<Object>} - A promise that resolves to a movie object.
 */
export const fetchMovieById = async (imdbID) => {
  try {
    const response = await api.get('', {
      params: { i: imdbID },
    });
    if (response.data.Response === 'False') {
      throw new Error(response.data.Error);
    }
    return response.data;
  } catch (error) {
    throw new Error(error?.message || 'Failed to fetch movie details');
  }
};
