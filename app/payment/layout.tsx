'use client';

import React, { Suspense } from 'react';


export default function PaymentPage({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
        {children}
    </Suspense>
  );
}
