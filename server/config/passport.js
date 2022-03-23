const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  passport.use(
    new LocalStrategy(function (username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://api.freemovienow.online/auth/google/callback",
        // callbackURL: "http://localhost:8000/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id }, (err, user) => {
          if (err) return done(err);
          if (user) {
            return done(null, user);
          }
          const newUser = new User({
            firstName: profile.name.familyName,
            lastName: profile.name.givenName,
            username: profile._json.email ? profile._json.email : profile.id,
            password: bcrypt.hashSync(profile.id, bcrypt.genSaltSync(10), null),
            googleId: profile.id,
            provider: profile.provider,
            avatar: profile._json.picture,
          });

          newUser.save((err) => {
            if (err) return done(err);
            return done(null, newUser);
          });
        });
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "https://api.freemovienow.online/auth/facebook/callback",
        // callbackURL: "http://localhost:8000/auth/facebook/callback",
        profileFields: ["id", "email", "photos", "locale", "name", "updated_time", "verified"],
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOne({ facebookId: profile.id }, (err, user) => {
          if (err) return done(err);
          if (user) {
            return done(null, user);
          }
          const newUser = new User({
            firstName: profile.name.familyName
              ? profile.name.familyName
              : "" + " " + profile.name.middleName
              ? profile.name.middleName
              : "",
            lastName: profile.name.givenName ? profile.name.givenName : "",
            username: profile._json.email ? profile._json.email : profile.id,
            password: bcrypt.hashSync(profile.id, bcrypt.genSaltSync(10), null),
            facebookId: profile.id,
            provider: profile.provider,
            avatar: profile.photos[0].value,
          });

          newUser.save((err) => {
            if (err) return done(err);
            return done(null, newUser);
          });
        });
      }
    )
  );
};
