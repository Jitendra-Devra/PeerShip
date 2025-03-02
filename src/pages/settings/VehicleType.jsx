// src/pages/settings/VehicleType.jsx
import React, { useState } from "react";
import { Truck, Car, Bike, Check, Save } from "lucide-react";

const VehicleType = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("car");
  const [vehicleDetails, setVehicleDetails] = useState({
    make: "",
    model: "",
    year: "",
    licensePlate: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleVehicleSelect = (vehicleType) => {
    setSelectedVehicle(vehicleType);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Fixed the input handling to properly handle all field IDs
    if (id === "licensePlate") {
      setVehicleDetails({
        ...vehicleDetails,
        licensePlate: value
      });
    } else {
      setVehicleDetails({
        ...vehicleDetails,
        [id.replace("vehicle", "").toLowerCase()]: value
      });
    }
    setFormSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the data to your backend
    console.log("Saving vehicle details:", { type: selectedVehicle, ...vehicleDetails });
    setFormSubmitted(true);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center">
        <Truck size={24} className="mr-2 text-blue-500" /> Vehicle Type
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Car Option */}
          <div 
            className={`border-2 ${selectedVehicle === "car" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"} rounded-xl p-6 flex flex-col items-center transition-all duration-300 cursor-pointer shadow-sm hover:shadow`}
            onClick={() => handleVehicleSelect("car")}
          >
            <div className={`${selectedVehicle === "car" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"} p-3 rounded-full mb-4 transition-colors duration-300`}>
              <Car size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Car</h3>
            <p className="text-sm text-gray-600 text-center mb-4">Suitable for small to medium packages within city limits.</p>
            {selectedVehicle === "car" ? (
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center">
                <Check size={16} className="mr-1" /> Selected
              </div>
            ) : (
              <button 
                className="text-blue-600 border border-blue-600 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
                onClick={() => handleVehicleSelect("car")}
              >
                Select
              </button>
            )}
          </div>
          
          {/* Truck Option */}
          <div 
            className={`border-2 ${selectedVehicle === "truck" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"} rounded-xl p-6 flex flex-col items-center transition-all duration-300 cursor-pointer shadow-sm hover:shadow`}
            onClick={() => handleVehicleSelect("truck")}
          >
            <div className={`${selectedVehicle === "truck" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"} p-3 rounded-full mb-4 transition-colors duration-300`}>
              <Truck size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Truck</h3>
            <p className="text-sm text-gray-600 text-center mb-4">Ideal for large packages and long-distance deliveries.</p>
            {selectedVehicle === "truck" ? (
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center">
                <Check size={16} className="mr-1" /> Selected
              </div>
            ) : (
              <button 
                className="text-blue-600 border border-blue-600 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
                onClick={() => handleVehicleSelect("truck")}
              >
                Select
              </button>
            )}
          </div>
          
          {/* Bike Option */}
          <div 
            className={`border-2 ${selectedVehicle === "bike" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"} rounded-xl p-6 flex flex-col items-center transition-all duration-300 cursor-pointer shadow-sm hover:shadow`}
            onClick={() => handleVehicleSelect("bike")}
          >
            <div className={`${selectedVehicle === "bike" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"} p-3 rounded-full mb-4 transition-colors duration-300`}>
              <Bike size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Bike</h3>
            <p className="text-sm text-gray-600 text-center mb-4">Perfect for small packages and quick local deliveries.</p>
            {selectedVehicle === "bike" ? (
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center">
                <Check size={16} className="mr-1" /> Selected
              </div>
            ) : (
              <button 
                className="text-blue-600 border border-blue-600 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
                onClick={() => handleVehicleSelect("bike")}
              >
                Select
              </button>
            )}
          </div>
        </div>
        
        {/* Vehicle Details Form */}
        <form onSubmit={handleSubmit} className="mt-8 border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <div className="bg-blue-500 text-white p-2 rounded-full mr-2">
              {selectedVehicle === "car" ? <Car size={18} /> : 
               selectedVehicle === "truck" ? <Truck size={18} /> : 
               <Bike size={18} />}
            </div>
            {selectedVehicle.charAt(0).toUpperCase() + selectedVehicle.slice(1)} Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="vehicleMake" className="block text-sm font-medium text-gray-700 mb-1">
                Make <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="vehicleMake"
                value={vehicleDetails.make}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Toyota"
                required
              />
            </div>
            
            <div>
              <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-1">
                Model <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="vehicleModel"
                value={vehicleDetails.model}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Corolla"
                required
              />
            </div>
            
            <div>
              <label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-700 mb-1">
                Year <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="vehicleYear"
                value={vehicleDetails.year}
                onChange={handleInputChange}
                min="1950"
                max="2030"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2022"
                required
              />
            </div>
            
            <div>
              <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-1">
                License Plate <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="licensePlate"
                value={vehicleDetails.licensePlate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., ABC-1234"
                required
              />
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span className="text-red-500">*</span> Required fields
            </div>
            
            <div className="flex items-center space-x-4">
              {formSubmitted && (
                <div className="text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center">
                  <Check size={16} className="mr-1" /> Details Saved
                </div>
              )}
              
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center shadow-sm transition-colors duration-300"
              >
                <Save size={18} className="mr-2" /> Save Vehicle Details
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleType;