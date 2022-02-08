// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  console.log("_______________________");
  console.log(err.name);
  console.log(err);
  res.status(500).send("Something went wrong, on no!");
};
