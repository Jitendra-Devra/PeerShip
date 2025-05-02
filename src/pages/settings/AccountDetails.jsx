import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, CalendarIcon, MapPin, Camera } from 'lucide-react';
import axios from 'axios';

// Set the base URL for Axios
axios.defaults.baseURL = 'http://localhost:5000';

// Helper to format ISO date to yyyy-MM-dd
const formatDateForInput = (isoDate) => {
  if (!isoDate) return '';
  return isoDate.split('T')[0];
};

const AccountDetails = () => {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phone: '',
    gender: 'prefer-not-to-say',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    profilePicture: '/api/placeholder/200/200', // Placeholder image
  });
  
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch user profile data
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        if (!token) {
          setError('You must be logged in to view this page');
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('/api/auth/profile', config);
        setProfileData(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile. Please try again later.');
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchProfileData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccessMessage('');
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You must be logged in to update your profile');
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      // Send the update request
      const response = await axios.put('/api/auth/profile', formData, config);

      // Refetch the updated profile data
      await fetchProfileData();

      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile. Please try again later.');
    }
  };

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('You must be logged in to update your profile picture');
        return;
      }
      
      const formData = new FormData();
      formData.append('profilePicture', file);
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      };
      
      const response = await axios.put('/api/auth/profile/picture', formData, config);
      
      setProfileData({
        ...profileData,
        profilePicture: response.data.profilePicture
      });
      
      setSuccessMessage('Profile picture updated successfully!');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload image. Please try again.');
    }
  };

  // Gender options
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  ];

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        {error}
        <button 
          className="ml-4 text-red-600 underline" 
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-4">
          {successMessage}
        </div>
      )}
      
      {/* Profile Information Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-blue-100">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <img 
                  src={profileData.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover border-4 border-blue-500 shadow-md" 
                />
                <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
                  <Camera size={16} />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            
            {/* Profile Details */}
            <div className="flex flex-col justify-center mt-6 md:mt-0">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Name: {profileData.username}</h2>
              </div>
              <div className="flex items-center mt-2 mb-2">
                <Phone size={18} className="text-blue-500 mr-2" />
                <p className="text-gray-700">Phone Number: {profileData.phone || 'Not set'}</p>
              </div>
              <div className="flex items-center mt-2">
                <Mail size={18} className="text-blue-500 mr-2" />
                <p className="text-gray-700">Email: {profileData.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details Form */}
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
                      name="username"
                      value={formData.username || ''}
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
                      value={formData.email || ''}
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
                      value={formData.phone || ''}
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
                    value={formData.gender || 'prefer-not-to-say'}
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
                      value={formatDateForInput(formData.dateOfBirth)}
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
                      value={formData.address || ''}
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
                    value={formData.city || ''}
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
                    value={formData.state || ''}
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
                    value={formData.zipCode || ''}
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
                    value={formData.country || ''}
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
    </div>
  );
};

export default AccountDetails;