const Movies = require("../model/Movies");
const paging = require("../utils/paging");

const resStructure = (results = [], page = 1, total_pages = 248) => {
    return { results, page, total_pages };
};

exports.getTrending = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // get json database
    const data = Movies.all("movieList.json");
    const { sorted, currentPage, totalPages } = paging(
        data,
        page,
        limit,
        "popularity"
    );

    // send results
    const response = resStructure(sorted, currentPage, totalPages);
    res.status(200).send(response);
};

exports.getRating = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // get json database
    const data = Movies.all("movieList.json");
    const { sorted, currentPage, totalPages } = paging(
        data,
        page,
        limit,
        "vote_average"
    );

    // send results
    const response = resStructure(sorted, currentPage, totalPages);
    res.status(200).send(response);
};

exports.getDiscover = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const genre = parseInt(req.query.genre); // genre_ids

    // error message
    if (!genre) {
        res.status(400).send({ message: "Not found genre param." });
        return;
    }

    // get json database
    const genreData = Movies.all("genreList.json").find(
        (item) => item.id === genre
    );

    // error message
    if (!genreData) {
        res.status(400).send({ message: "Not found that genre id" });
        return;
    }

    const filteredData = Movies.all("movieList.json").filter((item) =>
        item.genre_ids.includes(genreData.id)
    );

    const { sorted, currentPage, totalPages } = paging(
        filteredData,
        page,
        limit
    );

    // send results
    const response = resStructure(sorted, currentPage, totalPages);
    response.genre_name = genreData.name;
    res.status(200).send(response);
};

exports.getTrailer = (req, res) => {
    const id = req.body.film_id;
    if (!id) {
        res.status(400).send({ message: "Not found film_id param." });
        return;
    }

    const data = Movies.all("videoList.json");
    // error message
    const videoItem = data.find((item) => item.id === id);
    if (!videoItem) {
        res.status(404).send({ message: "Not found video." });
        return;
    }

    const filteredMovies = videoItem.videos.filter(
        (movie) =>
            movie.official === true &&
            movie.site === "YouTube" &&
            (movie.type === "Trailer" || movie.type === "Teaser")
    );

    const now = new Date();
    let closestDate = filteredMovies[0];
    // calculate date distance
    let closestDiff = Math.abs(now - closestDate.published_at);
    filteredMovies.forEach((date) => {
        const diff = Math.abs(now - date.published_at);
        // date distance comparison
        // Calculate the date with the shortest distance
        if (diff < closestDiff) {
            closestDate = date;
            closestDiff = diff;
        }
    });

    // send results
    const response = resStructure([closestDate]);
    res.status(200).send(response);
};

exports.getMoviesByKeyword = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const { keyword } = req.body;
    const selectedKey = req.body;
    delete selectedKey.keyword;

    if (!keyword) {
        res.status(400).send({ message: "Not found keyword param." });
        return;
    }

    // filter keywords
    let filteredData = Movies.all("movieList.json").filter((item) => {
        return (
            item?.overview?.toLowerCase().includes(keyword.toLowerCase()) ||
            item?.title?.toLowerCase().includes(keyword.toLowerCase())
        );
    });

    // count length of objects
    const count = Object.keys(selectedKey).length;
    // filter out selected
    if (count > 0) {
        filteredData = filteredData.filter((item) => {
            let index = 0;
            for (const key in selectedKey) {
                if (Object.hasOwnProperty.call(selectedKey, key)) {
                    if (
                        item[key]?.includes(selectedKey[key]) ||
                        // special handling
                        selectedKey[key] === "all" ||
                        item["first_air_date"]?.includes(selectedKey[key])
                    )
                        index += 1;
                    if (index === count) return true;
                }
            }
            return false;
        });
    }
    // console.log(selectedKey);

    const { sorted, currentPage, totalPages } = paging(
        filteredData,
        page,
        limit
    );

    // send results
    const response = resStructure(sorted, currentPage, totalPages);
    res.status(200).send(response);
};

exports.getSelectKeyword = (req, res) => {
    const genre = Movies.all("genreList.json");
    const mediaType = Movies.all("mediaTypeList.json");

    res.status(200).send({ genre, mediaType });
};
