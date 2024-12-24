/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoginRequest {
    username: string;
    password: string;
  }
  
 export interface LoginResponse {
    [x: string]: any;
    token: {
      accessToken: string;
      refreshToken: string;
    };
    role:string
  }