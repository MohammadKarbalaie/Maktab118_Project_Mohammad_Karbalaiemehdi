/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import DatePicker, {
  DayValue,
} from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { persianLocale } from "../../utils/persianLocale";
import { getUserFromCookie, isUserLoggedIn, UserData } from "../../utils/cookieUtils";

function CheckoutPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("credit-card");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("dhl");
  const [user, setUser] = useState<UserData | null>(null);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = getUserFromCookie();
    setUser(loggedInUser);
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  );

  const [selectedDeliveryDate, setSelectedDeliveryDate] =
    useState<DayValue>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeliveryDate) {
      alert("لطفاً تاریخ تحویل را انتخاب کنید");
      return;
    }
    if (!isUserLoggedIn()) {
      alert("لطفاً وارد حساب کاربری خود شوید");
      router.push("/auth/login");
      return;
    }

    const orderData = {
      user: user?._id,
      products: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.cartQuantity,
        price: item.price,
      })),
      totalPrice: totalPrice,
      deliveryDate: new Date(
        selectedDeliveryDate.year,
        selectedDeliveryDate.month - 1,
        selectedDeliveryDate.day
      ).toISOString(),
    };

    localStorage.setItem("pendingOrder", JSON.stringify(orderData));
    router.push("/getway");
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-screen-xl px-4 2xl:px-0"
      >
        <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
          <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
            <span className="w-full flex gap-4 items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
              <AiOutlineCheckCircle />
              سبد خرید
            </span>
          </li>

          <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
            <span className="w-full flex gap-4 items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
              <AiOutlineCheckCircle />
              پرداخت
            </span>
          </li>

          <li className="flex gap-4 shrink-0 items-center">
            <AiOutlineCheckCircle />
            خلاصه سفارش
          </li>
        </ol>

        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                جزئیات ارسال
              </h2>

              <div className="flex flex-col gap-4 sm:grid-cols-2">
                <div className="flex gap-2">
                  <div className="w-full">
                    <label
                      htmlFor="your_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      نام
                    </label>
                    <input
                      type="text"
                      id="your_name"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="نام"
                      defaultValue={user?.firstname || ''}
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="your_lastname"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      نام خانوادگی
                    </label>
                    <input
                      type="text"
                      id="your_lastname"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="نام خانوادگی"
                      defaultValue={user?.lastname || ''}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-full">
                    <label
                      htmlFor="your_username"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      نام کاربری
                    </label>
                    <input
                      type="text"
                      id="your_username"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="نام کاربری"
                      defaultValue={user?.username || ''}
                    />
                  </div>
                  <div className="relative w-full">
                    <button
                      type="button"
                      id="dropdown-button"
                      className="absolute flex-shrink-0 z-10 -right-[0px] border border-gray-700 top-[28px] inline-flex items-center py-[10px] px-4 text-sm font-medium text-center text-white justify-center bg-gray-900 rounded-s-lg focus:outline-none"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg"
                        alt="پرچم ایران"
                        className="w-6 h-4 mr-2"
                      />
                      +98
                    </button>
                    <div className="relative">
                      <label
                        htmlFor="phone-number"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        شماره تلفن
                      </label>
                      <input
                        type="text"
                        id="phone-number"
                        className="block w-full px-[100px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        placeholder="شماره تلفن خود را وارد کنید"
                        defaultValue={user?.phoneNumber || ''}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[770px]">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    آدرس
                  </label>
                  <textarea
                    id="address"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="آدرس"
                    defaultValue={user?.address || ''}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                تاریخ تحویل
              </h3>
              <DatePicker
                value={selectedDeliveryDate}
                onChange={setSelectedDeliveryDate}
                inputPlaceholder="انتخاب تاریخ تحویل"
                shouldHighlightWeekends
                locale={persianLocale}
                inputClassName="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-lg text-gray-900"
              />
            </div>

            <div className="flex items-start justify-between">
              <div className="space-y-4 ">
                <h3 className="text-xl w-40 font-semibold text-gray-900 dark:text-white">
                  درگاه پرداخت
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 w-80">
                  <div className="rounded-lg border w-72 border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center full">
                        <input
                          id="credit-card"
                          aria-describedby="credit-card-text"
                          type="radio"
                          name="payment-method"
                          value="credit-card"
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                          checked={selectedPaymentMethod === "credit-card"}
                          onChange={() =>
                            setSelectedPaymentMethod("credit-card")
                          }
                        />
                      </div>

                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="credit-card"
                          className="font-medium leading-none text-gray-900 dark:text-white"
                        >
                          پرداخت الکترونیک سپهر
                        </label>
                        <p
                          id="credit-card-text"
                          className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                        >
                          پرداخت با کارت بانکی
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl w-80 font-semibold text-gray-900 dark:text-white">
                  روش های تحویل
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 w-80">
                  <div className="rounded-lg w-72 border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="dhl"
                          aria-describedby="dhl-text"
                          type="radio"
                          name="delivery-method"
                          value="dhl"
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                          checked={selectedDeliveryMethod === "dhl"}
                          onChange={() => setSelectedDeliveryMethod("dhl")}
                        />
                      </div>

                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="dhl"
                          className="font-medium leading-none text-gray-900 dark:text-white"
                        >
                          پرداخت اینترنتی
                        </label>
                        <p
                          id="dhl-text"
                          className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                        >
                          تحویل 7 روز
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="voucher"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                کارت هدیه، کوپن یا کد تخفیف را وارد کنید
              </label>
              <div className="flex max-w-md items-center gap-4">
                <input
                  type="text"
                  id="voucher"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder=""
                />
                <button
                  type="button"
                  className="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  تایید
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    جمع سبد خرید
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    {totalPrice.toLocaleString()} تومان
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    هزینه ارسال
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    80.000 تومان
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    مالیات
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    3.000 تومان
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    جمع کل
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    {totalPrice.toLocaleString()} تومان
                  </dd>
                </dl>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                نهایی کردن و پرداخت
              </button>

              <p className="text-xl text-center bg-gray-800 rounded-2xl py-6 font-normal text-gray-500 dark:text-gray-400">
                تاریخ تحویل:{" "}
                {selectedDeliveryDate
                  ? `${selectedDeliveryDate.year}/${selectedDeliveryDate.month}/${selectedDeliveryDate.day}`
                  : "تاریخ انتخاب نشده"}
              </p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default CheckoutPage;

