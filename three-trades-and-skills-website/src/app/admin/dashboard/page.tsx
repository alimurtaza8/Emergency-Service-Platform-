// 'use client';

// // src/app/admin/dashboard/page.tsx
// // import StatCards from '@/components/admin/StatCards';
// import StatCards from '@/components/admin/StatCards';
// // import MemberTable from '@/components/admin/MemberTable';
// import MemberTable from '@/components/admin/MemberTable';
// // import CallsTable from '@/components/admin/CallsTable';
// import CallsTable from '@/components/admin/CallsTable';
// // import { requireA
// // uth } from '@/lib/auth';
// import { requireAuth } from '@/lib/auth';



// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// export default async function DashboardPage() {
//   // Server-side auth check
//   // await requireAuth();
//   const router = useRouter();

//   // useEffect(() => {
//   //   // Client-side token validation
//   //   const checkAuthentication = async () => {
//   //     try {
//   //       const response = await fetch('/api/auth/validate', {
//   //         method: 'GET',
//   //         credentials: 'include'
//   //       });

//   //       const data = await response.json();
        
//   //       if (!data.isAuthenticated) {
//   //         console.log('Client-side auth check failed');
//   //         router.push('/admin/login');
//   //       }
//   //     } catch (error) {
//   //       console.error('Authentication check failed:', error);
//   //       router.push('/admin/login');
//   //     }
//   //   };

//   //   checkAuthentication();
//   // }, [router]);


//   useEffect(() => {
//     const verifyAuthentication = async () => {
//       try {
//         const response = await fetch('/api/auth/verify', {
//           method: 'GET',
//           credentials: 'include'
//         });

//         const data = await response.json();
        
//         if (!data.isAuthenticated) {
//           router.push('/admin/login');
//         }
//       } catch (error) {
//         console.error('Authentication verification failed', error);
//         router.push('/admin/login');
//       }
//     };

//     verifyAuthentication();
    
//     // Add an interval check to prevent unexpected logouts
//     const intervalId = setInterval(verifyAuthentication, 5 * 60 * 1000); // Every 5 minutes
    
//     return () => clearInterval(intervalId);
//   }, [router]);
  
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
//         <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
//       </div>
      
//       <StatCards />
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="lg:col-span-2">
//           <CallsTable />
//         </div>
//         <div className="lg:col-span-2">
//           <MemberTable />
//         </div>
//       </div>
//     </div>
//   );
// }









///////////////////////////////////////////////////////////////////

export const dynamic = "force-dynamic";

// src/app/admin/dashboard/page.tsx
// import StatCards from '@/components/admin/StatCards';
import StatCards from '@/components/admin/StatCards';
// import MemberTable from '@/components/admin/MemberTable';
import MemberTable from '@/components/admin/MemberTable';
// import CallsTable from '@/components/admin/CallsTable';
import CallsTable from '@/components/admin/CallsTable';
// import { requireA
// uth } from '@/lib/auth';
import { requireAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  // Server-side auth check
  // await requireAuth();
  try {
    await requireAuth();
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
        </div>
        
        <StatCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <CallsTable />
          </div>
          <div className="lg:col-span-2">
            <MemberTable />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error",error);
    redirect('/admin/login');
  }
  
 
}