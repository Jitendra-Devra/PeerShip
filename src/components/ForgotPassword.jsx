import React, { useState } from 'react';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Real API call to your backend
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({
          type: 'success',
          text: data.message || 'If an account exists with this email, you will receive password reset instructions.'
        });
        setEmail('');
      } else {
        // Handle specific error cases
        if (data.message && data.message.includes('Google authentication')) {
          setMessage({
            type: 'error',
            text: 'This email is registered with Google. Please use Google Sign In.'
          });
        } else {
          throw new Error(data.message || 'Failed to process request');
        }
      }
    } catch (error) {
      console.error('Forgot password error details:', error); // More detailed error logging
      setMessage({
        type: 'error',
        text: error.message || 'An error occurred while processing your request. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full mx-auto">
      <div className="bg-white rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Forgot Password</h2>
        
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
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium
              ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}
              transition duration-200`}
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;