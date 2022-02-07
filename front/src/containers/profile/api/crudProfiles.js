import { apiClient } from "../../../config/axios";

export const getAllProfiles = async () => apiClient.get("/profiles");

export const getProfile = async (id) => apiClient.get(`/profiles/${id}`);
