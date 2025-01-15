const config = require("../../package.json");
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

// const TMDB_API_KEY = "ad7ff917d8bb4d457ac3b652b6174c17"
const TMDB_API_KEY = config.projectConfig.apiKey;

const ENDPOINTS = {
    now_playing_movies: "/movie/now_playing",
    upcoming_movies: "/movie/upcoming",
    genres: "/genre/movie/list",
    movie: "/movie",
    top_rated: "/movie/top_rated",
    movie_recommendations: (movieId) => `/movie/${movieId}/recommendations`,
    movie_videos: (movieId) => `/movie/${movieId}/videos`,
    // movie_list: "/genre/movie/list"
}

const APPEND_TO_RESPONSE = {
    VIDEOS: "videos",
    CREDITS: "credits",
    RECOMMENDATIONS: "recommendations",
    SIMILAR: "similar",
};

const buildApiUrl = (endpoint, params = '') => {
    return `${TMDB_BASE_URL}${endpoint}${params ? `?${params}` : ''}&api_key=${TMDB_API_KEY}`;
}


export { TMDB_API_KEY, TMDB_IMAGE_BASE_URL, ENDPOINTS, TMDB_BASE_URL, APPEND_TO_RESPONSE, buildApiUrl }
