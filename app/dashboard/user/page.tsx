'use client'
import React from 'react';
import { BiUser } from 'react-icons/bi';
import PersonalInfo from './components/PersonalInfo';
import BillingPayments from './components/BillingPayments';
import OrderHistory from './components/OrderHistory';
import LogoutButton from '@/services/LogoutButton'; 
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Link from 'next/link';
const AccountPage = () => {
  const username = useSelector((state: RootState) => state.user.username);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center bg-gray-100 p-4">
        <h1 className="flex gap-2 text-2xl font-bold">
          <BiUser className="text-red-600" />
          {username ? username : 'نام کاربر'}
         
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
