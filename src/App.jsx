import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ResetPasswordForm from "./components/ResetPassword";
import ExploreDeliveries from "./components/ExploreDeliveries";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastProvider } from "./context/ToastContext";
import PostDeliveries from "./components/PostDeliveries";

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
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/settings/*"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <ExploreDeliveries />
            </ProtectedRoute>
          }
      />

      {/* Auth routes */}
      <Route path="/reset-password" element={<ResetPasswordForm />} />

      {/* Redirect to account settings by default */}
      <Route
        path="/profile/settings"
        element={<Navigate to="/profile/settings/account" />}/>
      <Route path="/explore" element={<ExploreDeliveries/>}/>
      <Route path="/post" element={<PostDeliveries/>} />
    </Routes>
    </ToastProvider>
  );
};

export default App;