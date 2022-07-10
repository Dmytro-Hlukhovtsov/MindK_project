const ForbiddenException = require("../errors/ForbiddenException");
const userService = require("../services/store/profiles.service");
const aclService = require("../services/store/acl.service");

module.exports = (rule) => async (req, res, next) => {
  const rules = Array.isArray(rule) ? rule : [rule];
  let isAllow = false;
  console.log(rules);
  const user = await userService.getProfileById(req.auth.user_id);
  if (user) {
    const userRole = await aclService.getUserRole(user.user_id);
    if (userRole) {
      if (userRole.name === "admin") {
        isAllow = true;
      }
      // eslint-disable-next-line no-restricted-syntax
      for await (const checkRule of rules) {
        const permissions = await aclService.checkRules(
          checkRule.resource,
          checkRule.action,
          checkRule.possession,
          userRole.name
        );
        console.log(permissions);
        if (permissions && permissions.length !== 0) {
          if (permissions[0].possesions === "any") {
            console.log("hello");
            isAllow = true;
          } else {
            const resource = await checkRule.getResource(req);
            if (checkRule.isOwn(resource, user.user_id)) {
              isAllow = true;
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
