const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const userService = require("../store/profiles.service");

passport.use(
  new LocalStrategy(
    {
      usernameField: "signinEmail",
      passwordField: "signinPassword",
    },
    //  Passport verify callback
    async (email, password, done) => {
      const user = await userService.getByEmailOrPhone(email);
      if (user) {
        if (user.password) {
          bcrypt.compare(password, user.password, (err, res) => {
            if (!err) {
              if (res) {
                return done(null, user);
              }
              return done(null, false, { message: "Incorrect password" });
            }
            console.log(err);
          });
        } else {
          return done(null, false, {
            message: "Please login with Google or Facebook",
          });
        }
      } else {
        return done(null, false, { message: "Incorrect login" });
      }
    }
  )
);

module.exports = passport;
