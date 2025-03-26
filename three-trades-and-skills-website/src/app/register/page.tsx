'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type MembershipTier = 'Free' | 'Basic' | 'Standard' | 'Premium' | 'Professional' | 'Enterprise';

const membershipDetails = {
  Free: { price: '$0/month', features: ['Basic emergency calls', 'Limited service types'] },
  Basic: { price: '$9.99/month', features: ['Full emergency access', 'Standard response times', 'Basic reporting'] },
  Standard: { price: '$19.99/month', features: ['Priority emergency access', 'Faster response times', 'Detailed reports'] },
  Premium: { price: '$39.99/month', features: ['High priority access', 'Guaranteed response times', 'Full reports', 'Service history'] },
  Professional: { price: '$79.99/month', features: ['VIP emergency access', 'Immediate response', 'Comprehensive reporting', 'Preventive maintenance'] },
  Enterprise: { price: '$199.99/month', features: ['Dedicated service team', '24/7 priority access', 'Custom solutions', 'Multi-location support'] },
};

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    membershipTier: 'Free' as MembershipTier,
  });
  const [paymentStep, setPaymentStep] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData({
      ...cardData,
      [name]: value,
    });
  };

  const handleSubmitAccountInfo = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Proceed to payment if selected tier is not Free
    if (formData.membershipTier !== 'Free') {
      setPaymentStep(true);
    } else {
      // If Free tier, complete registration without payment
      handleCompleteRegistration();
    }
  };

  const handleCompleteRegistration = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    setError('');

    try {
      // Prepare data for backend
      const registrationData = {
        ...formData,
        paymentMethod: formData.membershipTier !== 'Free' ? {
          // In production, this would be a tokenized card from Square
          cardType: cardData.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
          lastFourDigits: cardData.cardNumber.slice(-4),
          tokenId: `mock_token_${Date.now()}`, // This would be a real token from Square
        } : null,
      };

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to dashboard or confirmation page
        router.push('/registration-success');
      } else {
        setError(data.error || 'Registration failed. Please try again.');
        if (formData.membershipTier !== 'Free') {
          setPaymentStep(false); // Go back to account info if registration fails
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Registration error:', err);
      if (formData.membershipTier !== 'Free') {
        setPaymentStep(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const goBackToAccountInfo = () => {
    setPaymentStep(false);
    setError('');
  };

  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
          <p className="text-gray-600 mt-2">Join Three Trades and Skills for emergency service access</p>
        </div>

        {!paymentStep ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmitAccountInfo}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="(123) 456-7890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                      Service Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="123 Main St, Anytown, ST 12345"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={8}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label htmlFor="membershipTier" className="block text-gray-700 font-medium mb-2">
                    Membership Tier
                  </label>
                  <select
                    id="membershipTier"
                    name="membershipTier"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.membershipTier}
                    onChange={handleInputChange}
                    required
                  >
                    {Object.keys(membershipDetails).map((tier) => (
                      <option key={tier} value={tier}>
                        {tier} - {membershipDetails[tier as MembershipTier].price}
                      </option>
                    ))}
                  </select>

                  <div className="mt-3 bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium text-gray-700">{formData.membershipTier} Plan Features:</h3>
                    <ul className="list-disc list-inside mt-2 text-gray-600">
                      {membershipDetails[formData.membershipTier].features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                  disabled={loading}
                >
                  {formData.membershipTier === 'Free' ? 'Complete Registration' : 'Continue to Payment'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Payment Information</h2>
                <button
                  onClick={goBackToAccountInfo}
                  className="text-blue-600 hover:underline"
                >
                  Back
                </button>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <div className="flex justify-between">
                  <span className="font-medium">Selected Plan:</span>
                  <span>{formData.membershipTier}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-medium">Price:</span>
                  <span>{membershipDetails[formData.membershipTier].price}</span>
                </div>
              </div>

              <form onSubmit={handleCompleteRegistration}>
                <div className="mb-4">
                  <label htmlFor="nameOnCard" className="block text-gray-700 font-medium mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="nameOnCard"
                    name="nameOnCard"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Smith"
                    value={cardData.nameOnCard}
                    onChange={handlePaymentInputChange}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="4111 1111 1111 1111"
                    value={cardData.cardNumber}
                    onChange={handlePaymentInputChange}
                    required
                    pattern="[0-9\s]{13,19}"
                    maxLength={19}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="expiry" className="block text-gray-700 font-medium mb-2">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={handlePaymentInputChange}
                      required
                      pattern="[0-9]{2}/[0-9]{2}"
                      maxLength={5}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-gray-700 font-medium mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={handlePaymentInputChange}
                      required
                      pattern="[0-9]{3,4}"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">
                    Your payment information will be securely processed. Your card will be charged when you make an emergency service call.
                  </p>
                  <p className="text-sm text-gray-600">
                    Recurring payments will begin for your selected membership tier: {membershipDetails[formData.membershipTier].price}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Complete Registration'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 