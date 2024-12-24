import apiClient, { setAuthHeader } from "@/services/api";  
import { urls } from "@/services/urls";  
import { setTokens } from "./token";  
import Cookies from "js-cookie";
import { LoginRequest, LoginResponse } from "@/types/login";  

export const RoleManager = async (data: LoginRequest): Promise<string> => { // تغییر به Promise<string>  
    try {  
      const response = await apiClient.post<LoginResponse>(urls.auth.login, data);  
     
      console.log('Login Response:', response);  
      console.log('Role Response:', response.data.data.user.role); 
      Cookies.set("Role",response.data.data.user.role) 
  
      const { accessToken, refreshToken } = response.data.token;  
  
      if (!accessToken || !refreshToken) {  
        throw new Error("Access or refresh token is missing.");  
      }  
      setAuthHeader(accessToken)  
      setTokens(accessToken, refreshToken);  
      return response.data.data.user.role;   
    } catch (error) {  
      console.error('Login failed:', error);  
      throw error;  
    }  
};