const express = require('express');
const router = express.Router();
const movieControllers =  require('../controllers/movie');

router.get('/searchName',movieControllers.searchMovieName);
router.get('/searchById',movieControllers.searchMovieById);
router.get('/betweenDates/:fromDate/:toDate',movieControllers.searchMovieByYear);
router.get('/particularYear/:year',movieControllers.moviesReleasedInParticularYear);
router.get('/byRating/:fromRate/:toRate',movieControllers.searchMovieByRating);
router.get('/genre',movieControllers.searchMovieByGenre);

module.exports = router;