// src/components/admin/StatCards.tsx
export default function StatCards() {
    const stats = [
      { title: 'Total Members', value: 348, change: '+12%', changeType: 'positive' },
      { title: 'Emergency Calls (24h)', value: 27, change: '+5%', changeType: 'positive' },
      { title: 'Active Technicians', value: 18, change: '-2%', changeType: 'negative' },
      { title: 'Avg. Response Time', value: '8 min', change: '-10%', changeType: 'positive' },
    ];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <span className={`text-sm ${
                stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    );
  }
  