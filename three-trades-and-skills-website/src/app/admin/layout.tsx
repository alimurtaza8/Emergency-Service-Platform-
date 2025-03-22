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



/////////////

// src/app/admin/layout.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  // Skip authentication check on login page
  const isLoginPage = pathname === '/admin/login';
  
  useEffect(() => {
    if (isLoginPage) return;
    
    // Check if token exists
    const hasToken = document.cookie.includes('admin_token=');
    
    if (!hasToken) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router, isLoginPage]);
  
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // Only render the admin layout if on a non-login page and authenticated
  if (isLoginPage) {
    return <>{children}</>;
  }
  
  return isAuthenticated ? (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a 
                href="/admin/dashboard" 
                className="block p-2 hover:bg-blue-50 rounded"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a 
                href="/admin/members" 
                className="block p-2 hover:bg-blue-50 rounded"
              >
                Members
              </a>
            </li>
            <li>
              <a 
                href="/admin/emergency-calls" 
                className="block p-2 hover:bg-blue-50 rounded"
              >
                Emergency Calls
              </a>
            </li>
            <li>
              <a 
                href="/admin/analytics" 
                className="block p-2 hover:bg-blue-50 rounded"
              >
                Analytics
              </a>
            </li>
            <li>
              <a 
                href="/admin/settings" 
                className="block p-2 hover:bg-blue-50 rounded"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-lg font-medium">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  ) : null;
}