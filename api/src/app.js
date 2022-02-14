const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./services/db");

// Config
const config = require("./services/config");

const port = config.appPort;

// Routers
const usersRoutes = require("./routes/profileRouter");
const postsRoutes = require("./routes/postsRouter");
const fileRoutes = require("./routes/filesRouter");

// Create App
const app = express();

// Middleware
const logMiddleware = require("./middlewares/logsMiddleware");
const errorsMiddleware = require("./middlewares/errorsMiddleware");

app.use(
  logMiddleware({
    logTableName: "Logs",
    db,
  })
);

// 3-rd party middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/uploads", express.static(`${__dirname}/uploads`));
app.use("/profiles", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/files", fileRoutes);

app.use(errorsMiddleware);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
