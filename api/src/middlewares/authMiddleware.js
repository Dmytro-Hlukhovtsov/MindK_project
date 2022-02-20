const jwt = require("jsonwebtoken");
const config = require("../services/config");

const UnauthorizedException = require("../errors/UnauthorizedException");

module.exports = async (req, res, next) => {
  console.log("reqHeaders:", req.headers);
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    let decoded;
    try {
      decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, config.app.appKey, (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    } catch (e) {
      console.log(e);
    }
    if (decoded) {
      req.auth = decoded;
      return next();
    }
  }

  next(new UnauthorizedException());
};
