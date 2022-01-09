const express = require("express");
const bodyParser = require("body-parser");

const config = require("./services/config");

const usersRoutes = require("./routes/profile");
const postsRoutes = require("./routes/posts");

const port = config.appPort;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
