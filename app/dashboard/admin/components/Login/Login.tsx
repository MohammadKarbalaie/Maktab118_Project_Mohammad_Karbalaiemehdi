"use client";
import React, { useState } from 'react';  
import { useForm, SubmitHandler } from 'react-hook-form';  
import { zodResolver } from '@hookform/resolvers/zod';  
import { useRouter } from 'next/navigation';  
import { BiUser } from 'react-icons/bi';  
import { AiOutlineMail } from 'react-icons/ai';  
import Link from 'next/link';  
import { login } from '../../../../../services/authService';  
import FormField from './FormField';  
import { schema, FormValues } from '../../components/Login/fromschema';  
import { ErrorHandler } from '../../../../../utils/ErrorHandler';   
import toast from 'react-hot-toast';  
import { RoleManager } from '@/utils/role'; 
import { setUser } from '../../../../../store/userSlice'; 
import { useDispatch } from 'react-redux';

const ADMIN = "ADMIN";  
const USER = "USER";  

const Login = () => {  
  const [showPassword, setShowPassword] = useState(false);  
  const router = useRouter();  
  const dispatch = useDispatch();

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
      // لاگین کردن و ارسال dispatch برای ذخیره اطلاعات کاربر در Redux
      const user = await login(data, dispatch);  // login به روز شده برای برگرداندن user

      toast.success('ورود با موفقیت انجام شد!', {  
        position: 'top-right',  
        style: { backgroundColor: 'green', color: 'white' }  
      });  

      dispatch(setUser(user));  

      const role = await RoleManager(data); 
      if (role === ADMIN) {  
        router.push('/dashboard/admin');  
      } else if (role === USER) {  
        router.push('/dashboard/user');  
      } else {  
        console.log("No role assigned:", data);  
      }  
    } catch (error) {  
      ErrorHandler(error);  
    }  
  };  

  return (  
    <div className="h-screen overflow-hidden flex justify-center items-center bg-gray-50">  
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
          <Link href="/auth/signup">ثبت نام</Link>  
        </div>  
      </form>  
    </div>  
  );  
};  

export default Login;
