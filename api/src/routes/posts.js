const router = require("express").Router();
const db = require("../services/db");

// Get All Posts
router.get("/", async (req, res) => {
  try {
    const posts = await db
      .select(
        "Users.user_id",
        "Users.username",
        "Users.name",
        "Users.avatar",
        "Posts.*",
        "vis.type"
      )
      .from("Posts")
      .join("Users", "Posts.user_id", "=", "Users.user_id")
      .join("CurrentPostVisible as cpv", "cpv.post_id", "=", "Posts.post_id")
      .join("Visibility as vis", "vis.visibility_id", "=", "cpv.visibility_id")
      .orderBy("Posts.created_time");
    if (posts && Object.keys(posts).length) {
      // eslint-disable-next-line no-restricted-syntax
      for (const post of posts) {
        // eslint-disable-next-line no-await-in-loop
        const postMedia = await db
          .select("PostMedia.link")
          .from("Posts")
          .join("PostMedia", "PostMedia.post_id", "=", "Posts.post_id")
          .where("Posts.post_id", post.post_id);

        if (postMedia) {
          post.media = postMedia;
        } else {
          res.send("Some problems with fetching media for posts");
        }
      }
      res.send(posts);
    } else {
      res.send("Posts not found");
    }
  } catch (e) {
    res.send("Some error with fetching posts");
  }
});

// Get One Post
router.get("/:postid", async (req, res) => {
  const postId = req.params.postid;
  try {
    const posts = await db
      .select(
        "Users.user_id",
        "Users.username",
        "Users.name",
        "Users.avatar",
        "Posts.*",
        "vis.type"
      )
      .from("Posts")
      .join("Users", "Posts.user_id", "=", "Users.user_id")
      .join("CurrentPostVisible as cpv", "cpv.post_id", "=", "Posts.post_id")
      .join("Visibility as vis", "vis.visibility_id", "=", "cpv.visibility_id")
      .where("Posts.post_id", postId)
      .orderBy("Posts.created_time", "desc");
    if (posts && Object.keys(posts).length) {
      // eslint-disable-next-line no-restricted-syntax
      for (const post of posts) {
        // eslint-disable-next-line no-await-in-loop
        const postMedia = await db
          .select("PostMedia.link")
          .from("Posts")
          .join("PostMedia", "PostMedia.post_id", "=", "Posts.post_id")
          .where("Posts.post_id", post.post_id);

        if (postMedia) {
          post.media = postMedia;
        } else {
          res.send("Some problems with fetching media for post");
        }
      }
      res.send(posts);
    } else {
      res.send("Post not found");
    }
  } catch (e) {
    res.send("Some error with fetching post");
  }
});

// Add Post
router.post("/", async (req, res) => {
  try {
    await db.transaction(async (trx) => {
      const postData = req.body;
      const visible = postData.visibility;
      const postMedia = postData.media;
      delete postData.visibility;
      delete postData.media;

      const addPost = await db("Posts").insert(postData, "post_id");

      // eslint-disable-next-line no-restricted-syntax
      for (const media of postMedia) {
        media.post_id = addPost[0];
      }
      await db("PostMedia").insert(postMedia);

      const addVisibility = await db("CurrentPostVisible").insert({
        visibility_id: visible,
        post_id: addPost[0].postId,
      });
    });
    res.send("Post Added");
  } catch (error) {
    res.send(error);
  }
});

// Update Post
router.put("/:postid", async (req, res) => {
  try {
    await db.transaction(async (trx) => {
      const postData = req.body;
      const visible = postData.visibility;
      const postMedia = postData.media;
      delete postData.visibility;
      delete postData.media;

      const updatePost = await db("Posts")
        .update(postData, "post_id")
        .where("post_id", req.params.postid);

      await db("PostMedia").where("post_id", req.params.postid).delete();
      // eslint-disable-next-line no-restricted-syntax
      for (const media of postMedia) {
        media.post_id = updatePost[0];
      }
      await db("PostMedia").insert(postMedia);

      const addVisibility = await db("CurrentPostVisible")
        .update({
          visibility_id: visible,
          post_id: updatePost[0].postId,
        })
        .where("post_id", req.params.postid);
    });
    res.send("Post Updated");
  } catch (error) {
    res.send("error");
  }
});

// Delete Post
router.delete("/:postid", async (req, res) => {
  const postId = req.params.postid;

  try {
    const deletePost = await db
      .from("Posts")
      .where("post_id", postId)
      .delete()
      .returning("user_id");

    if (deletePost && Object.keys(deletePost).length) {
      res.send("Post Deleted");
    } else {
      res.send("Post Deleting");
    }
  } catch (error) {
    res.send("Post deleting error");
  }
});

// Get Comments
router.get("/:postid/comments", async (req, res) => {
  try {
    const postId = req.params.postid;
    const comments = await db
      .select(
        "Users.user_id",
        "Users.username",
        "Users.name",
        "Users.avatar",
        "Comments.*"
      )
      .from("Comments")
      .join("Users", "Comments.user_id", "=", "Users.user_id")
      .where("post_id", postId);
    if (comments && Object.keys(comments).length) {
      res.send(comments);
    } else {
      res.send("Comments not found");
    }
  } catch (e) {
    res.send("Some error with fetching comments");
  }
});

// Add Comment
router.post("/:postid/comments", async (req, res) => {
  try {
    const commData = req.body;
    const comment = await db("Comments").insert(commData, "comment_id");
    if (comment && Object.keys(comment).length) {
      res.send(comment);
    } else {
      res.send("Comment not found");
    }
  } catch (e) {
    res.send(e);
  }
});

// Update Comment
router.put("/:postid/comments/:commentid", async (req, res) => {
  try {
    const commData = req.body;
    const commId = req.params.commentid;
    const comment = await db("Comments")
      .update(commData, "comment_id")
      .where("comment_id", commId);
    if (comment && Object.keys(comment).length) {
      res.send("Comment was updated");
    } else {
      res.send("Comment not found");
    }
  } catch (e) {
    res.send(e);
  }
});

// Delete Comment
router.delete("/:postid/comments/:commentid", async (req, res) => {
  try {
    const commId = req.params.commentid;
    const comment = await db("Comments")
      .where("comment_id", commId)
      .delete()
      .returning("comment_id");
    if (comment && Object.keys(comment).length) {
      res.send("Comment was deleted");
    } else {
      res.send("Comment not found");
    }
  } catch (e) {
    res.send(e);
  }
});

// Get All Users That Liked Post
router.get("/:postid/likes", async (req, res) => {
  try {
    const postId = req.params.postid;
    const likes = await db
      .select("Users.username", "Users.name", "Users.avatar")
      .from("Users")
      .join("Likes", "Users.user_id", "=", "Likes.user_id")
      .where("post_id", postId);
    if (likes && Object.keys(likes).length) {
      res.send(likes);
    } else {
      res.send("Users did not found");
    }
  } catch (e) {
    res.send(`Errors with getting users ${e}`);
  }
});

// Add Like
router.post("/:postid/likes", async (req, res) => {
  try {
    const userId = req.body;
    const postId = req.params.postid;
    const addLike = await db("Likes").insert(
      { user_id: userId.user_id, post_id: postId },
      "like_id"
    );
    if (addLike && Object.keys(addLike).length) {
      res.send("Liked");
    } else {
      res.send("Post wasn`t liked");
    }
  } catch (e) {
    res.send(`Errors with liking ${e}`);
  }
});

// Delete Like
router.delete("/:postid/likes", async (req, res) => {
  try {
    const userId = req.body;
    const postId = req.params.postid;
    const deleteLike = await db("Likes")
      .where({ user_id: userId.user_id, post_id: postId })
      .delete()
      .returning("like_id");
    if (deleteLike && Object.keys(deleteLike).length) {
      res.send("Unliked");
    } else {
      res.send("Post wasn`t unliked");
    }
  } catch (e) {
    res.send(`Errors with unliking ${e}`);
  }
});

module.exports = router;
