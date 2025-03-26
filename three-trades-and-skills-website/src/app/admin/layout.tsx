// // src/app/admin/layout.tsx
// import { ReactNode } from 'react';
// import { checkAuth } from '@/lib/auth';
// import { redirect } from 'next/navigation';
// // import Sidebar from '@/components/admin/Sidebar';
// import Sidebar from '@/components/admin/Sidebar';
// // import Header from '@/components/admin/Header';
// import Header from '@/components/admin/Header';

// export default async function AdminLayout({ children }: { children: ReactNode }) {
//   // Check if user is authenticated (except for login page)
//   const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/admin/login';
  
//   if (!isLoginPage) {
//     const isAuthenticated = await checkAuth();
//     if (!isAuthenticated) {
//       redirect('/admin/login');
//     }
//   }

//   // If it's the login page, render only the children without the admin layout
//   if (isLoginPage) {
//     return <>{children}</>;
//   }

//   // Otherwise, render the admin layout with sidebar and header
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }



// /////////////

// // src/app/admin/layout.tsx
// 'use client';

// import { usePathname, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(true);
  
//   // Skip authentication check on login page
//   const isLoginPage = pathname === '/admin/login';
  
//   useEffect(() => {
//     if (isLoginPage) return;
    
//     // Check if token exists
//     const hasToken = document.cookie.includes('admin_token=');
    
//     if (!hasToken) {
//       router.push('/admin/login');
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [router, isLoginPage]);
  
//   const handleLogout = async () => {
//     try {
//       await fetch('/api/admin/logout', {
//         method: 'POST',
//       });
//       router.push('/admin/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };
  
//   // Only render the admin layout if on a non-login page and authenticated
//   if (isLoginPage) {
//     return <>{children}</>;
//   }
  
//   return isAuthenticated ? (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md">
//         <div className="p-4 border-b">
//           <h2 className="text-xl font-semibold">Admin Dashboard</h2>
//         </div>
//         <nav className="p-4">
//           <ul className="space-y-2">
//             <li>
//               <a 
//                 href="/admin/dashboard" 
//                 className="block p-2 hover:bg-blue-50 rounded"
//               >
//                 Dashboard
//               </a>
//             </li>
//             <li>
//               <a 
//                 href="/admin/members" 
//                 className="block p-2 hover:bg-blue-50 rounded"
//               >
//                 Members
//               </a>
//             </li>
//             <li>
//               <a 
//                 href="/admin/emergency-calls" 
//                 className="block p-2 hover:bg-blue-50 rounded"
//               >
//                 Emergency Calls
//               </a>
//             </li>
//             <li>
//               <a 
//                 href="/admin/analytics" 
//                 className="block p-2 hover:bg-blue-50 rounded"
//               >
//                 Analytics
//               </a>
//             </li>
//             <li>
//               <a 
//                 href="/admin/settings" 
//                 className="block p-2 hover:bg-blue-50 rounded"
//               >
//                 Settings
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </div>
      
//       {/* Main content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white shadow-sm">
//           <div className="flex items-center justify-between p-4">
//             <h1 className="text-lg font-medium">Admin Panel</h1>
//             <button
//               onClick={handleLogout}
//               className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </header>
        
//         {/* Content */}
//         <main className="flex-1 overflow-auto p-4">
//           {children}
//         </main>
//       </div>
//     </div>
//   ) : null;
// }











/////////////

// // src/app/admin/layout.tsx
// 'use client';

// import { usePathname, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(true);
  
//   // Skip authentication check on login page
//   const isLoginPage = pathname === '/admin/login';
  
//   useEffect(() => {
//     if (isLoginPage) return;
    
//     // Check if token exists
//     // const hasToken = document.cookie.includes('admin_token=');
//     const hasToken = document.cookie.includes('admin_session=');
    
//     if (!hasToken) {
//       router.push('/admin/login');
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [router, isLoginPage]);
  
//   const handleLogout = async () => {
//     try {
//       await fetch('/api/admin/logout', {
//         method: 'POST',
//       });
//       router.push('/admin/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };
  
//   // Only render the admin layout if on a non-login page and authenticated
//   if (isLoginPage) {
//     return <>{children}</>;
//   }
  
//   return isAuthenticated ? (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md">
//         <div className="p-4 border-b">
//           <h2 className="text-xl font-semibold">Admin Dashboard</h2>
//         </div>
//         <nav className="p-4">
//           <ul className="space-y-2">
//             <li>
//               <a 
//                 href="/admin/dashboard" 
//                 className="block p-2 hover:bg-blue-50 rounded"
//               >
//                 Dashboard
//               </a>
//             </li>
//             <li>
//               <a 
//                 href="/admin/members" 
//                 className="block p-2 hover:bg-blue-50 rounded"
//               >
//                 Members
//               </a>
//             </li>
//             <li>
//               <a 
//                 href="/admin/emergency-calls" 
//                 className="block p-2 hover:bg-blue-50 rounded"
//               >
//                 Emergency Calls
//               </a>
//             </li>
//             <li>
//               <a 
//                 href="/admin/analytics" 
//                 className="block p-2 hover:bg-blue-50 rounded"
//               >
//                 Analytics
//               </a>
//             </li>
//             <li>
//               <a 
//                 href="/admin/settings" 
//                 className="block p-2 hover:bg-blue-50 rounded"
//               >
//                 Settings
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </div>
      
//       {/* Main content */}
//       <div className="flex-1 flex flex-col overflow-hidden ">
//         {/* Header  */}
//         <header className="bg-white shadow-sm">
//           <div className="flex items-center justify-between p-4 ">
//             <h1 className="text-lg font-medium">Admin Panel</h1>
//             <button
//               onClick={handleLogout}
//               className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </header>
        
//         {/* Content */}
//         <main className="flex-1 overflow-auto p-4">
//           {children}
//         </main>
//       </div>
//     </div>
//   ) : null;
// }








/////////////////////////////////////////////////////


// src/app/admin/layout.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isLoginPage = pathname === '/admin/login';

  // Enhanced authentication check with loading state
  useEffect(() => {
    if (isLoginPage) {
      setIsLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth-check');
        const { authenticated } = await res.json();
        
        if (!authenticated) {
          router.push('/admin/login');
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, isLoginPage]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoginPage) return <>{children}</>;
  if (isLoading) return <div className="min-h-screen bg-gray-50" />;

  return isAuthenticated ? (
    <div className="min-h-screen bg-gray-50 isolate">
      {/* Admin-specific header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900">
              Three Trades Admin
            </h1>
            <nav className="hidden md:flex space-x-6">
              <Link href="/admin/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/admin/members" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                Members
              </Link>
              <Link href="/admin/emergency-calls" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                Emergency Calls
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-1 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <main className="py-8 px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          {children}
        </div>
      </main>

      {/* Responsive mobile menu (optional) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <nav className="flex justify-around p-4">
          <Link href="/admin/dashboard" className="text-gray-700 hover:text-blue-600">
            <HomeIcon className="h-6 w-6" />
          </Link>
          <Link href="/admin/members" className="text-gray-700 hover:text-blue-600">
            <UsersIcon className="h-6 w-6" />
          </Link>
          <Link href="/admin/emergency-calls" className="text-gray-700 hover:text-blue-600">
            <BellAlertIcon className="h-6 w-6" />
          </Link>
        </nav>
      </div>
    </div>
  ) : null;
}

// Example icon components (create separate file)
function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function BellAlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}