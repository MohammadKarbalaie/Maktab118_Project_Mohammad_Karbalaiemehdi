export interface LoginRequest {
    username: string;
    password: string;
  }
  
 export interface LoginResponse {
    token: {
      accessToken: string;
      refreshToken: string;
    };
  }