import { serialize } from "object-to-formdata";
import { apiClient } from "../../../config/axios";

const accessToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJuYW1lIjoi0JTQvNC40YLRgNC40Lkg0JPQu9GD0YXQvtCy0YbQvtCyIiwiaWF0IjoxNjQ1OTgxOTk2fQ.FAkfpyhRjQ4b5cfqOa2rRRe6Lm1KgaW-0iDJ9uVxxSE";

export const setAvatar = async (id, data) =>
  apiClient.post(`/files/${id}/avatar`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateUserProfile = async (id, data) =>
  apiClient.put(`/profiles/${id}`, data);

export const updatePost = async (data) => {
  const formData = serialize(data, { indices: true });
  apiClient.put(`/posts/${data.post_id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${accessToken}`,
    },
  });
};

export const addPost = async (data) => {
  const formData = serialize(data, { indices: true });
  apiClient.post(`/posts`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
