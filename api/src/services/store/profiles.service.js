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
        "set1.type as emailsett",
        "set2.type as phonesett",
        "set3.type as universitysett"
      )
      .from("Users")
      .join("CurrentFieldVisible as cfv", "cfv.user_id", "=", "Users.user_id")
      .as("settings")
      .leftJoin(
        "Visibility as set1",
        "set1.visibility_id",
        "=",
        "cfv.email_visible"
      )
      .leftJoin(
        "Visibility as set2",
        "set2.visibility_id",
        "=",
        "cfv.phone_visible"
      )
      .leftJoin(
        "Visibility as set3",
        "set3.visibility_id",
        "=",
        "cfv.university_visible"
      )

      .where("Users.user_id", userid),
  getUniversitiesForProfile: (userid) =>
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
  addProfile: (userInfo) => db("Users").insert(userInfo, ["user_id"]),
  updateProfile: (user, userId) =>
    db("Users").where("user_id", userId).update(user).returning("*"),
  deleteProfile: (userId) =>
    db.from("Users").where("user_id", userId).delete().returning("username"),
};
