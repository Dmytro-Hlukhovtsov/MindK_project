const db = require("../db");

module.exports = {
  getAllUsersLiked: async (postId) =>
    db
      .select("Users.username", "Users.name", "Users.avatar")
      .from("Users")
      .join("Likes", "Users.user_id", "=", "Likes.user_id")
      .where("post_id", postId),
  addLike: async (userId, postId) =>
    db("Likes").insert({ user_id: userId.user_id, post_id: postId }, "like_id"),
  deleteLike: async (userId, postId) =>
    db("Likes")
      .where({ user_id: userId.user_id, post_id: postId })
      .delete()
      .returning("like_id"),
};
