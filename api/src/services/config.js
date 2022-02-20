module.exports = {
  app: {
    port: process.env.APP_PORT,
    salt: process.env.SALT,
    appKey: process.env.APP_KEY,
    serverURL: process.env.SERVER_URL,
  },
  auth: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.CLIENT_SECRET,
    facebookClientId: process.env.FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.FACEBOOK_SECRET,
  },
  db: {
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbDatabase: process.env.DB_DATABASE,
  },
};
