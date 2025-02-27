import React, { useState } from "react";
import { useNavigate, useLocation, Routes, Route, Link } from "react-router-dom";
import { User, LogOut, Mail, Phone, Shield, DollarSign, Settings, Truck } from "lucide-react";
import { Uisetting } from "../components/ui/Icons.jsx";
import Navbar from "../components/Navbar.jsx";

// Settings sub-pages components
const AccountDetails = () => <div className="p-6 bg-white rounded-xl shadow-lg">Account Details Content</div>;
const VerifyPartner = () => <div className="p-6 bg-white rounded-xl shadow-lg">Verification Content</div>;
const PaymentWallet = () => <div className="p-6 bg-white rounded-xl shadow-lg">Payment Wallet Content</div>;
const VehicleType = () => <div className="p-6 bg-white rounded-xl shadow-lg">Vehicle Type Content</div>;
const TermsCondition = () => <div className="p-6 bg-white rounded-xl shadow-lg">Terms and Condition Content</div>;
const Support = () => <div className="p-6 bg-white rounded-xl shadow-lg">Support Content</div>;
const DeleteAccount = () => <div className="p-6 bg-white rounded-xl shadow-lg text-red-500">Delete Account Content</div>;

const SettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [profileData] = useState({
    name: "Piyush Mandloi", // Updated to match your mockup
    email: "piyush.mandloi@example.com",
    phone: "+1 (835) 795-5178", // Updated to match your mockup
    isVerified: true,
    profileImage: "/api/placeholder/150/150",
    walletBalance: "$132.40",
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const containerClass = darkMode 
    ? "min-h-screen bg-gray-900 text-white" 
    : "min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50";

  // Determine active tab from URL
  const currentTab = location.pathname.split("/").pop();

  const settingsTabs = [
    { id: "account", label: "Account Details", path: "/profile/settings/account" },
    { id: "verify", label: "Verify for being a delivery Partner", path: "/profile/settings/verify" },
    { id: "payment", label: "Payment Wallet Setting", path: "/profile/settings/payment" },
    { id: "vehicle", label: "Vehicle Type", path: "/profile/settings/vehicle" },
    { id: "terms", label: "Terms and Condition", path: "/profile/settings/terms" },
    { id: "support", label: "Support", path: "/profile/settings/support" },
  ];

  return (
    <div className={containerClass}>
      <Navbar />
      
      {/* Top Navigation Buttons */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors duration-300 rounded-full px-6 py-2 font-medium">Peership</button>
          <div className="flex flex-wrap gap-4">
            <button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors duration-300 rounded-full px-6 py-2 font-medium">Explore deliveries</button>
            <button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors duration-300 rounded-full px-6 py-2 font-medium">Post a new Delivery</button>
            <button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors duration-300 rounded-full px-6 py-2 font-medium">Dashboard</button>
            <button 
              className="border-2 border-blue-500 bg-blue-100 text-blue-800 shadow-md rounded-full px-6 py-2 font-medium"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
          </div>
        </div>
      </div>
      
      {/* Secondary Settings Navigation Bar */}
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-blue-100">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex-1 overflow-x-auto px-2">
              <div className="flex space-x-1 md:space-x-6">
                {settingsTabs.map((tab) => (
                  <Link
                    key={tab.id}
                    to={tab.path}
                    className={`whitespace-nowrap py-2 px-3 md:px-4 text-sm md:text-base transition-colors duration-300 ${
                      location.pathname === tab.path
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
              className={`whitespace-nowrap py-2 px-4 text-red-500 hover:text-red-600 text-sm md:text-base transition-colors duration-300 ${
                location.pathname === "/profile/settings/delete" ? "font-medium" : ""
              }`}
            >
              Delete Account
            </Link>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-blue-100">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32">
                  <img 
                    src={profileData.profileImage} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover border-4 border-blue-500 shadow-md" 
                  />
                </div>
              </div>
              
              {/* Profile Details */}
              <div className="flex flex-col justify-center mt-6 md:mt-0">
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Name: {profileData.name}</h2>
                  <button className="ml-4 text-blue-600 hover:text-blue-800">Edit</button>
                </div>
                
                <div className="flex items-center mt-2 mb-2">
                  <Phone size={18} className="text-blue-500 mr-2" />
                  <p className="text-gray-700">Phone Number: {profileData.phone}</p>
                </div>
                
                <div className="flex items-center mt-2">
                  <Mail size={18} className="text-blue-500 mr-2" />
                  <p className="text-gray-700">Email: {profileData.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        {/* Content Area */}
        <div className="mb-8">
          <Routes>
            <Route path="/account" element={<AccountDetails />} />
            <Route path="/verify" element={<VerifyPartner />} />
            <Route path="/payment" element={<PaymentWallet />} />
            <Route path="/vehicle" element={<VehicleType />} />
            <Route path="/terms" element={<TermsCondition />} />
            <Route path="/support" element={<Support />} />
            <Route path="/delete" element={<DeleteAccount />} />
            <Route index element={<AccountDetails />} />
          </Routes>
        </div>

        {/* Update Info Button */}
        <div className="flex justify-end mb-8">
          <button className="bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors duration-300 shadow-md">
            Update Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;