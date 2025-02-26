import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "./ui/Button";

const Hero = () => {
  return (
    <section className="min-h-screen relative pt-16 pb-8 flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center max-w-7xl">
        {/* Main content area with flexbox for alignment */}
        <div className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left">
          {/* Left side: Text content */}
          <div className="lg:w-1/2 lg:pr-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-8"
            >
              <span className="text-[#007BFF]">Peer-to-Peer</span>
              <br />
              <span className="text-[#28A745]">Delivery Platform</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto lg:mx-0 max-w-lg text-xl text-blue-800/95 mb-8"
            >
              Turn your daily commute into a money-making opportunity. Join our
              community of trusted peers delivering packages along their route.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-[#007BFF] hover:bg-[#007BFF]/90 text-white"
              >
                Get Started
              </Button>
              <Button
                asChild
                size="lg"
                className="border-2 border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white"
              >
                <a href="/explore">Explore Deliveries</a>
              </Button>
            </div>
          </div>

          {/* Right side: GIF animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex justify-center mt-8 lg:mt-0"
          >
            <img
              src="/logo_animation_final.gif"
              alt="Animated GIF"
              className="w-full max-w-md rounded-lg"
            />
          </motion.div>
        </div>

        {/* Chatbot button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            size="icon"
            className="!w-14 !h-14 !rounded-full bg-[#007BFF] hover:bg-blue-600 shadow-lg flex items-center justify-center"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
