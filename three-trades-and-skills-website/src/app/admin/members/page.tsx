// src/app/admin/members/page.tsx
import MemberTable from '@/components/admin/MemberTable';
import { requireAuth } from '@/lib/auth';
import { PlusIcon, FilterIcon, DownloadIcon } from 'lucide-react';

export default async function MembersPage() {
  // Server-side auth check
  await requireAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Member Management</h1>
        
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 flex items-center hover:bg-gray-50">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter
          </button>
          
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 flex items-center hover:bg-gray-50">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export
          </button>
          
          <button className="px-4 py-2 bg-blue-600 rounded-md text-sm text-white flex items-center hover:bg-blue-700">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Member
          </button>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-3 md:space-y-0">
          <div className="flex-1 max-w-md">
            <label htmlFor="search" className="sr-only">Search members</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="search"
                name="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search members"
                type="search"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <select className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>All Membership Tiers</option>
              <option>Basic</option>
              <option>Standard</option>
              <option>Premium</option>
              <option>Pro</option>
            </select>
            
            <select className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
            </select>
          </div>
        </div>
        
        <MemberTable />
      </div>
    </div>
  );
}