'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, Building2, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';


// export default function PackagesSelectionPage() {
const PackagesSelection = () => {
  const [selectedType, setSelectedType] = useState<'residential' | 'business' | null>(null);
  const router = useRouter();

  const handleProceed = () => {
    if (!selectedType) return;
    
    // Navigate to the selected package type page
    router.push(`/packages/${selectedType}-packages`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 mt-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Choose Your Package Type</h1>
          <p className="text-lg text-gray-600">
            Select the type of membership plan that best suits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Residential Option */}
          <div 
            className={`
              bg-white rounded-xl shadow-md overflow-hidden border-2 transition-all duration-300 cursor-pointer
              ${selectedType === 'residential' 
                ? 'border-blue-600 shadow-blue-100' 
                : 'border-transparent hover:shadow-lg'}
            `}
            onClick={() => setSelectedType('residential')}
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Residential</h2>
              <p className="text-gray-600 mb-6">
                Perfect for homeowners seeking reliable emergency services for their residence. 
                Get priority access to skilled technicians.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>24/7 emergency service access</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Discounted service rates</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Optimized for individual homes</span>
                </li>
              </ul>
              <Link 
                href="/packages/residential-packages"
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                View Residential Plans
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Business Option */}
          <div 
            className={`
              bg-white rounded-xl shadow-md overflow-hidden border-2 transition-all duration-300 cursor-pointer
              ${selectedType === 'business' 
                ? 'border-blue-600 shadow-blue-100' 
                : 'border-transparent hover:shadow-lg'}
            `}
            onClick={() => setSelectedType('business')}
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Business</h2>
              <p className="text-gray-600 mb-6">
                Designed for businesses that can&apos;t afford downtime. Get premium support 
                and rapid response times for your commercial needs.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Priority commercial response</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Enhanced service level agreements</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Dedicated account manager</span>
                </li>
              </ul>
              <Link 
                href="/packages/business-packages"
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                View Business Plans
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleProceed}
            disabled={!selectedType}
            className={`
              px-8 py-3 rounded-md font-medium flex items-center
              ${selectedType 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
              transition-colors
            `}
          >
            {selectedType ? `Continue to ${selectedType} plans` : 'Select a plan type'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 



export default function PackagesSelectionPage() {
  return (
    <div>
      <Header />
      <PackagesSelection />
    </div>
  )
}