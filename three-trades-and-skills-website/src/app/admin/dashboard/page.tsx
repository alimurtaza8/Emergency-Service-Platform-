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

export default async function DashboardPage() {
  // Server-side auth check
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
}