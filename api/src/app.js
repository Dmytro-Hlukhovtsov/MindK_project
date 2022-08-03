const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");

require("./services/strategies/google.strategy");
require("./services/strategies/facebook.strategy");
require("./services/strategies/general.strategy");

// Create App
const app = express();

// Sockets
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Config
const config = require("./services/config");

const { port } = config.app;

const commentsHandler = require("./services/sockets/handlers/commentsHandler");

io.on("connection", (socket) => {
  console.log("user connected");

  const { id } = socket.handshake.query;

  // eslint-disable-next-line no-param-reassign
  socket.roomId = id;

  socket.join(id);

  commentsHandler(io, socket);
  socket.on("disconnect", () => {
    // выводим сообщение
    console.log("User disconnected");
    // покидаем комнату
    socket.leave(id);
  });
});
app.set("socketio", io);

// DB
const db = require("./services/db");

// Routers
const usersRoutes = require("./routes/profileRouter");
const postsRoutes = require("./routes/postsRouter");
const fileRoutes = require("./routes/filesRouter");
const authRoutes = require("./routes/authRouter");

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

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
