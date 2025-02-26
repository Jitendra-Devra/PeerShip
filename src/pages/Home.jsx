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

const Home = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
// Function to handle sign in button click
const handleSignInClick = () => {
  setIsSignInOpen(true);
  setIsSignUpOpen(false);
};

// Function to handle sign up button click
const handleSignUpClick = () => {
  setIsSignUpOpen(true);
  setIsSignInOpen(false);
};

// Function to handle switching from sign in to sign up
const handleSwitchToSignUp = () => {
  setIsSignInOpen(false);
  setIsSignUpOpen(true);
};

// Function to handle switching from sign up to sign in
const handleSwitchToSignIn = () => {
  setIsSignUpOpen(false);
  setIsSignInOpen(true);
};

// Function to close modals
const handleCloseModal = () => {
  setIsSignInOpen(false);
  setIsSignUpOpen(false);
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
      />

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={handleCloseModal}
        onSwitchToSignIn={handleSwitchToSignIn}
      />
    </div>
  );
};

export default Home;