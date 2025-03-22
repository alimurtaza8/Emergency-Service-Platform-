// src/components/admin/Header.tsx
'use client';

import { useState } from 'react';
import { BellIcon, UserIcon } from 'lucide-react';

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  return (
    <header className="bg-white shadow h-16 flex items-center justify-between px-6 mt-12">
      <div className="flex items-center">
        <h2 className="text-lg font-medium">Admin Console</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <BellIcon className="h-6 w-6" />
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center text-gray-700 focus:outline-none"
          >
            <div className="bg-gray-200 p-2 rounded-full">
              <UserIcon className="h-5 w-5" />
            </div>
            <span className="ml-2">Admin User</span>
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Your Profile
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Settings
              </a>
              <a href="/api/admin/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}