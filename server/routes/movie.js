const express = require("express");

const router = express.Router();

const movieController = require("../controller/movie");

// 4. Lấy các phim đang Trending
router.get("/trending", movieController.getTrending);

// 5.  Lấy các phim có Rating cao
router.get("/top-rate", movieController.getRating);

// 6.  Lấy các phim theo thể loại
router.get("/discover", movieController.getDiscover);

// 7.  Lấy trailer của một bộ phim
router.post("/video", movieController.getTrailer);

// 8. Tìm kiếm phim theo từ khóa
router.post("/search", movieController.getMoviesByKeyword);
router.get("/search", movieController.getSelectKeyword);

module.exports = router;
