import { apiClient } from "../../../config/axios";

export const getAllPosts = async () => apiClient.get("/posts");

export const getOnePost = async (id) => apiClient.get(`/posts/${id}`);
