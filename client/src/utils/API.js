const API_KEY = "914e7df8a6341ac66d62a9b09aefd101";
// const hosting = "https://api.themoviedb.org/3";
const hosting = "http://localhost:5000/api/movies";

const hostImage = "https://image.tmdb.org/t/p/original";
const requests = {
    // fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    // fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    // fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    // fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    // fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    // fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    // fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    // fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    // fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
    // local host
    fetchNetflixOriginals: `/discover?genre=12`,
    fetchTrending: `/trending`,
    fetchTopRated: `/top-rate`,
    fetchActionMovies: `/discover?genre=28`,
    fetchComedyMovies: `/discover?genre=35`,
    fetchHorrorMovies: `/discover?genre=27`,
    fetchRomanceMovies: `/discover?genre=10749`,
    fetchDocumentaries: `/discover?genre=99`,
    fetchSearch: `/search`,
};

export { hostImage, hosting, requests, API_KEY };
