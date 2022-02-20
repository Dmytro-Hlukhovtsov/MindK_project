const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const config = require("../config");
const userService = require("../store/profiles.service");

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: config.auth.facebookClientId,
      clientSecret: config.auth.facebookClientSecret,
    },
    //  Passport verify callback
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const [{ value: email }] = profile.emails;
      let user = await userService.getByEmailOrPhone(email);
      if (!user) {
        await userService.addProfile({
          name: profile.displayName,
          email,
        });
        user = await userService.getByEmailOrPhone(email);
      }

      return done(null, {
        id: user.user_id,
        name: user.name,
        email: user.email,
      });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
