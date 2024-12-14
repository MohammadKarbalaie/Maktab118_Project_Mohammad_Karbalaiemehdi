import React, { useEffect, useState } from 'react';
import { removeTokens } from '../lib/tokenManager';
import Cookies from 'js-cookie';
import { TbLogout } from "react-icons/tb";
import { redirect } from 'next/navigation';

const LogoutButton: React.FC = () => {
  const [isBrowser, setIsBrowser] = useState(false);


  useEffect(() => {
    setIsBrowser(true); 
  }, []);

  const handleLogout = () => {
    removeTokens();

    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      redirect('/admin/auth/login');
    }
  };

  if (!isBrowser) {
    return null;
  }

  return (
    <button
      onClick={handleLogout}
      className="hover:text-red-700 transition duration-300"
    >
     <p className='flex gap-4 justify-center 
     items-center mr-3 mt-2 '><TbLogout className='text-xl text-red-500' /> 
     خروج از پنل ادمین</p>
    </button>
  );
};

export default LogoutButton;