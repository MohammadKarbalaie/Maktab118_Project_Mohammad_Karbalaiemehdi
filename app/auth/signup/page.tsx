/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { signup } from "@/services/authService";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { ErrorHandler } from '@/utils/ErrorHandler';

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
    confirmPassword: z
      .string()
      .min(6, "تکرار رمز عبور باید حداقل ۶ کاراکتر باشد")
      .nonempty("تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن مطابقت ندارند",
    path: ["confirmPassword"],
  });

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();  

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    const { confirmPassword, ...formData } = data;
    try {
      await signup(formData);
      toast.success("ورود با موفقیت انجام شد!", {
        position: "top-right",
        style: { backgroundColor: "green", color: "white" },
      });
      router.push('/auth/login');
    } catch (error) {
      ErrorHandler(error);
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
            {errors.firstname?.message && (
              <p className="text-red-500 text-sm">{String(errors.firstname.message)}</p>
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
            {errors.lastname?.message && (
              <p className="text-red-500 text-sm">{String(errors.lastname.message)}</p>
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
          {errors.username?.message && (
            <p className="text-red-500 text-sm">{String(errors.username.message)}</p>
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
          {errors.phoneNumber?.message && (
            <p className="text-red-500 text-sm">{String(errors.phoneNumber.message)}</p>
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
          {errors.address?.message && (
            <p className="text-red-500 text-sm">{String(errors.address.message)}</p>
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
          {errors.password?.message && (
            <p className="text-red-500 text-sm">{String(errors.password.message)}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">تکرار رمز عبور</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500 text-sm">{String(errors.confirmPassword.message)}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800`}
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
