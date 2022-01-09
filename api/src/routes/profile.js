const router = require("express").Router();
const db = require("../services/db");
// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await db
      .select("user_id", "username", "name", "email", "avatar")
      .from("Users");
    if (users && Object.keys(users).length) {
      res.send(users);
    } else {
      res.send("Users not found");
    }
  } catch (e) {
    res.send("Some error with fetching users");
  }
});

// Get One User
router.get("/:userid", async (req, res) => {
  try {
    const user = await db
      .select(
        "Users.*",
        "set1.type as emailsett",
        "set2.type as phonesett",
        "set3.type as universitysett"
      )
      .from("Users")
      .join("CurrentFieldVisible as cfv", "cfv.user_id", "=", "Users.user_id")
      .as("settings")
      .join(
        "Visibility as set1",
        "set1.visibility_id",
        "=",
        "cfv.email_visible"
      )
      .join(
        "Visibility as set2",
        "set2.visibility_id",
        "=",
        "cfv.phone_visible"
      )
      .join(
        "Visibility as set3",
        "set3.visibility_id",
        "=",
        "cfv.university_visible"
      )
      .where("Users.user_id", req.params.userid);
    if (user && user.length) {
      const universities = await db
        .select("University.name")
        .from("University")
        .join(
          "UniversityUsers",
          "University.university_id",
          "=",
          "UniversityUsers.university_id"
        )
        .join("Users", "UniversityUsers.user_id", "=", "Users.user_id")
        .where("Users.user_id", req.params.userid);
      user[0].universities = universities;
      res.send(user);
    } else {
      res.send("User not found");
    }
  } catch (e) {
    res.send("Some error with finding user");
  }
});

// Add User
router.post("/", async (req, res) => {
  const userInfo = req.body;
  try {
    const addUser = await db("Users").insert(userInfo).returning("user_id");
    if (addUser && Object.keys(addUser).length) {
      res.send(addUser);
    } else {
      res.send("User Not Created");
    }
  } catch (e) {
    res.send("Some error with adding data");
  }
});

// Update User
router.put("/:userid", async (req, res) => {
  const user = req.body;
  try {
    const userId = req.params.userid;

    const updateUser = await db("Users")
      .where("user_id", userId)
      .update({
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
      })
      .returning("*");
    if (updateUser && Object.keys(updateUser).length) {
      res.send(updateUser);
    } else {
      res.send("User Not Updated");
    }
  } catch (e) {
    res.send("Something went wrong");
  }
});

// Delete User
router.delete("/:userid", async (req, res) => {
  const userId = req.params.userid;

  try {
    const deleteUser = await db
      .from("Users")
      .where("user_id", userId)
      .delete()
      .returning("user_id");

    if (deleteUser && Object.keys(deleteUser).length) {
      res.send("User Deleted");
    } else {
      res.send("Profile Not Deleting");
    }
  } catch (error) {
    res.send("Data deleting error");
  }
});

// Get All User`s posts
router.get("/:userid/posts", async (req, res) => {
  const userId = req.params.userid;
  try {
    const posts = await db
      .select(
        "Users.user_id",
        "Users.username",
        "Users.name",
        "Users.avatar",
        "Posts.*"
      )
      .from("Users")
      .join("Posts", "Posts.user_id", "=", "Users.user_id")
      .where("Users.user_id", userId);
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
module.exports = router;
