// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import dynamic from 'next/dynamic';
// import Image from 'next/image';
// import { Download, Calendar, CreditCard, User, MapPin, Phone, Mail, Shield } from 'lucide-react';

// // Dynamically import the Map component to avoid SSR issues with leaflet
// const EmergencyMap = dynamic(
//   () => import('@/components/EmergencyMap'),
//   { ssr: false }
// );

// type EmergencyService = 'electrical' | 'plumbing' | 'hvac';

// const services = [
//   {
//     type: 'electrical',
//     title: 'Electrical',
//     description: 'Power outages, electrical failures, wiring issues, etc.',
//     icon: '⚡',
//   },
//   {
//     type: 'plumbing',
//     title: 'Plumbing',
//     description: 'Water leaks, pipe bursts, drainage problems, etc.',
//     icon: '🚿',
//   },
//   {
//     type: 'hvac',
//     title: 'HVAC',
//     description: 'Heating, ventilation, and air conditioning issues.',
//     icon: '❄️',
//   },
// ];

// export default function Dashboard() {
//   const [user, setUser] = useState<any>(null);
//   const [userProfile, setUserProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [emergencyType, setEmergencyType] = useState<EmergencyService | null>(null);
//   const [showEmergencyModal, setShowEmergencyModal] = useState(false);
//   const [emergencyDescription, setEmergencyDescription] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
//   const [address, setAddress] = useState('');
//   const [emergencyStatus, setEmergencyStatus] = useState<'idle' | 'submitted' | 'processing' | 'completed'>('idle');
//   const router = useRouter();

//   useEffect(() => {
//     // Get user information 
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch('/api/user/profile');
//         if (response.ok) {
//           const data = await response.json();
//           setUser(data.user);
          
//           // If we have a canister user profile, set it
//           if (data.canisterProfile) {
//             setUserProfile(data.canisterProfile);
//           }
//         } else {
//           // If not authenticated, redirect to login
//           router.push('/login');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();

//     // Get user's current location for the map
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation([position.coords.latitude, position.coords.longitude]);
//           // Get address from coordinates
//           fetchAddressFromCoords(position.coords.latitude, position.coords.longitude);
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//           // Set default location if user location is not available
//           setCurrentLocation([40.7128, -74.0060]); // New York City as default
//         }
//       );
//     }
//   }, [router]);

//   const fetchAddressFromCoords = async (lat: number, lng: number) => {
//     try {
//       // Using OpenStreetMap Nominatim for reverse geocoding
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
//       );
//       const data = await response.json();
//       if (data && data.display_name) {
//         setAddress(data.display_name);
//       }
//     } catch (error) {
//       console.error('Error fetching address:', error);
//     }
//   };

//   const handleEmergencyRequest = (type: EmergencyService) => {
//     setEmergencyType(type);
//     setShowEmergencyModal(true);
//   };

//   const closeEmergencyModal = () => {
//     setShowEmergencyModal(false);
//     setEmergencyType(null);
//     setEmergencyDescription('');
//   };

//   const submitEmergencyRequest = async () => {
//     if (!emergencyType || !emergencyDescription || !currentLocation) {
//       alert('Please complete all required information');
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const response = await fetch('/api/emergency/request', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           serviceType: emergencyType,
//           description: emergencyDescription,
//           location: {
//             latitude: currentLocation[0],
//             longitude: currentLocation[1],
//             address,
//           },
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setEmergencyStatus('submitted');
//         closeEmergencyModal();
        
//         // Show emergency in progress UI
//         setTimeout(() => {
//           setEmergencyStatus('processing');
          
//           // Simulate service provider assigned after some time
//           setTimeout(() => {
//             setEmergencyStatus('completed');
//           }, 8000);
//         }, 3000);
//       } else {
//         alert(data.error || 'Failed to submit emergency request');
//       }
//     } catch (error) {
//       console.error('Error submitting emergency request:', error);
//       alert('An error occurred while submitting your request');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await fetch('/api/auth/logout', {
//         method: 'POST',
//       });
//       router.push('/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   // Helper to format date from timestamp
//   const formatDate = (timestamp: bigint | number | undefined) => {
//     if (!timestamp) return 'N/A';
    
//     const date = new Date(Number(timestamp));
//     return new Intl.DateTimeFormat('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     }).format(date);
//   };

//   // Helper to get readable membership tier name
//   const getMembershipTierName = () => {
//     if (!userProfile?.membershipTier) return 'Free';
    
//     // Get the key from the membership tier object
//     const tierKey = Object.keys(userProfile.membershipTier)[0];
//     return tierKey;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
//           <div className="flex items-center space-x-4">
//             <span className="text-gray-600">Welcome, {user?.name || 'User'}</span>
//             <button
//               onClick={handleLogout}
//               className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
//         {/* Subscription Info & App Download */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           {/* Subscription Information */}
//           <div className="lg:col-span-2 bg-white shadow rounded-lg overflow-hidden">
//             <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
//               <h2 className="text-lg font-medium text-gray-900">Subscription Information</h2>
//             </div>
//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
//                 <div className="flex items-start">
//                   <Shield className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500">Membership Tier</h3>
//                     <p className="text-base font-medium text-gray-900">{getMembershipTierName()}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Calendar className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500">Registration Date</h3>
//                     <p className="text-base text-gray-900">{formatDate(userProfile?.registrationDate)}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <User className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
//                     <p className="text-base text-gray-900">{userProfile?.name || user?.name}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Mail className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500">Email</h3>
//                     <p className="text-base text-gray-900">{userProfile?.email || user?.email}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Phone className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500">Phone</h3>
//                     <p className="text-base text-gray-900">{userProfile?.phone || user?.phone || 'Not provided'}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <MapPin className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500">Service Address</h3>
//                     <p className="text-base text-gray-900">{userProfile?.address || user?.address || 'Not provided'}</p>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Payment Methods */}
//               {userProfile?.paymentMethods && userProfile.paymentMethods.length > 0 && (
//                 <div className="mt-6">
//                   <h3 className="text-sm font-medium text-gray-500 mb-3">Payment Methods</h3>
//                   <div className="space-y-3">
//                     {userProfile.paymentMethods.map((method: any, index: number) => (
//                       <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
//                         <CreditCard className="w-5 h-5 text-blue-500 mr-3" />
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">
//                             {method.cardType} ending in {method.lastFourDigits}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
              
//               <div className="mt-6">
//                 <Link 
//                   href="/account/settings" 
//                   className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
//                 >
//                   Update account information
//                   <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* App Download */}
//           <div className="bg-white shadow rounded-lg overflow-hidden">
//             <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
//               <h2 className="text-lg font-medium text-gray-900">Mobile App</h2>
//             </div>
//             <div className="p-6 flex flex-col items-center text-center">
//               <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                 <Download className="w-10 h-10 text-blue-600" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Get the Three Trades App</h3>
//               <p className="text-sm text-gray-600 mb-6">
//                 Access emergency services, track technicians, and manage your account on the go.
//               </p>
//               <div className="space-y-3 w-full">
//                 <a 
//                   href="#" 
//                   className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
//                 >
//                   <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M17.6,13.8l-0.5-1c0.2-0.1,0.4-0.2,0.5-0.4C19.4,10.8,20,8.9,20,7V4h-7V1H11v3H4v3c0,1.9,0.6,3.8,1.8,5.4 c0.1,0.2,0.3,0.3,0.5,0.4l-0.5,1l-2.8,5.9h2.3l2.2-4.5C7.7,15.4,7.8,15.6,8,15.7l3.8,1.9l-0.5,2.4h2.3l-0.5-2.4l3.8-1.9 c0.1-0.1,0.3-0.2,0.3-0.3l2.2,4.5h2.3L17.6,13.8z M8.6,13.4l-1.1-0.5c-1.9-1-3-3-3-5.1V6h15v1.8c0,2.1-1.1,4.1-3,5.1l-1.1,0.5 l-3.4-1.8L8.6,13.4z"></path>
//                   </svg>
//                   Download for Android
//                 </a>
//                 <a 
//                   href="#" 
//                   className="flex items-center justify-center w-full px-4 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-900 transition"
//                 >
//                   <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"></path>
//                   </svg>
//                   Download for iOS
//                 </a>
//               </div>
//               <div className="mt-6 text-xs text-gray-500">
//                 Scan this QR code with your phone camera
//               </div>
//               <div className="mt-2 p-2 bg-gray-100 rounded-lg inline-block">
//                 {/* Placeholder for QR code */}
//                 <div className="w-32 h-32 bg-white flex items-center justify-center">
//                   <span className="text-sm text-gray-400">QR Code</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {emergencyStatus === 'idle' ? (
//           <>
//             <div className="bg-white shadow rounded-lg p-6 mb-8">
//               <h2 className="text-xl font-semibold mb-4">Request Emergency Service</h2>
//               <p className="text-gray-600 mb-6">
//                 Select the type of emergency service you need. Our technicians will respond promptly.
//               </p>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {services.map((service) => (
//                   <div
//                     key={service.type}
//                     className="border rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition cursor-pointer"
//                     onClick={() => handleEmergencyRequest(service.type as EmergencyService)}
//                   >
//                     <div className="text-3xl mb-3">{service.icon}</div>
//                     <h3 className="text-lg font-medium mb-2">{service.title}</h3>
//                     <p className="text-gray-600 text-sm">{service.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold mb-4">Your Location</h2>
//               <p className="text-gray-600 mb-4">
//                 This is your current location where the emergency service will be sent.
//               </p>
              
//               <div className="h-96 rounded-lg overflow-hidden">
//                 {currentLocation ? (
//                   <EmergencyMap center={currentLocation} address={address} />
//                 ) : (
//                   <div className="h-full bg-gray-100 flex items-center justify-center">
//                     <p>Loading your location...</p>
//                   </div>
//                 )}
//               </div>
              
//               {address && (
//                 <div className="mt-4">
//                   <p className="text-sm text-gray-600">
//                     <strong>Address:</strong> {address}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </>
//         ) : emergencyStatus === 'submitted' ? (
//           <div className="bg-blue-50 shadow rounded-lg p-8 text-center">
//             <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
//               <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">Emergency Request Submitted</h2>
//             <p className="text-gray-600 mb-4">
//               We are contacting available {emergencyType} service providers in your area.
//             </p>
//             <div className="w-full max-w-xs mx-auto h-2 bg-gray-200 rounded-full overflow-hidden mt-6 mb-2">
//               <div className="h-full bg-blue-500 animate-pulse"></div>
//             </div>
//             <p className="text-sm text-gray-500">Searching for available technicians...</p>
//           </div>
//         ) : emergencyStatus === 'processing' ? (
//           <div className="bg-green-50 shadow rounded-lg p-8">
//             <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
//               <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
//               Help is on the way!
//             </h2>
//             <div className="max-w-md mx-auto">
//               <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
//                     <span className="text-xl">👨‍🔧</span>
//                   </div>
//                   <div>
//                     <h3 className="font-medium">John Smith</h3>
//                     <p className="text-sm text-gray-600">Professional {emergencyType} Technician</p>
//                   </div>
//                 </div>
//                 <div className="mt-4 pt-4 border-t border-gray-100">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Estimated arrival:</span>
//                     <span className="font-medium">15-20 minutes</span>
//                   </div>
//                   <div className="flex justify-between text-sm mt-2">
//                     <span className="text-gray-600">Rating:</span>
//                     <span className="font-medium">4.9 ⭐</span>
//                   </div>
//                 </div>
//               </div>
//               <p className="text-center text-gray-600 mb-6">
//                 Your {emergencyType} technician is on their way to your location.
//               </p>
//               <div className="h-64 rounded-lg overflow-hidden">
//                 {currentLocation && (
//                   <EmergencyMap 
//                     center={currentLocation} 
//                     address={address} 
//                     showRoute={true}
//                     technicianLocation={[
//                       currentLocation[0] + 0.01, 
//                       currentLocation[1] - 0.01
//                     ]} 
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-green-50 shadow rounded-lg p-8 text-center">
//             <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
//               <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Technician Arrived!</h2>
//             <p className="text-gray-600 mb-6">
//               Your {emergencyType} technician has arrived at your location and is ready to help.
//             </p>
//             <button
//               onClick={() => setEmergencyStatus('idle')}
//               className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-sm"
//             >
//               Close Emergency
//             </button>
//           </div>
//         )}
//       </main>

//       {/* Emergency Request Modal */}
//       {showEmergencyModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-gray-800">
//                 Request {emergencyType ? `${emergencyType.charAt(0).toUpperCase()}${emergencyType.slice(1)}` : ''} Emergency Service
//               </h2>
//               <button onClick={closeEmergencyModal} className="text-gray-400 hover:text-gray-600">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
            
//             <div className="mb-4">
//               <p className="text-red-600 text-sm font-medium mb-4">
//                 IMPORTANT: By submitting this request, your card on file will be charged immediately.
//               </p>
              
//               <label htmlFor="emergencyDescription" className="block text-gray-700 font-medium mb-2">
//                 Describe the emergency
//               </label>
//               <textarea
//                 id="emergencyDescription"
//                 rows={4}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder={`Please describe your ${emergencyType} emergency in detail...`}
//                 value={emergencyDescription}
//                 onChange={(e) => setEmergencyDescription(e.target.value)}
//                 required
//               />
//             </div>
            
//             <div className="mb-6">
//               <h3 className="font-medium text-gray-700 mb-2">Service Location:</h3>
//               <p className="text-gray-600 text-sm">{address || 'Loading your address...'}</p>
//             </div>
            
//             <div className="flex justify-between">
//               <button
//                 onClick={closeEmergencyModal}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                 disabled={submitting}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={submitEmergencyRequest}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 disabled={submitting || !emergencyDescription}
//               >
//                 {submitting ? 'Submitting...' : 'Confirm Emergency Request'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// } 










///////////////////////////////////////////////////////////////


// // NEW DASHBOArD CODe

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// // import { EmergencyServiceClient } from '@/lib/canister'; // Adjust the import path based on your project structure
// import { EmergencyServiceClient } from '@/lib/canister';
// // import {Principle}
// // import type { Principal } from "@dfinity/principal";
// import { Principal } from '@dfinity/principal';
// import Header from '@/components/Header';


// interface PurchaseDetails {
//   planName: string;
//   amount: number;
//   purchaseDate: string;
// }

// // export default function DashboardPage() {
// const DashboardPage = () => {
//   const router = useRouter();
//   const [principal, setPrincipal] = useState<string | null>(null);
//   const [userProfile, setUserProfile] = useState<any>(null);
//   const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetails | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // useEffect(() => {
//   //   const fetchUserData = async () => {
//   //     setLoading(true);
//   //     setError(null);

//   //     try {
//   //       // Get principal from localStorage
//   //       const storedPrincipal = localStorage.getItem('userPrincipal');
//   //       if (!storedPrincipal) {
//   //         router.push('/payment-success');
//   //         return;
//   //       }
//   //       setPrincipal(storedPrincipal);
//   //       const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID || "be2us-64aaa-aaaaa-qaabq-cai";

//   //       // Initialize canister client
//   //       const canisterClient = new EmergencyServiceClient(canisterId);
//   //       await canisterClient.init();

//   //       // Fetch user profile
//   //       const userProfileResult = await canisterClient.getUserProfile(storedPrincipal);
//   //       if (!userProfileResult) {
//   //         throw new Error('User profile not found');
//   //       }
//   //       setUserProfile(userProfileResult);

//   //       // Fetch purchase details (assuming stored in userProfile or a separate canister call)
//   //       // For this example, we'll mock the purchase details. Replace with actual canister call if needed.
//   //       const mockPurchaseDetails: PurchaseDetails = {
//   //         planName: userProfileResult.membershipTier ? Object.keys(userProfileResult.membershipTier)[0] : 'Unknown Plan',
//   //         amount: 150.00, // Replace with actual amount from payment or canister
//   //         purchaseDate: new Date(userProfileResult.registrationDate).toLocaleDateString(),
//   //       };
//   //       setPurchaseDetails(mockPurchaseDetails);
//   //     } catch (err) {
//   //       console.error('Error fetching user data:', err);
//   //       setError('Failed to load your dashboard. Please try again.');
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchUserData();
//   // }, [router]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true);
//       setError(null);
  
//       try {
//         // Get principal from localStorage
//         const storedPrincipal = localStorage.getItem('userPrincipal');
//         console.log('Stored Principal:', storedPrincipal);
//         if (!storedPrincipal) {
//           console.log('No principal found in localStorage, redirecting to payment-success');
//           router.push('/payment-success');
//           return;
//         }
//         setPrincipal(storedPrincipal);
  
//         // Initialize canister client
//         const canisterId = process.env.NEXT_PUBLIC_CANISTER_ID || "be2us-64aaa-aaaaa-qaabq-cai";
//         console.log('Using Canister ID:', canisterId);
//         const canisterClient = new EmergencyServiceClient(canisterId);
//         console.log('Canister client initialized');
  
//         // Fetch user profile
//         const userProfileResult = await canisterClient.getUserProfile(Principal.fromText(storedPrincipal));
//         console.log('User Profile Result:', userProfileResult);
//         if (!userProfileResult) {
//           setError('User profile not found. Please complete a purchase to create your profile.');
//           return; // Don't throw, just set an error message
//         }
//         setUserProfile(userProfileResult);
  
//         // Fetch purchase details (mocked for now)
//         const mockPurchaseDetails: PurchaseDetails = {
//           planName: userProfileResult.membershipTier ? Object.keys(userProfileResult.membershipTier)[0] : 'Unknown Plan',
//           amount: 150.00, // Replace with actual amount from payment or canister
//           purchaseDate: new Date(Number(userProfileResult.registrationDate)).toLocaleDateString(),
//         };
//         setPurchaseDetails(mockPurchaseDetails);
//       } catch (err) {
//         console.error('Error fetching user data:', err);
//         setError('Failed to load your dashboard. Please try again. Error: ' + (err instanceof Error ? err.message : String(err)));
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchUserData();
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem('userPrincipal');
//     router.push('/');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto mt-12">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
//           >
//             Logout
//           </button>
//         </div>

//         {loading ? (
//           <div className="bg-white p-10 rounded-xl shadow-lg">
//             <div className="flex flex-col items-center justify-center space-y-4">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//               <p className="text-center text-gray-700 font-medium">Loading your dashboard...</p>
//             </div>
//           </div>
//         ) : error ? (
//           <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
//             <p>{error}</p>
//           </div>
//         ) : (
//           <div className="bg-white p-8 rounded-xl shadow-lg">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome, {userProfile?.name || 'User'}!</h2>
            
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Details</h3>
//                 <div className="space-y-2 text-gray-600">
//                   <p><strong>Email:</strong> {userProfile?.email}</p>
//                   <p><strong>Phone:</strong> {userProfile?.phone}</p>
//                   <p><strong>Address:</strong> {userProfile?.address}</p>
//                   <p><strong>Membership Tier:</strong> {purchaseDetails?.planName}</p>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Purchase Details</h3>
//                 <div className="space-y-2 text-gray-600">
//                   <p><strong>Plan:</strong> {purchaseDetails?.planName}</p>
//                   <p><strong>Amount:</strong> ${purchaseDetails?.amount.toFixed(2)}</p>
//                   <p><strong>Purchase Date:</strong> {purchaseDetails?.purchaseDate}</p>
//                 </div>
//                 <div className="mt-4">
//                   <button className='bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'>
//                     Download The APP
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// export default function UserDashboardPage() {
//   return (
//     <div>
//       <Header />
//       <DashboardPage />
//     </div>
//   )
// }












//////////////////////////////////////////////////////////////////////////////////////////////


// // NEW DASHBOARD CODE


// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { EmergencyServiceClient } from '@/lib/canister';
// import { Principal } from '@dfinity/principal';
// import Header from '@/components/Header';
// import {
//   User, Shield, LogOut, Download, AlertCircle,
//   MapPin, Phone, Mail, Clock, Wrench, Zap, Droplet, Thermometer,
//   CheckCircle, Loader2, ArrowRight, Navigation
// } from 'lucide-react';
// import dynamic from 'next/dynamic';

// const EmergencyMap = dynamic(
//   () => import('@/components/EmergencyMap'),
//   { ssr: false }
// );

// interface PurchaseDetails {
//   planName: string;
//   amount: number;
//   purchaseDate: string;
// }

// const DashboardPage = () => {
//   const router = useRouter();
//   const [principal, setPrincipal] = useState<string | null>(null);
//   const [userProfile, setUserProfile] = useState<any>(null);
//   const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetails | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [emergencyStatus, setEmergencyStatus] = useState<'idle' | 'submitted' | 'processing' | 'completed'>('idle');
//   const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true);
//       try {
//         const storedPrincipal = localStorage.getItem('userPrincipal');
//         if (!storedPrincipal) {
//           router.push('/payment-success');
//           return;
//         }
        
//         setPrincipal(storedPrincipal);
//         const canisterClient = new EmergencyServiceClient(
//           process.env.NEXT_PUBLIC_CANISTER_ID || "be2us-64aaa-aaaaa-qaabq-cai"
//         );

//         const userProfileResult = await canisterClient.getUserProfile(Principal.fromText(storedPrincipal));
//         if (!userProfileResult) throw new Error('User profile not found');
        
//         setUserProfile(userProfileResult);
//         setPurchaseDetails({
//           planName: Object.keys(userProfileResult.membershipTier)[0] || 'Professional Plan',
//           amount: 150.00,
//           purchaseDate: new Date(Number(userProfileResult.registrationDate)).toLocaleDateString()
//         });

//         // Get location
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//             position => setCurrentLocation([position.coords.latitude, position.coords.longitude]),
//             () => setCurrentLocation([40.7128, -74.0060])
//           );
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to load dashboard');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem('userPrincipal');
//     router.push('/');
//   };

//   const getServiceIcon = (serviceType: string) => {
//     switch (serviceType.toLowerCase()) {
//       case 'electrical': return <Zap className="w-6 h-6" />;
//       case 'plumbing': return <Droplet className="w-6 h-6" />;
//       case 'hvac': return <Thermometer className="w-6 h-6" />;
//       default: return <Wrench className="w-6 h-6" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* <Header /> */}
      
//       <div className="flex ">
//         {/* Sidebar */}
//         <div className="w-64 bg-white h-screen p-4 border-r border-gray-200">
//           <div className="flex items-center gap-3 mb-8 p-2 bg-blue-50 rounded-lg">
//             <User className="w-5 h-5 text-blue-600" />
//             <span className="font-medium">{userProfile?.name || 'Account'}</span>
//           </div>
          
//           <nav className="space-y-1">
//             <button className="w-full flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
//               <User className="w-5 h-5" />
//               Profile
//             </button>
//             <button className="w-full flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
//               <Shield className="w-5 h-5" />
//               Membership
//             </button>
//             <button className="w-full flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
//               <Clock className="w-5 h-5" />
//               History
//             </button>
//             <button 
//               onClick={handleLogout}
//               className="w-full flex items-center gap-3 p-2 text-red-600 hover:bg-red-50 rounded-lg mt-4"
//             >
//               <LogOut className="w-5 h-5" />
//               Logout
//             </button>
//           </nav>
//         </div>

//         {/* Main Content */}
//         <main className="flex-1 p-8">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//               <p className="text-gray-600">Welcome back, {userProfile?.name || 'User'}</p>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="bg-green-100 px-3 py-1 rounded-full text-sm text-green-700">
//                 <Shield className="inline w-4 h-4 mr-1" />
//                 {purchaseDetails?.planName}
//               </div>
//             </div>
//           </div>

//           {/* Loading State */}
//           {loading && (
//             <div className="bg-white p-6 rounded-xl shadow-sm">
//               <div className="flex items-center justify-center gap-3 text-gray-600">
//                 <Loader2 className="w-5 h-5 animate-spin" />
//                 Loading dashboard...
//               </div>
//             </div>
//           )}

//           {/* Error State */}
//           {error && (
//             <div className="bg-red-50 p-4 rounded-xl flex items-center gap-3 text-red-700 mb-6">
//               <AlertCircle className="w-5 h-5" />
//               {error}
//             </div>
//           )}

//           {/* Content Grid */}
//           {!loading && !error && (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Account Card */}
//               <div className="bg-white p-6 rounded-xl shadow-sm">
//                 <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                   <User className="w-5 h-5 text-blue-600" />
//                   Account Details
//                 </h2>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <Mail className="w-5 h-5 text-gray-400" />
//                     <span>{userProfile?.email}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Phone className="w-5 h-5 text-gray-400" />
//                     <span>{userProfile?.phone || 'Not provided'}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <MapPin className="w-5 h-5 text-gray-400" />
//                     <span>{userProfile?.address || 'No address on file'}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Membership Card */}
//               <div className="bg-white p-6 rounded-xl shadow-sm">
//                 <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                   <Shield className="w-5 h-5 text-blue-600" />
//                   Membership Details
//                 </h2>
//                 <div className="space-y-3">
//                   <div>
//                     <label className="text-sm text-gray-500">Plan</label>
//                     <p className="font-medium">{purchaseDetails?.planName}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-500">Renewal Date</label>
//                     <p className="font-medium">{purchaseDetails?.purchaseDate}</p>
//                   </div>
//                   <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
//                     Manage Subscription
//                   </button>
//                 </div>
//               </div>

//               {/* Emergency Services */}
//               <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
//                 <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
//                   <AlertCircle className="w-5 h-5 text-red-600" />
//                   Emergency Services
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {['Electrical', 'Plumbing', 'HVAC'].map((service) => (
//                     <div key={service} className="p-4 border rounded-lg hover:border-blue-200 transition">
//                       <div className="flex items-center gap-3 mb-4">
//                         <div className="bg-blue-100 p-2 rounded-lg">
//                           {getServiceIcon(service)}
//                         </div>
//                         <h3 className="font-semibold">{service}</h3>
//                       </div>
//                       <button className="w-full flex items-center justify-between gap-2 text-blue-600 hover:text-blue-700">
//                         Request Service
//                         <ArrowRight className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Location Map */}
//               <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
//                 <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                   <Navigation className="w-5 h-5 text-blue-600" />
//                   Service Location
//                 </h2>
//                 <div className="h-96 rounded-lg overflow-hidden bg-gray-50">
//                   {currentLocation ? (
//                     <EmergencyMap center={currentLocation} />
//                   ) : (
//                     <div className="h-full flex items-center justify-center text-gray-500">
//                       Loading map...
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* App Download */}
//               <div className="lg:col-span-2 bg-blue-900 text-white p-6 rounded-xl">
//                 <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                   <div className="flex-1">
//                     <h3 className="text-xl font-bold mb-2">Mobile App</h3>
//                     <p className="text-blue-200 mb-4">
//                       Access emergency services, track technicians, and manage your account on the go.
//                     </p>
//                     <div className="flex gap-3">
//                       <button className="flex items-center gap-2 bg-white text-blue-900 px-4 py-2 rounded-lg">
//                         <svg className="w-5 h-5" viewBox="0 0 24 24">
//                           <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.736-1.48 3.49-2.94 1.215-1.73 1.715-3.394 1.746-3.484-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
//                         </svg>
//                         iOS App
//                       </button>
//                       <button className="flex items-center gap-2 bg-white text-blue-900 px-4 py-2 rounded-lg">
//                         <svg className="w-5 h-5" viewBox="0 0 24 24">
//                           <path d="M17.6 13.8l-.5-1c.2-.1.4-.2.5-.4 1.8-2.6 2.4-5.5 2.4-7.4V4h-7V1h-4v3H4v3c0 1.9.6 3.8 1.8 5.4.1.2.3.3.5.4l-.5 1-2.8 5.9h2.3l2.2-4.5c.1-.1.2-.3.3-.3l3.8 1.9-.5 2.4h2.3l-.5-2.4 3.8-1.9c.1-.1.2-.2.3-.3l2.2 4.5h2.3l-2.8-5.9zM8.6 13.4l-1.1-.5c-1.9-1-3-3-3-5.1V6h15v1.8c0 2.1-1.1 4.1-3 5.1l-1.1.5-3.4-1.8-3.4 1.8z"/>
//                         </svg>
//                         Android App
//                       </button>
//                     </div>
//                   </div>
//                   <div className="bg-white/10 p-4 rounded-lg">
//                     <div className="w-32 h-32 bg-white/20 rounded-lg flex items-center justify-center">
//                       <span className="text-sm">QR Code</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default function UserDashboardPage() {
//   return (
//     <div>
//       <Header />
//       <DashboardPage />
//     </div>
//   );
// }






//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EmergencyServiceClient } from '@/lib/canister';
import { Principal } from '@dfinity/principal';
// import Header from '@/components/Header';
import {UserProfile} from '@/lib/canister';
import {
  User, Shield, LogOut,  AlertCircle,
  MapPin, Phone, Mail, Clock, Wrench, Zap, Droplet, Thermometer,
   Loader2, ArrowRight, Menu, X
} from 'lucide-react';
// import dynamic from 'next/dynamic';

// const EmergencyMap = dynamic(
//   () => import('@/components/EmergencyMap'),
//   { ssr: false }
// );

interface PurchaseDetails {
  planName: string;
  amount: number;
  purchaseDate: string;
}

const DashboardPage = () => {
  const router = useRouter();
  const [, setPrincipal] = useState<string | null>(null);
  // const [userProfile, setUserProfile] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [emergencyStatus, setEmergencyStatus] = useState<'idle' | 'submitted' | 'processing' | 'completed'>('idle');
  const [, setCurrentLocation] = useState<[number, number] | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const storedPrincipal = localStorage.getItem('userPrincipal');
        if (!storedPrincipal) {
          router.push('/payment-success');
          return;
        }
        
        setPrincipal(storedPrincipal);
        const canisterClient = new EmergencyServiceClient(
          process.env.NEXT_PUBLIC_CANISTER_ID || "be2us-64aaa-aaaaa-qaabq-cai"
        );

        const userProfileResult = await canisterClient.getUserProfile(Principal.fromText(storedPrincipal));
        if (!userProfileResult) throw new Error('User profile not found');
        
        setUserProfile(userProfileResult);
        setPurchaseDetails({
          planName: Object.keys(userProfileResult.membershipTier)[0] || 'Professional Plan',
          amount: 150.00,
          purchaseDate: new Date(Number(userProfileResult.registrationDate)).toLocaleDateString()
        });

        // Get location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => setCurrentLocation([position.coords.latitude, position.coords.longitude]),
            () => setCurrentLocation([40.7128, -74.0060])
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userPrincipal');
    router.push('/');
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType.toLowerCase()) {
      case 'electrical': return <Zap className="w-6 h-6" />;
      case 'plumbing': return <Droplet className="w-6 h-6" />;
      case 'hvac': return <Thermometer className="w-6 h-6" />;
      default: return <Wrench className="w-6 h-6" />;
    }
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col ">
      {/* <Header /> */}
      
      <div className="flex flex-1 overflow-hidden ">
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={toggleMobileSidebar} 
          className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-md p-2 rounded-full"
        >
          {isMobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white 
          transform transition-transform duration-300 ease-in-out
          md:static md:block md:translate-x-0
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          h-screen p-4 border-r border-gray-200 shadow-lg md:shadow-none
        `}>
          <div className="flex items-center gap-3 mb-8 p-2 bg-blue-50 rounded-lg">
            <User className="w-5 h-5 text-blue-600" />
            <span className="font-medium">{userProfile?.name || 'Account'}</span>
          </div>
          
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <User className="w-5 h-5" />
              Profile
            </button>
            <button className="w-full flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5" />
              Membership
            </button>
            <button className="w-full flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5" />
              History
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-2 text-red-600 hover:bg-red-50 rounded-lg mt-4"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 text-sm md:text-base">Welcome back, {userProfile?.name || 'User'}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-100 px-3 py-1 rounded-full text-xs md:text-sm text-green-700">
                <Shield className="inline w-3 h-3 md:w-4 md:h-4 mr-1" />
                {purchaseDetails?.planName}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-center gap-3 text-gray-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading dashboard...
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 p-4 rounded-xl flex items-center gap-3 text-red-700 mb-6">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          {/* Content Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Account Card */}
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                <h2 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  Account Details
                </h2>
                <div className="space-y-3 text-sm md:text-base">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    <span>{userProfile?.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    <span>{userProfile?.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    <span>{userProfile?.address || 'No address on file'}</span>
                  </div>
                </div>
              </div>

              {/* Membership Card */}
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                <h2 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  Membership Details
                </h2>
                <div className="space-y-3 text-sm md:text-base">
                  <div>
                    <label className="text-xs md:text-sm text-gray-500">Plan</label>
                    <p className="font-medium">{purchaseDetails?.planName}</p>
                  </div>
                  <div>
                    <label className="text-xs md:text-sm text-gray-500">Renewal Date</label>
                    <p className="font-medium">{purchaseDetails?.purchaseDate}</p>
                  </div>
                  {/* <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm md:text-base">
                    Manage Subscription
                  </button> */}
                </div>
              </div>

              {/* Emergency Services */}
              <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-sm">
                <h2 className="text-base md:text-lg font-semibold mb-6 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
                  Emergency Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Electrical', 'Plumbing', 'HVAC'].map((service) => (
                    <div key={service} className="p-4 border rounded-lg hover:border-blue-200 transition">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          {getServiceIcon(service)}
                        </div>
                        <h3 className="font-semibold text-sm md:text-base">{service}</h3>
                      </div>
                      <button className="w-full flex items-center justify-between gap-2 text-blue-600 hover:text-blue-700 text-sm md:text-base">
                        Request Service
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Map */}
              {/* <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-sm">
                <h2 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
                  <Navigation className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  Service Location
                </h2>
                <div className="h-64 md:h-96 rounded-lg overflow-hidden bg-gray-50">
                  {currentLocation ? (
                    <EmergencyMap center={currentLocation} />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      Loading map...
                    </div>
                  )}
                </div>
              </div> */}

              {/* App Download */}
              <div className="lg:col-span-2 bg-blue-900 text-white p-4 md:p-6 rounded-xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold mb-2">Mobile App</h3>
                    <p className="text-blue-200 mb-4 text-sm md:text-base">
                      Access emergency services, track technicians, and manage your account on the go.
                    </p>
                    <div className="flex gap-3">
                      {/* <button className="flex items-center gap-2 bg-white text-blue-900 px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm">
                        <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24">
                          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.736-1.48 3.49-2.94 1.215-1.73 1.715-3.394 1.746-3.484-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                        </svg>
                        iOS App
                      </button> */}
                      <button className="flex items-center gap-2 bg-white text-blue-900 px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm">
                        <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24">
                          <path d="M17.6 13.8l-.5-1c.2-.1.4-.2.5-.4 1.8-2.6 2.4-5.5 2.4-7.4V4h-7V1h-4v3H4v3c0 1.9.6 3.8 1.8 5.4.1.2.3.3.5.4l-.5 1-2.8 5.9h2.3l2.2-4.5c.1-.1.2-.3.3-.3l3.8 1.9-.5 2.4h2.3l-.5-2.4 3.8-1.9c.1-.1.2-.2.3-.3l2.2 4.5h2.3l-2.8-5.9zM8.6 13.4l-1.1-.5c-1.9-1-3-3-3-5.1V6h15v1.8c0 2.1-1.1 4.1-3 5.1l-1.1.5-3.4-1.8-3.4 1.8z"/>
                        </svg>
                        Download App
                      </button>
                    </div>
                  </div>
                  {/* <div className="bg-white/10 p-4 rounded-lg hidden md:block">
                    <div className="w-32 h-32 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm">QR Code</span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default function UserDashboardPage() {
  return <DashboardPage />;
}