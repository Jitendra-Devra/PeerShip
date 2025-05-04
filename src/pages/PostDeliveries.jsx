import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const PostDeliveries = () => {
  const [parcelName, setParcelName] = useState('');
  const [sizeWeight, setSizeWeight] = useState('Small');
  const [urgency, setUrgency] = useState('Normal');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropOffLocation, setDropOffLocation] = useState('');
  const [preferredPickupDateTime, setPreferredPickupDateTime] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const deliveryDetails = {
      parcelName,
      sizeWeight,
      urgency,
      additionalNotes,
      pickupLocation,
      dropOffLocation,
      preferredPickupDateTime,
      amount,
    };
    console.log('Delivery Details:', deliveryDetails);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 via-blue-50 to-white mx-auto mt-15 ">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl transform transition-all hover:shadow-2xl">
          <h2 className="text-3xl font-extrabold text-center bg-clip-text mb-8 text-[#007BFF]">
            Post a Delivery
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Row: Parcel Name and Urgency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parcel Name</label>
                <input
                  type="text"
                  value={parcelName}
                  onChange={(e) => setParcelName(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                  placeholder="e.g., Documents, Laptop, Clothes"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                  required
                >
                  <option value="Normal">Normal</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
            {/* Second Row: Pickup Location, Drop-off Location, and Preferred Pickup Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                  placeholder="Auto-detect or manual entry"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Location</label>
                <input
                  type="text"
                  value={dropOffLocation}
                  onChange={(e) => setDropOffLocation(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                  placeholder="Enter drop-off location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Pickup Date & Time</label>
                <input
                  type="datetime-local"
                  value={preferredPickupDateTime}
                  onChange={(e) => setPreferredPickupDateTime(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                  required
                />
              </div>
            </div>
            {/* Third Row: You Have to Pay and Size & Weight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount Suggested By AI</label>
                <div className="w-full p-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-600">
                  You have to pay: {amount}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size & Weight</label>
                <select
                  value={sizeWeight}
                  onChange={(e) => setSizeWeight(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                  required
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>
            </div>
            {/* Fourth Row: Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                placeholder="e.g., Handle with care"
                rows="4"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              >
                Post Delivery
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostDeliveries;