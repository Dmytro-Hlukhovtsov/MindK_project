const config = require("./config");

module.exports = require("knex")({
  client: "pg",
  connection: {
    host: config.db.dbHost,
    user: config.db.dbUser,
    password: config.db.dbPassword,
    database: config.db.dbDatabase,
  },
});
