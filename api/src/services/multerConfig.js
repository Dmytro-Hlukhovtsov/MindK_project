const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `uploads/avatars/${req.params.profileid}`;
    fs.stat(`src/${path}`, (err) => {
      if (err) {
        fs.mkdirSync(`src/${path}`, { recursive: true });
      }
      cb(null, `src/${path}`);
    });
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `avatar.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype &&
    (file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg")
  ) {
    cb(null, true);
  } else {
    cb("Only image files are allowed!", false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
