"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { BiUser } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  mergeAndSaveCart,
  fetchCartFromDatabase,
} from "../../../../../app/redux/slices/cartSlice";
import { login } from "../../../../../services/authService";
import { ErrorHandler } from "../../../../../utils/ErrorHandler";
import useToast from "../../../../../hooks/useToast";
import { RoleManager } from "@/utils/role";
import Cookies from "js-cookie";
import { AppDispatch, RootState } from "../../../../../app/redux/store";
import FormField from "./FormField";
import { schema, FormValues } from "./fromschema";
import { Phone } from "lucide-react";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { showSuccess, showError } = useToast();

  const guestCart = useSelector((state: RootState) => state.cart.items);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log("Submitting login data:", data);
      const user = await login(data, dispatch);

      dispatch(setUser(user));

      await dispatch(fetchCartFromDatabase(user._id));

      await dispatch(mergeAndSaveCart(guestCart));

      Cookies.set("user", JSON.stringify({id:user._id ,username:user.username,firstname:user.firstname
        ,lastname:user.lastname,phoneNumber:user.phoneNumber,address:user.address
      }));
      Cookies.set("role", user.role);
      showSuccess("ورود با موفقیت انجام شد!");

      const role = await RoleManager(data);
      if (role === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (role === "USER") {
        router.push("/dashboard/user");
      } else {
        throw new Error("No role assigned for the user.");
      }
    } catch (error) {
      console.error("Error caught in onSubmit:", error);
      ErrorHandler(error);
      showError("ورود با خطا مواجه شد. لطفا مجددا تلاش کنید.");
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

export default LoginPage;
