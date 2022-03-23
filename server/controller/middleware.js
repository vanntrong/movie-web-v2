const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.Authorization ? req.headers.Authorization : req.headers.authorization;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ success: false, message: "Token is not valid" });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({ success: false, message: "You are not authenticated" });
    }
  },
  verifyTokenAndAdmin: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json({ success: false, message: "You are not authorized" });
      }
    });
  },
};

module.exports = middlewareController;
