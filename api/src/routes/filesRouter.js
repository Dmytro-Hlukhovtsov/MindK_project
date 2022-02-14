const router = require("express").Router();
const upload = require("../services/multerConfig");
const filesServices = require("../services/store/files.service");
const config = require("../services/config");
const asyncHandler = require("../services/asyncHandler");
const removeOldAvatar = require("../services/fileStorage/deleteFile");

router.post(
  "/:profileid/avatar",
  upload.single("user-avatar"),
  asyncHandler(async (req, res) => {
    const userId = req.params.profileid;
    const avatar = req.file.path;
    const link = `${config.serverURL}${avatar.split("src/")[1]}`;
    if (req.body.oldLink) {
      removeOldAvatar(req.body.oldLink);
    }
    const addAvatar = await filesServices.addAvatar(userId, link);
    if (addAvatar && Object.keys(addAvatar).length) {
      res.send("Avatar updated successfully!");
    } else {
      res.send("Avatar updated unsuccessfully!");
    }
  })
);

module.exports = router;
