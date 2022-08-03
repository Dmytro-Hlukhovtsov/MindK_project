const ForbiddenException = require("../errors/ForbiddenException");
const userService = require("../services/store/profiles.service");
const aclService = require("../services/store/acl.service");

module.exports = (rule) => async (req, res, next) => {
  const rules = Array.isArray(rule) ? rule : [rule];
  let isAllow = false;
  const user = await userService.getProfileById(req.auth.user_id);
  if (user) {
    const userRole = await aclService.getUserRole(user.user_id);
    if (userRole) {
      // eslint-disable-next-line no-restricted-syntax
      for await (const checkRule of rules) {
        const permissions = await aclService.checkRules(
          checkRule.resource,
          userRole.name
        );
        if (permissions && permissions.length !== 0) {
          // eslint-disable-next-line no-restricted-syntax
          for await (const permission of permissions) {
            if (
              permission.possesions === "any" &&
              checkRule.action === permission.action
            ) {
              isAllow = true;
            } else if (checkRule.getResource) {
              const resource = await checkRule.getResource(req);
              if (checkRule.isOwn(resource, user.user_id)) {
                isAllow = true;
              }
            }
          }
        }
      }
    }
  }

  if (isAllow) {
    return next();
  }

  next(new ForbiddenException());
};
