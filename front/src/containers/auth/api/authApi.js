import { apiClient } from "../../../config/axios";

export const registerUser = async (values) =>
  apiClient.post(`/auth/registry`, values);

export const loginUser = async (values) =>
  apiClient.post(`/auth/login`, values);
