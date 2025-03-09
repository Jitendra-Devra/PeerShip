import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, UserCheck, AlertTriangle, Clock, MessageSquare, Mail } from "lucide-react";
import Navbar from "../components/Navbar";

const SafetyFeature = ({ icon, title, description }) => {
  const Icon = icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
    >
      <div className="bg-blue-50 p-3 rounded-full mb-4">
        <Icon className="w-8 h-8 text-[#007BFF]" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Safety = () => {
  const [showEmail, setShowEmail] = useState(false);
  const supportEmail = "jitendradevra01@gmail.com";

  const handleContactSupport = () => {
    // Option 1: Toggle showing the email below the button
    setShowEmail(true);
    
    // Option 2: Uncomment this for redirection to support page
    // window.location.href = "/support"; 
  };

  const safetyFeatures = [
    {
      icon: Shield,
      title: "ID Verification",
      description: "All Peership travelers undergo a rigorous identity verification process before joining our platform to ensure they are who they claim to be."
    },
    {
      icon: UserCheck,
      title: "User Ratings & Reviews",
      description: "Our transparent rating system helps maintain quality and trust. Choose travelers with high ratings and read authentic reviews from other users."
    },
    {
      icon: AlertTriangle,
      title: "Package Protection",
      description: "Packages sent through Peership are protected up to $500. Our protection policy covers loss, damage, or theft during transit."
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Follow your package's journey in real-time with our advanced tracking system, giving you peace of mind throughout the delivery process."
    },
    {
      icon: MessageSquare,
      title: "Secure Messaging",
      description: "Our in-app messaging system allows you to communicate with your delivery partner without sharing personal contact information."
    }
  ];

  return (
    <>
      <Navbar />
      <section id="safety-section" className="py-16 bg-gray-50 min-h-screen w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="text-3xl py-3 sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#007BFF] to-[#28A745] text-transparent bg-clip-text">
              Your Safety is Our Priority
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              At Peership, we've built multiple layers of protection to ensure your packages and personal information remain secure from pickup to delivery.
            </p>
          </motion.div>

          {/* Safety Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 px-4">
            {safetyFeatures.map((feature, index) => (
              <SafetyFeature
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          {/* Additional Safety Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 max-w-4xl mx-auto my-8 mx-4 sm:mx-auto"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#007BFF]">Safe Delivery Guidelines</h2>
            
            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">For Senders</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1 md:space-y-2">
                  <li>Properly package your items to prevent damage during transit</li>
                  <li>Never send prohibited items (medications, hazardous materials, illegal goods)</li>
                  <li>Take photos of your items before packaging for documentation</li>
                  <li>Use our secure payment system - never pay travelers outside the platform</li>
                  <li>Meet travelers in public places for package handoffs when possible</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">For Travelers</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1 md:space-y-2">
                  <li>Always inspect packages before accepting them</li>
                  <li>Request to see the contents when legal regulations permit</li>
                  <li>Decline packages that seem suspicious or improperly sealed</li>
                  <li>Store packages safely during transit to prevent damage</li>
                  <li>Follow all delivery instructions provided by the sender</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Safety Commitment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12 md:mt-16 px-4"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-gray-800">Our Commitment to You</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              We continuously update our safety measures to provide the most secure delivery experience possible. 
              If you ever experience a safety concern while using Peership, our dedicated support team is available 24/7.
            </p>
            
            <div className="flex flex-col items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactSupport}
                className="mt-6 md:mt-8 bg-[#007BFF] hover:bg-[#0056b3] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full font-medium shadow-lg transition duration-300"
              >
                Contact Support
              </motion.button>
              
              {showEmail && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center bg-blue-50 py-2 px-4 rounded-full"
                >
                  <Mail className="w-5 h-5 text-[#007BFF] mr-2" />
                  <a href={`mailto:${supportEmail}`} className="text-[#007BFF] font-medium hover:underline">
                    {supportEmail}
                  </a>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Safety;