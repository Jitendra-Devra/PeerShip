import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      // Redirect if no token is found
      setMessage({
        type: 'error',
        text: 'Invalid or missing reset token. Please request a new password reset link.'
      });
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePassword = () => {
    if (formData.newPassword.length < 8) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 8 characters long'
      });
      return false;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Passwords do not match'
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    
    setIsSubmitting(true);
    
    try {
      // Real API call to your backend
      const response = await fetch('http://localhost:5000/api/auth/reset-password', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token, 
          newPassword: formData.newPassword 
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Your password has been reset successfully'
        });
        setFormData({ newPassword: '', confirmPassword: '' });
        
        // Redirect to home page after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        throw new Error(data.message || 'Failed to reset password');
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to reset password. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg px-8 py-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Reset Password</h2>
        <p className="text-gray-600 text-center mb-6">
          Create a new password for your Peership account
        </p>
        
        {message.text && (
          <div className={`mb-4 p-3 rounded-md ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Password must be at least 8 characters with a mix of letters, numbers, and symbols.
            </p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !token}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium 
              ${(isSubmitting || !token) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}
              transition duration-200`}
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
          
          <div className="mt-4 text-center">
            <a href="/" className="text-blue-600 hover:underline text-sm">
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;