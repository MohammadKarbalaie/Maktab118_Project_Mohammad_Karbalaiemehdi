/* eslint-disable @next/next/no-img-element */
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section className="py-12 px-6 bg-gradient-to-r from-gray-700 via-gray-800 to-slate-900 text-white text-center">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold mb-4">درباره ما</h2>
        <p className="text-lg leading-relaxed">
          به فروشگاه دوچرخه‌سواری ما خوش آمدید! ما عاشق دوچرخه‌سواری هستیم و بهترین دوچرخه‌ها و لوازم جانبی را برای همه علاقه‌مندان ارائه می‌دهیم. چه یک دوچرخه‌سوار حرفه‌ای باشید و چه تازه شروع کرده‌اید، ما اینجا هستیم تا به شما در پیدا کردن دوچرخه ایده‌آل کمک کنیم.
        </p>
        <img
          src="/assets/about.png"
          alt="درباره ما"
          className="mx-auto mt-6 rounded-lg shadow-lg h-96"
        />
      </div>
    </section>
  );
};

export default AboutUs;