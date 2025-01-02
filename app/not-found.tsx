/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Link from "next/link";
import { FC, useEffect, useState } from "react";

const NotFoundPage: FC = () => {
  const [text, setText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const textParts = [
    "عه اینجا چیکار میکنی ",
    "چطوری اومدی اینجا .... ؟",
    "چرا اومدی اصلا اینجا ...؟",
    "دنبال چیزی هستی ...؟",
    "عهههههههه ...!!",
    "با دکمه پایین میتونی برگردی صفحه اول ",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setText(textParts[currentIndex]);

      setCurrentIndex((prevIndex) => {
        if (prevIndex + 1 >= textParts.length) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 3000);


    return () => clearInterval(interval); 
  }, [currentIndex, textParts]); 

  return (
    <div className="bg-black h-screen flex flex-col items-center justify-center text-white font-vazirmatn relative overflow-hidden">
      <div className="flex gap-4">
        <div className="relative w-20 h-20 rounded-full animate-shvr bg-white shadow-lg shadow-white">
          <div className="absolute w-8 h-8 bg-black rounded-full top-8 left-7 animate-eye"></div>
        </div>
        <div className="relative w-20 h-20 rounded-full animate-shvr bg-white shadow-lg shadow-white">
          <div className="absolute w-8 h-8 bg-black rounded-full top-8 left-4 animate-eye"></div>
        </div>
      </div>

      <div className="text-center mt-10">
        <h1 className="text-8xl font-extrabold mb-4">404</h1>
        <p className="text-2xl text-cyan-400 whitespace-nowrap">
          {text}
        </p>
      </div>
      <Link href={'/'}>
      <button className="mt-8 py-4 bg-gray-800 px-8 rounded-xl hover:bg-gray-700 transition duration-400">
        منو میگه ها
      </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;

