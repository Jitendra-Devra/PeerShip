import React, { useState } from 'react';
import Navbar from './Navbar';
import './ExploreDeliveries.module.css';

const ExploreDeliveries = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [sortBy, setSortBy] = useState('Highest Payment');
  const [parcelSizeFilter, setParcelSizeFilter] = useState({ Small: false, Medium: false, Large: false });
  const [urgencyFilter, setUrgencyFilter] = useState({ Normal: false, Urgent: false });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleParcelSizeChange = (size) => {
    setParcelSizeFilter({ ...parcelSizeFilter, [size]: !parcelSizeFilter[size] });
  };

  const handleUrgencyChange = (urgency) => {
    setUrgencyFilter({ ...urgencyFilter, [urgency]: !urgencyFilter[urgency] });
  };

  const clearFilters = () => {
    setParcelSizeFilter({ Small: false, Medium: false, Large: false });
    setUrgencyFilter({ Normal: false, Urgent: false });
    setSortBy('Highest Payment');
  };

  const deliveryItems = [
    { item: 'Laptop', pickupLocation: 'Location A', dropOffLocation: 'Location B', deliveryDeadline: '2024-12-31', offeredPayment: '₹1000', parcelSize: 'Small', urgency: 'Normal' },
    { item: 'Books', pickupLocation: 'Location C', dropOffLocation: 'Location D', deliveryDeadline: '2025-01-15', offeredPayment: '₹500', parcelSize: 'Medium', urgency: 'Urgent' },
    { item: 'Mixer Grinder', pickupLocation: 'Location C', dropOffLocation: 'Location D', deliveryDeadline: '2025-01-15', offeredPayment: '₹550', parcelSize: 'Large', urgency: 'Normal' },
    { item: 'Mobile Phone', pickupLocation: 'Location C', dropOffLocation: 'Location D', deliveryDeadline: '2025-01-15', offeredPayment: '₹100', parcelSize: 'Small', urgency: 'Urgent' },
    { item: 'Bottle', pickupLocation: 'Location C', dropOffLocation: 'Location D', deliveryDeadline: '2025-01-15', offeredPayment: '₹300', parcelSize: 'Medium', urgency: 'Normal' },
    { item: 'Condom', pickupLocation: 'Location C', dropOffLocation: 'Location D', deliveryDeadline: '2025-01-15', offeredPayment: '₹240', parcelSize: 'small', urgency: 'Urgent' },
  ];

  // Filter delivery items based on the searched route
  const filteredItems = deliveryItems.filter(
    (item) =>
      item.pickupLocation.toLowerCase().includes(fromLocation.toLowerCase()) &&
      item.dropOffLocation.toLowerCase().includes(toLocation.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className='bg-gradient-to-b from-blue-50 to-white p-4 min-h-screen'>
        {/* Search Bar and Filter Section */}
        <div className='flex items-center justify-between mb-4 mt-[59px] p-5 space-x-4'>
          <div className='flex items-center space-x-4 flex-1'>
            <input
              type='text'
              placeholder='From'
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className='border-2 border-gray-300 p-3 rounded-lg w-1/3 focus:outline-none focus:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md'
            />
            <input
              type='text'
              placeholder='To'
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className='border-2 border-gray-300 p-3 rounded-lg w-1/3 focus:outline-none focus:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md'
            />
            <button
              className='p-3 font-semibold bg-green-500 text-white border-2 cursor-pointer rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 border-transparent hover:bg-green-600 shadow-lg hover:shadow-xl'
            >
              Search
            </button>
          </div>
          <button
            className='border-2 border-gray-800 p-2.5 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 hover:shadow-md'
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            Filter
          </button>
        </div>

        {/* Filter Dropdown */}
        {isFilterOpen && (
          <div className='border-2 border-gray-200 p-6 rounded-lg w-1/4 mt-1 bg-white shadow-2xl absolute right-0 filter-container z-10'>
            <h3 className='font-semibold text-xl mb-4 text-gray-800'>Filters & Sorting Options</h3>
            <div className='mb-4'>
              <h4 className='font-semibold text-gray-700 mb-2'>Sort by:</h4>
              <label className='block mb-2'>
                <input
                  type='radio'
                  value='Highest Payment'
                  checked={sortBy === 'Highest Payment'}
                  onChange={() => setSortBy('Highest Payment')}
                  className='mr-2'
                /> 
                <span className='text-gray-700'>Highest Payment</span>
              </label>
              <label className='block mb-2'>
                <input
                  type='radio'
                  value='Closest Pickup'
                  checked={sortBy === 'Closest Pickup'}
                  onChange={() => setSortBy('Closest Pickup')}
                  className='mr-2'
                /> 
                <span className='text-gray-700'>Closest Pickup</span>
              </label>
            </div>
            <div className='mb-4'>
              <h4 className='font-semibold text-gray-700 mb-2'>Parcel Size:</h4>
              {Object.keys(parcelSizeFilter).map((size) => (
                <label key={size} className='block mb-2'>
                  <input
                    type='checkbox'
                    checked={parcelSizeFilter[size]}
                    onChange={() => handleParcelSizeChange(size)}
                    className='mr-2'
                  /> 
                  <span className='text-gray-700'>{size}</span>
                </label>
              ))}
            </div>
            <div className='mb-4'>
              <h4 className='font-semibold text-gray-700 mb-2'>Urgency:</h4>
              {Object.keys(urgencyFilter).map((urgency) => (
                <label key={urgency} className='block mb-2'>
                  <input
                    type='checkbox'
                    checked={urgencyFilter[urgency]}
                    onChange={() => handleUrgencyChange(urgency)}
                    className='mr-2'
                  /> 
                  <span className='text-gray-700'>{urgency}</span>
                </label>
              ))}
            </div>
            <div className='flex justify-between mt-6'>
              <button
                className='bg-red-500 text-white p-2.5 rounded-lg hover:bg-red-600 transition-all duration-300 hover:shadow-md'
                onClick={clearFilters}
              >
                Clear Selection
              </button>
              <button
                className='bg-blue-500 text-white p-2.5 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:shadow-md'
                onClick={() => setIsFilterOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Delivery Items Grid or No Parcels Message */}
        {filteredItems.length === 0 ? (
          <div className='flex justify-center items-center h-[60vh]'>
            <p className='text-3xl text-blue-600 font-semibold text-center'>
              No parcels available on this route. <br />
              Try a different route or check back later!
            </p>
          </div>
        ) : (
          <div className='flex flex-wrap justify-center gap-10 mt-3'>
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className='bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-100 max-w-sm w-full transition-all duration-300 hover:scale-105 hover:shadow-2xl'
              >
                <h2 className='font-bold text-xl mb-3 text-blue-500'>{item.item}</h2>
                <p className='text-gray-700 mb-2'><span role='img' aria-label='pickup'>📍</span> Pickup: {item.pickupLocation}</p>
                <p className='text-gray-700 mb-2'><span role='img' aria-label='dropoff'>📍</span> Drop-off: {item.dropOffLocation}</p>
                <p className='text-gray-700 mb-2'><span role='img' aria-label='calendar'>📅</span> Deadline: {item.deliveryDeadline}</p>
                <p className='text-green-600 font-semibold mb-4'><span role='img' aria-label='money'>💰</span> Payment: {item.offeredPayment}</p>
                <p className='text-gray-700 mb-2'><span role='img' aria-label='box'>📦</span> Parcel Size: {item.parcelSize}</p>
                <p className='text-gray-700 mb-2'><span role='img' aria-label='clock'>🕒</span> Urgency: {item.urgency}</p>
                <button
                  className='mt-3 bg-green-500 text-white p-3 rounded-lg w-full hover:bg-green-600 transition-all duration-300 hover:shadow-md'
                >
                  Accept Delivery
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ExploreDeliveries;