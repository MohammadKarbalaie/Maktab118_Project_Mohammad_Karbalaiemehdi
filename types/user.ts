export type User = {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    phoneNumber: string;
    address: string;
};

export type IUser = {
    username: string;
    password: string;
};

export interface IIUser {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    phoneNumber: number;
    password: string | undefined;
    address: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}


export interface LoginResponse {
    data: {
      user: IIUser; 
    };
    token: {
      accessToken: string;
      refreshToken: string;
    };
  }
  