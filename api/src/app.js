const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const db = require("./services/db");
require("./services/strategies/google.strategy");
require("./services/strategies/facebook.strategy");
require("./services/strategies/general.strategy");

// Config
const config = require("./services/config");

const { port } = config.app;

// Routers
const usersRoutes = require("./routes/profileRouter");
const postsRoutes = require("./routes/postsRouter");
const fileRoutes = require("./routes/filesRouter");
const authRoutes = require("./routes/authRouter");

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

app.use(passport.initialize());
app.use(cookieParser());

// 3-rd party middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/uploads", express.static(`${__dirname}/uploads`));
app.use("/profiles", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/files", fileRoutes);
app.use("/auth", authRoutes);

app.use(errorsMiddleware);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
