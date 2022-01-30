const router = require("express").Router();
const postServices = require("../services/store/posts.service");
const commentServices = require("../services/store/comments.service");
const likesServices = require("../services/store/likes.service");

// Get All Posts
router.get("/", async (req, res) => {
  try {
    const limit = req.query.limited || 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;
    const posts = await postServices.getAllPosts(limit, offset);
    if (posts && Object.keys(posts).length) {
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
    const post = await postServices.getOnePost(postId);
    if (post && Object.keys(post).length) {
      res.send(post);
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
    const postData = req.body;
    const visible = postData.visibility;
    const postMedia = postData.link;
    delete postData.visibility;
    delete postData.link;
    await postServices.addPostTransaction(postData, postMedia, visible);
    res.send("Post Added");
  } catch (error) {
    res.send(error);
  }
});

// Update Post
router.put("/:postid", async (req, res) => {
  try {
    const postData = req.body;
    const visible = postData.visibility;
    const postMedia = postData.link;
    delete postData.visibility;
    delete postData.link;
    const postId = req.params.postid;

    await postServices.updatePostTransaction(
      postData,
      postMedia,
      visible,
      postId
    );

    res.send("Post Updated");
  } catch (error) {
    res.send(error);
  }
});

// Delete Post
router.delete("/:postid", async (req, res) => {
  const postId = req.params.postid;

  try {
    const deletePost = await postServices.deletePost(postId);

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
    const comments = await commentServices.getAllComments(postId);
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
    const comment = await commentServices.addComment(commData);
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
    const comment = await commentServices.updateComment(commData, commId);
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
    const comment = await commentServices.deleteComment(commId);
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
    const likes = await likesServices.getAllUsersLiked(postId);
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
    const addLike = await likesServices.addLike(userId, postId);
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
    const deleteLike = await likesServices.deleteLike(userId, postId);
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
