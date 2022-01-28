const db = require("../db");

module.exports = {
  addAvatar: async (userId, link) =>
    db("Users").update({ avatar: link }, "user_id").where("user_id", userId),
};
