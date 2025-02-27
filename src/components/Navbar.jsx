import React, { useState } from "react";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../components/ui/Button"; // Adjust path as needed
import { Uiprofile } from "./ui/Icons"; // Import the profile icon

const Navbar = ({ onSignInClick, onSignUpClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Add this state to track login status (for frontend testing)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // For testing purposes - toggle login state when clicking Sign In
  const handleSignIn = () => {
    setIsLoggedIn(true);
    // You can still call the original onSignInClick if needed
    if (onSignInClick) onSignInClick();
  };

  // For testing purposes - log out
  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="fixed flex justify-between items-center top-0 w-full bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-blue-900/95 backdrop-blur-md z-50 border-b border-white/10 px-6 py-2">
      {/* Leftmost Side - PeerShip */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="ml-0"
      >
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            window.location.href = "/"; // Redirect to home
          }}
          className="text-lg font-bold bg-white rounded-xl px-3 py-2"
        >
          <span className="text-[#007BFF]">Peer</span>
          <span className="text-[#28A745]">Ship</span>
        </Link>
      </motion.div>

      {/* Rightmost Side - Menu Items */}
      <div className="hidden lg:flex items-center space-x-6 mr-0">
        <Link
          to="/explore"
          className="text-white/90 py-2 hover:text-white transition-colors border-b-2 border-transparent hover:border-white"
        >
          Explore Deliveries
        </Link>
        <Link
          href="/post"
          className="text-white/90 py-2 hover:text-white transition-colors border-b-2 border-transparent hover:border-white"
        >
          Post a Delivery
        </Link>
        <Link
          to="/#about"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-white/90 py-2 hover:text-white transition-colors border-b-2 border-transparent hover:border-white"
        >
          About Us
        </Link>
        <Link
          href="/terms"
          className="text-white/90 py-2 hover:text-white transition-colors border-b-2 border-transparent hover:border-white"
        >
          Terms & Conditions
        </Link>

        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
          // Show these when logged in
          <>
            <button
              onClick={() => (window.location.href = "/profile")}
              
              className="relative inline-flex items-center justify-center p-auto font-semibold leading-4 cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 border border-transparent hover:border-teal-500"
            >
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <Uiprofile className="w-8 h-8" />
              </div>
            </button>
            <Button
              onClick={() => (window.location.href = "/dashboard")}
              variant="outline"
              className="relative inline-block p-px font-semibold leading-4 bg-white border-[2px] cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 border border-transparent hover:border-teal-500"
            >
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <span className="transition-all text-[#007BFF] duration-500 group-hover:translate-x-1">
                  Dashboard
                </span>
              </div>
            </Button>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="relative inline-block p-px font-semibold leading-4 bg-white border-[2px] cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 border border-transparent hover:border-teal-500"
            >
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <span className="transition-all text-[#007BFF] duration-500 group-hover:translate-x-1">
                  Sign Out
                </span>
              </div>
            </Button>
          </>
        ) : (
          // Show these when logged out
          <>
            <Button
              onClick={handleSignIn}
              variant="outline"
              className="relative inline-block p-px font-semibold leading-4 bg-white border-[2px] cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 border border-transparent hover:border-teal-500"
            >
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <span className="transition-all text-[#007BFF] duration-500 group-hover:translate-x-1">
                  Sign In
                </span>
              </div>
            </Button>
            <Button
              onClick={onSignUpClick}
              variant="outline"
              className="relative inline-block p-px font-semibold leading-4 bg-white border-[2px] cursor-pointer rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 border border-transparent hover:border-teal-500"
            >
              <div className="relative z-10 flex items-center justify-center space-x-2">
                <span className="transition-all text-[#007BFF] duration-500 group-hover:translate-x-1">
                  Sign Up
                </span>
              </div>
            </Button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-white/90 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-blue-900/95 backdrop-blur-md w-full absolute top-full left-0"
          >
            <div className="px-4 pt-2 pb-3 space-y-1 text-center">
              <Link
                to="/explore"
                className="block px-3 py-2 text-white/90 hover:text-white transition-colors border-b-2 border-transparent hover:border-white"
              >
                Explore Deliveries
              </Link>
              <Link
                href="/post"
                className="block px-3 py-2 text-white/90 hover:text-white transition-colors border-b-2 border-transparent hover:border-white"
              >
                Post a Delivery
              </Link>
              <Link
                href="/terms"
                className="block px-3 py-2 text-white/90 hover:text-white transition-colors border-b-2 border-transparent hover:border-white"
              >
                About Us
              </Link>
              <Link
                href="/terms"
                className="block px-3 py-2 text-white/90 hover:text-white transition-colors border-b-2 border-transparent hover:border-white"
              >
                Terms & Conditions
              </Link>

              <div className="space-y-2 pt-2">
                {isLoggedIn ? (
                  // Mobile menu when logged in
                  <>
                    <Button
                      onClick={() => (window.location.href = "/profile")}
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-blue-900 border-b-2 border-transparent hover:border-white flex items-center justify-center"
                    >
                      <Uiprofile className="w-3 h-3 mr-3" />
                      Profile
                    </Button>
                    <Button
                      onClick={() => (window.location.href = "/dashboard")}
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-blue-900 border-b-2 border-transparent hover:border-white"
                    >
                      Dashboard
                    </Button>
                    <Button
                      onClick={handleSignOut}
                      className="w-full bg-[#28A745] hover:bg-[#28A745]/90 text-white shadow-lg hover:shadow-[#28A745]/25"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  // Mobile menu when logged out
                  <>
                    <Button
                      onClick={handleSignIn}
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-blue-900 border-b-2 border-transparent hover:border-white"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={onSignUpClick}
                      className="w-full bg-[#28A745] hover:bg-[#28A745]/90 text-white shadow-lg hover:shadow-[#28A745]/25"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
