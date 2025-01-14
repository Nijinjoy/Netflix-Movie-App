const axios = require("axios").default;
import {
    TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL, ENDPOINTS
} from '../constants/Url'
import { LANGUAGES } from '../constants/Languages'

const TMDB_HTTP_REQUEST = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    },
});

const getNowPlayingMovies = () =>
    TMDB_HTTP_REQUEST.get(ENDPOINTS.now_playing_movies);

const getUpcomingMovies = () =>
    TMDB_HTTP_REQUEST.get(ENDPOINTS.upcoming_movies);

const getTopRated = () =>
    TMDB_HTTP_REQUEST.get(ENDPOINTS.top_rated);

const getAllGenres = () => TMDB_HTTP_REQUEST.get(ENDPOINTS.genres);

const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;

const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`;

const getMovieById = (movieId, append_to_response = "") =>
    TMDB_HTTP_REQUEST.get(
        `${ENDPOINTS.movie}/${movieId}`,
        append_to_response ? { params: { append_to_response } } : null
    );

const getMovieRecommendations = (movieId) =>
    TMDB_HTTP_REQUEST.get(ENDPOINTS.movie_recommendations(movieId));

const getMovieImages = (movieId) =>
    TMDB_HTTP_REQUEST.get(ENDPOINTS.movie_videos(movieId));

console.log("getMovieImages===>", getMovieImages);

export {
    getNowPlayingMovies,
    getUpcomingMovies,
    getAllGenres,
    getPoster,
    getMovieById,
    getVideo,
    getTopRated,
    getMovieImages,
    getMovieRecommendations
};
