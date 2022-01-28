const router = require("express").Router();
const profileService = require("../services/store/profiles.service");
const postsServices = require("../services/store/posts.service");

// Get All Users
router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const users = await profileService.getAllProfiles(limit, offset);

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
    const user = await profileService.getProfileById(req.params.userid);
    if (user && user.length) {
      const universities = await profileService.getUniversitiesForProfile(
        req.params.userid
      );
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
    const addUser = await profileService.addProfile(userInfo);
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
  try {
    const user = req.body;
    const userId = req.params.userid;

    const updateUser = await profileService.updateProfile(user, userId);
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
    const deleteUser = await profileService.deleteProfile(userId);

    if (deleteUser && Object.keys(deleteUser).length) {
      res.send(`${deleteUser} User Deleted`);
    } else {
      res.send("Profile Not Deleting");
    }
  } catch (error) {
    res.send("Data deleting error");
  }
});

// Get All User`s posts
router.get("/:userid/posts", async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const offset = (page - 1) * limit;
  const userId = req.params.userid;
  try {
    const posts = await postsServices.getAllUsersPosts(userId, limit, offset);
    if (posts && Object.keys(posts).length) {
      res.send(posts);
    } else {
      res.send("Posts not found");
    }
  } catch (e) {
    res.send("Some error with fetching posts");
  }
});
module.exports = router;
