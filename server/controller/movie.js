const Movie = require("../models/movie");

const movieController = {
  getAllComment: (req, res) => {
    Movie.findOne({ mediaType: req.query.type, idMovie: req.query.id }, (err, movies) => {
      if (err) {
        res.status(500).send(err);
      }
      if (!movies) {
        res.status(200).json({
          success: true,
          message: "No comments found",
          data: [],
        });
      }
      if (movies) {
        res.status(200).json({
          success: true,
          message: "Comments found",
          data: movies.comments,
        });
      }
    });
  },

  //create new comment
  createNewComment: async (req, res) => {
    try {
      const movie = await Movie.findOne({ mediaType: req.body.media_type, idMovie: req.body.idMovie });
      if (!movie) {
        const newMovie = new Movie({
          mediaType: req.body.media_type,
          idMovie: req.body.idMovie,
          comments: [req.body.comment],
        });
        newMovie.save((err, movie) => {
          if (err) {
            res.status(500).send(err);
          }
          if (movie) {
            res.status(200).json({
              success: true,
              message: "new movie and comment created",
              data: movie.comments,
            });
          }
        });
      }
      if (movie) {
        Movie.findOneAndUpdate(
          { mediaType: req.body.media_type, idMovie: req.body.idMovie },
          { $push: { comments: { $each: [req.body.comment], $position: 0 } } },
          { new: true },
          (err, movie) => {
            if (err) {
              res.status(500).json({
                success: false,
                message: "Error: Server error",
                err,
              });
            }
            if (!movie) {
              res.status(500).json({
                success: false,
                message: "Error: Server error",
              });
            }
            if (movie) {
              res.status(200).json({
                success: true,
                message: "Comment created",
                data: movie.comments,
              });
            }
          }
        );
      }
    } catch (error) {
      res.status(500).json({
        message: "Error when creating new comment",
        error,
      });
    }
  },

  //update comment
  updateComment: async (req, res) => {
    try {
      const movie = await Movie.findOne({ mediaType: req.body.media_type, idMovie: req.body.idMovie });
      if (!movie) {
        res.status(404).json({
          success: false,
          message: "Error: Movie not found",
        });
      }
      if (movie) {
        Movie.findOneAndUpdate(
          { mediaType: req.body.media_type, idMovie: req.body.idMovie },
          { $set: { comments: req.body.comments } },
          { new: true },
          (err, movie) => {
            if (err) {
              res.status(500).json({
                success: false,
                message: "Error: Server error",
                err,
              });
            }

            if (movie) {
              res.status(200).json({
                success: true,
                message: "Comment updated",
                data: movie.comments,
              });
            }
          }
        );
      }
    } catch (error) {
      res.status(500).json({
        message: "Error when updating comment",
        error,
      });
    }
  },
};

module.exports = movieController;
