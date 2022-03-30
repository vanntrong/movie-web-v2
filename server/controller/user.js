const User = require("../models/user");
const bcrypt = require("bcrypt");

const userController = {
  updateUserListWatchLater: async (req, res) => {
    try {
      const data = await User.findByIdAndUpdate(req.user.id, { $set: { watchLater: req.body } }, { new: true });
      res.status(200).json({
        success: true,
        message: "Successfully added to watch later",
        data: data.watchLater,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);
      }
      const newUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Successfully updated",
        data: newUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  },

  getAllUser: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json({
        success: true,
        message: "Successfully get all users",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      if (req.user.id !== req.params.userId && !req.user.isAdmin) {
        res.status(403).json({
          success: false,
          error: "You can't delete another user",
        });
      } else {
        User.findByIdAndDelete(req.params.id, (err, user) => {
          if (err) {
            res.status(500).json({
              success: false,
              error: err,
            });
          } else {
            res.status(200).json({
              success: true,
              message: "Successfully deleted",
              data: user,
            });
          }
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error,
        message: "Server error",
      });
    }
  },
};

module.exports = userController;
