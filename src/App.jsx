import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";

import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import SettingsPage from "./pages/SettingsPage";
import ResetPasswordForm from "./components/ResetPassword";
import ExploreDeliveries from "./components/ExploreDeliveries";
import PostDeliveries from "./components/PostDeliveries";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastProvider } from "./context/ToastContext";
import TermsCondition from "./pages/settings/TermsCondition";
import Support from './pages/settings/Support';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Safety from "./pages/Safety";


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
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
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
      <Route
          path="/post"
          element={
            <ProtectedRoute>
              <PostDeliveries />
            </ProtectedRoute>
          }
      />

    
      <Route path="/terms" element={<TermsCondition />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/Safety" element={<Safety/>}/>
      <Route path="/support" element={<Support />} />        
      <Route path="/reset-password" element={<ResetPasswordForm />} />
      {/* At the end of your Routes component in App.jsx, add this: */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </ToastProvider>
  );
};

export default App;