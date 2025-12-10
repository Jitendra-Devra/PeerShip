import React, { useState, useEffect } from "react";
import { User, LogOut, Mail, Phone, Camera, Shield, IndianRupee, History, Package, Truck, Star, AlertTriangle, Award, Gift, Users } from "lucide-react";
import { Uisetting, Uistar } from "../components/ui/Icons.jsx";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from '../context/ToastContext';

const ProfilePage = () => {
  const { showToast } = useToast();
  const containerClass = "bg-gray-100 min-h-screen";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    isVerified: false,
    profileImage: "https://ui-avatars.com/api/?background=random",
    walletBalance: "₹0.00",
    stats: {
      totalDeliveries: 0,
      averageRating: 0,
      averageEarnings: "₹0.00"
    },
    badges: [],
    referralCode: "REFER123"
  });

  const navigateToSettings = () => {
    navigate("/profile/settings");
  };

  const handleEditProfile = () => {
    navigate("/profile/settings/account");
  };
  
  const navigateToVerification = () => {
    navigate("/profile/settings/verify");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        const response = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const userData = await response.json();
        
        setProfileData({
          name: userData.username || "User",
          email: userData.email || "",
          phone: userData.phone || "Not provided",
          isVerified: userData.verificationStatus === 'Approved',
          profileImage: userData.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.username)}&background=random&size=200`,
          walletBalance: userData.walletBalance || "0.00",
          stats: userData.stats || {
            totalDeliveries: 0,
            averageRating: 0,
            averageEarnings: "₹0.00"
          },
          badges: userData.badges || [],
          referralCode: userData.referralCode || "REFER123"
        });

        setImageError(!userData.profilePicture);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data');
        setImageError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showToast('Signed out successfully. Bye!'); 
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-500 text-center">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Function to copy referral code to clipboard
  const copyReferralCode = () => {
    navigator.clipboard.writeText(profileData.referralCode);
    // In a real app, you would show a toast notification here
    showToast("Referral code copied to clipboard!");
  };

  // Function to render star ratings
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < Math.floor(rating)
              ? "text-yellow-500 fill-yellow-500"
              : "text-gray-300"
          }
        />
      ));
  };

  return (
    <div className={containerClass}>
      <style>{`
      @keyframes swing {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(30deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
      .swing-animation {
        animation: swing 1s ease-in-out infinite;
      }
  `}</style>

      <Navbar />
      <div className="container mx-auto px-6 py-6 mt-12 mb-12">
        {/* Profile Section with horizontal layout */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-blue-100">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex flex-col items-center">
              <div className="relative w-48 h-48">
                <img
                  src={profileData.profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-blue-500 shadow-md"
                  onError={(e) => {
                    setImageError(true);
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&background=random&size=200`;
                  }}
                />
                <button 
                  className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                  onClick={() => {
                    console.log("Update profile picture clicked");
                  }}
                >
                  <Camera size={16} />
                </button>
              </div>

                <div className="mt-4">
                  {profileData.isVerified ? (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full flex items-center shadow-sm">
                      <Shield size={16} className="mr-2" /> Verified
                    </div>
                  ) : (
                    <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full flex items-center shadow-sm">
                      <Shield size={16} className="mr-2" /> Not Verified
                    </div>
                  )}
                </div>
              </div>
              {/* Main content area with profile info and edit button */}
              <div className="flex flex-col md:flex-row gap-6 mt-6 md:mt-0 w-full">
                <div className="flex flex-col justify-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Name- {profileData.name}
                  </h2>

                  <div className="flex items-center mt-4">
                    <Mail size={18} className="text-blue-500 mr-2" />
                    <p className="text-gray-700">Email- {profileData.email}</p>
                  </div>

                  <div className="flex items-center mt-3">
                    <Phone size={18} className="text-blue-500 mr-2" />
                    <p className="text-gray-700">
                      Phone number- {profileData.phone}
                    </p>
                  </div>

                  {profileData.isVerified && (
                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold ml-2">
                      Verified
                    </span>
                  )}
                </div>
                {/* Edit Profile Button in separate div */}
                <div className="flex items-start mt-2 md:mt-0 md:ml-auto">
                  <button
                    className="bg-white cursor-pointer border border-blue-500 text-blue-600 rounded-md py-1 px-3 hover:bg-blue-50 transition-colors duration-300 shadow-sm flex items-center text-sm"
                    onClick={handleEditProfile}
                  >
                    <User size={14} className="mr-1" /> Edit
                  </button>
                </div>
              </div>
            </div>
            {/* Right side buttons */}

            <div className="flex flex-col justify-between items-end mt-6 md:mt-0 ">
              <div className="flex gap-4">
                <motion.button
                  className="rounded-full p-2  shadow-lg flex items-center cursor-pointer"
                  onClick={navigateToSettings}
                  animate={{ rotate: [0, 45, 0] }} // Rotates to 45° and back
                  transition={{
                    repeat: Infinity,
                    duration: 1.3,
                    ease: "easeInOut",
                  }} // Infinite loop with smooth ease
                >
                  <Uisetting className="w-7 h-7" />
                </motion.button>
              </div>

              {/* Sign Out at bottom right - Updated with onClick handler */}
              <button
                className="bg-blue-500 cursor-pointer text-white rounded-lg py-2 px-8 w-40 md:w-36 md:px-4 hover:bg-blue-600 transition-colors duration-300 shadow-md flex items-center justify-center mt-4 md:mt-0"

                onClick={handleSignOut}
              >
                <LogOut size={18} className="mr-2" /> Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Verification CTA - Shows only when user is not verified */}
        {!profileData.isVerified && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl shadow-lg p-6 mb-8 animate-pulse">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-yellow-400 p-3 rounded-full mr-4">
                  <AlertTriangle size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800">
                    Not Verified? Verify now to Earn
                  </h3>
                  <p className="text-yellow-700 mt-1">
                    Get access to premium deliveries and increase your earnings
                    potential
                  </p>
                </div>
              </div>
              <button
                onClick={navigateToVerification}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 cursor-pointer rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-md font-medium"
              >
                Verify Now
              </button>
            </div>
          </div>
        )}

        {/* User Stats Section */}
        <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-6 mb-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-blue-700 mb-6 flex items-center">
            <Uistar className="w-6 h-6 mr-2 text-blue-500" /> User Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Total Deliveries
              </h3>
              <span className="text-3xl font-bold text-blue-600">
                {profileData.stats.totalDeliveries}
              </span>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Average Rating
              </h3>
              <div className="flex items-center">
                <span className="text-3xl font-bold text-blue-600 mr-2">
                  {profileData.stats.averageRating}
                </span>
                <div className="flex">
                  {renderStars(profileData.stats.averageRating)}
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Average Earnings
              </h3>
              <span className="text-3xl font-bold text-blue-600">
                {profileData.stats.averageEarnings}
              </span>
              <span className="text-xs text-gray-500 mt-1">per delivery</span>
            </div>
          </div>
        </div>

        {/* Badges & Achievements Section */}
        <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-6 mb-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-blue-700 mb-6 flex items-center">
            <Award size={24} className="mr-2 text-blue-500" /> Badges &
            Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {profileData.badges.map((badge, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-full mb-3">
                  <Award size={24} />
                </div>
                <h3 className="text-lg font-semibold text-blue-800">
                  {badge.name}
                </h3>
                <p className="text-gray-600 mt-1">
                  {badge.month
                    ? `Month: ${badge.month}`
                    : badge.count
                    ? `${badge.count} Deliveries`
                    : badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Link to Dashboard for Ratings & Reviews */}
        <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-6 mb-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Star size={24} className="mr-3 text-blue-500" />
              <h2 className="text-xl font-semibold text-blue-700">
                Ratings & Reviews
              </h2>
            </div>
            <button
              onClick={() => navigate("/dashboard/reviews")}
              className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
            >
              View in Dashboard
            </button>
          </div>
          <p className="text-gray-600 mt-3">
            View your detailed review history and ratings in the dashboard
            section.
          </p>
        </div>
        {/* Referral Program Section */}
        <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-blue-700 mb-6 flex items-center">
            <Gift size={24} className="mr-2 text-blue-500" /> Referral Program
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Invite Friends & Earn Rewards
            </h3>
            <p className="text-gray-600 mb-6">
              For each friend who signs up and completes their first delivery,
              you'll receive a ₹10 bonus!
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Your Referral Code</p>
                <p className="text-xl font-bold text-blue-600 tracking-wider">
                  {profileData.referralCode}
                </p>
              </div>
              <button
                className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md w-full sm:w-auto"
                onClick={copyReferralCode}
              >
                Copy Code
              </button>
            </div>

            <div className="flex items-center justify-center mt-6">
              <Users size={18} className="text-blue-500 mr-2" />
              <span className="text-blue-800 font-medium">
                Share with friends via
              </span>
            </div>

            <div className="flex justify-center gap-6 mt-4">
              <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </button>
              <button className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors duration-300 shadow-md">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors duration-300 shadow-md">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.004 22l1.352-4.968A9.954 9.954 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 01-5.03-1.355L2.004 22zM8.391 7.308a.961.961 0 00-.371.1 1.293 1.293 0 00-.294.228c-.12.113-.188.211-.261.306A2.729 2.729 0 006.9 9.62c.002.49.13.967.33 1.413.409.902 1.082 1.857 1.971 2.742.214.213.423.427.648.626a9.448 9.448 0 003.84 2.046l.569.087c.185.01.37-.004.556-.013a1.99 1.99 0 00.833-.231 4.83 4.83 0 00.383-.22s.043-.028.125-.09c.135-.1.218-.171.33-.288.083-.086.155-.187.21-.302.078-.163.156-.474.188-.733.024-.198.017-.306.014-.373-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.401-.621a.498.498 0 00-.177-.041.482.482 0 00-.378.127v-.002c-.005 0-.072.057-.795.933a.35.35 0 01-.368.13 1.416 1.416 0 01-.191-.066c-.124-.052-.167-.072-.252-.109l-.005-.002a6.01 6.01 0 01-1.57-1c-.126-.11-.243-.23-.363-.346a6.296 6.296 0 01-1.02-1.268l-.059-.095a.923.923 0 01-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41a4.38 4.38 0 00.263-.373c.118-.19.155-.385.093-.536-.28-.684-.57-1.365-.868-2.041-.059-.134-.234-.23-.393-.249-.054-.006-.108-.012-.162-.016a3.385 3.385 0 00-.403.004z" />
                </svg>
              </button>
              <button className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-colors duration-300 shadow-md">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;