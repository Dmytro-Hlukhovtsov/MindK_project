module.exports = (options) => (req, res, next) => {
  const { logTableName, db } = options;
  db(logTableName)
    .insert({ method: req.method, path: req.url })
    .then(() => next());
};
