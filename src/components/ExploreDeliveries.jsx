import React, { useState } from 'react';
import Navbar from './Navbar';

const ExploreDeliveries = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Highest Payment');
  const [parcelSizeFilter, setParcelSizeFilter] = useState({
    Small: false,
    Medium: false,
    Large: false,
  });
  const [urgencyFilter, setUrgencyFilter] = useState({
    Normal: false,
    Urgent: false,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleParcelSizeChange = (size) => {
    setParcelSizeFilter({ ...parcelSizeFilter, [size]: !parcelSizeFilter[size] });
  };

  const handleUrgencyChange = (urgency) => {
    setUrgencyFilter({ ...urgencyFilter, [urgency]: !urgencyFilter[urgency] });
  };

  const deliveryItems = [
    {
      item: 'Laptop',
      pickupLocation: 'Location A',
      dropOffLocation: 'Location B',
      deliveryDeadline: '2024-12-31',
      offeredPayment: '₹1000',
    },
    {
      item: 'Books',
      pickupLocation: 'Location C',
      dropOffLocation: 'Location D',
      deliveryDeadline: '2025-01-15',
      offeredPayment: '₹500',
    },
    // Add more delivery items as needed
  ];

  return (
    <>
    <Navbar></Navbar>
      <div className="flex mb-4 mt-20 items-center space-x-4">
        <input
          type="text"
          placeholder="From"
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="To"
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
        <button
          className="border p-2 rounded"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          Filter
        </button>

      <div className="flex space-x-4 mb-4">
        <div className="grid grid-cols-2 gap-4 w-full">
          {deliveryItems.map((item, index) => (
            <div
              key={index}
              className="border p-4 rounded shadow"
            >
              <h2 className="font-semibold">{item.item}</h2>
              <p>
                <span role="img" aria-label="pickup">📍</span> Pickup Location: {item.pickupLocation}
              </p>
              <p>
                <span role="img" aria-label="dropoff">📍</span> Drop-off Location: {item.dropOffLocation}
              </p>
              <p>
                <span role="img" aria-label="calendar">📅</span> Delivery Deadline: {item.deliveryDeadline}
              </p>
              <p>
                <span role="img" aria-label="money">👍</span> Offered Payment (AI-calculated price): {item.offeredPayment}
              </p>
              <button className="bg-green-500 text-white p-2 rounded mt-2">
                Accept Delivery Button
              </button>
            </div>
          ))}
        </div>

        {isFilterOpen && (
          <div className="border p-4 rounded w-1/4">
            <h3 className="font-semibold mb-2">Filters & Sorting Options</h3>
            <div className="mb-2">
              <label>
                <input
                  type="radio"
                  value="Highest Payment"
                  checked={sortBy === 'Highest Payment'}
                  onChange={() => setSortBy('Highest Payment')}
                />
                Sort by: Highest Payment
              </label>
              <label>
                <input
                  type="radio"
                  value="Closest Pickup"
                  checked={sortBy === 'Closest Pickup'}
                  onChange={() => setSortBy('Closest Pickup')}
                />
                Closest Pickup
              </label>
            </div>
            <div className="mb-2">
              <h4 className="font-semibold">Parcel Size Filter:</h4>
              {Object.keys(parcelSizeFilter).map((size) => (
                <label key={size}>
                  <input
                    type="checkbox"
                    checked={parcelSizeFilter[size]}
                    onChange={() => handleParcelSizeChange(size)}
                  />
                  {size}
                </label>
              ))}
            </div>
            <div>
              <h4 className="font-semibold">Urgency Filter:</h4>
              {Object.keys(urgencyFilter).map((urgency) => (
                <label key={urgency}>
                  <input
                    type="checkbox"
                    checked={urgencyFilter[urgency]}
                    onChange={() => handleUrgencyChange(urgency)}
                  />
                  {urgency}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ExploreDeliveries;