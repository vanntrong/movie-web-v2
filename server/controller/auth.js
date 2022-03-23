const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// try {
//   User.findOne({ username: req.body.username }, function (err, user) {
//     if (err) res.status(401).json({ success: false, message: err });
//     if (user) {
//       return res.status(401).json({ success: false, message: "That username is already taken." });
//     } else {
//       const newUser = new User({
//         username: req.body.username,
//         password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null),
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//       });
//       newUser.save(function (err) {
//         if (err) res.status(401).json({ success: false, message: err });
//         else {
//           return res.status(200).json({
//             success: true,
//             message: "Successfully",
//             user: { ...newUser },
//           });
//         }
//       });
//     }
//   });
// } catch (error) {
//   console.log(error);
// }

const authController = {
  createAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: "10d" }
    );
  },

  createRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
  },

  registerUser: (req, res) => {
    try {
      User.findOne({ username: req.body.username }, function (err, user) {
        if (err) return res.status(500).json({ success: false, message: err });
        if (user) {
          return res.status(404).json({ success: false, message: "That username is already taken." });
        } else {
          const newUser = new User({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          });
          newUser.save(function (err) {
            if (err) return res.status(500).json({ success: false, message: err });
            else {
              return res.status(200).json({
                success: true,
                message: "Successfully",
              });
            }
          });
        }
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  registerUserAdmin: (req, res) => {
    try {
      User.findOne({ username: req.body.username }, function (err, user) {
        if (err) return res.status(500).json({ success: false, message: err });
        if (user) {
          return res.status(401).json({ success: false, message: "That username is already taken." });
        } else {
          const newUser = new User({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: req.body.avatar,
          });
          newUser.save(function (err) {
            if (err) return res.status(500).json({ success: false, message: err });
            else {
              const { password, ...other } = newUser._doc;
              return res.status(200).json({
                success: true,
                message: "Successfully",
                user: { ...other },
              });
            }
          });
        }
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  loginUser: (req, res) => {
    try {
      User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return res.status(500).json({ success: false, message: err });
        if (!user) return res.status(404).json({ success: false, message: "Incorrect username!" });
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(404).json({ success: false, message: "Incorrect password!" });
        }
        const { password, ...other } = user._doc;
        const accessToken = authController.createAccessToken(user);
        const refreshToken = authController.createRefreshToken(user);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: false,
        });
        return res.status(200).json({
          success: true,
          message: "Successfully",
          user: { ...other },
          accessToken: `Bearer ${accessToken}`,
        });
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  loginUserAdmin: (req, res) => {
    try {
      User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return res.status(500).json({ success: false, message: err });
        if (!user) return res.status(404).json({ success: false, message: "Incorrect username!" });
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(404).json({ success: false, message: "Incorrect password!" });
        }
        if (!user.isAdmin) {
          return res.status(403).json({ success: false, message: "You are not admin!" });
        }
        const { password, ...other } = user._doc;
        const accessToken = authController.createAccessToken(user);
        const refreshToken = authController.createRefreshToken(user);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: false,
        });
        return res.status(200).json({
          success: true,
          message: "Successfully",
          user: { ...other },
          accessToken: `Bearer ${accessToken}`,
        });
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  refreshToken: (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ success: false, message: "You are not authenticated!" });
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(500).json({ success: false, message: err });
      const newAccessToken = authController.createAccessToken(user);
      const newRefreshToken = authController.createRefreshToken(user);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });

      res.status(200).json({ success: true, message: "Successfully", accessToken: `Bearer ${newAccessToken}` });
    });
  },

  // getProfile: (req, res) => {
  //   try {
  //     User.findById(req.user.id, (err, user) => {
  //       if (err) return res.status(500).json({ success: false, message: err });
  //       if (!user) return res.status(404).json({ success: false, message: "User not found" });
  //       const { password, ...other } = user._doc;
  //       return res.status(200).json({
  //         success: true,
  //         message: "Successfully",
  //         user: { ...other },
  //       });
  //     });
  //   } catch (error) {
  //     return res.status(500).json({ success: false, message: error });
  //   }
  // },
};

module.exports = authController;
