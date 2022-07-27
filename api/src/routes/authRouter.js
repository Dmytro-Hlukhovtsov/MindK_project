const router = require("express").Router();
const passport = require("passport");
const asyncHandler = require("../services/asyncHandler");
const authService = require("../services/auth/index");
const UnauthorizedException = require("../errors/UnauthorizedException");
const validationMiddleware = require("../middlewares/validationMiddleware");

router.post(
  "/refresh",
  asyncHandler(async (req, res) => {
    const { accessToken, refreshToken } = await authService.refresh(
      req.body.refreshToken
    );
    if (accessToken) {
      res.send({
        accessToken,
        refreshToken,
        success: true,
      });
    } else {
      throw new UnauthorizedException("");
    }
  })
);

router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    return res.send({
      success: true,
    });
  })
);
router.post(
  "/google",
  passport.authenticate("google-token", { session: false }),
  asyncHandler(async (req, res) => {
    const { accessToken, refreshToken } = await authService.authorizeById(
      req.user.id
    );
    if (accessToken) {
      return res.send({
        accessToken,
        refreshToken,
        success: true,
      });
    }
    throw new UnauthorizedException("");
  })
);

router.post(
  "/facebook",
  passport.authenticate("facebook-token", { session: false }),
  asyncHandler(async (req, res) => {
    const { accessToken, refreshToken } = await authService.authorizeById(
      req.user.id
    );
    if (accessToken) {
      return res.send({
        accessToken,
        refreshToken,
        success: true,
      });
    }
    throw new UnauthorizedException("");
  })
);

router.post(
  "/login",

  validationMiddleware({
    signinEmail: ["required", "email"],
    signinPassword: ["required", "min:6"],
  }),
  (req, res, next) =>
    passport.authenticate("local", async (error, user, info) => {
      if (user) {
        console.log("user", user);
        const { accessToken, refreshToken } = await authService.authorizeById(
          user.user_id
        );
        console.log("token", accessToken);
        if (accessToken) {
          return res.send({
            accessToken,
            refreshToken,
            success: true,
          });
        }
      }
      if (info) {
        return res.send({ error: info.message });
      }

      return next();
    })(req, res, next)
);

router.post(
  "/registry",
  validationMiddleware({
    username: ["required", "min:6", "unique: Users, username"],
    signupEmail: ["required", "email", `unique: Users, email`],
    signupPassword: ["required", "min:6"],
  }),
  asyncHandler(async (req, res) => {
    const id = await authService.registry(req.body);
    if (id) {
      const { accessToken, refreshToken } = await authService.authorizeById(
        id[0]
      );
      if (accessToken) {
        return res.send({
          accessToken,
          refreshToken,
          success: true,
        });
      }
    }
  })
);

module.exports = router;
