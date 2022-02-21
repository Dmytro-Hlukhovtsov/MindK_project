const router = require("express").Router();
const passport = require("passport");
const asyncHandler = require("../services/asyncHandler");
const authService = require("../services/auth/index");
const UnauthorizedException = require("../errors/UnauthorizedException");

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

module.exports = router;
