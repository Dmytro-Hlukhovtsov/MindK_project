const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const config = require("./services/config");

const usersRoutes = require("./routes/profileRouter");
const postsRoutes = require("./routes/postsRouter");
const fileRoutes = require("./routes/filesRouter");

const port = config.appPort;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(`${__dirname}/uploads`));

app.use("/profiles", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/files", fileRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
