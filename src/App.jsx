import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";

import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import "./styles.css";
import ExploreDeliveries from "./components/ExploreDeliveries";

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
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add a route for the terms page */}
      <Route path="/terms" element={<TermsCondition />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/Safety" element={<Safety/>}/>
      <Route path="/support" element={<Support />} />


      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/settings/*" element={<SettingsPage />} />
      {/* Redirect to account settings by default */}
      <Route
        path="/profile/settings"
        element={<Navigate to="/profile/settings/account" />}
      />
      <Route path="/explore" element={<ExploreDeliveries />} />
      <Route path="/post" element={<PostDeliveries />} />
    </Routes>
  );
};

export default App;
