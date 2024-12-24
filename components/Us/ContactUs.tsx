import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <section className="py-12 px-6 bg-gradient-to-r from-slate-900 via-gray-800 to-gray-700 text-white text-center">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold mb-4">تماس با ما</h2>
        <p className="text-lg leading-relaxed mb-6">
          سوالی دارید یا نیاز به کمک دارید؟ با ما تماس بگیرید و ما در اسرع وقت پاسخ خواهیم داد.
        </p>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="نام شما"
            className="w-full px-4 py-2 rounded-md text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="email"
            placeholder="ایمیل شما"
            className="w-full px-4 py-2 rounded-md text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <textarea
            placeholder="پیام شما"
            rows={4}
            className="w-full px-4 py-2 rounded-md text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-gray-500"
          ></textarea>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-md shadow-md transition-all duration-200"
          >
            ارسال پیام
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
