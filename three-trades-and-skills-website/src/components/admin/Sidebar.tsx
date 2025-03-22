// src/components/admin/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UsersIcon, 
  PhoneIcon, 
  ChartBarIcon, 
  CogIcon, 
  LogOutIcon 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Members', href: '/admin/members', icon: UsersIcon },
    { name: 'Emergency Calls', href: '/admin/emergency-calls', icon: PhoneIcon },
    { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/admin/settings', icon: CogIcon },
  ];
  
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <div className="bg-blue-800 text-white w-64 flex flex-col h-full">
      <div className="p-4">
        <h1 className="text-xl font-bold">Emergency Services</h1>
        <p className="text-blue-200 text-sm">Admin Dashboard</p>
      </div>
      
      <nav className="mt-4 flex-1">
        <ul>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm ${
                    isActive 
                      ? 'bg-blue-900 text-white' 
                      : 'text-blue-200 hover:bg-blue-700'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-blue-700">
        <button 
          onClick={handleLogout}
          className="flex items-center text-blue-200 hover:text-white w-full px-2 py-2"
        >
          <LogOutIcon className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}