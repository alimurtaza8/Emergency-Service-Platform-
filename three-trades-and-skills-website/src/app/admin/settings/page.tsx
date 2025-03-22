// src/app/admin/settings/page.tsx
import { requireAuth } from '@/lib/auth';
import { SaveIcon } from 'lucide-react';

export default async function SettingsPage() {
  // Server-side auth check
  await requireAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium border-b pb-3 mb-4">Emergency Call Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="callTimeout" className="block text-sm font-medium text-gray-700 mb-1">
                  Call Timeout (seconds)
                </label>
                <input
                  type="number"
                  id="callTimeout"
                  name="callTimeout"
                  defaultValue={30}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p className="mt-1 text-sm text-gray-500">Time before proceeding to the next service provider</p>
              </div>
              
              <div>
                <label htmlFor="simultaneousCalls" className="block text-sm font-medium text-gray-700 mb-1">
                  Call Routing Method
                </label>
                <select
                  id="callRouting"
                  name="callRouting"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="sequential">Sequential (one after another)</option>
                  <option value="simultaneous">Simultaneous (first to answer)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="maxRetries" className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Call Retries
                </label>
                <input
                  type="number"
                  id="maxRetries"
                  name="maxRetries"
                  defaultValue={3}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium border-b pb-3 mb-4">Membership Tiers</h2>
            
            <div className="space-y-4">
              {['Basic', 'Standard', 'Premium', 'Pro', 'Business', 'Enterprise'].map((tier) => (
                <div key={tier} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-medium">{tier}</h3>
                    <p className="text-sm text-gray-500">
                      {tier === 'Basic' ? 'Limited emergency calls, standard response' : 
                       tier === 'Standard' ? 'Up to 5 emergency calls, priority response' :
                       tier === 'Premium' ? 'Unlimited calls, high priority response' :
                       tier === 'Pro' ? 'Premium features + equipment tracking' :
                       tier === 'Business' ? 'Multiple locations, dedicated technicians' :
                       'Custom enterprise solution'}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      defaultValue={tier === 'Basic' ? 9.99 : 
                                   tier === 'Standard' ? 19.99 : 
                                   tier === 'Premium' ? 29.99 :
                                   tier === 'Pro' ? 49.99 :
                                   tier === 'Business' ? 99.99 : 199.99}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <span className="ml-2">USD/month</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium border-b pb-3 mb-4">Payment Integration</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="squareApiKey" className="block text-sm font-medium text-gray-700 mb-1">
                  Square API Key
                </label>
                <input
                  type="password"
                  id="squareApiKey"
                  name="squareApiKey"
                  defaultValue="••••••••••••••••"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="squareEnvironment" className="block text-sm font-medium text-gray-700 mb-1">
                  Square Environment
                </label>
                <select
                  id="squareEnvironment"
                  name="squareEnvironment"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="sandbox">Sandbox (Testing)</option>
                  <option value="production">Production</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium border-b pb-3 mb-4">Map Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="mapProvider" className="block text-sm font-medium text-gray-700 mb-1">
                  Map Provider
                </label>
                <select
                  id="mapProvider"
                  name="mapProvider"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="mapbox">Mapbox</option>
                  <option value="cesium">CesiumJS</option>
                  <option value="googleMaps">Google Maps</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="mapApiKey" className="block text-sm font-medium text-gray-700 mb-1">
                  Map API Key
                </label>
                <input
                  type="password"
                  id="mapApiKey"
                  name="mapApiKey"
                  defaultValue="••••••••••••••••"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="enable3dMaps"
                  name="enable3dMaps"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enable3dMaps" className="ml-2 block text-sm text-gray-900">
                  Enable 3D Mapping (Experimental)
                </label>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium border-b pb-3 mb-4">Internet Computer</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="icpCanisterId" className="block text-sm font-medium text-gray-700 mb-1">
                  ICP Canister ID
                </label>
                <input
                  type="text"
                  id="icpCanisterId"
                  name="icpCanisterId"
                  defaultValue="rrkah-fqaaa-aaaaa-aaaaq-cai"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="useLocalReplica"
                  name="useLocalReplica"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="useLocalReplica" className="ml-2 block text-sm text-gray-900">
                  Use Local Replica for Development
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 rounded-md text-sm text-white flex items-center hover:bg-blue-700">
          <SaveIcon className="w-4 h-4 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
}