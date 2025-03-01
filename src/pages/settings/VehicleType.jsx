// src/pages/settings/VehicleType.jsx
import React from "react";
import { Truck, Car, Bike, Check } from "lucide-react";

const VehicleType = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center">
        <Truck size={24} className="mr-2 text-blue-500" /> Vehicle Type
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Car Option */}
          <div className="border-2 border-blue-500 rounded-xl p-6 flex flex-col items-center bg-blue-50 cursor-pointer">
            <div className="bg-blue-500 text-white p-3 rounded-full mb-4">
              <Car size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Car</h3>
            <p className="text-sm text-gray-600 text-center mb-4">Suitable for small to medium packages within city limits.</p>
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center">
              <Check size={16} className="mr-1" /> Selected
            </div>
          </div>
          
          {/* Truck Option */}
          <div className="border-2 border-gray-200 rounded-xl p-6 flex flex-col items-center hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
            <div className="bg-gray-200 text-gray-600 p-3 rounded-full mb-4">
              <Truck size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Truck</h3>
            <p className="text-sm text-gray-600 text-center mb-4">Ideal for large packages and long-distance deliveries.</p>
            <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded-full">
              Select
            </button>
          </div>
          
          {/* Bike Option */}
          <div className="border-2 border-gray-200 rounded-xl p-6 flex flex-col items-center hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
            <div className="bg-gray-200 text-gray-600 p-3 rounded-full mb-4">
              <Bike size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Bike</h3>
            <p className="text-sm text-gray-600 text-center mb-4">Perfect for small packages and quick local deliveries.</p>
            <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded-full">
              Select
            </button>
          </div>
        </div>
        
        {/* Vehicle Details */}
        <div className="mt-8 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Vehicle Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="vehicleMake" className="block text-sm font-medium text-gray-700 mb-1">
                Make
              </label>
              <input
                type="text"
                id="vehicleMake"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Toyota"
              />
            </div>
            
            <div>
              <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <input
                type="text"
                id="vehicleModel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Corolla"
              />
            </div>
            
            <div>
              <label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                id="vehicleYear"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2022"
              />
            </div>
            
            <div>
              <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-1">
                License Plate
              </label>
              <input
                type="text"
                id="licensePlate"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., ABC-1234"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleType;