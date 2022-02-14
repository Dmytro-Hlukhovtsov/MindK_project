import { apiClient } from "../../../config/axios";

export const setAvatar = async (id, data) =>
  apiClient.post(`/files/${id}/avatar`, data);

export const updateUserProfile = async (id, data) =>
  apiClient.put(`/profiles/${id}`, data);

export const updatePost = async (data) =>
  apiClient.put(`/posts/${data.post_id}`, data);

export const addPost = async (data) => apiClient.post(`/posts`, data);
