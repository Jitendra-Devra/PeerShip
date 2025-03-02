import React, { useState } from 'react';
import Navbar from './Navbar';

const PostDeliveries = () => {
  const [parcelName, setParcelName] = useState('');
  const [sizeWeight, setSizeWeight] = useState('Small');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropOffLocation, setDropOffLocation] = useState('');
  const [preferredPickupDateTime, setPreferredPickupDateTime] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const deliveryDetails = {
      parcelName,
      sizeWeight,
      additionalNotes,
      pickupLocation,
      dropOffLocation,
      preferredPickupDateTime,
      amount,
    };
    console.log('Delivery Details:', deliveryDetails);
    // You can add API call or further logic here
  };

  return (
    <>
    <Navbar></Navbar>
    <div className='p-6 bg-white rounded-lg shadow-md mx-auto mt-20 w-[80%]'>
      <h2 className='text-4xl font-bold mb-6 text-center'>Post a Delivery</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex justify-between space-x-4  '>

        <div className='flex-1'>    
          <label className='block text-sm font-medium text-blue-500'>Parcel Name</label>
          <input
            type='text'
            value={parcelName}
            onChange={(e) => setParcelName(e.target.value)}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-5 focus:ring-green-500 focus:border-transparent transition-all' 
            placeholder='e.g., Documents, Laptop, Clothes'
            required
            />
        </div>
        <div className='flex-1'>
          <label className='block text-sm font-medium text-blue-500'>Size & Weight</label>
          <select
            value={sizeWeight}
            onChange={(e) => setSizeWeight(e.target.value)}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
            required
            >
            <option value='Small'>Small</option>
            <option value='Medium'>Medium</option>
            <option value='Large'>Large</option>
          </select>
        </div>
        </div>
        <div>
          <label className='block text-sm font-medium text-blue-500'>Additional Notes</label>
          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
            placeholder='e.g., Handle with care'
            />
        </div>

       <div className='flex justify-between space-x-4'>
        <div>
          <label className='block text-sm font-medium text-blue-500'>Pickup Location</label>
          <input
            type='text'
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
            placeholder='Auto-detect or manual entry'
            required
            />
        </div>
        <div>
          <label className='block text-sm font-medium text-blue-500'>Drop-off Location</label>
          <input
            type='text'
            value={dropOffLocation}
            onChange={(e) => setDropOffLocation(e.target.value)}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
            placeholder='Enter drop-off location'
            required
            />
        </div>
        <div>
          <label className='block text-sm font-medium text-blue-500'>Preferred Pickup Date & Time</label>
          <input
            type='datetime-local'
            value={preferredPickupDateTime}
            onChange={(e) => setPreferredPickupDateTime(e.target.value)}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
            required
            />
        </div>
        </div>
        <div>
          <label className='block text-sm font-medium text-blue-500'>Amount</label>
          <p className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'>Amount Suggested By Ai</p>
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className=' bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300'
            >
            Post
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default PostDeliveries;