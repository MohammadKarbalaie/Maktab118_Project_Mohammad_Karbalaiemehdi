import Cookies from 'js-cookie';

export interface UserData {
  _id: string;
  username: string;
  firstname: string;
  password:string;
  role:string
  lastname: string;
  phoneNumber: number;
  address: string;
  createdAt: string 
  updatedAt:string
}

export const getUserFromCookie = (): UserData | null => {
  const userString = Cookies.get('user');
  if (userString) {
    try {
      return JSON.parse(decodeURIComponent(userString));
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      return null;
    }
  }
  return null;
};

export const getAccessToken = (): string | null => {
  return Cookies.get('accessToken') || null;
};

export const isUserLoggedIn = (): boolean => {
  return !!getAccessToken();
};

