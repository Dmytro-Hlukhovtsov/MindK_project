const db = require("../db");

module.exports = {
  getAllComments: async (postId) =>
    db
      .select(
        "Users.user_id",
        "Users.username",
        "Users.name",
        "Users.avatar",
        "Comments.*"
      )
      .from("Comments")
      .join("Users", "Comments.user_id", "=", "Users.user_id")
      .where("post_id", postId),
  addComment: async (commData) => db("Comments").insert(commData, "comment_id"),
  updateComment: async (commData, commId) =>
    db("Comments").update(commData, "comment_id").where("comment_id", commId),
  deleteComment: async (commId) =>
    db("Comments").where("comment_id", commId).delete().returning("comment_id"),
};
