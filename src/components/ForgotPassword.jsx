import React, { useState } from 'react';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with your API call
      // const response = await api.post('/auth/forgot-password', { email });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({
        type: 'success',
        text: `Password reset link has been sent to ${email}`
      });
      setEmail('');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to send reset link. Please try again.'
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
          
          {/* Removed "Back to Login" link as it's now handled at the Home component level */}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;