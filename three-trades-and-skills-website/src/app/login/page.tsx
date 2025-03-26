// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function LoginPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
  
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate form
//     if (!formData.email || !formData.password) {
//       setError('Email and password are required');
//       return;
//     }
    
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: formData.email,
//           password: formData.password,
//         }),
//       });
      
//       const data = await response.json();
      
//       if (!response.ok || !data.success) {
//         throw new Error(data.error || 'Invalid credentials');
//       }
      
//       // Redirect to dashboard
//       router.push('/dashboard');
      
//     } catch (error) {
//       setError((error as Error).message || 'An unexpected error occurred');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   // Quick login buttons for demo purposes
//   const loginAsUser = async () => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: 'user@test.com',
//           password: 'user123',
//         }),
//       });
      
//       const data = await response.json();
      
//       if (!response.ok || !data.success) {
//         throw new Error(data.error || 'Failed to login as user');
//       }
      
//       router.push('/dashboard');
      
//     } catch (error) {
//       setError((error as Error).message || 'An unexpected error occurred');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   const loginAsAdmin = async () => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: 'admin@test.com',
//           password: 'admin123',
//         }),
//       });
      
//       const data = await response.json();
      
//       if (!response.ok || !data.success) {
//         throw new Error(data.error || 'Failed to login as admin');
//       }
      
//       router.push('/dashboard');
      
//     } catch (error) {
//       setError((error as Error).message || 'An unexpected error occurred');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
//       <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-900">Three Trades & Skills</h1>
//           <p className="mt-2 text-gray-600">Log in to your account</p>
//         </div>
        
//         {error && (
//           <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               value={formData.email}
//               onChange={handleInputChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="you@example.com"
//             />
//           </div>
          
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               autoComplete="current-password"
//               required
//               value={formData.password}
//               onChange={handleInputChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="••••••••"
//             />
//           </div>
          
//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                 isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//               }`}
//             >
//               {isLoading ? 'Logging in...' : 'Log in'}
//             </button>
//           </div>
//         </form>
        
//         <div className="mt-6">
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">Demo Logins</span>
//             </div>
//           </div>
          
//           <div className="mt-4 grid grid-cols-2 gap-3">
//             <button
//               type="button"
//               onClick={loginAsUser}
//               disabled={isLoading}
//               className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Demo User
//             </button>
//             <button
//               type="button"
//               onClick={loginAsAdmin}
//               disabled={isLoading}
//               className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Demo Admin
//             </button>
//           </div>
//         </div>
        
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             Don't have an account?{' '}
//             <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
//               Sign up
//             </Link>
//           </p>
//         </div>
        
//         <div className="mt-4 text-center">
//           <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-500">
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// } 













////////////////////////////////////

// LOGIN PAGE WITH ICP AUTH


// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { AuthClient } from '@dfinity/auth-client';
// import { EmergencyServiceClient } from '@/lib/canister'; // Adjust the import path as per your project structure
// import { Principal } from '@dfinity/principal';

// export default function LoginPage() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Check authentication status on page load
//   useEffect(() => {
//     const checkAuth = async () => {
//       setIsLoading(true);
//       try {
//         const authClient = await AuthClient.create();
//         if (await authClient.isAuthenticated()) {
//           const identity = authClient.getIdentity();
//           const principal = identity.getPrincipal().toText();
//           localStorage.setItem('userPrincipal', principal);

//           const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID || "be2us-64aaa-aaaaa-qaabq-cai"; // Ensure this is set in your .env
//           const canisterClient = new EmergencyServiceClient(canisterId);
//           const userProfile = await canisterClient.getUserProfile(Principal.fromText(principal));
          
//           if (userProfile) {
//             router.push('/dashboard'); // Redirect to dashboard if user has a profile
//           } else {
//             setError('You have not purchased any plan yet. Please purchase a plan to access the dashboard.');
//           }
//         }
//       } catch (err) {
//         console.error('Error checking authentication:', err);
//         setError('Failed to check authentication status. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     checkAuth();
//   }, [router]);

//   // Handle ICP login button click
//   const handleICPLogin = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const authClient = await AuthClient.create();
//       await authClient.login({
//         identityProvider: 'https://identity.ic0.app',
//         onSuccess: () => {
//           // After successful login, the page will re-render, and useEffect will handle the rest
//         },
//         onError: (err) => {
//           setError('Authentication failed. Please try again.');
//         },
//       });
//     } catch (err) {
//       setError('Failed to initialize authentication. Please refresh.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
//       <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-900">Three Trades & Skills</h1>
//           <p className="mt-2 text-gray-600">Authenticate with Internet Identity to access your account</p>
//         </div>

//         {error && (
//           <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {error && error.includes('not purchased') && (
//           <div className="mt-4 text-center">
//             <Link href="/packages" className="text-blue-600 hover:text-blue-500 font-medium">
//               Purchase a Plan
//             </Link>
//           </div>
//         )}

//         <div className="mt-6">
//           <button
//             onClick={handleICPLogin}
//             disabled={isLoading}
//             className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//               isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {isLoading ? 'Authenticating...' : 'Login with ICP'}
//           </button>
//         </div>

//         <div className="mt-6 text-center">
//           <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-500">
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }











/////////////////////////////////////////////////////////////



// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { AuthClient } from '@dfinity/auth-client';
// import { EmergencyServiceClient } from '@/lib/canister'; // Adjust this import based on your project structure
// import { Principal } from '@dfinity/principal';

// export default function LoginPage() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Function to check authentication and user profile
//   const checkAuthAndProfile = async () => {
//     setIsLoading(true);
//     try {
//       const authClient = await AuthClient.create();
//       const isAuthenticated = await authClient.isAuthenticated();
//       console.log('Is authenticated:', isAuthenticated);

//       if (isAuthenticated) {
//         const identity = authClient.getIdentity();
//         const principal = identity.getPrincipal().toText();
//         console.log('User principal:', principal);
//         localStorage.setItem('userPrincipal', principal);

//         const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID || "be2us-64aaa-aaaaa-qaabq-cai"; // Ensure this is correct in your .env
//         const canisterClient = new EmergencyServiceClient(canisterId);
//         const userProfile = await canisterClient.getUserProfile(Principal.fromText(principal));
//         console.log('User profile:', userProfile);

//         if (userProfile) {
//           console.log('Redirecting to dashboard');
//           setTimeout(() => router.push('/dashboard'), 100); // Slight delay to ensure redirect works
//         } else {
//           setError('You have not purchased any plan yet. Please purchase a plan to access the dashboard.');
//         }
//       } else {
//         console.log('User is not authenticated');
//       }
//     } catch (err) {
//       console.error('Error checking authentication or profile:', err);
//       setError('Failed to check authentication status. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Run check on page load
//   useEffect(() => {
//     checkAuthAndProfile();
//   }, [router]);

//   // Handle ICP login button click
//   const handleICPLogin = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const authClient = await AuthClient.create();
//       await authClient.login({
//         identityProvider: 'https://identity.ic0.app',
//         onSuccess: () => {
//           checkAuthAndProfile(); // Check auth and profile after login
//         },
//         onError: (err) => {
//           setError('Authentication failed. Please try again.');
//           setIsLoading(false);
//         },
//       });
//     } catch (err) {
//       setError('Failed to initialize authentication. Please refresh.');
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
//       <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-900">Three Trades & Skills</h1>
//           <p className="mt-2 text-gray-600">Authenticate with Internet Identity to access your account</p>
//         </div>

//         {error && (
//           <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {error && error.includes('not purchased') && (
//           <div className="mt-4 text-center">
//             <Link href="/packages" className="text-blue-600 hover:text-blue-500 font-medium">
//               Purchase a Plan
//             </Link>
//           </div>
//         )}

//         <div className="mt-6">
//           <button
//             onClick={handleICPLogin}
//             disabled={isLoading}
//             className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//               isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {isLoading ? 'Authenticating...' : 'Login with ICP'}
//           </button>
//         </div>

//         <div className="mt-6 text-center">
//           <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-500">
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }




//////////////////////////////////////////

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { AuthClient } from '@dfinity/auth-client';
// import { EmergencyServiceClient } from '@/lib/canister'; // Adjust this import based on your project structure
// import { Principal } from '@dfinity/principal';
// import Header from '@/components/Header';


// // export default function LoginPage() {
// const Login = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(searchParams.get('error') || null);
//   const [message, setMessage] = useState(searchParams.get('message') || null);
//   const [loginInitiated, setLoginInitiated] = useState(false);

//   // Handle ICP login button click
//   const handleICPLogin = async () => {
//     setLoginInitiated(true);
//     setIsLoading(true);
//     setError(null);
//     try {
//       const authClient = await AuthClient.create();
//       await authClient.login({
//         identityProvider: 'https://identity.ic0.app',
//         onSuccess: async () => {
//           const identity = authClient.getIdentity();
//           const principal = identity.getPrincipal().toText();
//           localStorage.setItem('userPrincipal', principal);
//           await checkUserProfile(principal);
//         },
//         onError: (err) => {
//           setError('Authentication failed. Please try again.');
//           setIsLoading(false);
//         },
//       });
//     } catch (err) {
//       setError('Failed to initialize authentication. Please refresh the page.');
//       setIsLoading(false);
//     }
//   };

//   // Check user profile and redirect accordingly
//   const checkUserProfile = async (principal: string) => {
//     try {
//       const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID || "be2us-64aaa-aaaaa-qaabq-cai";
//       const canisterClient = new EmergencyServiceClient(canisterId);
//       const userProfile = await canisterClient.getUserProfile(Principal.fromText(principal));
//       if (userProfile) {
//         router.push('/dashboard');
//       } else {
//         router.push('/login?error=no_plan');
//       }
//     } catch (err) {
//       console.error('Error checking user profile:', err);
//       setError('Failed to check your profile. Please try again.');
//       setIsLoading(false);
//     }
//   };

//   // Display message if user hasn’t purchased a plan
//   useEffect(() => {
//     if (searchParams.get('error') === 'no_plan') {
//       setMessage('Please purchase a plan to access the dashboard.');
//     }
//   }, [searchParams]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
//       <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-900">Three Trades & Skills</h1>
//           <p className="mt-2 text-gray-600">Authenticate with Internet Identity to access your account</p>
//         </div>

//         {error && (
//           <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {message && (
//           <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-yellow-700">{message}</p>
//                 <Link href="/packages" className="text-blue-600 hover:text-blue-500 font-medium">
//                   Purchase a Plan
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="mt-6">
//           <button
//             onClick={handleICPLogin}
//             disabled={isLoading}
//             className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//               isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {isLoading ? 'Authenticating...' : 'Login with ICP'}
//           </button>
//         </div>

//         <div className="mt-6 text-center">
//           <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-500">
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


// export default function LoginPage() {
//   return (
//     <div>
//       <Header />
//       <Login />
//     </div>
//   )
// }











////////////////////////////////////////

'use client';

export const dynamic = "force-dynamic";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AuthClient } from '@dfinity/auth-client';
import { EmergencyServiceClient } from '@/lib/canister';
import { Principal } from '@dfinity/principal';
import Header from '@/components/Header';
import { Suspense } from 'react';
import { 
  ArrowLeft, 
  AlertCircle, 
  AlertTriangle, 
  LogIn, 
  CreditCard,
  Loader2,
  ShieldCheck
} from 'lucide-react';

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(searchParams.get('error') || null);
  const [message, setMessage] = useState(searchParams.get('message') || null);
  const [, setLoginInitiated] = useState(false);

  const handleICPLogin = async () => {
    setLoginInitiated(true);
    setIsLoading(true);
    setError(null);
    try {
      const authClient = await AuthClient.create();
      await authClient.login({
        identityProvider: 'https://identity.ic0.app',
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toText();
          localStorage.setItem('userPrincipal', principal);
          await checkUserProfile(principal);
        },
        onError: (err) => {
          console.error("Failed",err);
          setError('Authentication failed. Please try again.');
          setIsLoading(false);
        },
      });
    } catch  {
      setError('Failed to initialize authentication. Please refresh the page.');
      setIsLoading(false);
    }
  };

  const checkUserProfile = async (principal:string) => {
    try {
      const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID || "be2us-64aaa-aaaaa-qaabq-cai";
      const canisterClient = new EmergencyServiceClient(canisterId);
      const userProfile = await canisterClient.getUserProfile(Principal.fromText(principal));
      if (userProfile) {
        router.push('/dashboard');
      } else {
        router.push('/login?error=no_plan');
      }
    } catch (err) {
      console.error('Error checking user profile:', err);
      setError('Failed to check your profile. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('error') === 'no_plan') {
      setMessage('You need to purchase a plan to access the dashboard.');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 mt-14">
      <Header />
      
      <div className="max-w-md w-full mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Three Trades & Skills</h1>
            <p className="mt-2 text-blue-100">Secure login for members</p>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {message && (
              <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-yellow-800">{message}</p>
                    <Link 
                      href="/packages" 
                      className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      <CreditCard className="w-4 h-4 mr-1" />
                      View available plans
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={handleICPLogin}
                disabled={isLoading}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all ${
                  isLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Login with Internet Identity
                  </>
                )}
              </button>

              <div className="text-center text-sm text-gray-500 my-4">
                — OR —
              </div>

              <Link
                href="/packages"
                className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                New User? Get Started
              </Link>
            </div>

            <div className="mt-6 text-center">
              <Link 
                href="/" 
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to home page
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Login;



export default function LoginPage() {
  return (
    <div>
      {/* <Header />
      <Login /> */}
       <Header />
            <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
    </div>
  )
}