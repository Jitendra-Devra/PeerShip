import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useToast } from '../context/ToastContext';


const SignUpModal = ({ isOpen, onClose, onSwitchToSignIn }) => {
  const { showToast } = useToast();
  const navigate = useNavigate(); // Add this line to use navigation

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Clear previous errors
    setError("");
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    // Check password length
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    
    try {
      // Make API call to register user
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Clear form
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        });

        setError(
          <div className="text-green-600 font-medium text-center">
            Registration Successful! Redirecting to login...
          </div>
        );
        
        setTimeout(() => {
          onClose();
          onSwitchToSignIn();
        }, 1000);
      } else {
        setError(
          <div className="text-red-600 font-medium">
            {data.message}
            {data.message.includes('Please sign in')}
          </div>
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Network error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
};


  // Handle Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          credential: credentialResponse.credential
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onClose();
        showToast(`Welcome, ${data.user.username}!`); // Add toast message
        navigate('/');
        window.dispatchEvent(new Event('auth-change'));
      } else {
        // Display error message in red
        setError(
          <div className="text-red-600 font-medium">
            {data.message}
            {data.message.includes('Please sign in') }
          </div>
        );
      }
    } catch (error) {
      console.error('Google signup error:', error);
      setError('Error during Google authentication');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle Google login failure
  const handleGoogleFailure = (error) => {
    console.error('Google signup failed:', error);
    setError('Google authentication failed. Please try again.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-30 h-screen backdrop-blur-sm z-[50] flex items-center justify-center p-2">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center h-full">
          {/* Left side with image - Modified for equal spacing */}
          <div className="md:p-4 max-md:order-1 md:h-[550px] w-full bg-[#FFFFFF] md:rounded-tl-xl md:rounded-bl-xl flex items-center justify-center">
            <div className="border-2 border-blue-800 rounded-lg h-[100%] w-[100%] flex items-center justify-center p-4">
              <img
                src="/Site_Logo_removebg_preview.png"
                className="w-full h-full object-contain"
                alt="signup-image"
              />
            </div>
          </div>

          {/* Right side with form */}
          <div className="w-full p-4 relative">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="mb-4">
                <h3 className="text-blue-700 text-2xl font-bold">Sign up</h3>
                <p className="text-sm mt-1 text-gray-800">
                  Already have an account?
                  <button
                    type="button"
                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                    onClick={onSwitchToSignIn}
                  >
                    Sign in here
                  </button>
                </p>
              </div>

              {/* Display error message if exists */}
              {error && (
                <div className="mb-2 p-2 text-sm bg-red-50 text-red-800 border border-red-200 rounded-md">
                  {error}
                </div>
              )}

              {/* Username field */}
              <div>
                <label
                  htmlFor="username"
                  className="text-gray-800 text-sm mb-2 block"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-3 py-2 rounded-md outline-blue-600"
                  placeholder="Enter username"
                />
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="text-gray-800 text-sm mb-2 block"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-3 py-2 rounded-md outline-blue-600"
                  placeholder="Enter email"
                />
              </div>

              {/* Password field */}
              <div>
                <label
                  htmlFor="password"
                  className="text-gray-800 text-sm mb-2 block"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-3 py-2 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 cursor-pointer"
                      viewBox="0 0 128 128"
                    >
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                    </svg>
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters long
                </p>
              </div>

              {/* Confirm Password field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-800 text-sm mb-2 block"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-3 py-2 rounded-md outline-blue-600"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 cursor-pointer"
                      viewBox="0 0 128 128"
                    >
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 text-sm font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none mt-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="flex items-center gap-4 my-1">
                <hr className="w-full border-gray-300" />
                <p className="text-sm text-gray-800 whitespace-nowrap">or</p>
                <hr className="w-full border-gray-300" />
              </div>

              {/* Google Login Button */}
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleFailure}
                  theme="outline"
                  size="large"
                  text="signup_with"
                  shape="rectangular"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;