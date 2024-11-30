"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BiUser } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from "next/navigation";



const schema = z.object({
  username: z.string().nonempty('نام کاربری الزامی است'),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد').nonempty('رمز عبور الزامی است'),
});

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch("/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
      
      console.log("Login successful");
      router.push("/admin/dashboard");  
    } catch (error) {
      setErrorMessage("نام کاربری یا رمز عبور اشتباه است");
      console.error(error);
    }
  };


  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center bg-gray-50">
      <form
        className="w-full max-w-md p-8 bg-white shadow-md rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col justify-center items-center mt-10 mb-12">
          <BiUser className="text-7xl border border-gray-400 px-1 rounded-full" />
          <h1 className='mt-6 text-3xl'>ورود</h1>
        </div>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}        

        <div className="flex my-8 mx-4 md:mx-2 border-b-2 border-gray-700 hover:border-green-800">
          <label className="self-center">نام کاربری</label>
          <input
            {...register('username')}
            className="w-full py-3 pl-5 md:pl-20 pr-2 border-0 focus:outline-none"
            type="text"
          />
          <AiOutlineMail className='mt-4 text-2xl'/>
        </div>
        {errors.username && (
          <p className="text-red-500 text-sm mx-4 md:mx-2">{errors.username.message}</p>
        )}

        <div className="flex items-center my-8 mx-4 md:mx-2 border-b-2 border-gray-700 hover:border-green-800">
          <label className="self-center w-full">رمز عبور</label>
          <div className="relative w-full">
            <input
              {...register('password')}
              className="w-full py-3 pl-2 md:pl-8 border-0 focus:outline-none"
              type={showPassword ? 'text' : 'password'}
            />
            <button
              type="button"
              className="absolute left-0 top-4 text-2xl"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mx-4 md:mx-2">{errors.password.message}</p>
        )}

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            ورود
          </button>
        </div>
        <div className="flex gap-48 justify-center items-center mt-4">
        <span className='flex gap-2 items-center'><input type="checkbox" /><p>فراموشی کلمه عبور</p></span>
       <Link href="/admin/auth/signup">ثبت نام</Link>
       </div>
      </form>
    </div>
  );
};

export default Login;

