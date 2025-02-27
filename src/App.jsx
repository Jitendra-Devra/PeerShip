import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import "./styles.css";

const App = () => {
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
    </Routes>
  );
};

export default App;
