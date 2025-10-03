import axios from 'axios';
import { API_KEY } from '../../config'

export const fetchMovieById = async (movieId) => {
    const apiURL = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&page=1`;
    
    const apiOptions = {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    };

    try {
        const response = await axios.get(apiURL, apiOptions);

        return response.data;
    } catch (error) {
        console.error("Failed to fetch movie details:", error);

        return null;
    }
};

