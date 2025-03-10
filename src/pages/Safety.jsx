import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, UserCheck, AlertTriangle, Clock, MessageSquare, Mail, Lock, Package, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";

const SafetyFeature = ({ icon, title, description }) => {
  const Icon = icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center h-full"
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
    // Toggle email visibility when the button is clicked
    setShowEmail(!showEmail);
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
    },
    {
      icon: Lock,
      title: "Secure Payment System",
      description: "Our encrypted payment gateway ensures your financial information remains protected, with secure transactions and no hidden fees."
    }
  ];

  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Navbar />
      <section id="safety-section" className="py-16 bg-gradient-to-b from-gray-50 to-white min-h-screen w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 md:mb-20"
          >
            <div className="inline-block mb-3 bg-blue-50 px-6 py-2 rounded-full">
              <span className="text-[#007BFF] font-medium">Safety First</span>
            </div>
            <h1 className="text-3xl py-3 sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#007BFF] to-[#28A745] text-transparent bg-clip-text">
              Your Safety is Our Priority
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              At Peership, we've built multiple layers of protection to ensure your packages and personal information remain secure from pickup to delivery.
            </p>
          </motion.div>

          {/* Safety Features Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {safetyFeatures.map((feature, index) => (
              <motion.div key={index} variants={itemVariants} transition={{ duration: 0.5 }}>
                <SafetyFeature
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Safety Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 sm:p-10 md:p-12 my-10 border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:items-center mb-6 md:mb-10">
              <div className="bg-blue-50 p-3 rounded-full mr-4 mb-4 md:mb-0 inline-flex self-start">
                <Shield className="w-8 h-8 text-[#007BFF]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#007BFF]">Safe Delivery Guidelines</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#007BFF]">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">For Senders</h3>
                <ul className="list-none space-y-3">
                  {[
                    "Properly package your items to prevent damage during transit",
                    "Never send prohibited items (medications, hazardous materials, illegal goods)",
                    "Take photos of your items before packaging for documentation",
                    "Use our secure payment system - never pay travelers outside the platform",
                    "Meet travelers in public places for package handoffs when possible",
                    "Provide clear delivery instructions for your recipient",
                    "Ensure accurate dimensions and weight information"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block bg-[#007BFF] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#28A745]">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">For Travelers</h3>
                <ul className="list-none space-y-3">
                  {[
                    "Always inspect packages before accepting them",
                    "Request to see the contents when legal regulations permit",
                    "Decline packages that seem suspicious or improperly sealed",
                    "Store packages safely during transit to prevent damage",
                    "Follow all delivery instructions provided by the sender",
                    "Maintain regular communication with senders and recipients",
                    "Report any issues or concerns immediately to our support team"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block bg-[#28A745] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Peership Trust Framework */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 sm:p-10 md:p-12 my-10 border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:items-center mb-6 md:mb-10">
              <div className="bg-blue-50 p-3 rounded-full mr-4 mb-4 md:mb-0 inline-flex self-start">
                <Package className="w-8 h-8 text-[#007BFF]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#007BFF]">Peership Trust Framework</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-[#007BFF] p-2 rounded-full mr-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Before Travel</h3>
                </div>
                <ul className="list-none space-y-3">
                  {[
                    "Comprehensive background checks",
                    "Identity verification process",
                    "Secure package handover protocol",
                    "Pre-travel package inspection"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block bg-[#007BFF] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-[#28A745] p-2 rounded-full mr-3">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">During Transit</h3>
                </div>
                <ul className="list-none space-y-3">
                  {[
                    "Real-time GPS package tracking",
                    "Encrypted communications",
                    "Secure storage guidelines",
                    "Regular status updates"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block bg-[#28A745] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-[#6C757D] p-2 rounded-full mr-3">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">After Delivery</h3>
                </div>
                <ul className="list-none space-y-3">
                  {[
                    "Delivery confirmation system",
                    "Two-way rating and feedback",
                    "Dispute resolution process",
                    "Quality assurance checks"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block bg-[#6C757D] rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Safety Commitment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
           className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl shadow-lg p-8 sm:p-10 md:p-12 my-10 border border-blue-100"
          >
            <div className="flex flex-col md:flex-row md:items-center mb-6 md:mb-10">
              <div className="bg-blue-50 p-3 rounded-full mr-4 mb-4 md:mb-0 inline-flex self-start">
                <MessageSquare className="w-8 h-8 text-[#007BFF]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#007BFF]">Our Commitment to You</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Continuous Improvement</h3>
                <p className="text-gray-600 mb-4">
                  At Peership, safety isn't a static feature—it's an ongoing commitment. Our dedicated security team continuously enhances our platform with the latest protective technologies and protocols to stay ahead of potential risks.
                </p>
                <p className="text-gray-600">
                  We regularly update our safety measures based on user feedback, industry best practices, and emerging security standards to provide the most secure peer-to-peer delivery experience possible.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">24/7 Support Access</h3>
                <p className="text-gray-600 mb-4">
                  Our dedicated support team is available 24/7 to address any safety concerns you may encounter while using Peership. Whether you're a sender or traveler, we're here to ensure your experience is secure and satisfactory.
                </p>
                <p className="text-gray-600">
                  From package protection claims to security questions, our team is prepared to provide prompt assistance and resolution for any issues that arise during your Peership journey.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactSupport}
                className="bg-[#007BFF] hover:bg-[#0056b3] text-white py-3 px-8 rounded-full font-medium shadow-lg transition duration-300 flex items-center"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Contact Support
              </motion.button>
              
              {showEmail && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 flex items-center bg-blue-50 py-3 px-6 rounded-full shadow-md"
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