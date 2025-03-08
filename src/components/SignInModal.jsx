import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useToast } from '../context/ToastContext';


const SignInModal = ({ isOpen, onClose, onSwitchToSignUp, onForgotPassword }) => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check URL for token parameter (from Google OAuth redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      // Store token and redirect
      localStorage.setItem('token', token);
      
      // Try to decode token to get user info
      try {
        const decoded = jwtDecode(token);
        localStorage.setItem('user', JSON.stringify({ id: decoded.id, email: decoded.email }));
      } catch (error) {
        console.error('Error decoding token:', error);
      }
      
      // Clean URL and redirect
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate('/');
      window.location.reload();
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsLoading(true);
    
    try {
      // Make API call to your backend authentication endpoint
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        credentials: 'include', // Include cookies for session-based auth
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store user data in localStorage or sessionStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // If remember me is checked, set a longer expiration
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // Close the modal and redirect or refresh page
        onClose();
        showToast(`Welcome back, ${data.username}!`);
        navigate('/');
        window.dispatchEvent(new Event('auth-change'));
      } else {
        // Handle authentication errors
        setError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error occurred. Please try again later.');
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
        showToast(`Welcome back, ${data.user.username}!`);
        navigate('/');
        window.dispatchEvent(new Event('auth-change'));
      } else {
        setError(data.message || 'Google authentication failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
      setError('Error during Google authentication');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google login failure
  const handleGoogleFailure = (error) => {
    console.error('Google login failed:', error);
    setError('Google authentication failed. Please try again.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-30 h-screen backdrop-blur-sm z-[50] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full my-auto max-h-[85vh] overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 h-full">
          {/* Left side with image */}
          <div className="ml-3 border border-2 border-blue-800 rounded-lg max-md:order-1 md:h-[500px] w-full bg-[#FFFFFF] md:rounded-tl-xl md:rounded-bl-xl p-8">
            <img 
              src="/Site_Logo_removebg_preview.png" 
              className="w-full h-full object-contain block mx-auto" 
              alt="login-image" 
            />
          </div>

          {/* Right side with form */}
          <div className="w-full p-6 relative">
            {/* Close button */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <h3 className="text-blue-700 text-3xl font-bold">Sign in</h3>
                <p className="text-sm mt-4 text-gray-800">
                  Don't have an account 
                  <button 
                    type="button" 
                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                    onClick={onSwitchToSignUp}
                  >
                    Register here
                  </button>
                </p>
              </div>

              {/* Display error message if exists */}
              {error && (
                <div className="mb-4 p-3 text-sm bg-red-50 text-red-800 border border-red-200 rounded-md">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="text-gray-800 text-[15px] mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input 
                    id="email"
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent pl-4 pr-10 py-3.5 rounded-md outline-blue-600" 
                    placeholder="Enter email" 
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 682.667 682.667">
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                      </clipPath>
                    </defs>
                    <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                      <path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                      <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="password" className="text-gray-800 text-[15px] mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input 
                    id="password"
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                    className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent pl-4 pr-10 py-3.5 rounded-md outline-blue-600" 
                    placeholder="Enter password" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] cursor-pointer" viewBox="0 0 128 128">
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                <div className="flex items-center">
                  <input 
                    id="remember-me" 
                    name="rememberMe" 
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md" 
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm">
                    Remember me
                  </label>
                </div>
                <div>
                  <button 
                    type="button"
                    onClick={onForgotPassword}
                    className="text-blue-600 font-semibold text-sm hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`w-full py-3 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>

              <div className="my-4 flex items-center gap-4">
                <hr className="w-full border-gray-300" />
                <p className="text-sm text-gray-800 text-center">or</p>
                <hr className="w-full border-gray-300" />
              </div>

              {/* Google Login Button */}
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleFailure}
                  theme="outline"
                  size="large"
                  text="signin_with"
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

export default SignInModal;