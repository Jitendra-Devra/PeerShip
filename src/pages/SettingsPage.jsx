import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Routes, Route, Link, Navigate } from "react-router-dom";
import { User, LogOut, Mail, Phone, Shield, Camera, Settings } from "lucide-react";
import { Uisetting } from "../components/ui/Icons.jsx";
import Navbar from "../components/Navbar.jsx";

// Import settings components
import AccountDetails from "./settings/AccountDetails.jsx";
import VerifyPartner from "./settings/VerifyPartner.jsx";
import VehicleType from "./settings/VehicleType.jsx";
import PaymentWallet from "./settings/PaymentWallet.jsx";
import TermsCondition from "./settings/TermsCondition.jsx";
import Support from "./settings/Support.jsx";
import DeleteAccount from "./settings/DeleteAccount";

const SettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Piyush Mandloi",
    email: "piyush.mandloi@example.com",
    phone: "+1 (835) 795-5178",
    isVerified: true,
    profileImage: "/api/placeholder/150/150",
    walletBalance: "$132.40",
    // Additional fields for more complete profile
    gender: "prefer-not-to-say",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const containerClass = darkMode 
    ? "min-h-screen bg-gray-900 text-white" 
    : "min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50";

  // Handle profile update
  const handleProfileUpdate = (updatedData) => {
    setProfileData({
      ...profileData,
      ...updatedData
    });
    // In a real app, you would save this to a backend
    alert("Profile information updated successfully!");
  };

  // Setting tabs configuration
  const settingsTabs = [
    { id: "account", label: "Account Details", path: "/profile/settings/account" },
    { id: "verify", label: "Verify for Delivery Partner", path: "/profile/settings/verify" },
    { id: "payment", label: "Payment Wallet", path: "/profile/settings/payment" },
    { id: "vehicle", label: "Vehicle Type", path: "/profile/settings/vehicle" },
    { id: "terms", label: "Terms and Condition", path: "/profile/settings/terms" },
    { id: "support", label: "Support", path: "/profile/settings/support" },
  ];

  // Get current active tab based on URL
  const getCurrentTab = () => {
    const path = location.pathname;
    const tab = path.split('/').pop();
    return tab || 'account';
  };

  // Redirect to account tab if on the base settings path
  useEffect(() => {
    if (location.pathname === "/profile/settings") {
      navigate("/profile/settings/account");
    }
  }, [location.pathname, navigate]);

  return (
    <div className={containerClass}>
      {/* Navbar */}
      <Navbar />
      
      {/* Settings Tabs - made sticky with fixed positioning */}
      <div className="w-full fixed top-14 z-10 bg-white shadow-md border-b border-blue-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex-1 overflow-x-auto px-2">
              <div className="flex space-x-1 md:space-x-6">
                {settingsTabs.map((tab) => (
                  <Link
                    key={tab.id}
                    to={tab.path}
                    className={`whitespace-nowrap py-3 px-3 md:px-4 text-sm md:text-base transition-colors duration-300 ${
                      getCurrentTab() === tab.id
                        ? "text-blue-600 border-b-2 border-blue-500 font-medium"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {tab.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/profile/settings/delete"
              className={`whitespace-nowrap py-3 px-4 text-red-500 hover:text-red-600 text-sm md:text-base transition-colors duration-300 ${
                getCurrentTab() === "delete" ? "font-medium" : ""
              }`}
            >
              Delete Account
            </Link>
          </div>
        </div>
      </div>
      
      {/* Add padding to account for the fixed navbar and tabs */}
      <div className="pt-28 container mx-auto px-6 py-6">
      
        {/* Content Area - This is where the different settings components will render */}
        <div className="mb-8">
          <Routes>
            <Route path="/account" element={<AccountDetails profileData={profileData} onUpdateProfile={handleProfileUpdate} />} />
            <Route path="/verify" element={<VerifyPartner profileData={profileData} />} />
            <Route path="/payment" element={<PaymentWallet profileData={profileData} />} />
            <Route path="/vehicle" element={<VehicleType profileData={profileData} />} />
            <Route path="/terms" element={<TermsCondition />} />
            <Route path="/support" element={<Support />} />
            <Route path="/delete" element={<DeleteAccount profileData={profileData} />} />
            <Route path="/" element={<Navigate to="/profile/settings/account" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;