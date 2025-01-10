import apiClient, { setAuthHeader } from "@/services/api";
import { urls } from "@/services/urls";
import { LoginRequest, LoginResponse } from "@/types/login";
import Cookies from "js-cookie";

export const RoleManager = async (data: LoginRequest): Promise<string> => {
  try {
    const response = await apiClient.post<LoginResponse>(urls.auth.login, data);
    console.log("Role Response:", response);

    const { accessToken, refreshToken } = response.data.token;

    if (!accessToken || !refreshToken) {
      throw new Error("Access or refresh token is missing.");
    }

    setAuthHeader(accessToken);
    Cookies.set("token", accessToken);

    return response.data.data.user.role;
  } catch (error) {
    console.error("RoleManager failed:", error);
    throw error; 
  }
};
