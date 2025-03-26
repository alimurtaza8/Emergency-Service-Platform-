'use client';

export const dynamic = "force-dynamic";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AuthClient } from '@dfinity/auth-client';
import Header from '@/components/Header';
import { Suspense } from 'react';

// export default function PaymentSuccessPage() {
const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') || '0';
  const [, setPrincipal] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const handleLogin = async () => {
    setLoadingAuth(true);
    try {
      const authClient = await AuthClient.create();
      await authClient.logout(); // Force logout to ensure fresh authentication
      await authClient.login({
        identityProvider: 'https://identity.ic0.app',
        onSuccess: () => {
          const identity = authClient.getIdentity();
          const userPrincipal = identity.getPrincipal().toText();
          setPrincipal(userPrincipal);
          // Store principal in localStorage for dashboard access
          localStorage.setItem('userPrincipal', userPrincipal);
          router.push('/dashboard'); // Redirect to dashboard after login
        },
        onError: (err) => {
          console.error('Auth error:', err);
          setLoadingAuth(false);
        },
      });
    } catch (err) {
      console.error('Authentication error:', err);
      setLoadingAuth(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-600 mb-2">
          Thank you for your purchase of ${parseFloat(amount).toFixed(2)}.
        </p>
        <p className="text-gray-600 mb-6">
          Your subscription has been activated. Please log in to access your dashboard or download the app.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleLogin}
            disabled={loadingAuth}
            className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
          >
            {loadingAuth ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Authenticating...
              </span>
            ) : (
              'Login with ICP'
            )}
          </button>

          {/* <a
            href="/downloads/app.apk" // Replace with the actual URL or path to your app file
            download
            className="w-full block bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md"
          >
            Download App
          </a> */}

          <div className="mt-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function PaymentSuccessPage() {
  return (
    <div>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
       <PaymentSuccess />
    </Suspense>
     
    </div>
  )
}