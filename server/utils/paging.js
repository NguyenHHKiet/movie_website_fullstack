const paging = (data = [], page = 1, limit = 20, property = "popularity") => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // get json database
    const results = data.slice(startIndex, endIndex);
    const currentPage = page;
    const totalPages = Math.ceil(data.length / limit);

    // popularity decrease
    const sorted = results.sort((a, b) => b[property] - a[property]);

    return { sorted, currentPage, totalPages };
};

module.exports = paging;
