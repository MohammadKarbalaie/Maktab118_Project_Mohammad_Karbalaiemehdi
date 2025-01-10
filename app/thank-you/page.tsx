'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'success' | 'failure' | 'cancel'>('success');
  const dispatch = useDispatch();

  useEffect(() => {
    const paymentStatus = searchParams.get('status');
    if (paymentStatus === 'failure') {
      setStatus('failure');
    } else if (paymentStatus === 'cancel') {
      setStatus('cancel');
    } else {
      setStatus('success');
      dispatch(clearCart());
    }
  }, [searchParams, dispatch]);

  const renderContent = () => {
    switch (status) {
      case 'success':
        return (
          <>
            <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
            <h1 className="mt-4 text-3xl font-bold text-gray-800">با تشکر از خرید شما</h1>
            <p className="mt-2 text-gray-600">سفارش شما با موفقیت ثبت شد.</p>
          </>
        );
      case 'failure':
        return (
          <>
            <XCircle className="w-16 h-16 mx-auto text-red-500" />
            <h1 className="mt-4 text-3xl font-bold text-gray-800">پرداخت ناموفق</h1>
            <p className="mt-2 text-gray-600">متأسفانه پرداخت شما با مشکل مواجه شد.</p>
            <p className="mt-2 text-red-600">نتیجه پرداخت: با خطا مواجه شد</p>
          </>
        );
      case 'cancel':
        return (
          <>
            <AlertTriangle className="w-16 h-16 mx-auto text-yellow-500" />
            <h1 className="mt-4 text-3xl font-bold text-gray-800">انصراف از پرداخت</h1>
            <p className="mt-2 text-gray-600">شما از پرداخت انصراف داده‌اید.</p>
          </>
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-xl max-w-md w-full text-center">
        {renderContent()}
        <Link href="/" className="mt-6 inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
