import { apiClient } from "../../../config/axios";

console.log("sessionStorage: ", sessionStorage);
const accessToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJuYW1lIjoi0JTQvNC40YLRgNC40Lkg0JPQu9GD0YXQvtCy0YbQvtCyIiwiaWF0IjoxNjQ1OTgxOTk2fQ.FAkfpyhRjQ4b5cfqOa2rRRe6Lm1KgaW-0iDJ9uVxxSE";
export const getAllPosts = async () =>
  apiClient.get("/posts", {
    headers: {
      Authorization: `${accessToken}`,
    },
  });

export const getOnePost = async (id) =>
  apiClient.get(`/posts/${id}`, {
    headers: {
      Authorization: `${accessToken}`,
    },
  });
