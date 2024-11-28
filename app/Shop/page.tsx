import React from "react";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Hero from "./components/Shop/Hero";
import MultiSlideCarousel from "./components/Shop/MultiSlideCarousel";
import BikeCarousel from "./components/Shop/PopularBikesCarousel";

function HomeShop() {
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <Hero />
        <div className="my-20 py-8 mx-40 border rounded-lg bg-gray-50">
          <MultiSlideCarousel />
        </div>
        <main className="mx-[450px] my-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold mt-5 mb-6">دوچرخه‌های محبوب</h1>
            <BikeCarousel />
          </main>
      </div>
      <Footer />
    </div>
  );
}

export default HomeShop;
