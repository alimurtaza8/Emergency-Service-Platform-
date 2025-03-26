// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { loadSquareSdk } from '@/lib/square-payments';
// import { getCanisterClient } from '@/lib/canister';

// type MembershipTier = 'Free' | 'Basic' | 'Standard' | 'Premium' | 'Professional' | 'Enterprise';

// export default function CheckoutPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [loading, setLoading] = useState(true);
//   const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
//   const [error, setError] = useState('');
//   const [squareLoaded, setSquareLoaded] = useState(false);
//   const [cardFormLoaded, setCardFormLoaded] = useState(false);
//   const [card, setCard] = useState<any>(null);
  
//   // Form data
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     password: '',
//     confirmPassword: '',
//   });

//   // Plan details from URL
//   const planId = searchParams.get('planId') || '';
//   const planName = searchParams.get('planName') || '';
//   const planPrice = parseFloat(searchParams.get('planPrice') || '0');

//   // Map plan name to membership tier
//   const getPlanAsMembershipTier = (): MembershipTier => {
//     // Default to Free
//     if (!planName) return 'Free';
    
//     if (planName.includes('Basic')) return 'Basic';
//     if (planName.includes('Standard')) return 'Standard';
//     if (planName.includes('Premium')) return 'Premium';
//     if (planName.includes('Professional')) return 'Professional';
//     if (planName.includes('Enterprise') || planName.includes('Triple Diamond')) return 'Enterprise';
    
//     return 'Free';
//   };

//   useEffect(() => {
//     // Redirect to packages if no plan is selected
//     if (!planId || !planName) {
//       router.push('/packages');
//       return;
//     }

//     // Initialize Square payment form
//     const initSquare = async () => {
//       try {
//         // Load Square SDK
//         const applicationId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
//         if (!applicationId) {
//           throw new Error('Square Application ID is not configured');
//         }
        
//         const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
//         if (!locationId) {
//           throw new Error('Square Location ID is not configured');
//         }
        
//         const { payments } = await loadSquareSdk();
//         setSquareLoaded(true);
        
//         // Initialize payments object
//         if (!payments) {
//           throw new Error('Square Payments SDK failed to load');
//         }
        
//         // Create and mount card payment form
//         const cardPayment = await payments.card();
//         await cardPayment.attach('#card-container');
        
//         setCard(cardPayment);
//         setCardFormLoaded(true);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error initializing Square SDK:', error);
//         setError('Failed to load payment form. Please try again later.');
//         setLoading(false);
//       }
//     };
    
//     initSquare();
//   }, [planId, planName, router]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Basic validation
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
    
//     if (!card || !cardFormLoaded) {
//       setError('Payment form is not ready yet. Please try again.');
//       return;
//     }
    
//     setPaymentStatus('processing');
//     setError('');
    
//     try {
//       // Process card payment with Square
//       const result = await card.tokenize();
//       if (result.status !== 'OK') {
//         throw new Error(result.errors[0].message);
//       }
      
//       // Get the source ID (payment token)
//       const sourceId = result.token;
      
//       // Process payment with server
//       const response = await fetch('/api/process-payment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           sourceId,
//           amount: planPrice,
//           planId,
//           planName,
//         }),
//       });
      
//       const paymentResult = await response.json();
      
//       if (!paymentResult.success) {
//         throw new Error(paymentResult.error || 'Payment processing failed');
//       }
      
//       // If payment successful, register the user with the canister
//       const membershipTier = getPlanAsMembershipTier();
      
//       // Create payment method object from Square token
//       const paymentMethod = {
//         cardType: result.details?.card?.brand || 'Unknown',
//         lastFourDigits: result.details?.card?.last4 || '0000',
//         tokenId: sourceId,
//       };
      
//       // Register user
//       const registrationResponse = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...formData,
//           membershipTier,
//           paymentMethod,
//         }),
//       });
      
//       const registrationResult = await registrationResponse.json();
      
//       if (!registrationResult.success) {
//         throw new Error(registrationResult.error || 'Registration failed');
//       }
      
//       setPaymentStatus('success');
      
//       // Redirect to success page
//       router.push('/registration-success');
//     } catch (error: any) {
//       console.error('Payment error:', error);
//       setError(error.message || 'An error occurred during the payment process');
//       setPaymentStatus('error');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
//           <p className="mt-2 text-gray-600">Complete your subscription to Three Trades and Skills</p>
//         </div>
        
//         {loading ? (
//           <div className="bg-white p-8 rounded-lg shadow-md">
//             <div className="flex justify-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//             </div>
//             <p className="text-center mt-4 text-gray-600">Loading payment form...</p>
//           </div>
//         ) : (
//           <div className="bg-white p-8 rounded-lg shadow-md">
//             {paymentStatus === 'success' ? (
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg
//                     className="w-8 h-8 text-green-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                 </div>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Successful!</h2>
//                 <p className="text-gray-600 mb-6">
//                   Thank you for subscribing to Three Trades and Skills. Your account is being created.
//                 </p>
//                 <div className="mt-4">
//                   <p className="text-gray-500 mb-4">You will be redirected to your account shortly...</p>
//                 </div>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit}>
//                 {error && (
//                   <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//                     {error}
//                   </div>
//                 )}
                
//                 <div className="mb-6 p-4 bg-gray-50 rounded-md">
//                   <div className="flex justify-between mb-2">
//                     <span className="font-medium">Selected Plan:</span>
//                     <span>{planName}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium">Price:</span>
//                     <span>${planPrice.toFixed(2)}</span>
//                   </div>
//                 </div>
                
//                 <div className="space-y-4 mb-6">
//                   <h3 className="text-lg font-medium text-gray-800 mb-3">Account Information</h3>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
//                         Phone Number
//                       </label>
//                       <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="address" className="block text-gray-700 font-medium mb-1">
//                         Service Address
//                       </label>
//                       <input
//                         type="text"
//                         id="address"
//                         name="address"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formData.address}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
//                         Password
//                       </label>
//                       <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formData.password}
//                         onChange={handleInputChange}
//                         required
//                         minLength={8}
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
//                         Confirm Password
//                       </label>
//                       <input
//                         type="password"
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formData.confirmPassword}
//                         onChange={handleInputChange}
//                         required
//                         minLength={8}
//                       />
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mb-6">
//                   <h3 className="text-lg font-medium text-gray-800 mb-3">Payment Information</h3>
//                   <div id="card-container" className="py-3 px-1 border rounded-md min-h-[100px]"></div>
//                   <div className="text-xs text-gray-500 mt-2">
//                     Your payment information is securely processed by Square.
//                   </div>
//                 </div>
                
//                 <div className="flex flex-col space-y-3">
//                   <button
//                     type="submit"
//                     disabled={paymentStatus === 'processing' || !cardFormLoaded}
//                     className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                   >
//                     {paymentStatus === 'processing' ? (
//                       <span className="flex items-center justify-center">
//                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Processing...
//                       </span>
//                     ) : (
//                       'Complete Order'
//                     )}
//                   </button>
                  
//                   <Link 
//                     href="/packages"
//                     className="text-center text-blue-600 hover:underline"
//                   >
//                     Cancel and return to packages
//                   </Link>
//                 </div>
//               </form>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// } 






// ne code ........................


// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { loadSquareSdk } from '@/lib/square-payments';

// export default function CheckoutPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // States
//   const [loading, setLoading] = useState(true);
//   const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
//   const [error, setError] = useState('');
//   const [squareLoaded, setSquareLoaded] = useState(false);
//   const [cardFormLoaded, setCardFormLoaded] = useState(false);
//   const [card, setCard] = useState<any>(null);
  
//   // Plan details from URL
//   const planId = searchParams.get('planId') || 'default-plan';
//   const planName = searchParams.get('planName') || 'Standard Plan';
//   const planPrice = parseFloat(searchParams.get('planPrice') || '0');
  
//   // Form data
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     country: 'US',
//     postalCode: '',
//     password: '',
//     confirmPassword: '',
//   });

//   // Terms and Conditions State
//   const [termsAccepted, setTermsAccepted] = useState({
//     term1: false,
//     term2: false,
//     term3: false,
//   });

//   const allTermsAccepted = Object.values(termsAccepted).every(Boolean);

//   const handleTermChange = (term: keyof typeof termsAccepted) => (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTermsAccepted(prev => ({
//       ...prev,
//       [term]: e.target.checked,
//     }));
//   };

//   useEffect(() => {
//     // Redirect to packages if no plan is selected
//     if (!planId || !planName || planPrice <= 0) {
//       router.push('/packages');
//       return;
//     }

//     // Initialize Square payment form
//     const initSquare = async () => {
//       try {
//         // Load Square SDK
//         const applicationId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
//         if (!applicationId) {
//           throw new Error('Square Application ID is not configured');
//         }
        
//         const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
//         if (!locationId) {
//           throw new Error('Square Location ID is not configured');
//         }
        
//         const { payments } = await loadSquareSdk();
//         setSquareLoaded(true);
        
//         // Initialize payments object
//         if (!payments) {
//           throw new Error('Square Payments SDK failed to load');
//         }
        
//         // Create and mount card payment form
//         const cardPayment = await payments.card();
//         await cardPayment.attach('#card-container');
        
//         setCard(cardPayment);
//         setCardFormLoaded(true);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error initializing Square SDK:', error);
//         setError('Failed to load payment form. Please try again later.');
//         setLoading(false);
//       }
//     };
    
//     initSquare();
//   }, [planId, planName, planPrice, router]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Basic validation
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
    
//     if (!card || !cardFormLoaded) {
//       setError('Payment form is not ready yet. Please try again.');
//       return;
//     }
    
//     if (!allTermsAccepted) {
//       setError('Please accept all terms and conditions to continue.');
//       return;
//     }
    
//     setPaymentStatus('processing');
//     setError('');
    
//     try {
//       // Process card payment with Square
//       const result = await card.tokenize();
//       if (result.status !== 'OK') {
//         throw new Error(result.errors[0].message);
//       }
      
//       // Get the source ID (payment token)
//       const sourceId = result.token;
      
//       // Create user info object
//       const userInfo = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         phone: formData.phone,
//         address: formData.address,
//         city: formData.city,
//         country: formData.country,
//         postalCode: formData.postalCode
//       };
      
//       // Process payment with server
//       // const response = await fetch('/api/process-payment', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify({
//       //     sourceId,
//       //     amount: planPrice,
//       //     planId,
//       //     planName,
//       //     userInfo
//       //   }),
//       // });
//       const response = await fetch('/api/process-payment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           sourceId,
//           amount: planPrice,
//           planId,
//           planName,
//           userInfo,
//         }),
//       });
      
//       const paymentResult = await response.json();
      
//       if (!paymentResult.success) {
//         throw new Error(paymentResult.error || 'Payment processing failed');
//       }
      
//       // Create payment method object from Square token
//       const paymentMethod = {
//         cardType: result.details?.card?.brand || 'Unknown',
//         lastFourDigits: result.details?.card?.last4 || '0000',
//         tokenId: sourceId,
//       };
      
//       // Register user
//       const registrationResponse = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           address: formData.address,
//           city: formData.city,
//           country: formData.country,
//           postalCode: formData.postalCode,
//           password: formData.password,
//           planId,
//           planName,
//           paymentMethod
//         }),
//       });
      
//       const registrationResult = await registrationResponse.json();
      
//       if (!registrationResult.success) {
//         throw new Error(registrationResult.error || 'Registration failed');
//       }
      
//       setPaymentStatus('success');
      
//       // Redirect to success page
//       window.location.href = `/payment-success?amount=${planPrice}`;
//     } catch (error: any) {
//       console.error('Payment error:', error);
//       setError(error.message || 'An error occurred during the payment process');
//       setPaymentStatus('error');
//     }
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
//           <p className="mt-2 text-gray-600">Complete your subscription</p>
//         </div>
        
//         {loading ? (
//           <div className="bg-white p-8 rounded-lg shadow-md">
//             <div className="flex justify-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//             </div>
//             <p className="text-center mt-4 text-gray-600">Loading payment form...</p>
//           </div>
//         ) : (
//           <div className="bg-white p-8 rounded-lg shadow-md">
//             {paymentStatus === 'success' ? (
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg
//                     className="w-8 h-8 text-green-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                 </div>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Successful!</h2>
//                 <p className="text-gray-600 mb-6">
//                   Thank you for your subscription. Your account is being created.
//                 </p>
//                 <div className="mt-4">
//                   <p className="text-gray-500 mb-4">You will be redirected shortly...</p>
//                 </div>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit}>
//                 {error && (
//                   <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//                     {error}
//                   </div>
//                 )}
                
//                 <div className="mb-6 p-4 bg-blue-50 rounded-md">
//                   <h3 className="text-lg font-semibold text-blue-800">Selected Plan</h3>
//                   <div className="flex justify-between mb-2">
//                     <span className="font-medium">Plan:</span>
//                     <span>{planName}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium">Price:</span>
//                     <span>${planPrice.toFixed(2)}</span>
//                   </div>
//                 </div>
                
//                 <div className="space-y-4 mb-6">
//                   <h3 className="text-lg font-medium text-gray-800 mb-3">Account Information</h3>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">
//                         First Name
//                       </label>
//                       <input
//                         type="text"
//                         id="firstName"
//                         name="firstName"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formData.firstName}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">
//                         Last Name
//                       </label>
//                       <input
//                         type="text"
//                         id="lastName"
//                         name="lastName"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formData.lastName}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
//                         Phone Number
//                       </label>
//                       <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label htmlFor="address" className="block text-gray-700 font-medium mb-1">
//                       Address
//                     </label>
//                     <input
//                       type="text"
//                       id="address"
//                       name="address"
//                       className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label htmlFor="city" className="block text-gray-700 font-medium mb-1">
//                         City
//                       </label>
//                       <input
//                         type="text"
//                         id="city"
//                         name="city"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
                    
//                     {/* <div>
//                       <label htmlFor="country" className="block text-gray-700 font-medium mb-1">
//                         Country
//                       </label>
//                       <input
//                         type="text"
//                         id="country"
//                         name="country"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formData.country}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div> */}
// <div>
//   <label htmlFor="country" className="block text-gray-700 font-medium mb-1">
//     Country
//   </label>
//   <select
//     id="country"
//     name="country"
//     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//     value={formData.country}
//     // onChange={handleInputChange}
//     onChange={handleSelectChange}
//     required
//   >
//     <option value="US">United States</option>
//     <option value="CA">Canada</option>
//     <option value="GB">United Kingdom</option>
//     {/* Add other countries as needed */}
//   </select>
// </div>
                    
//                     <div>
//                       <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-1">
//                         Postal Code
//                       </label>
//                       <input
//                         type="text"
//                         id="postalCode"
//                         name="postalCode"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formData.postalCode}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
//                         Password
//                       </label>
//                       <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formData.password}
//                         onChange={handleInputChange}
//                         required
//                         minLength={8}
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
//                         Confirm Password
//                       </label>
//                       <input
//                         type="password"
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={formData.confirmPassword}
//                         onChange={handleInputChange}
//                         required
//                         minLength={8}
//                       />
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mb-6">
//                   <h3 className="text-lg font-medium text-gray-800 mb-3">Payment Information</h3>
//                   <div id="card-container" className="py-4 px-1 border rounded-md min-h-[160px]"></div>
//                   <div className="text-xs text-gray-500 mt-2">
//                     Your payment information is securely processed by Square.
//                   </div>
//                 </div>
                
//                 {/* Terms and Conditions Section */}
//                 <div className="mt-6 border-t pt-6">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Terms and Conditions</h3>
//                   <div className="space-y-4 text-sm text-gray-600 max-h-64 overflow-y-auto pr-2">
//                     <div className="flex items-start space-x-2">
//                       <input
//                         type="checkbox"
//                         id="term1"
//                         checked={termsAccepted.term1}
//                         onChange={handleTermChange('term1')}
//                         required
//                         className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                       />
//                       <label htmlFor="term1" className="flex-1">
//                         I don&apos;t feel pressured to buy this product and am choosing to purchase it of my own accord.
//                       </label>
//                     </div>
//                     <div className="flex items-start space-x-2">
//                       <input
//                         type="checkbox"
//                         id="term2"
//                         checked={termsAccepted.term2}
//                         onChange={handleTermChange('term2')}
//                         required
//                         className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                       />
//                       <label htmlFor="term2" className="flex-1">
//                         I am purchasing a subscription that will be delivered within the specified timeframe. 
//                         I acknowledge that once the service is delivered, I am not eligible for a refund.
//                       </label>
//                     </div>
//                     <div className="flex items-start space-x-2">
//                       <input
//                         type="checkbox"
//                         id="term3"
//                         checked={termsAccepted.term3}
//                         onChange={handleTermChange('term3')}
//                         required
//                         className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                       />
//                       <label htmlFor="term3" className="flex-1">
//                         I have read and accepted the terms and conditions as well as the privacy statement.
//                       </label>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex flex-col space-y-3 mt-6">
//                   <button
//                     type="submit"
//                     disabled={paymentStatus === 'processing' || !cardFormLoaded || !allTermsAccepted}
//                     className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                   >
//                     {paymentStatus === 'processing' ? (
//                       <span className="flex items-center justify-center">
//                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Processing...
//                       </span>
//                     ) : (
//                       `Pay $${planPrice.toFixed(2)}`
//                     )}
//                   </button>
                  
//                   <Link 
//                     href="/packages"
//                     className="text-center text-blue-600 hover:underline"
//                   >
//                     Cancel and return to packages
//                   </Link>
//                 </div>
//               </form>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// ////////////////////////////////////////////////////////////////////////////////////

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { loadSquareSdk } from '@/lib/square-payments';

// // At the top of your CheckoutPage component file:
// import { AuthClient } from "@dfinity/auth-client";

// // import { useState, useEffect } from "react";

// // const [principal, setPrincipal] = useState<string | null>(null);

// // useEffect(() => {
// //   async function initAuth() {
// //     const authClient = await AuthClient.create();
// //     // If the user is not authenticated, trigger login
// //     if (!authClient.isAuthenticated()) {
// //       await authClient.login({
// //         // You can specify your login options here.
// //         // For testing, the default Internet Identity login page should appear.
// //         onSuccess: () => {
// //           const identity = authClient.getIdentity();
// //           const principalId = identity.getPrincipal().toText();
// //           console.log("User authenticated with principal:", principalId);
// //           setPrincipal(principalId);
// //         },
// //         // Optionally, add onError callback to handle login errors.
// //       });
// //     } else {
// //       const identity = authClient.getIdentity();
// //       const principalId = identity.getPrincipal().toText();
// //       console.log("User already authenticated with principal:", principalId);
// //       setPrincipal(principalId);
// //     }
// //   }
// //   initAuth();
// // }, []);

// export default function CheckoutPage() {
//   const [principal, setPrincipal] = useState<string | null>(null);

// useEffect(() => {
//   async function initAuth() {
//     const authClient = await AuthClient.create();
//     // If the user is not authenticated, trigger login
//     if (!authClient.isAuthenticated()) {
//       await authClient.login({
//         // You can specify your login options here.
//         // For testing, the default Internet Identity login page should appear.
//         onSuccess: () => {
//           const identity = authClient.getIdentity();
//           const principalId = identity.getPrincipal().toText();
//           console.log("User authenticated with principal:", principalId);
//           setPrincipal(principalId);
//         },
//         // Optionally, add onError callback to handle login errors.
//       });
//     } else {
//       const identity = authClient.getIdentity();
//       const principalId = identity.getPrincipal().toText();
//       console.log("User already authenticated with principal:", principalId);
//       setPrincipal(principalId);
//     }
//   }
//   initAuth();
// }, []);


//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // States
//   const [loading, setLoading] = useState(true);
//   const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
//   const [error, setError] = useState('');
//   const [squareLoaded, setSquareLoaded] = useState(false);
//   const [cardFormLoaded, setCardFormLoaded] = useState(false);
//   const [card, setCard] = useState<any>(null);
  
//   // Plan details from URL
//   const planId = searchParams.get('planId') || 'default-plan';
//   const planName = searchParams.get('planName') || 'Standard Plan';
//   const planPrice = parseFloat(searchParams.get('planPrice') || '0');
  
//   // Form data
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     country: 'US',
//     postalCode: '',
//     password: '',
//     confirmPassword: '',
//   });

//   // Terms and Conditions State
//   const [termsAccepted, setTermsAccepted] = useState({
//     term1: false,
//     term2: false,
//     term3: false,
//   });

//   const allTermsAccepted = Object.values(termsAccepted).every(Boolean);

//   const handleTermChange = (term: keyof typeof termsAccepted) => (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTermsAccepted(prev => ({
//       ...prev,
//       [term]: e.target.checked,
//     }));
//   };

//   useEffect(() => {
//     // Redirect to packages if no plan is selected
//     if (!planId || !planName || planPrice <= 0) {
//       router.push('/packages');
//       return;
//     }

//     // Initialize Square payment form
//     const initSquare = async () => {
//       try {
//         // Clear any previous errors
//         setError('');
        
//         // Load Square SDK
//         const applicationId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
//         if (!applicationId) {
//           throw new Error('Square Application ID is not configured');
//         }
        
//         const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
//         if (!locationId) {
//           throw new Error('Square Location ID is not configured');
//         }
        
//         const { payments } = await loadSquareSdk();
//         setSquareLoaded(true);
        
//         // Initialize payments object
//         if (!payments) {
//           throw new Error('Square Payments SDK failed to load');
//         }
        
//         // Create and mount card payment form
//         const cardPayment = await payments.card();
//         await cardPayment.attach('#card-container');
        
//         setCard(cardPayment);
//         setCardFormLoaded(true);
//         setLoading(false);
//       } catch (error) {
//         // console.error('Error initializing Square SDK:', error);
//         console.error('Error initializing Square SDK:', error);
        

//         // setError('We encountered an issue with our payment processor. Please try refreshing the page or contact support.');
//         setLoading(false);
//       }
//     };
    
//     // Small timeout to ensure DOM is ready
//     setTimeout(() => {
//       initSquare();
//     }, 500);
//   }, [planId, planName, planPrice, router]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
    
//     // Basic validation
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match. Please check and try again.');
//       return;
//     }
    
//     if (!card || !cardFormLoaded) {
//       setError('Payment form is not ready yet. Please refresh the page and try again.');
//       return;
//     }
    
//     if (!allTermsAccepted) {
//       setError('Please accept all terms and conditions to continue.');
//       return;
//     }
    
//     setPaymentStatus('processing');
//     setError('');
    
//     try {
//       // Process card payment with Square
//       const result = await card.tokenize();
//       if (result.status !== 'OK') {
//         throw new Error(result.errors[0].message);
//       }
      
//       // Get the source ID (payment token)
//       const sourceId = result.token;
      
//       // Create user info object
//       const userInfo = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         phone: formData.phone,
//         address: formData.address,
//         city: formData.city,
//         country: formData.country,
//         postalCode: formData.postalCode
//       };
      
//       // Process payment with server
//       const response = await fetch('/api/process-payment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           sourceId,
//           amount: planPrice,
//           planId,
//           planName,
//           userInfo,
//           userPrincipal: principal, 
//         }),
//       });
      
//       const paymentResult = await response.json();
      
//       if (!paymentResult.success) {
//         throw new Error(paymentResult.error || 'Payment processing failed');
//       }
      
//       // Create payment method object from Square token
//       const paymentMethod = {
//         cardType: result.details?.card?.brand || 'Unknown',
//         lastFourDigits: result.details?.card?.last4 || '0000',
//         tokenId: sourceId,
//       };
      
//       // Register user
//       const registrationResponse = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           address: formData.address,
//           city: formData.city,
//           country: formData.country,
//           postalCode: formData.postalCode,
//           password: formData.password,
//           planId,
//           planName,
//           paymentMethod
//         }),
//       });
      
//       const registrationResult = await registrationResponse.json();
      
//       if (!registrationResult.success) {
//         throw new Error(registrationResult.error || 'Registration failed');
//       }
      
//       setPaymentStatus('success');
      
//       // Redirect to success page
//       window.location.href = `/payment-success?amount=${planPrice}`;
//     } catch (error: any) {
//       console.error('Payment error:', error);
//       setError(error.message || 'An error occurred during the payment process. Please try again or contact support.');
//       setPaymentStatus('error');
//     }
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
//           <p className="mt-2 text-gray-600">Secure checkout powered by Square</p>
//         </div>
        
//         {loading ? (
//           <div className="bg-white p-10 rounded-xl shadow-lg">
//             <div className="flex flex-col items-center justify-center space-y-4">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//               <p className="text-center text-gray-700 font-medium">Preparing your secure checkout experience...</p>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Order Summary Section */}
//             <div className="lg:col-span-1">
//               <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
//                 <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-4">Order Summary</h2>
                
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Plan</span>
//                     <span className="font-medium text-gray-800">{planName}</span>
//                   </div>
                  
//                   <div className="border-t border-gray-200 pt-4 mb-4"></div>
                  
//                   <div className="flex justify-between items-center text-lg">
//                     <span className="font-medium">Total</span>
//                     <span className="font-bold text-blue-700">${planPrice.toFixed(2)}</span>
//                   </div>
//                 </div>
                
//                 <div className="mt-6 pt-6 border-t">
//                   <div className="flex items-center text-sm text-gray-600 mb-4">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                     </svg>
//                     Secure checkout with Square
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
//                     </svg>
//                     Money-back guarantee
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Checkout Form Section */}
//             <div className="lg:col-span-2">
//               {paymentStatus === 'success' ? (
//                 <div className="bg-white p-8 rounded-xl shadow-lg text-center">
//                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <svg
//                       className="w-10 h-10 text-green-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   </div>
//                   <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Successful!</h2>
//                   <p className="text-lg text-gray-600 mb-6">
//                     Thank you for your subscription. Your account is being created.
//                   </p>
//                   <div className="mt-8">
//                     <div className="animate-pulse flex justify-center space-x-2 text-gray-500">
//                       <span>Redirecting you</span>
//                       <span className="flex space-x-1">
//                         <span className="animate-bounce">.</span>
//                         <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
//                         <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-white p-8 rounded-xl shadow-lg">
//                   {error && (
//                     <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//                       <div className="flex items-start">
//                         <div className="flex-shrink-0">
//                           <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                           </svg>
//                         </div>
//                         <div className="ml-3">
//                           <p className="text-sm">{error}</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
                  
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-800 mb-4">Account Information</h3>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1 text-sm">
//                             First Name
//                           </label>
//                           <input
//                             type="text"
//                             id="firstName"
//                             name="firstName"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.firstName}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
                        
//                         <div>
//                           <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1 text-sm">
//                             Last Name
//                           </label>
//                           <input
//                             type="text"
//                             id="lastName"
//                             name="lastName"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.lastName}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                         <div>
//                           <label htmlFor="email" className="block text-gray-700 font-medium mb-1 text-sm">
//                             Email Address
//                           </label>
//                           <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
                        
//                         <div>
//                           <label htmlFor="phone" className="block text-gray-700 font-medium mb-1 text-sm">
//                             Phone Number
//                           </label>
//                           <input
//                             type="tel"
//                             id="phone"
//                             name="phone"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.phone}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="border-t border-gray-200 pt-6">
//                       <h3 className="text-xl font-bold text-gray-800 mb-4">Billing Address</h3>
                      
//                       <div className="space-y-4">
//                         <div>
//                           <label htmlFor="address" className="block text-gray-700 font-medium mb-1 text-sm">
//                             Street Address
//                           </label>
//                           <input
//                             type="text"
//                             id="address"
//                             name="address"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.address}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
                        
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <label htmlFor="city" className="block text-gray-700 font-medium mb-1 text-sm">
//                               City
//                             </label>
//                             <input
//                               type="text"
//                               id="city"
//                               name="city"
//                               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               value={formData.city}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
                          
//                           <div>
//                             <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-1 text-sm">
//                               Postal Code
//                             </label>
//                             <input
//                               type="text"
//                               id="postalCode"
//                               name="postalCode"
//                               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               value={formData.postalCode}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
                        
//                         <div>
//                           <label htmlFor="country" className="block text-gray-700 font-medium mb-1 text-sm">
//                             Country
//                           </label>
//                           <select
//                             id="country"
//                             name="country"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                             value={formData.country}
//                             onChange={handleSelectChange}
//                             required
//                           >
//                             <option value="US">United States</option>
//                             <option value="CA">Canada</option>
//                             <option value="GB">United Kingdom</option>
//                             <option value="AU">Australia</option>
//                             <option value="DE">Germany</option>
//                             <option value="FR">France</option>
//                             <option value="JP">Japan</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="border-t border-gray-200 pt-6">
//                       <h3 className="text-xl font-bold text-gray-800 mb-4">Create Account</h3>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label htmlFor="password" className="block text-gray-700 font-medium mb-1 text-sm">
//                             Password
//                           </label>
//                           <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             required
//                             minLength={8}
//                           />
//                           <p className="mt-1 text-xs text-gray-500">Minimum 8 characters</p>
//                         </div>
                        
//                         <div>
//                           <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1 text-sm">
//                             Confirm Password
//                           </label>
//                           <input
//                             type="password"
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.confirmPassword}
//                             onChange={handleInputChange}
//                             required
//                             minLength={8}
//                           />
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="border-t border-gray-200 pt-6">
//                       <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h3>
                      
//                       <div id="card-container" className="p-4 border border-gray-300 rounded-lg min-h-[160px] bg-gray-50"></div>
//                       <div className="flex items-center mt-2 text-xs text-gray-600">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                         </svg>
//                         Your payment information is securely processed by Square.
//                       </div>
//                     </div>
                    
//                     {/* Terms and Conditions Section */}
//                     <div className="border-t border-gray-200 pt-6">
//                       <h3 className="text-xl font-bold text-gray-800 mb-4">Terms and Conditions</h3>
//                       <div className="space-y-4 text-sm text-gray-700 max-h-64 overflow-y-auto pr-2">
//                         <div className="flex items-start">
//                           <input
//                             type="checkbox"
//                             id="term1"
//                             checked={termsAccepted.term1}
//                             onChange={handleTermChange('term1')}
//                             required
//                             className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                           />
//                           <label htmlFor="term1" className="ml-3 flex-1">
//                             I don&apos;t feel pressured to buy this product and am choosing to purchase it of my own accord.
//                           </label>
//                         </div>
//                         <div className="flex items-start">
//                           <input
//                             type="checkbox"
//                             id="term2"
//                             checked={termsAccepted.term2}
//                             onChange={handleTermChange('term2')}
//                             required
//                             className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                           />
//                           <label htmlFor="term2" className="ml-3 flex-1">
//                             I am purchasing a subscription that will be delivered within the specified timeframe. 
//                             I acknowledge that once the service is delivered, I am not eligible for a refund.
//                           </label>
//                         </div>
//                         <div className="flex items-start">
//                           <input
//                             type="checkbox"
//                             id="term3"
//                             checked={termsAccepted.term3}
//                             onChange={handleTermChange('term3')}
//                             required
//                             className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                           />
//                           <label htmlFor="term3" className="ml-3 flex-1">
//                             I have read and accepted the terms and conditions as well as the privacy statement.
//                           </label>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="pt-6">
//                       <button
//                         type="submit"
//                         disabled={paymentStatus === 'processing' || !cardFormLoaded || !allTermsAccepted}
//                         className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
//                       >
//                         {paymentStatus === 'processing' ? (
//                           <span className="flex items-center justify-center">
//                             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Processing Payment...
//                           </span>
//                         ) : (
//                           `Complete Purchase • $${planPrice.toFixed(2)}`
//                         )}
//                       </button>
                      
//                       <div className="mt-4 text-center">
//                         <Link 
//                           href="/packages"
//                           className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
//                         >
//                           Cancel and return to plans
//                         </Link>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




///////////////////////////////////////////////////

// New code with canister man...



// ////////////////////////////////////////////////////////////////////////////////////

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { loadSquareSdk } from '@/lib/square-payments';

// // At the top of your CheckoutPage component file:
// // import { AuthClient } from "@dfinity/auth-client";
// import { AuthClient } from '@dfinity/auth-client'; // Import AuthClient

// // import { useState, useEffect } from "react";

// // const [principal, setPrincipal] = useState<string | null>(null);

// // useEffect(() => {
// //   async function initAuth() {
// //     const authClient = await AuthClient.create();
// //     // If the user is not authenticated, trigger login
// //     if (!authClient.isAuthenticated()) {
// //       await authClient.login({
// //         // You can specify your login options here.
// //         // For testing, the default Internet Identity login page should appear.
// //         onSuccess: () => {
// //           const identity = authClient.getIdentity();
// //           const principalId = identity.getPrincipal().toText();
// //           console.log("User authenticated with principal:", principalId);
// //           setPrincipal(principalId);
// //         },
// //         // Optionally, add onError callback to handle login errors.
// //       });
// //     } else {
// //       const identity = authClient.getIdentity();
// //       const principalId = identity.getPrincipal().toText();
// //       console.log("User already authenticated with principal:", principalId);
// //       setPrincipal(principalId);
// //     }
// //   }
// //   initAuth();
// // }, []);

// export default function CheckoutPage() {

//   const [principal, setPrincipal] = useState<string | null>(null);

  
// useEffect(() => {
//   async function initAuth() {
//     const authClient = await AuthClient.create();
//     // If the user is not authenticated, trigger login
//     if (!authClient.isAuthenticated()) {
//       await authClient.login({
//         // You can specify your login options here.
//         // For testing, the default Internet Identity login page should appear.
//         onSuccess: () => {
//           const identity = authClient.getIdentity();
//           const principalId = identity.getPrincipal().toText();
//           console.log("User authenticated with principal:", principalId);
//           setPrincipal(principalId);
//         },
//         // Optionally, add onError callback to handle login errors.
//       });
//     } else {
//       const identity = authClient.getIdentity();
//       const principalId = identity.getPrincipal().toText();
//       console.log("User already authenticated with principal:", principalId);
//       setPrincipal(principalId);
//     }
//   }
//   initAuth();
// }, []);

// // For testing, a logout function to clear the identity
// // const handleLogout = async () => {
// //   if (authClient) {
// //     await AuthClient.logout();
// //     setPrincipal(null);
// //     console.log("User logged out.");
// //   }
// // };

// // // Login button handler
// // const handleLogin = async () => {
// //   if (!authClient) {
// //     console.error("Auth client not ready.");
// //     return;
// //   }
// //   await authClient.login({
// //     onSuccess: () => {
// //       const identity = authClient.getIdentity();
// //       const principalId = identity.getPrincipal().toText();
// //       console.log("User authenticated with principal:", principalId);
// //       setPrincipal(principalId);
// //     },
// //     onError: (err) => {
// //       console.error("Login error:", err);
// //     },
// //     // You can add additional login options here if needed
// //   });
// // };



//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // States
//   const [loading, setLoading] = useState(true);
//   const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
//   const [error, setError] = useState('');
//   const [squareLoaded, setSquareLoaded] = useState(false);
//   const [cardFormLoaded, setCardFormLoaded] = useState(false);
//   const [card, setCard] = useState<any>(null);
  
//   // Plan details from URL
//   const planId = searchParams.get('planId') || 'default-plan';
//   const planName = searchParams.get('planName') || 'Standard Plan';
//   const planPrice = parseFloat(searchParams.get('planPrice') || '0');
  
//   // Form data
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     country: 'US',
//     postalCode: '',
//     password: '',
//     confirmPassword: '',
//   });

//   // Terms and Conditions State
//   const [termsAccepted, setTermsAccepted] = useState({
//     term1: false,
//     term2: false,
//     term3: false,
//   });

//   const allTermsAccepted = Object.values(termsAccepted).every(Boolean);

//   const handleTermChange = (term: keyof typeof termsAccepted) => (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTermsAccepted(prev => ({
//       ...prev,
//       [term]: e.target.checked,
//     }));
//   };

//   useEffect(() => {
//     // Redirect to packages if no plan is selected
//     if (!planId || !planName || planPrice <= 0) {
//       router.push('/packages');
//       return;
//     }

//     // Initialize Square payment form
//     const initSquare = async () => {
//       try {
//         // Clear any previous errors
//         setError('');
        
//         // Load Square SDK
//         const applicationId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
//         if (!applicationId) {
//           throw new Error('Square Application ID is not configured');
//         }
        
//         const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
//         if (!locationId) {
//           throw new Error('Square Location ID is not configured');
//         }
        
//         const { payments } = await loadSquareSdk();
//         setSquareLoaded(true);
        
//         // Initialize payments object
//         if (!payments) {
//           throw new Error('Square Payments SDK failed to load');
//         }
        
//         // Create and mount card payment form
//         const cardPayment = await payments.card();
//         await cardPayment.attach('#card-container');
        
//         setCard(cardPayment);
//         setCardFormLoaded(true);
//         setLoading(false);
//       } catch (error) {
//         // console.error('Error initializing Square SDK:', error);
//         console.error('Error initializing Square SDK:', error);
        

//         // setError('We encountered an issue with our payment processor. Please try refreshing the page or contact support.');
//         setLoading(false);
//       }
//     };
    
//     // Small timeout to ensure DOM is ready
//     setTimeout(() => {
//       initSquare();
//     }, 500);
//   }, [planId, planName, planPrice, router]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
    
//     // Basic validation
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match. Please check and try again.');
//       return;
//     }
    
//     if (!card || !cardFormLoaded) {
//       setError('Payment form is not ready yet. Please refresh the page and try again.');
//       return;
//     }
    
//     if (!allTermsAccepted) {
//       setError('Please accept all terms and conditions to continue.');
//       return;
//     }
    
//     setPaymentStatus('processing');
//     setError('');
    
//     try {
//       // Process card payment with Square
//       const result = await card.tokenize();
//       if (result.status !== 'OK') {
//         throw new Error(result.errors[0].message);
//       }
      
//       // Get the source ID (payment token)
//       const sourceId = result.token;
      
//       // Create user info object
//       const userInfo = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         phone: formData.phone,
//         address: formData.address,
//         city: formData.city,
//         country: formData.country,
//         postalCode: formData.postalCode
//       };
      
//       // Process payment with server
//       const response = await fetch('/api/process-payment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           sourceId,
//           amount: planPrice,
//           planId,
//           planName,
//           userInfo,
//           userPrincipal: principal, 
//         }),
//       });
      
//       const paymentResult = await response.json();
      
//       if (!paymentResult.success) {
//         throw new Error(paymentResult.error || 'Payment processing failed');
//       }
      
//       // Create payment method object from Square token
//       const paymentMethod = {
//         cardType: result.details?.card?.brand || 'Unknown',
//         lastFourDigits: result.details?.card?.last4 || '0000',
//         tokenId: sourceId,
//       };
      
//       // Register user
//       const registrationResponse = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           address: formData.address,
//           city: formData.city,
//           country: formData.country,
//           postalCode: formData.postalCode,
//           password: formData.password,
//           planId,
//           planName,
//           paymentMethod
//         }),
//       });
      
//       const registrationResult = await registrationResponse.json();
      
//       if (!registrationResult.success) {
//         throw new Error(registrationResult.error || 'Registration failed');
//       }
      
//       setPaymentStatus('success');
      
//       // Redirect to success page
//       window.location.href = `/payment-success?amount=${planPrice}`;
//     } catch (error: any) {
//       console.error('Payment error:', error);
//       setError(error.message || 'An error occurred during the payment process. Please try again or contact support.');
//       setPaymentStatus('error');
//     }
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
    
// // //////////////////////
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       {/* /////////////////////////////////////////////// */}
//       {!principal && (
//       <div className="text-center mb-4">
//         <button
//           onClick={async () => {
//             const authClient = await AuthClient.create();
//             await authClient.login({
//               onSuccess: () => {
//                 const identity = authClient.getIdentity();
//                 const principalId = identity.getPrincipal().toText();
//                 console.log("User authenticated with principal:", principalId);
//                 setPrincipal(principalId);
//               },
//               // You may include onError callback as needed.
//             });
//           }}
//           className="bg-blue-600 text-white py-2 px-4 rounded"
//         >
//           Login to Continue
//         </button>
//       </div>
//     )}

//       {/* ///////////////////////////////////////////////// */}
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
//           <p className="mt-2 text-gray-600">Secure checkout powered by Square</p>
//         </div>
        
//         {loading ? (
//           <div className="bg-white p-10 rounded-xl shadow-lg">
//             <div className="flex flex-col items-center justify-center space-y-4">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//               <p className="text-center text-gray-700 font-medium">Preparing your secure checkout experience...</p>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Order Summary Section */}
//             <div className="lg:col-span-1">
//               <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
//                 <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-4">Order Summary</h2>
                
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Plan</span>
//                     <span className="font-medium text-gray-800">{planName}</span>
//                   </div>
                  
//                   <div className="border-t border-gray-200 pt-4 mb-4"></div>
                  
//                   <div className="flex justify-between items-center text-lg">
//                     <span className="font-medium">Total</span>
//                     <span className="font-bold text-blue-700">${planPrice.toFixed(2)}</span>
//                   </div>
//                 </div>
                
//                 <div className="mt-6 pt-6 border-t">
//                   <div className="flex items-center text-sm text-gray-600 mb-4">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                     </svg>
//                     Secure checkout with Square
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
//                     </svg>
//                     Money-back guarantee
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Checkout Form Section */}
//             <div className="lg:col-span-2">
//               {paymentStatus === 'success' ? (
//                 <div className="bg-white p-8 rounded-xl shadow-lg text-center">
//                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <svg
//                       className="w-10 h-10 text-green-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   </div>
//                   <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Successful!</h2>
//                   <p className="text-lg text-gray-600 mb-6">
//                     Thank you for your subscription. Your account is being created.
//                   </p>
//                   <div className="mt-8">
//                     <div className="animate-pulse flex justify-center space-x-2 text-gray-500">
//                       <span>Redirecting you</span>
//                       <span className="flex space-x-1">
//                         <span className="animate-bounce">.</span>
//                         <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
//                         <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-white p-8 rounded-xl shadow-lg">
//                   {error && (
//                     <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//                       <div className="flex items-start">
//                         <div className="flex-shrink-0">
//                           <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                           </svg>
//                         </div>
//                         <div className="ml-3">
//                           <p className="text-sm">{error}</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
                  
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-800 mb-4">Account Information</h3>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1 text-sm">
//                             First Name
//                           </label>
//                           <input
//                             type="text"
//                             id="firstName"
//                             name="firstName"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.firstName}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
                        
//                         <div>
//                           <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1 text-sm">
//                             Last Name
//                           </label>
//                           <input
//                             type="text"
//                             id="lastName"
//                             name="lastName"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.lastName}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                         <div>
//                           <label htmlFor="email" className="block text-gray-700 font-medium mb-1 text-sm">
//                             Email Address
//                           </label>
//                           <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
                        
//                         <div>
//                           <label htmlFor="phone" className="block text-gray-700 font-medium mb-1 text-sm">
//                             Phone Number
//                           </label>
//                           <input
//                             type="tel"
//                             id="phone"
//                             name="phone"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.phone}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="border-t border-gray-200 pt-6">
//                       <h3 className="text-xl font-bold text-gray-800 mb-4">Billing Address</h3>
                      
//                       <div className="space-y-4">
//                         <div>
//                           <label htmlFor="address" className="block text-gray-700 font-medium mb-1 text-sm">
//                             Street Address
//                           </label>
//                           <input
//                             type="text"
//                             id="address"
//                             name="address"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.address}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
                        
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <label htmlFor="city" className="block text-gray-700 font-medium mb-1 text-sm">
//                               City
//                             </label>
//                             <input
//                               type="text"
//                               id="city"
//                               name="city"
//                               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               value={formData.city}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
                          
//                           <div>
//                             <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-1 text-sm">
//                               Postal Code
//                             </label>
//                             <input
//                               type="text"
//                               id="postalCode"
//                               name="postalCode"
//                               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               value={formData.postalCode}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
                        
//                         <div>
//                           <label htmlFor="country" className="block text-gray-700 font-medium mb-1 text-sm">
//                             Country
//                           </label>
//                           <select
//                             id="country"
//                             name="country"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                             value={formData.country}
//                             onChange={handleSelectChange}
//                             required
//                           >
//                             <option value="US">United States</option>
//                             <option value="CA">Canada</option>
//                             <option value="GB">United Kingdom</option>
//                             <option value="AU">Australia</option>
//                             <option value="DE">Germany</option>
//                             <option value="FR">France</option>
//                             <option value="JP">Japan</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="border-t border-gray-200 pt-6">
//                       <h3 className="text-xl font-bold text-gray-800 mb-4">Create Account</h3>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label htmlFor="password" className="block text-gray-700 font-medium mb-1 text-sm">
//                             Password
//                           </label>
//                           <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             required
//                             minLength={8}
//                           />
//                           <p className="mt-1 text-xs text-gray-500">Minimum 8 characters</p>
//                         </div>
                        
//                         <div>
//                           <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1 text-sm">
//                             Confirm Password
//                           </label>
//                           <input
//                             type="password"
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.confirmPassword}
//                             onChange={handleInputChange}
//                             required
//                             minLength={8}
//                           />
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="border-t border-gray-200 pt-6">
//                       <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h3>
                      
//                       <div id="card-container" className="p-4 border border-gray-300 rounded-lg min-h-[160px] bg-gray-50"></div>
//                       <div className="flex items-center mt-2 text-xs text-gray-600">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                         </svg>
//                         Your payment information is securely processed by Square.
//                       </div>
//                     </div>
                    
//                     {/* Terms and Conditions Section */}
//                     <div className="border-t border-gray-200 pt-6">
//                       <h3 className="text-xl font-bold text-gray-800 mb-4">Terms and Conditions</h3>
//                       <div className="space-y-4 text-sm text-gray-700 max-h-64 overflow-y-auto pr-2">
//                         <div className="flex items-start">
//                           <input
//                             type="checkbox"
//                             id="term1"
//                             checked={termsAccepted.term1}
//                             onChange={handleTermChange('term1')}
//                             required
//                             className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                           />
//                           <label htmlFor="term1" className="ml-3 flex-1">
//                             I don&apos;t feel pressured to buy this product and am choosing to purchase it of my own accord.
//                           </label>
//                         </div>
//                         <div className="flex items-start">
//                           <input
//                             type="checkbox"
//                             id="term2"
//                             checked={termsAccepted.term2}
//                             onChange={handleTermChange('term2')}
//                             required
//                             className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                           />
//                           <label htmlFor="term2" className="ml-3 flex-1">
//                             I am purchasing a subscription that will be delivered within the specified timeframe. 
//                             I acknowledge that once the service is delivered, I am not eligible for a refund.
//                           </label>
//                         </div>
//                         <div className="flex items-start">
//                           <input
//                             type="checkbox"
//                             id="term3"
//                             checked={termsAccepted.term3}
//                             onChange={handleTermChange('term3')}
//                             required
//                             className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                           />
//                           <label htmlFor="term3" className="ml-3 flex-1">
//                             I have read and accepted the terms and conditions as well as the privacy statement.
//                           </label>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="pt-6">
//                       <button
//                         type="submit"
//                         disabled={paymentStatus === 'processing' || !cardFormLoaded || !allTermsAccepted}
//                         className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
//                       >
//                         {paymentStatus === 'processing' ? (
//                           <span className="flex items-center justify-center">
//                             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Processing Payment...
//                           </span>
//                         ) : (
//                           `Complete Purchase • $${planPrice.toFixed(2)}`
//                         )}
//                       </button>
                      
//                       <div className="mt-4 text-center">
//                         <Link 
//                           href="/packages"
//                           className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
//                         >
//                           Cancel and return to plans
//                         </Link>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






///////////////////////////////////////

// new code of canister working code but some issues 

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { loadSquareSdk } from '@/lib/square-payments';
// import { AuthClient } from '@dfinity/auth-client'; // Import AuthClient

// export default function CheckoutPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // States
//   const [loading, setLoading] = useState(true);
//   const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
//   const [error, setError] = useState('');
//   const [squareLoaded, setSquareLoaded] = useState(false);
//   const [cardFormLoaded, setCardFormLoaded] = useState(false);
//   const [card, setCard] = useState<any>(null);
//   const [principal, setPrincipal] = useState<string | null>(null); // Add Principal state

//   // Plan details from URL
//   const planId = searchParams.get('planId') || 'default-plan';
//   const planName = searchParams.get('planName') || 'Standard Plan';
//   const planPrice = parseFloat(searchParams.get('planPrice') || '0');

//   // Form data (unchanged)
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     country: 'US',
//     postalCode: '',
//     password: '',
//     confirmPassword: '',
//   });

//   // Terms and Conditions State (unchanged)
//   const [termsAccepted, setTermsAccepted] = useState({
//     term1: false,
//     term2: false,
//     term3: false,
//   });
//   const allTermsAccepted = Object.values(termsAccepted).every(Boolean);

//   const handleTermChange = (term: keyof typeof termsAccepted) => (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTermsAccepted(prev => ({ ...prev, [term]: e.target.checked }));
//   };

//   // Initialize Authentication and Square
//   useEffect(() => {
//     // Redirect to packages if no plan is selected
//     if (!planId || !planName || planPrice <= 0) {
//       router.push('/packages');
//       return;
//     }

//     const initialize = async () => {
//       try {
//         // Step 1: Authenticate with Internet Identity
//         const authClient = await AuthClient.create();
//         if (await authClient.isAuthenticated()) {
//           const identity = authClient.getIdentity();
//           setPrincipal(identity.getPrincipal().toText());
//           // setPrincipal('r3rfq-uwj7i-dbozw-4of5s-gd2qp-dwed7-yqvve-g6yrj-ncy65-iryf4-4ae');
//         } else {
//           await authClient.login({
//             identityProvider: 'https://identity.ic0.app', // Mainnet II
//             onSuccess: () => {
//               const identity = authClient.getIdentity();
//               setPrincipal(identity.getPrincipal().toText());
//               // setPrincipal('r3rfq-uwj7i-dbozw-4of5s-gd2qp-dwed7-yqvve-g6yrj-ncy65-iryf4-4ae');
//             },
//             onError: (err) => {
//               setError('Authentication failed. Please try again.');
//               console.error('Auth error:', err);
//             },
//           });
// //           setPrincipal(identity.getPrincipal().toText());
// // console.log("Authenticated principal:", identity.getPrincipal().toText());
//         }

//         // Step 2: Initialize Square (your existing code, assumed to work)
//         const applicationId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
//         const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
//         if (!applicationId || !locationId) {
//           throw new Error('Square configuration missing');
//         }
//         const { payments } = await loadSquareSdk(); // Assume this is defined elsewhere
//         setSquareLoaded(true);
//         const cardPayment = await payments.card();
//         await cardPayment.attach('#card-container');
//         setCard(cardPayment);
//         setCardFormLoaded(true);
//       } catch (err) {
//         console.error('Initialization error:', err);
//         setError('Failed to load payment form or authenticate. Please refresh.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     initialize();
//   }, [planId, planName, planPrice, router]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!principal) {
//       alert('Please complete authentication before proceeding.');
//       return;
//     }
//     console.log("Submitting with principal:", principal);
//     const response = await fetch('/api/process-payment', {
//       method: 'POST',
//       body: JSON.stringify({ userPrincipal: principal, /* other form data */ }),
//     });

//     // Validation
//     if (!principal) {
//       setError('Please log in with Internet Identity to proceed.');
//       return;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }
//     if (!card || !cardFormLoaded) {
//       setError('Payment form not ready. Please refresh.');
//       return;
//     }
//     if (!allTermsAccepted) {
//       setError('Please accept all terms.');
//       return;
//     }

//     setPaymentStatus('processing');

//     try {
//       const result = await card.tokenize();
//       if (result.status !== 'OK') {
//         throw new Error(result.errors[0].message);
//       }
//       const sourceId = result.token;

//       const userInfo = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         phone: formData.phone,
//         address: formData.address,
//         city: formData.city,
//         country: formData.country,
//         postalCode: formData.postalCode,
//       };

//       const response = await fetch('/api/process-payment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           sourceId,
//           amount: planPrice,
//           planId,
//           planName,
//           userInfo,
//           userPrincipal: principal, // Pass the Principal
//         }),
//       });

//       const paymentResult = await response.json();
//       if (!paymentResult.success) {
//         throw new Error(paymentResult.error || 'Payment failed');
//       }

//       setPaymentStatus('success');
//       window.location.href = `/payment-success?amount=${planPrice}`;
//     } catch (err: any) {
//       console.error('Payment error:', err);
//       setError(err.message || 'Payment error occurred.');
//       setPaymentStatus('error');
//     }
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // JSX (modified to remove login button since auth is now in useEffect)
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto mt-10">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
//           <p className="mt-2 text-gray-600">Secure checkout powered by Square</p>
//         </div>

//         {loading ? (
//           <div className="bg-white p-10 rounded-xl shadow-lg">
//             <div className="flex flex-col items-center justify-center space-y-4">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//               <p className="text-center text-gray-700 font-medium">Preparing your secure checkout...</p>
//             </div>
//           </div>
//         ) : !principal ? (
//           <div className="text-center">
//             <p className="text-red-600">Authenticating with Internet Identity... Please complete the login in the popup.</p>
//           </div>
//         ) : (
//           // Rest of your JSX remains the same, just ensure form uses handleSubmit
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Order Summary Section (unchanged) */}
//             <div className="lg:col-span-1">
//               <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
//                 <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-4">Order Summary</h2>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Plan</span>
//                     <span className="font-medium text-gray-800">{planName}</span>
//                   </div>
//                   <div className="border-t border-gray-200 pt-4 mb-4"></div>
//                   <div className="flex justify-between items-center text-lg">
//                     <span className="font-medium">Total</span>
//                     <span className="font-bold text-blue-700">${planPrice.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Checkout Form Section (unchanged except form handler) */}
//             {/* <div className="lg:col-span-2">
//               {paymentStatus === 'success' ? (
//                 <div className="bg-white p-8 rounded-xl shadow-lg text-center">
//                   <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Successful!</h2>
//                   <p className="text-lg text-gray-600 mb-6">Redirecting...</p>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
//                   {error && (
//                     <div className="bg-red-50 border */}










                
//               {/* Checkout Form Section */}
//               <div className="lg:col-span-2">
//                    {paymentStatus === 'success' ? (
//                     <div className="bg-white p-8 rounded-xl shadow-lg text-center">
//                       <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                         <svg
//                           className="w-10 h-10 text-green-600"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M5 13l4 4L19 7"
//                           />
//                         </svg>
//                      </div>
//                       <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Successful!</h2>
//                        <p className="text-lg text-gray-600 mb-6">
//                          Thank you for your subscription. Your account is being created.
//                       </p>
//                        <div className="mt-8">
//                          <div className="animate-pulse flex justify-center space-x-2 text-gray-500">
//                            <span>Redirecting you</span>
//                            <span className="flex space-x-1">
//                              <span className="animate-bounce">.</span>
//                              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
//                              <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
//                            </span>
//                          </div>
//                        </div>
//                      </div> 
//                    ) : (
//                     <div className="bg-white p-8 rounded-xl shadow-lg">
//                       {error && (
//                         <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//                           <div className="flex items-start">
//                             <div className="flex-shrink-0">
//                               <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                               </svg>
//                             </div>
//                             <div className="ml-3">
//                               <p className="text-sm">{error}</p>
//                             </div>
//                           </div>
//                         </div>
//                       )} 
                      
//                       <form onSubmit={handleSubmit} className="space-y-6">
//                          <div>
//                            <h3 className="text-xl font-bold text-gray-800 mb-4">Account Information</h3>
                          
//                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                              <div>
//                                <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1 text-sm">
//                                  First Name
//                                </label>
//                                <input
//                                  type="text"
//                                  id="firstName"
//                                  name="firstName"
//                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                  value={formData.firstName}
//                                  onChange={handleInputChange}
//                                  required 
//                                />
//                              </div>
                            
  
//                              <div>

//                               <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1 text-sm">

//                              Last Name

//                            </label>
//                            <input 
//                                 type="text"
//                                 id="lastName"
//                                 name="lastName"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 value={formData.lastName}
//                                 onChange={handleInputChange}
//                                 required
//                               />
//                             </div>
//                           </div>
                          
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                             <div>
//                               <label htmlFor="email" className="block text-gray-700 font-medium mb-1 text-sm">
//                                 Email Address
//                               </label>
//                               <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 required
//                               />
//                             </div>
                            
//                             <div>
//                               <label htmlFor="phone" className="block text-gray-700 font-medium mb-1 text-sm">
//                                 Phone Number
//                               </label>
//                               <input
//                                 type="tel"
//                                 id="phone"
//                                 name="phone"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 value={formData.phone}
//                                 onChange={handleInputChange}
//                                 required
//                               />
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="border-t border-gray-200 pt-6">
//                           <h3 className="text-xl font-bold text-gray-800 mb-4">Billing Address</h3>
                          
//                           <div className="space-y-4">
//                             <div>
//                               <label htmlFor="address" className="block text-gray-700 font-medium mb-1 text-sm">
//                                 Street Address
//                               </label>
//                               <input
//                                 type="text"
//                                 id="address"
//                                 name="address"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 value={formData.address}
//                                 onChange={handleInputChange}
//                                 required
//                               />
//                             </div>
                            
//                             <div className="grid grid-cols-2 gap-4">
//                               <div>
//                                 <label htmlFor="city" className="block text-gray-700 font-medium mb-1 text-sm">
//                                   City
//                                 </label>
//                                 <input
//                                   type="text"
//                                   id="city"
//                                   name="city"
//                                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                   value={formData.city}
//                                   onChange={handleInputChange}
//                                   required
//                                 />
//                               </div>
                              
//                               <div>
//                                 <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-1 text-sm">
//                                   Postal Code
//                                 </label>
//                                 <input
//                                   type="text"
//                                   id="postalCode"
//                                   name="postalCode"
//                                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                   value={formData.postalCode}
//                                   onChange={handleInputChange}
//                                   required
//                                 />
//                               </div>
//                             </div>
                            
//                             <div>
//                               <label htmlFor="country" className="block text-gray-700 font-medium mb-1 text-sm">
//                                 Country
//                               </label>
//                               <select
//                                 id="country"
//                                 name="country"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                                 value={formData.country}
//                                 onChange={handleSelectChange}
//                                 required
//                               >
//                                 <option value="US">United States</option>
//                                 <option value="CA">Canada</option>
//                                 <option value="GB">United Kingdom</option>
//                                 <option value="AU">Australia</option>
//                                 <option value="DE">Germany</option>
//                                 <option value="FR">France</option>
//                                 <option value="JP">Japan</option>
//                               </select>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="border-t border-gray-200 pt-6">
//                           <h3 className="text-xl font-bold text-gray-800 mb-4">Create Account</h3>
                          
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                               <label htmlFor="password" className="block text-gray-700 font-medium mb-1 text-sm">
//                                 Password
//                               </label>
//                               <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 value={formData.password}
//                                 onChange={handleInputChange}
//                                 required
//                                 minLength={8}
//                               />
//                               <p className="mt-1 text-xs text-gray-500">Minimum 8 characters</p>
//                             </div>
                            
//                           <div>
//                               <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1 text-sm">
//                                 Confirm Password
//                               </label>
//                               <input
//                                 type="password"
//                                 id="confirmPassword"
//                                 name="confirmPassword"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 value={formData.confirmPassword}
//                                 onChange={handleInputChange}
//                                 required
//                                 minLength={8}
//                               />
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="border-t border-gray-200 pt-6">
//                           <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h3>
                          
//                           <div id="card-container" className="p-4 border border-gray-300 rounded-lg min-h-[160px] bg-gray-50"></div>
//                           <div className="flex items-center mt-2 text-xs text-gray-600">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                             </svg>
//                             Your payment information is securely processed by Square.
//                           </div>
//                         </div>
                        
//                         {/* Terms and Conditions Section */}
//                         <div className="border-t border-gray-200 pt-6">
//                           <h3 className="text-xl font-bold text-gray-800 mb-4">Terms and Conditions</h3>
//                           <div className="space-y-4 text-sm text-gray-700 max-h-64 overflow-y-auto pr-2">
//                             <div className="flex items-start">
//                               <input
//                                 type="checkbox"
//                                 id="term1"
//                                 checked={termsAccepted.term1}
//                                 onChange={handleTermChange('term1')}
//                                 required
//                                 className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                               />
//                               <label htmlFor="term1" className="ml-3 flex-1">
//                                 I don&apos;t feel pressured to buy this product and am choosing to purchase it of my own accord.
//                               </label>
//                             </div>
//                             <div className="flex items-start">
//                               <input
//                                 type="checkbox"
//                                 id="term2"
//                                 checked={termsAccepted.term2}
//                                 onChange={handleTermChange('term2')}
//                                 required
//                                 className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                               />
//                               <label htmlFor="term2" className="ml-3 flex-1">
//                                 I am purchasing a subscription that will be delivered within the specified timeframe. 
//                                 I acknowledge that once the service is delivered, I am not eligible for a refund.
//                               </label>
//                             </div>
//                             <div className="flex items-start">
//                               <input
//                                 type="checkbox"
//                                 id="term3"
//                                 checked={termsAccepted.term3}
//                                 onChange={handleTermChange('term3')}
//                                 required
//                                 className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                               />
//                               <label htmlFor="term3" className="ml-3 flex-1">
//                                 I have read and accepted the terms and conditions as well as the privacy statement.
//                               </label>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="pt-6">
//                           <button
//                             type="submit"
//                             disabled={paymentStatus === 'processing' || !cardFormLoaded || !allTermsAccepted}
//                             className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
//                           >
//                             {paymentStatus === 'processing' ? (
//                               <span className="flex items-center justify-center">
//                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                                 Processing Payment...
//                               </span>
//                             ) : (
//                               `Complete Purchase • $${planPrice.toFixed(2)}`
//                             )}
//                           </button>
                          
//                           <div className="mt-4 text-center">
//                             <Link 
//                               href="/packages"
//                               className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
//                             >
//                               Cancel and return to plans
//                             </Link>
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       );
//     }











 
//////////////////////////////////////////////////////////////////

// UPDATED CHECKOUT CODE WITH CANISTER WORKING




// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { loadSquareSdk } from '@/lib/square-payments';
// import { AuthClient } from '@dfinity/auth-client';

// export default function CheckoutPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // States
//   const [loading, setLoading] = useState(true);
//   const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
//   const [error, setError] = useState<string | null>(null); // Initially null to avoid flash of error
//   const [squareLoaded, setSquareLoaded] = useState(false);
//   const [cardFormLoaded, setCardFormLoaded] = useState(false);
//   const [card, setCard] = useState<any>(null);
//   const [principal, setPrincipal] = useState<string | null>(null);

//   // Plan details from URL
//   const planId = searchParams.get('planId') || 'default-plan';
//   const planName = searchParams.get('planName') || 'Standard Plan';
//   const planPrice = parseFloat(searchParams.get('planPrice') || '0');

//   // Form data
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     country: 'US',
//     postalCode: '',
//     password: '',
//     confirmPassword: '',
//   });

//   // Terms and Conditions State
//   const [termsAccepted, setTermsAccepted] = useState({
//     term1: false,
//     term2: false,
//     term3: false,
//   });
//   const allTermsAccepted = Object.values(termsAccepted).every(Boolean);

//   const handleTermChange = (term: keyof typeof termsAccepted) => (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTermsAccepted(prev => ({ ...prev, [term]: e.target.checked }));
//   };

//   // Handle input changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Initialize Authentication and Square
//   // useEffect(() => {
//   //   if (!planId || !planName || planPrice <= 0) {
//   //     router.push('/packages');
//   //     return;
//   //   }

//   //   const initialize = async () => {
//   //     setLoading(true);
//   //     setError(null); // Reset error on initialization

//   //     try {
//   //       // Step 1: Force ICP Authentication every time
//   //       const authClient = await AuthClient.create();
//   //       // Always log out existing session to force re-authentication
//   //       await authClient.logout();
//   //       await authClient.login({
//   //         identityProvider: 'https://identity.ic0.app', // Mainnet II
//   //         onSuccess: () => {
//   //           const identity = authClient.getIdentity();
//   //           const userPrincipal = identity.getPrincipal().toText();
//   //           setPrincipal(userPrincipal);
//   //           console.log('Authenticated principal:', userPrincipal);
//   //         },
//   //         onError: (err) => {
//   //           setError('Authentication failed. Please try again.');
//   //           console.error('Auth error:', err);
//   //         },
//   //       });

//   //       // Step 2: Initialize Square only after authentication
//   //       if (!principal) return; // Wait for principal before proceeding

//   //       const applicationId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
//   //       const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
//   //       if (!applicationId || !locationId) {
//   //         throw new Error('Square configuration missing');
//   //       }

//   //       const { payments } = await loadSquareSdk();
//   //       setSquareLoaded(true);

//   //       const cardPayment = await payments.card();
//   //       await cardPayment.attach('#card-container');
//   //       setCard(cardPayment);
//   //       setCardFormLoaded(true);
//   //     } catch (err) {
//   //       console.error('Initialization error:', err);
//   //       setError(err instanceof Error ? err.message : 'Failed to initialize checkout. Please refresh.');
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   initialize();
//   // }, [planId, planName, planPrice, router]); // Remove principal from deps to avoid re-triggering

//   // Handle ICP Authentication
// useEffect(() => {
//   if (!planId || !planName || planPrice <= 0) {
//     router.push('/packages');
//     return;
//   }

//   const authenticate = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const authClient = await AuthClient.create();
//       // Force logout to ensure every user authenticates
//       await authClient.logout();
//       await authClient.login({
//         identityProvider: 'https://identity.ic0.app',
//         onSuccess: () => {
//           const identity = authClient.getIdentity();
//           const userPrincipal = identity.getPrincipal().toText();
//           setPrincipal(userPrincipal);
//           console.log('Authenticated principal:', userPrincipal);
//         },
//         onError: (err) => {
//           setError('Authentication failed. Please try again.');
//           console.error('Auth error:', err);
//         },
//       });
//     } catch (err) {
//       console.error('Authentication initialization error:', err);
//       setError('Failed to initialize authentication. Please refresh.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   authenticate();
// }, [planId, planName, planPrice, router]);

// // Handle Square Initialization
// useEffect(() => {
//   if (!principal || !squareLoaded) return; // Wait for authentication and Square SDK to be ready

//   const initializeSquare = async () => {
//     try {
//       const applicationId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
//       const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
//       if (!applicationId || !locationId) {
//         throw new Error('Square configuration missing');
//       }

//       console.log('Initializing Square with applicationId:', applicationId, 'and locationId:', locationId);

//       const { payments } = await loadSquareSdk();
//       setSquareLoaded(true);

//       const cardPayment = await payments.card();
//       console.log('Square card payment object created:', cardPayment);

//       // Ensure the DOM element exists before attaching
//       const cardContainer = document.getElementById('card-container');
//       if (!cardContainer) {
//         throw new Error('Card container element not found in DOM');
//       }

//       await cardPayment.attach('#card-container');
//       console.log('Square card form attached successfully');
//       setCard(cardPayment);
//       setCardFormLoaded(true);
//     } catch (err) {
//       console.error('Square initialization error:', err);
//       setError('Failed to load Square payment form. Please refresh.');
//     }
//   };

//   initializeSquare();
// }, [principal, squareLoaded]); // Run when principal or squareLoaded changes

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (!principal) {
//       setError('Please complete authentication before proceeding.');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     if (!card || !cardFormLoaded) {
//       setError('Payment form not ready. Please refresh.');
//       return;
//     }

//     if (!allTermsAccepted) {
//       setError('Please accept all terms.');
//       return;
//     }

//     setPaymentStatus('processing');

//     try {
//       const result = await card.tokenize();
//       if (result.status !== 'OK') {
//         throw new Error(result.errors[0].message);
//       }
//       const sourceId = result.token;

//       const userInfo = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         phone: formData.phone,
//         address: formData.address,
//         city: formData.city,
//         country: formData.country,
//         postalCode: formData.postalCode,
//       };

//       const response = await fetch('/api/process-payment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           sourceId,
//           amount: planPrice,
//           planId,
//           planName,
//           userInfo,
//           userPrincipal: principal,
//         }),
//       });

//       const paymentResult = await response.json();
//       if (!paymentResult.success) {
//         throw new Error(paymentResult.error || 'Payment failed');
//       }

//       setPaymentStatus('success');
//       window.location.href = `/payment-success?amount=${planPrice}`;
//     } catch (err: any) {
//       console.error('Payment error:', err);
//       setError(err.message || 'Payment error occurred.');
//       setPaymentStatus('error');
//     }
//   };

//   // JSX
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto mt-10">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
//           <p className="mt-2 text-gray-600">Secure checkout powered by Square</p>
//         </div>

//         {loading ? (
//           <div className="bg-white p-10 rounded-xl shadow-lg">
//             <div className="flex flex-col items-center justify-center space-y-4">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//               <p className="text-center text-gray-700 font-medium">Preparing your secure checkout...</p>
//             </div>
//           </div>
//         ) : !principal ? (
//           <div className="text-center">
//             <p className="text-red-600">Authenticating with Internet Identity... Please complete the login in the popup.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Order Summary Section */}
//             <div className="lg:col-span-1">
//               <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
//                 <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-4">Order Summary</h2>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Plan</span>
//                     <span className="font-medium text-gray-800">{planName}</span>
//                   </div>
//                   <div className="border-t border-gray-200 pt-4 mb-4"></div>
//                   <div className="flex justify-between items-center text-lg">
//                     <span className="font-medium">Total</span>
//                     <span className="font-bold text-blue-700">${planPrice.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Checkout Form Section */}
//             <div className="lg:col-span-2">
//               {paymentStatus === 'success' ? (
//                 <div className="bg-white p-8 rounded-xl shadow-lg text-center">
//                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <svg
//                       className="w-10 h-10 text-green-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 13l4 4L19 7"
//                       />
//                     </svg>
//                   </div>
//                   <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Successful!</h2>
//                   <p className="text-lg text-gray-600 mb-6">
//                     Thank you for your subscription. Your account is being created.
//                   </p>
//                   <div className="mt-8">
//                     <div className="animate-pulse flex justify-center space-x-2 text-gray-500">
//                       <span>Redirecting you</span>
//                       <span className="flex space-x-1">
//                         <span className="animate-bounce">.</span>
//                         <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
//                           .
//                         </span>
//                         <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>
//                           .
//                         </span>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-white p-8 rounded-xl shadow-lg">
//                   {error && (
//                     <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//                       <div className="flex items-start">
//                         <div className="flex-shrink-0">
//                           <svg
//                             className="h-5 w-5 text-red-500"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                             aria-hidden="true"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </div>
//                         <div className="ml-3">
//                           <p className="text-sm">{error}</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-800 mb-4">Account Information</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label
//                             htmlFor="firstName"
//                             className="block text-gray-700 font-medium mb-1 text-sm"
//                           >
//                             First Name
//                           </label>
//                           <input
//                             type="text"
//                             id="firstName"
//                             name="firstName"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.firstName}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="lastName"
//                             className="block text-gray-700 font-medium mb-1 text-sm"
//                           >
//                             Last Name
//                           </label>
//                           <input
//                             type="text"
//                             id="lastName"
//                             name="lastName"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.lastName}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                         <div>
//                           <label
//                             htmlFor="email"
//                             className="block text-gray-700 font-medium mb-1 text-sm"
//                           >
//                             Email Address
//                           </label>
//                           <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="phone"
//                             className="block text-gray-700 font-medium mb-1 text-sm"
//                           >
//                             Phone Number
//                           </label>
//                           <input
//                             type="tel"
//                             id="phone"
//                             name="phone"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.phone}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="border-t border-gray-200 pt-6">
//                       <h3 className="text-xl font-bold text-gray-800 mb-4">Billing Address</h3>
//                       <div className="space-y-4">
//                         <div>
//                           <label
//                             htmlFor="address"
//                             className="block text-gray-700 font-medium mb-1 text-sm"
//                           >
//                             Street Address
//                           </label>
//                           <input
//                             type="text"
//                             id="address"
//                             name="address"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.address}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <label
//                               htmlFor="city"
//                               className="block text-gray-700 font-medium mb-1 text-sm"
//                             >
//                               City
//                             </label>
//                             <input
//                               type="text"
//                               id="city"
//                               name="city"
//                               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               value={formData.city}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                           <div>
//                             <label
//                               htmlFor="postalCode"
//                               className="block text-gray-700 font-medium mb-1 text-sm"
//                             >
//                               Postal Code
//                             </label>
//                             <input
//                               type="text"
//                               id="postalCode"
//                               name="postalCode"
//                               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               value={formData.postalCode}
//                               onChange={handleInputChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="country"
//                             className="block text-gray-700 font-medium mb-1 text-sm"
//                           >
//                             Country
//                           </label>
//                           <select
//                             id="country"
//                             name="country"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                             value={formData.country}
//                             onChange={handleSelectChange}
//                             required
//                           >
//                             <option value="US">United States</option>
//                             <option value="CA">Canada</option>
//                             <option value="GB">United Kingdom</option>
//                             <option value="AU">Australia</option>
//                             <option value="DE">Germany</option>
//                             <option value="FR">France</option>
//                             <option value="JP">Japan</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="border-t border-gray-200 pt-6">
//                       <h3 className="text-xl font-bold text-gray-800 mb-4">Create Account</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label
//                             htmlFor="password"
//                             className="block text-gray-700 font-medium mb-1 text-sm"
//                           >
//                             Password
//                           </label>
//                           <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             required
//                             minLength={8}
//                           />
//                           <p className="mt-1 text-xs text-gray-500">Minimum 8 characters</p>
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="confirmPassword"
//                             className="block text-gray-700 font-medium mb-1 text-sm"
//                           >
//                             Confirm Password
//                           </label>
//                           <input
//                             type="password"
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             value={formData.confirmPassword}
//                             onChange={handleInputChange}
//                             required
//                             minLength={8}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="border-t border-gray-200 pt-6">
//                       <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h3>
//                       <div
//                         id="card-container"
//                         className="p-4 border border-gray-300 rounded-lg min-h-[160px] bg-gray-50"
//                       ></div>
//                       <div className="flex items-center mt-2 text-xs text-gray-600">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 text-gray-500 mr-1"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                           />
//                         </svg>
//                         Your payment information is securely processed by Square.
//                       </div>
//                     </div>

//                     {/* Terms and Conditions Section */}
//                     <div className="border-t border-gray-200 pt-6">
//                       <h3 className="text-xl font-bold text-gray-800 mb-4">Terms and Conditions</h3>
//                       <div className="space-y-4 text-sm text-gray-700 max-h-64 overflow-y-auto pr-2">
//                         <div className="flex items-start">
//                           <input
//                             type="checkbox"
//                             id="term1"
//                             checked={termsAccepted.term1}
//                             onChange={handleTermChange('term1')}
//                             required
//                             className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                           />
//                           <label htmlFor="term1" className="ml-3 flex-1">
//                             I don&apos;t feel pressured to buy this product and am choosing to purchase it of my own
//                             accord.
//                           </label>
//                         </div>
//                         <div className="flex items-start">
//                           <input
//                             type="checkbox"
//                             id="term2"
//                             checked={termsAccepted.term2}
//                             onChange={handleTermChange('term2')}
//                             required
//                             className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                           />
//                           <label htmlFor="term2" className="ml-3 flex-1">
//                             I am purchasing a subscription that will be delivered within the specified timeframe. I
//                             acknowledge that once the service is delivered, I am not eligible for a refund.
//                           </label>
//                         </div>
//                         <div className="flex items-start">
//                           <input
//                             type="checkbox"
//                             id="term3"
//                             checked={termsAccepted.term3}
//                             onChange={handleTermChange('term3')}
//                             required
//                             className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                           />
//                           <label htmlFor="term3" className="ml-3 flex-1">
//                             I have read and accepted the terms and conditions as well as the privacy statement.
//                           </label>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="pt-6">
//                       <button
//                         type="submit"
//                         disabled={paymentStatus === 'processing' || !cardFormLoaded || !allTermsAccepted}
//                         className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
//                       >
//                         {paymentStatus === 'processing' ? (
//                           <span className="flex items-center justify-center">
//                             <svg
//                               className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                             >
//                               <circle
//                                 className="opacity-25"
//                                 cx="12"
//                                 cy="12"
//                                 r="10"
//                                 stroke="currentColor"
//                                 strokeWidth="4"
//                               ></circle>
//                               <path
//                                 className="opacity-75"
//                                 fill="currentColor"
//                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                               ></path>
//                             </svg>
//                             Processing Payment...
//                           </span>
//                         ) : (
//                           `Complete Purchase • $${planPrice.toFixed(2)}`
//                         )}
//                       </button>

//                       <div className="mt-4 text-center">
//                         <Link
//                           href="/packages"
//                           className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
//                         >
//                           Cancel and return to plans
//                         </Link>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }














//////////////////////////////////////////////////////////////////



'use client';

// export const dynamic = "force-dynamic";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { loadSquareSdk } from '@/lib/square-payments';
import { AuthClient } from '@dfinity/auth-client';
import {EmergencyServiceClient} from "@/lib/canister";
// import type { Principal } from "@dfinity/principal";
import { Principal } from '@dfinity/principal';
import { MembershipTier } from '@/lib/canister';
import { UserProfile } from "@/lib/canister";
import Header from '@/components/Header';
import { Suspense } from "react";

interface CardPayment {
  tokenize: () => Promise<{
    status: string; // "OK" indicates success; other strings indicate errors.
    token: string;
    errors?: Array<{ message: string }>;
    details?: {
      card?: {
        cardBrand?: string;
        last4?: string;
      };
    };
  }>;
  attach: (selector: string) => Promise<void>;
}




const mapPlanNameToMembershipTier = (planName: string): MembershipTier => {
  const normalizedPlanName = planName.replace(/\s+/g, '').toLowerCase();
  switch (normalizedPlanName) {
    case 'singlediamond':
      return { Basic: null };
    case 'doublediamond':
      return { Standard: null };
    case 'premiumplan': // Add more mappings as needed
      return { Premium: null };
    case 'professionalplan':
      return { Professional: null };
    case 'enterpriseplan':
      return { Enterprise: null };
    default:
      return { Free: null }; // Fallback to Free tier if planName doesn't match
  }
};

// export default function CheckoutPage() {
const Checkout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // States
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [,setSquareLoaded] = useState(false);
  const [cardFormLoaded, setCardFormLoaded] = useState(false);
  // const [card, setCard] = useState<CardPayment>(null);
  const [card, setCard] = useState<CardPayment | null>(null);

  const [principal, setPrincipal] = useState<string | null>(null);

  // Plan details from URL
  const planId = searchParams.get('planId') || 'default-plan';
  const planName = searchParams.get('planName') || 'Standard Plan';
  const planPrice = parseFloat(searchParams.get('planPrice') || '0');

  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'US',
    postalCode: '',
    password: '',
    confirmPassword: '',
  });

  // Terms and Conditions State
  const [termsAccepted, setTermsAccepted] = useState({
    term1: false,
    term2: false,
    term3: false,
  });
  const allTermsAccepted = Object.values(termsAccepted).every(Boolean);

  const handleTermChange = (term: keyof typeof termsAccepted) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(prev => ({ ...prev, [term]: e.target.checked }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle ICP Authentication
  useEffect(() => {
    if (!planId || !planName || planPrice <= 0) {
      router.push('/packages');
      return;
    }

    const authenticate = async () => {
      setLoading(true);
      setError(null);

      try {
        const authClient = await AuthClient.create();
        await authClient.logout();
        await authClient.login({
          identityProvider: 'https://identity.ic0.app',
          onSuccess: () => {
            const identity = authClient.getIdentity();
            const userPrincipal = identity.getPrincipal().toText();
            setPrincipal(userPrincipal);
            console.log('Authenticated principal:', userPrincipal);
          },
          onError: (err) => {
            setError('Authentication failed. Please try again.');
            console.error('Auth error:', err);
          },
        });
      } catch (err) {
        console.error('Authentication initialization error:', err);
        setError('Failed to initialize authentication. Please refresh.');
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, [planId, planName, planPrice, router]);

  // Handle Square Initialization with Retry
  useEffect(() => {
    if (!principal) return;

    const initializeSquare = async (retryCount = 0, maxRetries = 3) => {
      try {
        const applicationId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
        const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
        console.log('Square App ID:', applicationId);
        console.log('Square Location ID:', locationId);

        if (!applicationId || !locationId) {
          throw new Error('Square configuration missing');
        }

        const { payments } = await loadSquareSdk();
        setSquareLoaded(true);

        const cardPayment = await payments.card();
        console.log('Square card payment object created:', cardPayment);

        // Wait for DOM to be ready
        const waitForElement = (id: string, timeout = 5000): Promise<HTMLElement> => {
          return new Promise((resolve, reject) => {
            const start = Date.now();
            const check = () => {
              const element = document.getElementById(id) as HTMLElement;
              if (element) {
                resolve(element);
              } else if (Date.now() - start > timeout) {
                reject(new Error(`Element #${id} not found after ${timeout}ms`));
              } else {
                setTimeout(check, 100);
              }
            };
            check();
          });
        };

        await waitForElement('card-container');
        await cardPayment.attach('#card-container');
        console.log('Square card form attached successfully');
        setCard(cardPayment);
        setCardFormLoaded(true);
      } catch (err) {
        console.error('Square initialization error (attempt ' + (retryCount + 1) + '):', err);
        if (retryCount < maxRetries) {
          console.log('Retrying Square initialization...');
          setTimeout(() => initializeSquare(retryCount + 1, maxRetries), 1000);
        } else {
          setError('Failed to load Square payment form after multiple attempts. Please refresh.');
        }
      }
    };

    initializeSquare();
  }, [principal]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);

  //   if (!principal) {
  //     setError('Please complete authentication before proceeding.');
  //     return;
  //   }

  //   if (formData.password !== formData.confirmPassword) {
  //     setError('Passwords do not match.');
  //     return;
  //   }

  //   if (!card || !cardFormLoaded) {
  //     setError('Payment form not ready. Please refresh.');
  //     return;
  //   }

  //   if (!allTermsAccepted) {
  //     setError('Please accept all terms.');
  //     return;
  //   }

  //   setPaymentStatus('processing');

  //   try {
  //     const result = await card.tokenize();
  //     if (result.status !== 'OK') {
  //       throw new Error(result.errors[0].message);
  //     }
  //     const sourceId = result.token;

  //     const userInfo = {
  //       firstName: formData.firstName,
  //       lastName: formData.lastName,
  //       email: formData.email,
  //       phone: formData.phone,
  //       address: formData.address,
  //       city: formData.city,
  //       country: formData.country,
  //       postalCode: formData.postalCode,
  //     };

  //     const response = await fetch('/api/process-payment', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         sourceId,
  //         amount: planPrice,
  //         planId,
  //         planName,
  //         userInfo,
  //         userPrincipal: principal,
  //       }),
  //     });

  //     const paymentResult = await response.json();
  //     if (!paymentResult.success) {
  //       throw new Error(paymentResult.error || 'Payment failed');
  //     }

  //     // const membershipTier: MembershipTier = {
  //     //   [planName.replace(/\s+/g, '')]: null,
  //     // };
      
  //     // if (!Object.keys(membershipTier).some(key => ['Enterprise', 'Free', 'Basic', 'Standard', 'Premium', 'Professional'].includes(key))) {
  //     //   throw new Error('Invalid membership tier');
  //     // }

  //     // Create user in canister after successful payment
  //   const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID || "be2us-64aaa-aaaaa-qaabq-cai";
  //   const canisterClient = new EmergencyServiceClient(canisterId);
  //   const userProfile = {
  //     name: `${formData.firstName} ${formData.lastName}`,
  //     email: formData.email,
  //     phone: formData.phone,
  //     address: `${formData.address}, ${formData.city}, ${formData.country} ${formData.postalCode}`,
  //     membershipTier: { [planName.replace(/\s+/g, '')]: null }, // e.g., "DoubleDiamond"
  //     paymentMethods: [
  //       {
  //         cardType: 'Unknown', // Replace with actual card type if available
  //         lastFourDigits: '****', // Replace with actual last four digits if available
  //         tokenId: sourceId,
  //       },
  //     ],
  //   };
  //   console.log('Creating user with profile:', userProfile);
  //   await canisterClient.createUser(Principal.fromText(principal), userProfile);
  //   console.log('User created successfully');

  //     setPaymentStatus('success');
  //     window.location.href = `/payment-success?amount=${planPrice}`;
  //   } catch (err: any) {
  //     console.error('Payment error:', err);
  //     setError(err.message || 'Payment error occurred.');
  //     setPaymentStatus('error');
  //   }
  // };



  // new handle submit code

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);
  
  //   if (!principal) {
  //     setError('Please complete authentication before proceeding.');
  //     return;
  //   }
  
  //   if (formData.password !== formData.confirmPassword) {
  //     setError('Passwords do not match.');
  //     return;
  //   }
  
  //   if (!card || !cardFormLoaded) {
  //     setError('Payment form not ready. Please refresh.');
  //     return;
  //   }
  
  //   if (!allTermsAccepted) {
  //     setError('Please accept all terms.');
  //     return;
  //   }
  
  //   setPaymentStatus('processing');
  
  //   try {
  //     const result = await card.tokenize();
  //     if (result.status !== 'OK') {
  //       throw new Error(result.errors[0].message);
  //     }
  //     const sourceId = result.token;
  
  //     const userInfo = {
  //       firstName: formData.firstName,
  //       lastName: formData.lastName,
  //       email: formData.email,
  //       phone: formData.phone,
  //       address: formData.address,
  //       city: formData.city,
  //       country: formData.country,
  //       postalCode: formData.postalCode,
  //     };
  
  //     const response = await fetch('/api/process-payment', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         sourceId,
  //         amount: planPrice,
  //         planId,
  //         planName,
  //         userInfo,
  //         userPrincipal: principal,
  //       }),
  //     });
  
  //     const paymentResult = await response.json();
  //     if (!paymentResult.success) {
  //       throw new Error(paymentResult.error || 'Payment failed');
  //     }
  
  //     // Create user in canister after successful payment
  //     const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID || "be2us-64aaa-aaaaa-qaabq-cai";
  //     const canisterClient = new EmergencyServiceClient(canisterId);
  //     const userProfile: Omit<UserProfile, "id" | "registrationDate" | "lastUpdated"> = {
  //       name: `${formData.firstName} ${formData.lastName}`,
  //       email: formData.email,
  //       phone: formData.phone,
  //       address: `${formData.address}, ${formData.city}, ${formData.country} ${formData.postalCode}`,
  //       membershipTier: mapPlanNameToMembershipTier(planName), // Use the mapping function
  //       paymentMethods: [
  //         {
  //           cardType: paymentResult.payment.cardDetails.card.cardBrand || 'Unknown',
  //           lastFourDigits: paymentResult.payment.cardDetails.card.last4 || '****',
  //           tokenId: sourceId,
  //         },
  //       ],
  //     };
  //     console.log('Creating user with profile:', userProfile);
  //     await canisterClient.createUser(Principal.fromText(principal), userProfile);
  //     console.log('User created successfully');
  
  //     setPaymentStatus('success');
  //     window.location.href = `/payment-success?amount=${planPrice}`;
  //   } catch (err: any) {
  //     console.error('Payment error:', err);
  //     setError(err.message || 'Payment error occurred.');
  //     setPaymentStatus('error');
  //   }
  // };




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    if (!principal) {
      setError('Please complete authentication before proceeding.');
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    if (!card || !cardFormLoaded) {
      setError('Payment form not ready. Please refresh.');
      return;
    }
  
    if (!allTermsAccepted) {
      setError('Please accept all terms.');
      return;
    }
  
    setPaymentStatus('processing');
  
    try {
      const result = await card.tokenize();
      if (result.status !== 'OK') {
        // throw new Error(result.errors[0].message);
        throw new Error(result.errors?.[0]?.message || 'An error occurred');

      }
      const sourceId = result.token;
  
      const userInfo = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        postalCode: formData.postalCode,
      };
  
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceId,
          amount: planPrice,
          planId,
          planName,
          userInfo,
          userPrincipal: principal,
        }),
      });
  
      const paymentResult = await response.json();
      if (!paymentResult.success) {
        throw new Error(paymentResult.error || 'Payment failed');
      }
  
      // Initialize canister client
      const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID || "be2us-64aaa-aaaaa-qaabq-cai";
      const canisterClient = new EmergencyServiceClient(canisterId);
  
      // Check if user already exists
      const existingUser = await canisterClient.getUserProfile(Principal.fromText(principal));
      console.log('Existing user check:', existingUser);
  
      if (!existingUser) {
        // Create user in canister if they don't exist
        const userProfile: Omit<UserProfile, "id" | "registrationDate" | "lastUpdated"> = {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}, ${formData.country} ${formData.postalCode}`,
          membershipTier: mapPlanNameToMembershipTier(planName),
          paymentMethods: [
            {
              cardType: paymentResult.payment.cardDetails.card.cardBrand || 'Unknown',
              lastFourDigits: paymentResult.payment.cardDetails.card.last4 || '****',
              tokenId: sourceId,
            },
          ],
        };
        console.log('Creating user with profile:', userProfile);
        await canisterClient.createUser(Principal.fromText(principal), userProfile);
        console.log('User created successfully');
      } else {
        console.log('User already exists, skipping createUser');
      }
  
      setPaymentStatus('success');
      window.location.href = `/payment-success?amount=${planPrice}`;
    } catch (err: unknown) {
      console.error('Payment error:', err as Error);
      setError((err as Error).message || 'Payment error occurred.');
      setPaymentStatus('error');
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto mt-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Complete Your Purchase</h1>
          <p className="mt-2 text-gray-600">Secure checkout powered by Square</p>
        </div>

        {loading ? (
          <div className="bg-white p-10 rounded-xl shadow-lg">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <p className="text-center text-gray-700 font-medium">Preparing your secure checkout...</p>
            </div>
          </div>
        ) : !principal ? (
          <div className="text-center">
            <p className="text-red-600">Authenticating with Internet Identity... Please complete the login in the popup.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-medium text-gray-800">{planName}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mb-4"></div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-blue-700">${planPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {paymentStatus === 'success' ? (
                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Successful!</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Thank you for your subscription. Your account is being created.
                  </p>
                  <div className="mt-8">
                    <div className="animate-pulse flex justify-center space-x-2 text-gray-500">
                      <span>Redirecting you</span>
                      <span className="flex space-x-1">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
                          .
                        </span>
                        <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>
                          .
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-red-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Account Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-gray-700 font-medium mb-1 text-sm"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-gray-700 font-medium mb-1 text-sm"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium mb-1 text-sm"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-gray-700 font-medium mb-1 text-sm"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Billing Address</h3>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="address"
                            className="block text-gray-700 font-medium mb-1 text-sm"
                          >
                            Street Address
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="city"
                              className="block text-gray-700 font-medium mb-1 text-sm"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="postalCode"
                              className="block text-gray-700 font-medium mb-1 text-sm"
                            >
                              Postal Code
                            </label>
                            <input
                              type="text"
                              id="postalCode"
                              name="postalCode"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="country"
                            className="block text-gray-700 font-medium mb-1 text-sm"
                          >
                            Country
                          </label>
                          <select
                            id="country"
                            name="country"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            value={formData.country}
                            onChange={handleSelectChange}
                            required
                          >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="GB">United Kingdom</option>
                            <option value="AU">Australia</option>
                            <option value="DE">Germany</option>
                            <option value="FR">France</option>
                            <option value="JP">Japan</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Create Account</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-1 text-sm"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            minLength={8}
                          />
                          <p className="mt-1 text-xs text-gray-500">Minimum 8 characters</p>
                        </div>
                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="block text-gray-700 font-medium mb-1 text-sm"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            minLength={8}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h3>
                      <div
                        id="card-container"
                        className="p-4 border border-gray-300 rounded-lg min-h-[160px] bg-gray-50"
                      ></div>
                      <div className="flex items-center mt-2 text-xs text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        Your payment information is securely processed by Square.
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Terms and Conditions</h3>
                      <div className="space-y-4 text-sm text-gray-700 max-h-64 overflow-y-auto pr-2">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="term1"
                            checked={termsAccepted.term1}
                            onChange={handleTermChange('term1')}
                            required
                            className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="term1" className="ml-3 flex-1">
                            I don&apos;t feel pressured to buy this product and am choosing to purchase it of my own
                            accord.
                          </label>
                        </div>
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="term2"
                            checked={termsAccepted.term2}
                            onChange={handleTermChange('term2')}
                            required
                            className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="term2" className="ml-3 flex-1">
                            I am purchasing a subscription that will be delivered within the specified timeframe. I
                            acknowledge that once the service is delivered, I am not eligible for a refund.
                          </label>
                        </div>
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="term3"
                            checked={termsAccepted.term3}
                            onChange={handleTermChange('term3')}
                            required
                            className="h-5 w-5 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="term3" className="ml-3 flex-1">
                            I have read and accepted the terms and conditions as well as the privacy statement.
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={paymentStatus === 'processing' || !cardFormLoaded || !allTermsAccepted}
                        className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
                      >
                        {paymentStatus === 'processing' ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing Payment...
                          </span>
                        ) : (
                          `Complete Purchase • $${planPrice.toFixed(2)}`
                        )}
                      </button>

                      <div className="mt-4 text-center">
                        <Link
                          href="/packages"
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                        >
                          Cancel and return to plans
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default function CheckoutPage() {
  return (
    <div>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
      {/* <LoginContent /> */}
      
      <Checkout />
    </Suspense>
    
    </div>
  )
}