import { serialize } from "object-to-formdata";
import { apiClient } from "../../../config/axios";

export const setAvatar = async (id, data) =>
  apiClient.post(`/files/${id}/avatar`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateUserProfile = async (id, data) =>
  apiClient.put(`/profiles/${id}`, data);

export const updatePost = async (data) => {
  const formData = serialize(data, { indices: true });
  apiClient.put(`/posts/${data.post_id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const addPost = async (data) => {
  const formData = serialize(data, { indices: true });
  apiClient.post(`/posts`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
