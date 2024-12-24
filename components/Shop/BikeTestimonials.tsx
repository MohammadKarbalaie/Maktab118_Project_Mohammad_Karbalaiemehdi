/* eslint-disable @next/next/no-img-element */
import React from 'react';

type Testimonial = {
  id: number;
  name: string;
  message: string;
  product: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'محمد اکبری',
    message: 'دوچرخه‌ای که از اینجا خریدم بی‌نظیر بود، خیلی راحت و سبک!',
    product: 'دوچرخه کوهستان',
    image: '/assets/1696230027.png',
  },
  {
    id: 2,
    name: 'زهرا کریمی',
    message: 'کلاه ایمنی خیلی باکیفیتی بود، خیالم راحت‌تره.',
    product: 'کلاه ایمنی دوچرخه',
    image: '/assets/1696229969.png',
  },
  {
    id: 3,
    name: 'علی جعفری',
    message: 'چراغ‌های جلوی دوچرخه خیلی روشن و مقاوم بودن.',
    product: 'چراغ جلو دوچرخه',
    image: '/assets/1696229994.png',
  },
];

const BikeTestimonials = () => {
  return (
    <div className="bg-gray-200 mb-6 py-12">
      <h2 className="text-center text-3xl font-bold text-blue-800 mb-8">
        نظرات مشتریان درباره محصولات ما
      </h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 mx-auto rounded-full mb-4 border-2 border-blue-600"
            />
            <h3 className="text-lg font-bold text-blue-700">{testimonial.name}</h3>
            <p className="text-sm text-blue-500 mt-2">{testimonial.product}</p>
            <p className="text-gray-600 mt-4">{testimonial.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BikeTestimonials;
