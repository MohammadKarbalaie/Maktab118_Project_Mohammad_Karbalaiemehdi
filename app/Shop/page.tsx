import React from "react";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Hero from "./components/Shop/Hero";
import MultiSlideCarousel from "./components/Shop/MultiSlideCarousel";
import BikeCarousel from "./components/Shop/PopularBikesCarousel";
import BikeTestimonials from "./components/Shop/BikeTestimonials";

function HomeShop() {
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <Hero />
        <div className="my-10 py-8 px-4 sm:px-8 lg:mx-40 border rounded-lg bg-gray-50">
          <MultiSlideCarousel />
        </div>
        <main className="mx-4 sm:mx-auto lg:mx-[450px] my-8 flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-bold mt-5 mb-6">
            دوچرخه‌های محبوب
          </h1>
          <BikeCarousel />
        </main>
        <div>
        <BikeTestimonials />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeShop;
