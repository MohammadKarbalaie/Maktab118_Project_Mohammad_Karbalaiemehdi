import { User } from "@/types/user";
import apiClient, { setAuthHeader } from "./api";  
import { urls } from "./urls";  
import { LoginRequest, LoginResponse } from "@/types/login";
import { setTokens } from "@/utils/token";
import { setUser } from "@/store/userSlice";
import toast from "react-hot-toast";
import { Dispatch } from "@reduxjs/toolkit";

export const signup = async (data: User): Promise<void> => {
    try {
      const response = await apiClient.post(urls.auth.signup, data);
      console.log('Signup Response:', response);
  
      const { accessToken, refreshToken } = response.data.token;
  
      if (!accessToken || !refreshToken) {
        throw new Error("Access or refresh token is missing in signup response.");
      }
  
      setTokens(accessToken, refreshToken); 
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };
  

  export const login = async (data: LoginRequest, dispatch: Dispatch): Promise<User> => {
    try {
      const response = await apiClient.post<LoginResponse>(urls.auth.login, data);
      console.log('Login Response:', response);
  
      const { accessToken, refreshToken } = response.data.token;
  
      if (!accessToken || !refreshToken) {
        throw new Error("Access or refresh token is missing.");
      }
  
      setAuthHeader(accessToken);
      setTokens(accessToken, refreshToken);
      const user = response.data.data.user;
  
      dispatch(setUser(user));  
      toast.success('ورود با موفقیت انجام شد!');
  
      return user;   
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('ورود ناموفق بود.');
      throw error;
    }
  };