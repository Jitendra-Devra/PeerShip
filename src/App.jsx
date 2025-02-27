import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import "./styles.css";

const App = () => {
  const location = useLocation();
  // Scroll to top on route change
  useEffect(() => {
    const hash = location.hash.substring(1); // Remove #
    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default App;
