// src/components/admin/CallsTable.tsx
export default function CallsTable() {
    // In a real application, fetch this data from your backend
    const calls = [
      { id: 'EC-1001', customer: 'John Doe', service: 'Plumbing', status: 'In Progress', time: '10:15 AM', date: '2024-03-22' },
      { id: 'EC-1002', customer: 'Jane Smith', service: 'Electrical', status: 'Completed', time: '09:30 AM', date: '2024-03-22' },
      { id: 'EC-1003', customer: 'Robert Johnson', service: 'HVAC', status: 'Assigned', time: '11:45 AM', date: '2024-03-22' },
      { id: 'EC-1004', customer: 'Emily Davis', service: 'Plumbing', status: 'Waiting', time: '01:20 PM', date: '2024-03-21' },
      { id: 'EC-1005', customer: 'Michael Brown', service: 'Electrical', status: 'Completed', time: '03:10 PM', date: '2024-03-21' },
    ];
    
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Recent Emergency Calls</h2>
          <p className="text-sm text-gray-500 mt-1">Monitor and manage ongoing and recent emergency service calls</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Call ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {calls.map((call) => (
                <tr key={call.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {call.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {call.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {call.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      call.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      call.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      call.status === 'Assigned' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {call.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {call.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {call.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-blue-600 hover:text-blue-900">
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 5 of 42 calls
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }