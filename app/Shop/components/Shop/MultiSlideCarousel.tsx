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
    image: "https://via.placeholder.com/300x200?text=Mountain+Bike",
  },
  {
    id: 2,
    name: "Road Bike",
    image: "https://via.placeholder.com/300x200?text=Road+Bike",
  },
  {
    id: 3,
    name: "Hybrid Bike",
    image: "https://via.placeholder.com/300x200?text=Hybrid+Bike",
  },
  {
    id: 4,
    name: "Electric Bike",
    image: "https://via.placeholder.com/300x200?text=Electric+Bike",
  },
  {
    id: 5,
    name: "Kids Bike",
    image: "https://via.placeholder.com/300x200?text=Kids+Bike",
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
            slidesPerView: 2,
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
                className="w-full h-64 object-cover rounded-lg shadow-md"
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
