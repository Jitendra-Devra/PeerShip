import React from "react";
import { motion } from "framer-motion";
import { Uideliveryman, Uiwallet,Uisecure, Uitracking } from "./ui/Icons";

const features = [
  {
    icon: Uideliveryman,
    title: "Effortless Peer-to-Peer Delivery",
    description:
      "Need to send something but don’t want to pay high courier fees? With Peership, you can find trusted travelers already heading your package’s way. Save money, reduce hassle, and get your items delivered faster!",
  },
  {
    icon: Uiwallet,
    title: "Earn Money While Traveling",
    description:
      "Got extra space in your luggage or vehicle? Turn your trips into earning opportunities! Deliver packages for others along your route and get paid for every successful delivery.",
  },
  {
    icon: Uisecure,
    title: "Secure & Verified Network",
    description:
      "Safety is our priority! Peership verifies users through ID checks and ratings, ensuring a trusted community where both senders and travelers feel secure in every transaction.",
  },
  {
    icon: Uitracking,
    title: "Smart Matching & Real-Time Tracking",
    description:
      "Our AI-powered system connects you with the best-suited travelers or senders based on location, timing, and delivery needs. Plus, stay updated with real-time tracking for complete peace of mind.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-2 sm:px-3 lg:px-10 max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#007BFF] to-[#28A745]">
            Why Choose PeerShip?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of people who are already earning while traveling
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between min-h-[350px]"
            >
              <div className="w-12 h-12 bg-[#007BFF]/10 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <feature.icon className="w-8 h-8 text-[#007BFF]" />
              </div>
              <div className="flex-grow text-center">
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} className="mt-6 p-4 bg-gradient-to-r from-[#007BFF]/5 to-[#28A745]/5 rounded-lg text-center">
                <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#007BFF] to-[#28A745]">Learn more →</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
