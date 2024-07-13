// src/api/index.js
import axios from 'axios';

const API_KEY = '2dca580c2a14b55200e784d157207b4d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (year, genreIds = []) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        sort_by: 'popularity.desc',
        primary_release_year: year,
        page: 1,
        vote_count: { gte: 100 },
        with_genres: genreIds.join(','),
      },
    });
    return response.data.results.slice(0, 20); 
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};