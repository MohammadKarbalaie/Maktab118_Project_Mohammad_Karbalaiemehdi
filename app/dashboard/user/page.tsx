'use client'
import React from 'react';
import { BiUser } from 'react-icons/bi';
import PersonalInfo from './components/PersonalInfo';
import BillingPayments from './components/BillingPayments';
import OrderHistory from './components/OrderHistory';
import LogoutButton from '@/services/LogoutButton'; 
import Link from 'next/link';
import Cookies from "js-cookie";

const AccountPage = () => {
  // const user = useSelector((state: RootState) => state.cart.user);
  // const username = user ? user.username : 'نام کاربر';

  const Auth = Cookies.get("user");
  const user = Auth ? JSON.parse(Auth) : undefined;


  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center bg-gray-100 p-4">
        <h1 className="flex gap-2 text-2xl font-bold">
          <BiUser className="text-red-600" />
          {user ? user.username : "مهمان"}
        </h1>
        <LogoutButton />  
      </header>

      <div className="flex flex-grow">
        <nav className="w-1/4 bg-gray-200 p-4">
          <ul>
            <li className="font-semibold text-red-500">اطلاعات شخصی</li>
            <li>صورت‌حساب و پرداخت‌ها</li>
            <li>تاریخچه سفارش</li>
            <li><Link href={'/'}>بازگشت به فروشگاه</Link></li>
          </ul>
        </nav>

        <main className="flex-grow p-4">
          <PersonalInfo />
          <BillingPayments />
          <OrderHistory />
        </main>
      </div>
    </div>
  );
};

export default AccountPage;

