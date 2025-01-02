'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { clearCart } from '../redux/slices/cartSlice';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'failure' | 'cancel'>('processing');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const processPayment = async () => {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const paymentStatus = searchParams.get('status');
      const orderId = searchParams.get('orderId');
      
      if (paymentStatus === 'success' && orderId) {
        setStatus('success');
        dispatch(clearCart());
      } else if (paymentStatus === 'cancel') {
        setStatus('cancel');
      } else {
        setStatus('failure');
      }
    };

    processPayment();
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (status !== 'processing') {
      const timer = setTimeout(() => {
        router.push(`/thank-you?status=${status}`);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-4 bg-blue-100 rounded-full"
          >
            {status === 'success' ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : status === 'processing' ? (
              <CreditCard className="w-12 h-12 text-blue-600 animate-spin" />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" />
            )}
          </motion.div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {status === 'success' ? 'پرداخت موفق' : 
             status === 'processing' ? 'در حال پردازش پرداخت' : 
             status === 'cancel' ? 'انصراف از پرداخت' : 'پرداخت ناموفق'}
          </h2>
          <p className="mt-2 text-gray-600">
            {status === 'success'
              ? 'پرداخت شما با موفقیت انجام شد.'
              : status === 'processing'
              ? 'لطفاً صبر کنید. این فرآیند ممکن است چند لحظه طول بکشد.'
              : status === 'cancel'
              ? 'شما از پرداخت انصراف داده‌اید.'
              : 'متأسفانه پرداخت شما با مشکل مواجه شد.'}
          </p>
        </div>
        <div className="mt-8">
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: status === 'success' ? "100%" : "0%" }}
                transition={{ duration: 4.5 }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                  status === 'success' ? 'bg-green-500' : 
                  status === 'processing' ? 'bg-blue-500' : 
                  'bg-red-500'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

