"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { signup } from "@/services/authService";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';  


const signupSchema = z
  .object({
    firstname: z
      .string()
      .min(2, "نام باید حداقل ۲ کاراکتر باشد")
      .nonempty("نام الزامی است"),
    lastname: z
      .string()
      .min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد")
      .nonempty("نام خانوادگی الزامی است"),
    username: z
      .string()
      .min(4, "بیش از 4 کلمه مورد نیاز است")
      .nonempty("نام کاربری الزامی است"),
    phoneNumber: z
      .string()
      .min(4, "فرمت ایمیل صحیح نیست")
      .nonempty("ایمیل الزامی است"),
    address: z.string().nonempty("آدرس الزامی است"),
    password: z
      .string()
      .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
      .nonempty("رمز عبور الزامی است"),
  
  })


type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const router = useRouter();  
  const onSubmit = async (data: SignupFormData) => {
   try {
    await signup(data);
    toast.success("ورود با موفقیت انجام شد!", {
      position: "top-right",
      style: { backgroundColor: "green", color: "white" },
    });
    router.push('/dashboard/user');
   } catch (error) {
      console.error(error);
      console.log('not created');
      
   }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[900px] max-w-2xl p-8 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">ثبت‌نام</h2>

        <div className="flex items-start justify-between">
          <div className="mb-4">
            <label className="block text-gray-700">نام</label>
            <input
              type="text"
              {...register("firstname")}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.firstname ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm">{errors.firstname.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">نام خانوادگی</label>
            <input
              type="text"
              {...register("lastname")}
              className={`w-[350px] max-w-2xl px-4 py-2 border rounded-lg ${
                errors.lastname ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm">{errors.lastname.message}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">نام کاربری</label>
          <input
            type="text"
            {...register("username")}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700"> تلفن</label>
          <input
            type="text"
            {...register("phoneNumber")}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">آدرس</label>
          <input
            type="text"
            {...register("address")}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">رمز عبور</label>
          <input
            type="password"
            {...register("password")}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800"
        >
          ثبت‌نام
        </button>
        <div className="flex flex-col justify-center items-start mt-4">
          <Link href="/auth/login">اکانت کاربری دارم| ورود</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
