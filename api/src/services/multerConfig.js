const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body);
    const userID = req.params.profileid || req.body.user_id;
    let fullPath = "";
    const path = `uploads/users/${userID}`;
    if (req.body.type === "post") {
      fullPath = `${path}/posts`;
    } else {
      fullPath = `${path}/avatar`;
    }
    fs.stat(`src/${fullPath}`, (err) => {
      if (err) {
        fs.mkdirSync(`src/${fullPath}`, { recursive: true });
      }
      cb(null, `src/${fullPath}`);
    });
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${uuidv4()}.${ext}`);
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
