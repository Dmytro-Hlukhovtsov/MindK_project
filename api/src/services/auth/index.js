const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../store/profiles.service");
const config = require("../config");
const sessionService = require("../store/sessions.service");

module.exports = {
  registry: async (credentials) => {
    console.log("credentials", credentials);
    const { username, signupPassword, signupEmail } = credentials;

    return userService.addProfile({
      username,
      email: signupEmail,
      password: bcrypt.hashSync(signupPassword, 10),
    });
  },
  refresh: async (refreshToken) => {
    const session = await sessionService.getByToken(refreshToken);
    if (session) {
      const user = await userService.getProfileById(session.user_id);
      const accessToken = jwt.sign(
        {
          user_id: user.user_id,
          email: user.email,
          name: user.name,
          username: user.username,
        },
        config.app.appKey
      );
      // eslint-disable-next-line no-shadow
      const refreshToken = uuidv4();
      await sessionService.deleteByToken(session.token);
      await sessionService.create({
        user_id: session.user_id,
        token: refreshToken,
      });
      return { accessToken, refreshToken };
    }
    return {};
  },
  authorizeById: async (id) => {
    const user = await userService.getProfileById(id);
    if (user) {
      const accessToken = jwt.sign(
        {
          user_id: user.user_id,
          email: user.email,
          name: user.name,
          username: user.username,
        },
        config.app.appKey
      );
      const refreshToken = uuidv4();
      await sessionService.create({
        user_id: user.user_id,
        token: refreshToken,
      });
      return { accessToken, refreshToken };
    }
    return {};
  },
  logout: async (token) => {
    await sessionService.deleteByToken(token);
  },
  getByToken: async (token) => {
    const session = await sessionService.getByToken(token);

    return session;
  },
};
