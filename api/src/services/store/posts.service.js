const db = require("../db");

module.exports = {
  getAllPosts: async (limit, offset) =>
    db
      .select(
        "Users.user_id",
        "Users.username",
        "Users.name",
        "Users.avatar",
        "Posts.*",
        "vis.visibility_id as visibility",
        "PostMedia.link"
      )
      .from("Posts")
      .join("Users", "Posts.user_id", "=", "Users.user_id")
      .join("CurrentPostVisible as cpv", "cpv.post_id", "=", "Posts.post_id")
      .join("Visibility as vis", "vis.visibility_id", "=", "cpv.visibility_id")
      .leftJoin("PostMedia", "PostMedia.post_id", "=", "Posts.post_id")
      .orderBy("Posts.created_time", "desc")
      .limit(limit)
      .offset(offset),
  getAllUsersPosts: async (userId, limit, offset) =>
    db
      .select(
        "Users.user_id",
        "Users.username",
        "Users.name",
        "Users.avatar",
        "Posts.*",
        "vis.visibility_id as visibility",
        "PostMedia.link"
      )
      .from("Posts")
      .join("Users", "Posts.user_id", "=", "Users.user_id")
      .join("CurrentPostVisible as cpv", "cpv.post_id", "=", "Posts.post_id")
      .join("Visibility as vis", "vis.visibility_id", "=", "cpv.visibility_id")
      .leftJoin("PostMedia", "PostMedia.post_id", "=", "Posts.post_id")
      .where("Users.user_id", userId)
      .orderBy("Posts.created_time")
      .limit(limit)
      .offset(offset),
  getOnePost: async (postid) =>
    db
      .select(
        "Users.user_id",
        "Users.username",
        "Users.name",
        "Users.avatar",
        "Posts.*",
        "vis.visibility_id as visibility",
        "PostMedia.link"
      )
      .from("Posts")
      .join("Users", "Posts.user_id", "=", "Users.user_id")
      .join("CurrentPostVisible as cpv", "cpv.post_id", "=", "Posts.post_id")
      .join("Visibility as vis", "vis.visibility_id", "=", "cpv.visibility_id")
      .leftJoin("PostMedia", "PostMedia.post_id", "=", "Posts.post_id")
      .where("Posts.post_id", postid),
  addPostTransaction: async (postData, postMedia, visible) =>
    db.transaction(async () => {
      const addPost = await db("Posts").insert(postData, "post_id");
      console.log(addPost);
      await db("PostMedia").insert({ post_id: addPost[0], link: postMedia });

      await db("CurrentPostVisible").insert({
        visibility_id: visible,
        post_id: addPost[0],
      });
    }),
  updatePostTransaction: async (postData, postMedia, visible, postid) =>
    db.transaction(async () => {
      const updatePost = await db("Posts")
        .update(postData, "post_id")
        .where("post_id", postid);

      await db("PostMedia")
        .update({ link: postMedia })
        .where("post_id", postid);

      await db("CurrentPostVisible")
        .update({
          visibility_id: visible,
          post_id: updatePost[0],
        })
        .where("post_id", postid);
    }),
  deletePost: async (postId) =>
    db.from("Posts").where("post_id", postId).delete().returning("user_id"),
};
