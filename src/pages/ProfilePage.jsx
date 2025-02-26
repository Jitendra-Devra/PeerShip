import React, { useState } from 'react';
import { User, LogOut, Mail, Phone, Check, Moon, Sun, Lock, Camera, Shield, CreditCard, History, DollarSign } from 'lucide-react';
import Navbar from "../components/Navbar.jsx";

const ProfilePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    isVerified: true,
    profileImage: "/api/placeholder/150/150"
  });
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const containerClass = darkMode 
    ? "min-h-screen bg-gray-900 text-white pt-16" 
    : "min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16";
  
  const cardClass = darkMode 
    ? "bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-700" 
    : "bg-white shadow-xl rounded-xl p-6 border border-blue-100";
  
  return (
    <div className={containerClass}>
      <Navbar
        onSignInClick={() => setIsSignInOpen(true)}
        onSignUpClick={() => setIsSignUpOpen(true)}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className={cardClass}>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#007BFF] to-[#28A745] bg-clip-text text-transparent">
                My Profile
              </h1>
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-800" />}
              </button>
            </div>
            
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-gradient-to-r from-[#007BFF] to-[#28A745] p-1">
                  <img 
                    src={profileData.profileImage} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover" 
                  />
                </div>
                <button className="absolute bottom-2 right-2 bg-gradient-to-r from-[#007BFF] to-[#28A745] text-white p-2 rounded-full hover:shadow-lg transition-shadow">
                  <Camera size={16} />
                </button>
              </div>
              
              {profileData.isVerified && (
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full flex items-center text-sm font-medium shadow-md">
                  <Shield size={16} className="mr-2" />
                  Verified User (Trusted for Delivery)
                </div>
              )}
            </div>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                <User className="mr-4 text-[#007BFF]" size={24} />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Full Name</div>
                  <div className="font-medium text-lg">{profileData.name}</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                <Mail className="mr-4 text-[#007BFF]" size={24} />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                  <div className="font-medium text-lg">{profileData.email}</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                <Phone className="mr-4 text-[#007BFF]" size={24} />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                  <div className="font-medium text-lg">{profileData.phone}</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Wallet & Payments</h2>
              <div className="flex items-center p-3 rounded-lg border border-blue-100 dark:border-gray-700">
                <DollarSign className="mr-4 text-green-500" size={24} />
                <div className="text-lg font-medium">$120.50</div>
                <button className="ml-auto bg-green-500 text-white px-3 py-1 rounded-lg">Withdraw</button>
              </div>
            </div>
            
            <div className={`${cardClass} mt-6`}>
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#007BFF] to-[#28A745] bg-clip-text text-transparent">Recent Activity</h2>
              <div className="space-y-4">
                <div className="p-3 rounded-lg border border-blue-100 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Package delivered</div>
                  <div className="font-medium">New York to Boston</div>
                  <div className="text-sm text-[#28A745]">Feb 22, 2025</div>
                </div>
                <div className="p-3 rounded-lg border border-blue-100 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Package in transit</div>
                  <div className="font-medium">Chicago to Detroit</div>
                  <div className="text-sm text-[#007BFF]">Feb 25, 2025</div>
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
