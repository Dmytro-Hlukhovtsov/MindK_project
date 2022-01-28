const router = require("express").Router();
const upload = require("../services/multerConfig");
const filesServices = require("../services/store/files.service");
const config = require("../services/config");

router.post(
  "/:profileid/avatar",
  upload.single("user-avatar"),
  async (req, res) => {
    const userId = req.params.profileid;
    try {
      const avatar = req.file.path;
      const link = `${config.serverURL}${avatar.split("src/")[1]}`;
      const addAvatar = await filesServices.addAvatar(userId, link);
      if (addAvatar && Object.keys(addAvatar).length) {
        res.send("Avatar updated successfully!");
      } else {
        res.send("Avatar updated unsuccessfully!");
      }
    } catch (e) {
      res.send("Some errors with file uploading");
    }
  }
);

module.exports = router;
