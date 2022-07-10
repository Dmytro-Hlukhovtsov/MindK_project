const db = require("../db");

module.exports = {
  checkRules: async (resource, action, possesions, role) =>
    db
      .select(
        "Actions.name as action",
        "Possesions.name as possesions",
        "Resources.name as resource",
        "Roles.name as role"
      )
      .from("Rules")
      .join("Actions", "Actions.action_id", "=", "Rules.action_id")
      .join("Possesions", "Possesions.possesion_id", "=", "Rules.possesion_id")
      .join("Resources", "Resources.resource_id", "=", "Rules.resource_id")
      .join("Roles", "Roles.role_id", "=", "Rules.role_id")
      .where({
        "Actions.name": action,
        "Possesions.name": possesions,
        "Resources.name": resource,
        "Roles.name": role,
      }),
  getUserRole: async (id) =>
    db
      .select("Roles.name")
      .first()
      .from("UserRoles")
      .join("Roles", "UserRoles.role_id", "=", "Roles.role_id")
      .join("Users", "Users.user_id", "=", "UserRoles.user_id")
      .where("UserRoles.user_id", id),
};
