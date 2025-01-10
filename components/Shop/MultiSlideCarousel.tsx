/* eslint-disable @next/next/no-img-element */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type Product = {
  id: number;
  name: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Mountain Bike",
    image: "/assets/Mountain+Bike.png",
  },
  {
    id: 2,
    name: "Road Bike",
    image: "/assets/Road Bike.png",
  },
  {
    id: 3,
    name: "Hybrid Bike",
    image: "/assets/Hybrid Bike.png",
  },
  {
    id: 4,
    name: "Electric Bike",
    image: "/assets/Electric Bike.png",
  },
  {
    id: 5,
    name: "Kids Bike",
    image: "/assets/KidsBike.png",
  },
];

const MultiSlideCarousel = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-6">
      <Swiper
        modules={[Navigation]}
        loop={true}
        slidesPerView={3}
        spaceBetween={20}
       
        breakpoints={{
          1920: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1028: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          990: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
        className="multiple-slide-carousel"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="flex flex-col items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded-lg shadow-md"
              />
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MultiSlideCarousel;
