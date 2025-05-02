import React from 'react';

const UserStats = ({ data }) => {
  const {
    totalDeliveries,
    pendingDeliveries,
    completedDeliveries,
    totalSpent,
    recentDeliveries,
    averageRating
  } = data;

  return (
    <div className="user-stats">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Summary Cards */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Deliveries</h3>
          <p className="text-3xl font-bold">{totalDeliveries}</p>
          <div className="mt-2 text-sm">
            <span className="text-green-500 font-medium">{completedDeliveries} completed</span>
            {pendingDeliveries > 0 && (
              <span className="text-yellow-500 font-medium ml-2">{pendingDeliveries} pending</span>
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Total Spent</h3>
          <p className="text-3xl font-bold">${totalSpent.toFixed(2)}</p>
          <div className="mt-2 text-sm text-gray-500">
            From all deliveries
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm mb-2">Average Rating Given</h3>
          <p className="text-3xl font-bold">{averageRating.toFixed(1)}</p>
          <div className="mt-2 text-sm text-gray-500">
            Based on your reviews
          </div>
        </div>
      </div>

      {/* Recent Deliveries */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="font-semibold text-lg mb-4">Recent Deliveries</h3>
        {recentDeliveries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${delivery.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        delivery.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        delivery.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                        'bg-red-100 text-red-800'}`}>
                        {delivery.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${delivery.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(delivery.createdAt).toLocaleDateString()}
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

export default UserStats;