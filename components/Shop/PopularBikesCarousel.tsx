/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";  
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

interface Bike {  
  id: number;  
  name: string;  
  image: string;  
  description: string;  
}  

const bikes: Bike[] = [  
  {  
    id: 1,  
    name: "دوچرخه اورلرد مدل Converse 1.0 V",  
    image: "./1.png",        
    description: "طراحی حرفه ای بدنه و بهره گیری",  
  },  
  {  
    id: 2,  
    name: "دوچرخه ترینکس مدل (۲۰۲۳)",  
    image: "./2.png",  
    description: "دوچرخه ترینکس از جنس آلومینیوم است",  
  },  
  {  
    id: 3,  
    name: "دوچرخه ترینکس مدل (۲۰۲۳) Trinx M1000 Elite",  
    image: "./3.png",  
    description: "دوچرخه ترینکس مدل (2022) Trinx M1000 Elite سایز 27.5، از جمله محصولات TRINX است",  
  },  
];  

const BikeCarousel: React.FC = () => {  
  const [currentIndex, setCurrentIndex] = useState(0);  

  const nextSlide = () => {  
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bikes.length);  
  };  

  const prevSlide = () => {  
    setCurrentIndex((prevIndex) =>  
      prevIndex === 0 ? bikes.length - 1 : prevIndex - 1  
    );  
  };  

  return (  
    <div className="relative w-[1440px] overflow-hidden border">  
      <div className="relative w-full h-[460px]">  
        {bikes.map((bike, index) => (  
          <div  
            key={bike.id}  
            className={`absolute transition-opacity mx-auto px-44 duration-500 ${  
              index === currentIndex ? "opacity-100" : "opacity-0"  
            }`}  
            style={{ width: "100%", height: "100%" }}  
          >  
            <img  
              src={bike.image}  
              alt={bike.name}  
              className="object-cover mx-auto"  
            />  
            <div className="absolute bottom-0 left-0 bg-gray-500 bg-opacity-50 text-white p-4 w-full">  
              <h5 className="text-lg">{bike.name}</h5>  
              <p>{bike.description}</p>  
            </div>  
          </div>  
        ))}  
      </div>  
      <button  
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full"  
        onClick={prevSlide}  
      >  
        <span className="material-icons text-5xl"><BiArrowToLeft/></span>  
      </button>  
      <button  
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full"  
        onClick={nextSlide}  
      >  
        <span className="material-icons text-5xl"><BiArrowToRight/></span>  
      </button>  
    </div>  
  );  
};  

export default BikeCarousel;
