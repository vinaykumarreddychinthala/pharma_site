'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const shortId = orderId ? orderId.slice(0, 8).toUpperCase() : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-20 h-20" strokeWidth={1.5} />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">Payment Successful!</h1>
        <p className="text-gray-500 mb-6 leading-relaxed">
          Thank you for your purchase. Your order has been confirmed and will be
          processed shortly.
        </p>

        {shortId && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-8">
            <p className="text-sm text-gray-500">Order Reference</p>
            <p className="text-lg font-bold text-green-700 tracking-widest mt-1">
              #{shortId}
            </p>
          </div>
        )}

        <p className="text-sm text-gray-400 mb-8">
          A confirmation email has been sent to your inbox. If you have any
          questions, please contact our support team.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
