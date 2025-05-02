import React from 'react';

const PartnerStats = ({ data }) => {
  const {
    totalDeliveries,
    totalEarnings,
    averageRating,
    averageDeliveryTime,
    recentDeliveries
  } = data;

  return (
    <div className="partner-stats">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Summary Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Deliveries</h3>
          <p className="text-3xl font-bold">{totalDeliveries}</p>
          <div className="mt-2 text-sm text-gray-500">
            Completed deliveries
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold">${totalEarnings.toFixed(2)}</p>
          <div className="mt-2 text-sm text-gray-500">
            From all deliveries
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Average Rating</h3>
          <p className="text-3xl font-bold">{averageRating.toFixed(1)}</p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                className={`w-4 h-4 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Avg. Delivery Time</h3>
          <p className="text-3xl font-bold">{averageDeliveryTime} min</p>
          <div className="mt-2 text-sm text-gray-500">
            Average completion time
          </div>
        </div>
      </div>

      {/* Recent Deliveries */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="font-semibold text-lg mb-4">Recent Deliveries Completed</h3>
        {recentDeliveries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentDeliveries.map((delivery) => (
                  <tr key={delivery._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {delivery._id.substr(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {delivery.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {delivery.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${delivery.earnings.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {delivery.deliveryTime} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(delivery.completedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No recent deliveries found.</p>
        )}
      </div>
    </div>
  );
};

export default PartnerStats;