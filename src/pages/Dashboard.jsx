import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import axios from 'axios';

// Components
import LookerStudioEmbed from '../components/ui/LookerStudioEmbed';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import UserStats from '../components/dashboard/UserStats';
import PartnerStats from '../components/dashboard/PartnerStats';
import EmptyState from '../components/ui/EmptyState';
import Navbar from '../components/Navbar';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user has delivery requests or is a delivery partner
  const [hasDeliveryRequests, setHasDeliveryRequests] = useState(false);
  const [isDeliveryPartner, setIsDeliveryPartner] = useState(false);

  // Add this new useEffect to handle authentication
  useEffect(() => {
    if (!user && !loading) {
      // Redirect to home where the signin modal can be shown  if user is not available
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Skip API calls if user is not available yet
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Get user information
        const userResponse = await axios.get(`/api/users/${user._id}`);
        setIsDeliveryPartner(userResponse.data.isDeliveryPartner);

        // Fetch data based on active tab
        if (activeTab === 'users') {
          const deliveriesResponse = await axios.get(`/api/deliveries/user/${user._id}`);
          setHasDeliveryRequests(deliveriesResponse.data.length > 0);
          
          if (deliveriesResponse.data.length > 0) {
            // Get user dashboard data
            const userDashboardResponse = await axios.get(`/api/dashboard/user/${user._id}`);
            setDashboardData(userDashboardResponse.data);
          }
        } else {
          // Only fetch partner data if the user is a delivery partner
          if (userResponse.data.isDeliveryPartner) {
            const partnerStatsResponse = await axios.get(`/api/dashboard/partner/${user._id}`);
            setDashboardData(partnerStatsResponse.data);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, activeTab]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Render empty state messages
  const renderEmptyState = () => {
    if (activeTab === 'users' && !hasDeliveryRequests) {
      return (
        <EmptyState
          title="No delivery requests yet"
          description="You haven't made any delivery requests yet. Start by creating your first delivery request."
          actionText="Post a Delivery"
          onAction={() => navigate('/post-delivery')}
        />
      );
    } else if (activeTab === 'deliveryPartner' && !isDeliveryPartner) {
      return (
        <EmptyState
          title="Not a delivery partner yet"
          description="Register as a delivery partner today to start earning."
          actionText="Become a Partner"
          onAction={() => navigate('/partner-registration')}
        />
      );
    }
    return null;
  };

  // Render dashboard content
  const renderDashboardContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (!user) {
      return <LoadingSpinner />;
    }

    if (
      (activeTab === 'users' && !hasDeliveryRequests) ||
      (activeTab === 'deliveryPartner' && !isDeliveryPartner)
    ) {
      return renderEmptyState();
    }

    return (
      <div className="dashboard-content">
        {activeTab === 'users' && dashboardData && (
          <UserStats data={dashboardData} />
        )}
        {activeTab === 'deliveryPartner' && dashboardData && (
          <PartnerStats data={dashboardData} />
        )}
        
        {/* Looker Studio Embedded Reports */}
        {activeTab === 'users' && hasDeliveryRequests && user && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Analytics Dashboard</h3>
            <LookerStudioEmbed
              reportId={process.env.REACT_APP_USER_DASHBOARD_REPORT_ID}
              userId={user._id}
            />
          </div>
        )}
        
        {activeTab === 'deliveryPartner' && isDeliveryPartner && user && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Partner Analytics</h3>
            <LookerStudioEmbed
              reportId={process.env.REACT_APP_PARTNER_DASHBOARD_REPORT_ID}
              userId={user._id}
            />
          </div>
        )}
      </div>
    );
  };

  // Add a check for user before rendering full dashboard
  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="dashboard-page p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* Secondary Navigation */}
        <div className="secondary-nav mb-8 border-b">
          <ul className="flex">
            <li
              className={`mr-8 pb-2 cursor-pointer ${
                activeTab === 'users' ? 'border-b-2 border-blue-500 font-semibold' : ''
              }`}
              onClick={() => handleTabChange('users')}
            >
              Users
            </li>
            <li
              className={`pb-2 cursor-pointer ${
                activeTab === 'deliveryPartner' ? 'border-b-2 border-blue-500 font-semibold' : ''
              }`}
              onClick={() => handleTabChange('deliveryPartner')}
            >
              Delivery Partner
            </li>
          </ul>
        </div>
        
        {/* Dashboard Content */}
        {renderDashboardContent()}
      </div>
    </div>
  );
};

export default Dashboard;