const db = require("../db");

module.exports = {
  create: (session) => db("Sessions").insert(session),
  getByToken: (token) =>
    db.select().first().where("token", token).from("Sessions"),
  deleteByToken: (token) => db("Sessions").where("token", token).del(),
  deleteAllTokens: (userId) => db("Sessions").where("user_id", userId).del(),
};
