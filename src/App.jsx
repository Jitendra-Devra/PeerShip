import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import "./styles.css";
import ExploreDeliveries from "./components/ExploreDeliveries";

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
      <Route path="/profile/settings/*" element={<SettingsPage />} />
      {/* Redirect to account settings by default */}
      <Route
        path="/profile/settings"
        element={<Navigate to="/profile/settings/account" />}
      />
            <Route path="/explore" element={<ExploreDeliveries/>}/>

    </Routes>
  );
};

export default App;
