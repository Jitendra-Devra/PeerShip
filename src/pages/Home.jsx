import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import About from "../components/About.jsx";
import Review from "../components/Review.jsx";
import Footer from "../components/Footer.jsx";
import SignInModal from "../components/SignInModal.jsx";
import SignUpModal from "../components/SignUpModal.jsx";
import ForgotPasswordForm from "../components/ForgotPassword.jsx"; // Import ForgotPasswordForm

const Home = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false); // New state for forgot password

  // Function to handle sign in button click
  const handleSignInClick = () => {
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
    setIsForgotPasswordOpen(false); // Close forgot password form
  };

  // Function to handle sign up button click
  const handleSignUpClick = () => {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
    setIsForgotPasswordOpen(false); // Close forgot password form
  };

  // Function to handle switching from sign in to sign up
  const handleSwitchToSignUp = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(true);
    setIsForgotPasswordOpen(false); // Close forgot password form
  };

  // Function to handle switching from sign up to sign in
  const handleSwitchToSignIn = () => {
    setIsSignUpOpen(false);
    setIsSignInOpen(true);
    setIsForgotPasswordOpen(false); // Close forgot password form
  };

  // Function to handle switching to forgot password form
  const handleSwitchToForgotPassword = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
    setIsForgotPasswordOpen(true);
  };

  // Function to handle switching back to sign in from forgot password
  const handleBackToSignIn = () => {
    setIsForgotPasswordOpen(false);
    setIsSignInOpen(true);
  };

  // Function to close all modals
  const handleCloseModal = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
    setIsForgotPasswordOpen(false);
  };

  return (
    <div>
      <Navbar
        onSignInClick={handleSignInClick}
        onSignUpClick={handleSignUpClick}
      />
      <Hero />
      <Features />
      <HowItWorks />
      <div id="about">
        <About />
      </div>
      <Review />
      <Footer />

      {/* Modal rendered at root level */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={handleCloseModal}
        onSwitchToSignUp={handleSwitchToSignUp}
        onForgotPassword={handleSwitchToForgotPassword} // Add prop for forgot password
      />

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={handleCloseModal}
        onSwitchToSignIn={handleSwitchToSignIn}
      />

      {/* Conditionally render the ForgotPassword component */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-30 h-screen backdrop-blur-sm z-[50] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full my-auto max-h-[85vh] overflow-auto p-6 relative">
            {/* Close button */}
            <button 
              onClick={handleCloseModal} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ForgotPasswordForm />
            <div className="mt-4 text-center">
              <button 
                onClick={handleBackToSignIn} 
                className="text-blue-600 hover:underline text-sm"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;