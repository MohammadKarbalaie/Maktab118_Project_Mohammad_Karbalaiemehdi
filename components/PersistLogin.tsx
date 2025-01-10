"use client"

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, fetchCartFromDatabase } from '../app/redux/slices/cartSlice';
import { IIUser } from '@/types/user';
import Cookies from 'js-cookie';
import { getAccessToken, refreshAccessToken } from "../utils/token";
import { AppDispatch } from '../app/redux/store';

interface PersistLoginProps {
  children: React.ReactNode;
}

const PersistLogin: React.FC<PersistLoginProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = Cookies.get('user');
      const accessToken = getAccessToken();

      if (storedUser && accessToken) {
        try {
          const user: IIUser = JSON.parse(storedUser);
          
          const tokenData = JSON.parse(atob(accessToken.split('.')[1]));
          if (tokenData.exp * 1000 < Date.now()) {
            const newToken = await refreshAccessToken();
            if (!newToken) {
              throw new Error('Failed to refresh token');
            }
          }
          
          dispatch(setUser(user));
          if (user._id) {
            await dispatch(fetchCartFromDatabase(user._id));
          }
        } catch (error) {
          console.error('Error parsing user data or refreshing token:', error);
          Cookies.remove('user');
        }
      }
    };

    initializeAuth();
  }, [dispatch]);

  return <>{children}</>;
};

export default PersistLogin;

