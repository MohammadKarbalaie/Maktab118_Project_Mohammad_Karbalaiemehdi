/* eslint-disable @next/next/no-img-element */
import React from "react";
import { BiLogoFacebook, BiLogoGithub, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";

function Footer() {
  return (
    <footer className="px-4 divide-y dark:bg-gray-100 dark:text-gray-800">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <a
            rel="noopener noreferrer"
            href="#"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <span className="self-center text-2xl font-semibold">
            <img
            className="h-20"
            src="../Logo1.png"
            width="100"
            alt="Logo"
          />
            </span>
          </a>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-gray-900">
              محصولات
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  ویژگی ها
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  سوالات متداول
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-gray-900">
              دسته بندی ها
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  دوچرخه
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                لوازم جانبی
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase dark:text-gray-900">درباره ما</h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  عمومی
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  مستندات
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  راهنما
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="uppercase dark:text-gray-900">شبکه های اجتماعی</div>
            <div className="flex justify-start space-x-3">
            <BiLogoFacebook className="w-6 h-6 fill-current cursor-pointer  hover:scale-150 transition duration-200"/>
            <BiLogoTwitter className="w-6 h-6 fill-current cursor-pointer   hover:scale-150 transition duration-200"/>
            <BiLogoInstagram className="w-6 h-6 fill-current cursor-pointer hover:scale-150 transition duration-200"/>
            <BiLogoGithub className="w-6 h-6 fill-current cursor-pointer hover:scale-150    transition duration-200"/>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center dark:text-gray-600">
        1403 © کلیه حقوق محفوظ است 
      </div>
    </footer>
  );
}

export default Footer;
