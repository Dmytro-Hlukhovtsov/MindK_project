const router = require("express").Router();
const postServices = require("../services/store/posts.service");
const commentServices = require("../services/store/comments.service");
const likesServices = require("../services/store/likes.service");

const asyncHandler = require("../services/asyncHandler");
const upload = require("../services/multerConfig");
const config = require("../services/config");

const removeOldPostImage = require("../services/fileStorage/deleteFile");

const auth = require("../middlewares/authMiddleware");
const aclMiddleware = require("../middlewares/aclMiddleware");

router.use(auth);
// Get All Posts
router.get(
  "/",
  aclMiddleware([
    {
      resource: "post",
      action: "read",
      possession: "any",
    },
  ]),
  asyncHandler(async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;
    const posts = await postServices.getAllPosts(limit, offset);
    if (posts && Object.keys(posts).length) {
      res.send(posts);
    } else {
      res.send("Posts not found");
    }
  })
);

// Get One Post
router.get(
  "/:postid",
  aclMiddleware([
    {
      resource: "post",
      action: "read",
      possession: "any",
    },
  ]),
  asyncHandler(async (req, res) => {
    const postId = req.params.postid;
    const post = await postServices.getOnePost(postId);
    if (post && Object.keys(post).length) {
      res.send(post);
    } else {
      res.send("Post not found");
    }
  })
);

// Add Post
router.post(
  "/",
  aclMiddleware([
    {
      resource: "post",
      action: "create",
      possession: "any",
    },
  ]),
  upload.single("link"),
  asyncHandler(async (req, res) => {
    const postData = req.body;
    const visible = postData.visibility;
    let link = null;
    delete postData.visibility;
    delete postData.link;
    delete postData.type;
    if (req.file) {
      const image = req.file.path;
      link = `${config.app.serverURL}${image.split("src/")[1]}`;
    }

    await postServices.addPostTransaction(postData, link, visible);
    res.send("Post Added");
  })
);

// Update Post
router.put(
  "/:postid",

  aclMiddleware([
    {
      resource: "post",
      action: "update",
      possession: "own",
      getResource: (req) => postServices.getOnePost(req.params.postid),
      isOwn: (resource, userId) => resource[0].user_id === userId,
    },
  ]),
  upload.single("link"),
  asyncHandler(async (req, res) => {
    const postData = req.body;
    console.log(postData);
    const visible = postData.visibility;
    const { oldLink } = postData;
    const postId = req.params.postid;
    let link = null;
    delete postData.visibility;
    delete postData.link;
    delete postData.oldLink;
    delete postData.type;

    if (req.file) {
      const image = req.file.path;
      link = `${config.app.serverURL}${image.split("src/")[1]}`;
      if (oldLink) {
        removeOldPostImage(oldLink);
      }
    }

    await postServices.updatePostTransaction(postData, link, visible, postId);

    res.send("Post Updated");
  })
);

// Delete Post
router.delete(
  "/:postid",
  aclMiddleware([
    {
      resource: "post",
      action: "delete",
      possession: "any",
      getResource: (req) => postServices.getOnePost(req.params.postid),
      isOwn: (resource, userId) => resource.user_id === userId,
    },
  ]),
  asyncHandler(async (req, res) => {
    const postId = req.params.postid;

    const deletePost = await postServices.deletePost(postId);

    if (deletePost && Object.keys(deletePost).length) {
      res.send("Post Deleted");
    } else {
      res.send("Post Deleting");
    }
  })
);

// Get Comments
router.get(
  "/:postid/comments",
  asyncHandler(async (req, res) => {
    const postId = req.params.postid;
    const comments = await commentServices.getAllComments(postId);
    if (comments && Object.keys(comments).length) {
      res.send(comments);
    } else {
      res.send("Comments not found");
    }
  })
);

// Add Comment
router.post(
  "/:postid/comments",
  asyncHandler(async (req, res) => {
    const commData = req.body;
    const comment = await commentServices.addComment(commData);
    if (comment && Object.keys(comment).length) {
      res.send(comment);
    } else {
      res.send("Comment not found");
    }
  })
);

// Update Comment
router.put(
  "/:postid/comments/:commentid",
  asyncHandler(async (req, res) => {
    const commData = req.body;
    const commId = req.params.commentid;
    const comment = await commentServices.updateComment(commData, commId);
    if (comment && Object.keys(comment).length) {
      res.send("Comment was updated");
    } else {
      res.send("Comment not found");
    }
  })
);

// Delete Comment
router.delete(
  "/:postid/comments/:commentid",
  asyncHandler(async (req, res) => {
    const commId = req.params.commentid;
    const comment = await commentServices.deleteComment(commId);
    if (comment && Object.keys(comment).length) {
      res.send("Comment was deleted");
    } else {
      res.send("Comment not found");
    }
  })
);

// Get All Users That Liked Post
router.get(
  "/:postid/likes",
  asyncHandler(async (req, res) => {
    const postId = req.params.postid;
    const likes = await likesServices.getAllUsersLiked(postId);
    if (likes && Object.keys(likes).length) {
      res.send(likes);
    } else {
      res.send("Users did not found");
    }
  })
);

// Add Like
router.post(
  "/:postid/likes",
  asyncHandler(async (req, res) => {
    const userId = req.body;
    const postId = req.params.postid;
    const addLike = await likesServices.addLike(userId, postId);
    if (addLike && Object.keys(addLike).length) {
      res.send("Liked");
    } else {
      res.send("Post wasn`t liked");
    }
  })
);

// Delete Like
router.delete(
  "/:postid/likes",
  asyncHandler(async (req, res) => {
    const userId = req.body;
    const postId = req.params.postid;
    const deleteLike = await likesServices.deleteLike(userId, postId);
    if (deleteLike && Object.keys(deleteLike).length) {
      res.send("Unliked");
    } else {
      res.send("Post wasn`t unliked");
    }
  })
);

module.exports = router;
