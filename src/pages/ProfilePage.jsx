import React, { useState, useEffect } from "react";
import { User, LogOut, Mail, Phone, Camera, Shield, IndianRupee, History, Package, Truck} from "lucide-react";
import { Uisetting } from "../components/ui/Icons.jsx";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
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
  });

  const navigateToSettings = () => {
    navigate("/profile/settings");
  };

  const handleEditProfile = () => {
    navigate("/profile/settings/account");
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
          isVerified: userData.isVerified || false,
          profileImage: userData.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.username)}&background=random&size=200`,
          walletBalance: userData.walletBalance || "0.00",
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

  return (
    <div className={containerClass}>
      <Navbar />
      
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors duration-300 rounded-full px-6 py-2 font-medium">Peership</button>
          <div className="flex flex-wrap gap-4">
            <button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors duration-300 rounded-full px-6 py-2 font-medium">Explore deliveries</button>
            <button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors duration-300 rounded-full px-6 py-2 font-medium">Post a new Delivery</button>
            <button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors duration-300 rounded-full px-6 py-2 font-medium">Dashboard</button>
            <button className="border-2 border-blue-500 bg-blue-100 text-blue-800 shadow-md rounded-full px-6 py-2 font-medium">Profile</button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-6">
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
              
              <div className="flex flex-col md:flex-row gap-6 mt-6 md:mt-0 w-full">
                <div className="flex flex-col justify-center">
                  <h2 className="text-xl font-semibold text-gray-800">Name- {profileData.name}</h2>
                  
                  <div className="flex items-center mt-4">
                    <Mail size={18} className="text-blue-500 mr-2" />
                    <p className="text-gray-700">Email- {profileData.email}</p>
                  </div>
                  
                  <div className="flex items-center mt-3">
                    <Phone size={18} className="text-blue-500 mr-2" />
                    <p className="text-gray-700">Phone number- {profileData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start mt-2 md:mt-0 md:ml-auto">
                  <button 
                    className="bg-white border border-blue-500 text-blue-600 rounded-md py-1 px-3 hover:bg-blue-50 transition-colors duration-300 shadow-sm flex items-center text-sm"
                    onClick={handleEditProfile}
                  >
                    <User size={14} className="mr-1" /> Edit
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-between items-end mt-6 md:mt-0">
              <div className="flex gap-4">
                <button 
                  className="rounded-full p-2 text-blue-600 hover:bg-blue-50 transition-colors duration-300 shadow-sm flex items-center"
                  onClick={navigateToSettings}
                >
                  <Uisetting className="w-8 h-8" />
                </button>
              </div>
              
              <button 
                className="bg-red-500 text-white rounded-lg py-2 px-8 w-40 hover:bg-red-600 transition-colors duration-300 shadow-md flex items-center justify-center mt-4 md:mt-0"
                onClick={handleSignOut}
              >
                <LogOut size={18} className="mr-2" /> Sign out
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-6 mb-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-blue-700 mb-6 flex items-center">
            <IndianRupee size={24} className="mr-2 text-blue-500" /> Wallet
          </h2>
          <div className="flex items-center gap-4 mb-6 bg-blue-50 p-4 rounded-lg">
            <span className="text-lg font-medium text-gray-700">Current Balance</span>
            <span className="text-2xl font-bold text-blue-600">{profileData.walletBalance}</span>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Prev Earning</h3>
            <ol className="list-decimal pl-8 space-y-2">
              <li className="text-blue-500 font-medium">----------</li>
              <li className="text-blue-500 font-medium">----------</li>
              <li className="text-blue-500 font-medium">----------</li>
            </ol>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-blue-700 mb-6 flex items-center">
            <History size={24} className="mr-2 text-blue-500" /> Activity & History
          </h2>
          <div className="space-y-4">
            <button className="text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-300 flex items-center">
              <Package size={20} className="mr-2" /> Completed Deliveries
            </button>
            <hr className="border-blue-100" />
            <button className="text-blue-600 text-lg font-medium hover:text-blue-800 transition-colors duration-300 flex items-center">
              <Truck size={20} className="mr-2" /> Delivery History
            </button>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="p-5 bg-white border border-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3">
                  <Truck size={24} className="text-blue-500" />
                  <span className="font-medium text-gray-800">Chicago to Detroit</span>
                </div>
                <div className="text-sm text-green-600 font-medium mt-2 flex items-center">
                  <Shield size={14} className="mr-2" /> Delivered on Feb 22, 2025
                </div>
              </div>
              <div className="p-5 bg-white border border-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3">
                  <Package size={24} className="text-blue-500" />
                  <span className="font-medium text-gray-800">New York to Boston</span>
                </div>
                <div className="text-sm text-blue-600 font-medium mt-2 flex items-center">
                  <Truck size={14} className="mr-2" /> In Transit (Expected Feb 25, 2025)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;