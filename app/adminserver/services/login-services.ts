import apiClient from '../server';
import { setTokens } from '../lib/tokenManager'; 
import { urls } from '../urls';
import {LoginRequest} from '../type/Login';
import {LoginResponse} from '../type/Login';


export const login = async (data: LoginRequest): Promise<void> => {
  try {
    const response = await apiClient.post<LoginResponse>(urls.auth.login, data);
    console.log('Login Response:', response);

    const { accessToken, refreshToken } = response.data.token;

    if (!accessToken || !refreshToken) {
      throw new Error("Access or refresh token is missing.");
    }

    setTokens(accessToken, refreshToken);
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
