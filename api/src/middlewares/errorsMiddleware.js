// eslint-disable-next-line no-unused-vars
const UnauthorizedException = require("../errors/UnauthorizedException");
const ForbiddenException = require("../errors/ForbiddenException");

module.exports = (err, req, res, next) => {
  console.log("_______________________");
  console.log(err.name);
  console.log(err);

  if (err instanceof UnauthorizedException) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  if (err instanceof ForbiddenException) {
    return res.status(403).send({ error: "Forbidden" });
  }
  res.status(500).send("Something went wrong, on no!");
};
