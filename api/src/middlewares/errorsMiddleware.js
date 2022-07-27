// eslint-disable-next-line no-unused-vars
const UnauthorizedException = require("../errors/UnauthorizedException");
const ForbiddenException = require("../errors/ForbiddenException");
const UnprocessableEntityException = require("../errors/UnprocessableEntityException");

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
  if (err instanceof UnprocessableEntityException) {
    return res.status(422).send({ error: err.msg });
  }

  res.status(500).send("Something went wrong, on no!");
};
