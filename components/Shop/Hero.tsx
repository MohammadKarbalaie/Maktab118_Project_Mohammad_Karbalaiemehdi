import React from "react";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="py-48 md:py-0 md:h-[820px] relative overflow-hidden bg-gray-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="hidden xl:flex">
            <Image
              src="/hero/hero_bike.png"
              width={765}
              height={480}
              alt={""}
              quality={100}
            />
          </div>
          <div
            className="w-full xl:max-w-[580px] md:h-[820px]
                flex flex-col justify-center items-end"
          >
            <h1 className="font-vazir text-center  text-6xl leading-snug xl:text-right mb-6">
              جایی که <span>دوچرخه سواری شاد</span> آغاز می شود 
            </h1>
            <p
              className="mb-10 text-lg max-w-[508px] mx-auto
                    text-center xl:text-right xl:mx-0"
            >
              فروشگاه ما، تخصصی در ارائه بهترین 
              دوچرخه‌ها و لوازم جانبی، تجربه‌ای شاد
               و پرهیجان از دوچرخه‌سواری را برای
               شما فراهم می‌کند. ورزش دوچرخه‌سواری،
               راهی برای سلامتی و نشاط روزانه است.
            </p>
            <div className="flex items-start gap-4 mx-auto xl:mx-0">
              <Link href="/Shop/product" className="mx-auto md:mx-0">
                <button className="bg-red-500 text-white px-6 py-2 rounded">
                خرید کنید
                </button>
              </Link>
              <Link href="/Shop/product" className="mx-auto md:mx-0 ">
                <button className="bg-black text-white px-6 py-2 rounded">
                دوچرخه های ما
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
