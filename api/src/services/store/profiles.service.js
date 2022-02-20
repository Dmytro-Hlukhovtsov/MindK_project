const db = require("../db");

module.exports = {
  getAllProfiles: async (limit, offset) =>
    db
      .select("user_id", "username", "name", "email", "avatar")
      .from("Users")
      .limit(limit)
      .offset(offset),
  getProfileById: async (userid) =>
    db
      .select(
        "Users.*",
        "set1.visibility_id as emailsett",
        "set2.visibility_id as phonesett",
        "set3.visibility_id as universitysett"
      )
      .from("Users")
      .leftJoin(
        "CurrentFieldVisible as cfv",
        "Users.user_id",
        "=",
        "cfv.user_id"
      )
      .as("settings")
      .leftJoin(
        "Visibility as set1",
        "cfv.email_visible",
        "=",
        "set1.visibility_id"
      )
      .leftJoin(
        "Visibility as set2",
        "cfv.phone_visible",
        "=",
        "set2.visibility_id"
      )
      .leftJoin(
        "Visibility as set3",
        "cfv.university_visible",
        "=",
        "set3.visibility_id"
      )

      .where("Users.user_id", userid),
  getUniversitiesForProfile: async (userid) =>
    db
      .select("University.name")
      .from("University")
      .join(
        "UniversityUsers",
        "University.university_id",
        "=",
        "UniversityUsers.university_id"
      )
      .leftJoin("Users", "UniversityUsers.user_id", "=", "Users.user_id")
      .where("Users.user_id", userid),
  addProfile: async (userInfo) => db("Users").insert(userInfo),
  updateProfile: async (user, userVisibility, userId) =>
    db.transaction(async () => {
      await db("Users").where("user_id", userId).update(user);
      await db("CurrentFieldVisible").where("user_id", userId).update({
        email_visible: userVisibility.emailVisibility,
        phone_visible: userVisibility.phoneVisibility,
      });
    }),
  deleteProfile: async (userId) =>
    db.from("Users").where("user_id", userId).delete().returning("username"),
  getByEmailOrPhone: async (search) =>
    db
      .select()
      .first()
      .from("Users")
      .where("email", search)
      .orWhere("phone", search),
};
