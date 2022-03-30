const router = require("express").Router();
const passport = require("passport");
const authController = require("../controller/auth");
const middlewareController = require("../controller/middleware");
const user = require("../models/user");

router.get("/login/success", (req, res) => {
  if (req.isAuthenticated()) {
    const accessToken = authController.createAccessToken(req.user);
    const refreshToken = authController.createRefreshToken(req.user);

    res.cookie("refreshToken", refreshToken);
    res.status(200).json({
      success: true,
      message: "Successfully",
      user: req.user._doc,
      accessToken: `Bearer ${accessToken}`,
    });
  } else {
    res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: req.session.messages[0],
  });
});

router.post("/register", authController.registerUser);

router.get("/logout", (req, res) => {
  req.logOut();
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }

    // destroy session data
    req.session = null;

    // redirect to homepage
    // res.redirect("/");
  });
  // res.clearCookie("connect.sid");
  res.clearCookie("refreshToken");
});

router.post("/refresh", authController.refreshToken);
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/auth/login/failed", failureMessage: true }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const accessToken = authController.createAccessToken(req.user);
      const refreshToken = authController.createRefreshToken(req.user);
      const { password, ...other } = req.user._doc;
      res.cookie("refreshToken", refreshToken);
      res.status(200).json({
        success: true,
        message: "Successfully",
        user: { ...other },
        accessToken: `Bearer ${accessToken}`,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
  }
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://freemovienow.online/login/success",
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: "public_profile,email" }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login/failed",
    successRedirect: "https://freemovienow.online/login/success",
  })
);

router.post("/login/admin", authController.loginUserAdmin);

router.post("/register/admin", authController.registerUserAdmin);

module.exports = router;
