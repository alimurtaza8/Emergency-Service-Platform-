// src/app/admin/analytics/page.tsx
import { requireAuth } from '@/lib/auth';
import { CalendarIcon, DownloadIcon } from 'lucide-react';

export default async function AnalyticsPage() {
  // Server-side auth check
  await requireAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 flex items-center hover:bg-gray-50">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Date Range
          </button>
          
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 flex items-center hover:bg-gray-50">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-3 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Emergency Calls Over Time</h2>
          <div className="h-72 flex items-center justify-center text-gray-500">
            {/* Placeholder for chart - would be implemented with a chart library in production */}
            <p>Line Chart Placeholder - Monthly Call Volume</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Service Distribution</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            {/* Placeholder for chart */}
            <p>Pie Chart Placeholder - Service Types</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Membership Tiers</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            {/* Placeholder for chart */}
            <p>Bar Chart Placeholder - Membership Distribution</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Response Time</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            {/* Placeholder for chart */}
            <p>Gauge Chart Placeholder - Avg. Response Time</p>
          </div>
        </div>
        
        <div className="col-span-3 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Regional Activity</h2>
          <div className="h-96 flex items-center justify-center text-gray-500">
            {/* Placeholder for map visualization */}
            <p>Geographic Map Placeholder - Service Hotspots</p>
          </div>
        </div>
        
        <div className="col-span-3 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Customer Retention Rate', 'Avg. Response Time', 'Customer Satisfaction', 'Revenue Growth'].map((metric) => (
              <div key={metric} className="p-4 border rounded-lg">
                <h3 className="text-sm text-gray-500">{metric}</h3>
                <div className="mt-2 flex items-end justify-between">
                  <p className="text-2xl font-bold text-gray-800">
                    {metric === 'Avg. Response Time' ? '7.8 min' : 
                     metric === 'Customer Satisfaction' ? '4.7/5' :
                     metric === 'Customer Retention Rate' ? '92%' : '+15%'}
                  </p>
                  <div className="text-green-500 text-sm">
                    {metric === 'Avg. Response Time' ? '↓ 12%' : '↑ 8%'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}