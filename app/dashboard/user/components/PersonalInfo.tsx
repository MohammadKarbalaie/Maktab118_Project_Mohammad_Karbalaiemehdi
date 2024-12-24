'use client'
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store"; // مسیر مربوط به تعریف store شما



function Page() {
  const user = useSelector((state: RootState) => state.user); // فرض بر این است که اطلاعات کاربر در userSlice ذخیره می‌شود

  if (!user) {
    return <div>در حال بارگذاری اطلاعات کاربر...</div>; // نمایش پیام بارگذاری در صورت عدم وجود اطلاعات کاربر
  }

  return (
    <div className="bg-white p-5 shadow rounded-lg mb-4">
      <h2 className="text-lg font-semibold">اطلاعات شخصی</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label>نام:</label>
          <div>{user.firstname}</div> {/* نام کاربر */}
        </div>
        <div>
          <label>نام خانوادگی:</label>
          <div>{user.lastname}</div> {/* نام خانوادگی کاربر */}
        </div>
        <div>
          <label>نام کاربری:</label>
          <div>{user.username}</div> {/* نام کاربری */}
        </div>
        <div>
          <label>شماره تلفن:</label>
          <div>{user.phoneNumber}</div> {/* شماره تلفن */}
        </div>
        <div>
          <label>آدرس:</label>
          <div>{user.address}</div> {/* آدرس */}
        </div>
      </div>
    </div>
  );
}

export default Page;



