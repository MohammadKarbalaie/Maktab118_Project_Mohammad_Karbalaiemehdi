"use client";
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { BiUser } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import Link from 'next/link';
import { login } from '../../../adminserver/services/login-services';
import FormField from './FormField';  
import { schema, FormValues } from '../../components/Login/fromschema';
import ErrorHandler from '../../../adminserver/lib/ErrorHandler'; 
import {ErrorResponse} from './Errorresponse'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await login(data);
      setNotification({ message: 'ورود با موفقیت انجام شد!', type: 'success' });
      router.push('/admin/dashboard');
    } catch (error) {
      const serverError = error as ErrorResponse;
      const serverMessage = serverError.response?.data?.message || 'خطایی رخ داده است';
      setNotification({ message: serverMessage, type: 'error' });
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center bg-gray-50">
      {notification && <ErrorHandler message={notification.message} type={notification.type} />}
      <form
        className="w-full max-w-md p-8 bg-white shadow-md rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col justify-center items-center mt-10 mb-12">
          <BiUser className="text-7xl border border-gray-400 px-1 rounded-full" />
          <h1 className="mt-6 text-3xl">ورود</h1>
        </div>

        <FormField
          label="نام کاربری"
          name="username" 
          type="text"
          placeholder="نام کاربری"
          icon={<AiOutlineMail className="text-2xl" />}
          register={register} 
          error={errors.username?.message}
        />

        <FormField
          label="رمز عبور"
          name="password" 
          type="password"
          placeholder="رمز عبور"
          register={register} 
          error={errors.password?.message}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            ورود
          </button>
        </div>
        <div className="flex justify-end items-start mt-4">
          <Link href="/Shop/auth/signup">ثبت نام</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
