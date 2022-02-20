const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const config = require("../config");
const userService = require("../store/profiles.service");

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: config.auth.googleClientId,
      clientSecret: config.auth.googleClientSecret,
    },
    //  Passport verify callback
    async (accessToken, refreshToken, profile, done) => {
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

module.exports = passport;
