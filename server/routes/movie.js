const router = require("express").Router();
const movieController = require("../controller/movie");
const middlewareController = require("../controller/middleware");
const Movie = require("../models/movie");

router.get("/comments", movieController.getAllComment);

router.post("/comments", middlewareController.verifyToken, movieController.createNewComment);

router.post("/comments/update", movieController.updateComment);

module.exports = router;
