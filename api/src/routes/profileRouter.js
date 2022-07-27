const router = require("express").Router();
const profileService = require("../services/store/profiles.service");
const postsServices = require("../services/store/posts.service");
const asyncHandler = require("../services/asyncHandler");
const aclMiddleware = require("../middlewares/aclMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");
const auth = require("../middlewares/authMiddleware");

router.use(auth);
// Get All Users
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const users = await profileService.getAllProfiles(limit, offset);

    if (users && Object.keys(users).length) {
      res.send(users);
    } else {
      res.send("Users not found");
    }
  })
);

// Get One User
router.get(
  "/:userid",
  asyncHandler(async (req, res) => {
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
  })
);

// Add User
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const userInfo = req.body;

    const addUser = await profileService.addProfile(userInfo);
    if (addUser && Object.keys(addUser).length) {
      res.send(addUser);
    } else {
      res.send("User Not Created");
    }
  })
);

// Update User
router.put(
  "/:userid",
  aclMiddleware([
    {
      resource: "user",
      action: "update",
      possession: "own",
      getResource: (req) => profileService.getProfileById(req.params.userid),
      isOwn: (resource, userId) => resource.user_id === userId,
    },
  ]),
  validationMiddleware({
    username: [
      "regex:[a-z0-9]",
      "min:5",
      "max:20",
      `unique: Users, username, userid`,
    ],
    phone: ["phone"],
  }),
  asyncHandler(async (req, res) => {
    const { emailVisibility, phoneVisibility, ...user } = req.body;
    const userVisibility = {};
    userVisibility.emailVisibility = emailVisibility;
    userVisibility.phoneVisibility = phoneVisibility;

    delete user.emailVisibility;
    delete user.phoneVisibility;
    console.log("user", user);
    const userId = req.params.userid;
    const updateUser = await profileService.updateProfile(
      user,
      userVisibility,
      userId
    );
    if (updateUser && Object.keys(updateUser).length) {
      res.send("User Updated");
    } else {
      res.send("User Not Updated");
    }
  })
);

// Delete User
router.delete(
  "/:userid",
  asyncHandler(async (req, res) => {
    const userId = req.params.userid;

    const deleteUser = await profileService.deleteProfile(userId);

    if (deleteUser && Object.keys(deleteUser).length) {
      res.send(`${deleteUser} User Deleted`);
    } else {
      res.send("Profile Not Deleting");
    }
  })
);

// Get All User`s posts
router.get(
  "/:userid/posts",
  asyncHandler(async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;
    const userId = req.params.userid;

    const posts = await postsServices.getAllUsersPosts(userId, limit, offset);
    if (posts && Object.keys(posts).length) {
      res.send(posts);
    } else {
      res.send("Posts not found");
    }
  })
);
module.exports = router;
