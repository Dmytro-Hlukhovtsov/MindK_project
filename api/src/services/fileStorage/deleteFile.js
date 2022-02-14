const fs = require("fs");
const config = require("../config");

module.exports = async (path) => {
  const newPath = path.replace(config.serverURL, "src/");
  fs.unlink(newPath, (err) => {
    if (err) console.log(err);
  });
};
