import React, { useState } from 'react';
import { User, Mail, Phone, CalendarIcon, MapPin } from 'lucide-react';

const AccountDetails = ({ profileData, onUpdateProfile }) => {
  const [formData, setFormData] = useState(profileData);
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  // Gender options
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Account Details</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`pl-10 w-full rounded-lg border ${isEditing ? 'border-blue-300' : 'border-gray-300'} py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-gray-50'}`}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`pl-10 w-full rounded-lg border ${isEditing ? 'border-blue-300' : 'border-gray-300'} py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-gray-50'}`}
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`pl-10 w-full rounded-lg border ${isEditing ? 'border-blue-300' : 'border-gray-300'} py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-gray-50'}`}
                  />
                </div>
              </div>

              {/* Gender Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full rounded-lg border ${isEditing ? 'border-blue-300' : 'border-gray-300'} py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-gray-50'}`}
                >
                  {genderOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date of Birth Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`pl-10 w-full rounded-lg border ${isEditing ? 'border-blue-300' : 'border-gray-300'} py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-gray-50'}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`pl-10 w-full rounded-lg border ${isEditing ? 'border-blue-300' : 'border-gray-300'} py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-gray-50'}`}
                  />
                </div>
              </div>

              {/* City Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full rounded-lg border ${isEditing ? 'border-blue-300' : 'border-gray-300'} py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-gray-50'}`}
                />
              </div>

              {/* State/Province Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full rounded-lg border ${isEditing ? 'border-blue-300' : 'border-gray-300'} py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-gray-50'}`}
                />
              </div>

              {/* Zip Code Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full rounded-lg border ${isEditing ? 'border-blue-300' : 'border-gray-300'} py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-gray-50'}`}
                />
              </div>

              {/* Country Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full rounded-lg border ${isEditing ? 'border-blue-300' : 'border-gray-300'} py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditing && 'bg-gray-50'}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        {isEditing && (
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors duration-300 shadow-md"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AccountDetails;