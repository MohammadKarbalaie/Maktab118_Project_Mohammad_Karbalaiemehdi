'use client'
import React from "react";
import Cookies from "js-cookie";

function PersonalInfo() {

  const Auth = Cookies.get("user");
  const user = Auth ? JSON.parse(Auth) : undefined;

  if (!user) {
    return <div>در حال بارگذاری اطلاعات کاربر...</div>;
  }

  return (
    <div className="bg-white p-5 shadow rounded-lg mb-4">
      <h2 className="text-lg font-semibold">اطلاعات شخصی</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label>نام:</label>
          <div>{user.firstname}</div>
        </div>
        <div>
          <label>نام خانوادگی:</label>
          <div>{user.lastname}</div>
        </div>
        <div>
          <label>نام کاربری:</label>
          <div>{user.username}</div>
        </div>
        <div>
          <label>شماره تلفن:</label>
          <div>{user.phoneNumber}</div>
        </div>
        <div>
          <label>آدرس:</label>
          <div>{user.address}</div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;

