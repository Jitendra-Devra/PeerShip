import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const ExploreDeliveries = () => {
  // State variables
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [sortBy, setSortBy] = useState("Highest Payment");
  const [parcelSizeFilter, setParcelSizeFilter] = useState({
    Small: false,
    Medium: false,
    Large: false,
  });
  const [urgencyFilter, setUrgencyFilter] = useState({
    Normal: false,
    Urgent: false,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);
  const [filteredDeliveryItems, setFilteredDeliveryItems] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasFiltered, setHasFiltered] = useState(false);

  // Accepted deliveries state
  const [acceptedCards, setAcceptedCards] = useState(() => {
    const initialAccepted = {};
    const randomIndexes = [1, 4];
    randomIndexes.forEach((i) => (initialAccepted[i] = true));
    return initialAccepted;
  });

  // Sample delivery items data
  const deliveryItems = [
    {
      item: "Laptop",
      pickupLocation: "Location A",
      dropOffLocation: "Location B",
      deliveryDeadline: "2024-12-31",
      offeredPayment: "₹1000",
      parcelSize: "Small",
      urgency: "Normal",
      color: "#4299e1",
      clientRating: 4.9,
      verifiedId: true,
      postedHoursAgo: 2,
      trustedUsers: 728,
    },
    {
      item: "Books",
      pickupLocation: "Location C",
      dropOffLocation: "Location D",
      deliveryDeadline: "2025-01-15",
      offeredPayment: "₹500",
      parcelSize: "Medium",
      urgency: "Urgent",
      color: "#48bb78",
      clientRating: 5.0,
      verifiedId: true,
      postedHoursAgo: 5,
      trustedUsers: 312,
    },
    {
      item: "Mixer Grinder",
      pickupLocation: "Location C",
      dropOffLocation: "Location D",
      deliveryDeadline: "2025-01-15",
      offeredPayment: "₹550",
      parcelSize: "Large",
      urgency: "Normal",
      color: "#ed8936",
      clientRating: 4.7,
      verifiedId: true,
      postedHoursAgo: 1,
      trustedUsers: 150,
    },
    {
      item: "Mobile Phone",
      pickupLocation: "Location C",
      dropOffLocation: "Location D",
      deliveryDeadline: "2025-01-15",
      offeredPayment: "₹100",
      parcelSize: "Small",
      urgency: "Urgent",
      color: "#9f7aea",
      clientRating: 4.2,
      verifiedId: false,
      postedHoursAgo: 12,
      trustedUsers: 89,
    },
    {
      item: "Bottle",
      pickupLocation: "Location C",
      dropOffLocation: "Location D",
      deliveryDeadline: "2025-01-15",
      offeredPayment: "₹300",
      parcelSize: "Medium",
      urgency: "Normal",
      color: "#f56565",
      clientRating: 4.5,
      verifiedId: false,
      postedHoursAgo: 8,
      trustedUsers: 213,
    },
    {
      item: "Package",
      pickupLocation: "Location C",
      dropOffLocation: "Location D",
      deliveryDeadline: "2025-01-15",
      offeredPayment: "₹240",
      parcelSize: "Small",
      urgency: "Urgent",
      color: "#38b2ac",
      clientRating: 4.8,
      verifiedId: true,
      postedHoursAgo: 3,
      trustedUsers: 421,
    },
  ];

  // Initial load - show all items sorted by highest payment
  useEffect(() => {
    const sortedItems = [...deliveryItems].sort((a, b) => 
      parseInt(b.offeredPayment.replace("₹", "")) - 
      parseInt(a.offeredPayment.replace("₹", ""))
    );
    setFilteredDeliveryItems(sortedItems);
  }, []);

  // Handle accepting a delivery
  const handleAccept = (index) => {
    setAcceptedCards((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  // Toggle parcel size filter
  const handleParcelSizeChange = (size) => {
    setParcelSizeFilter({
      ...parcelSizeFilter,
      [size]: !parcelSizeFilter[size],
    });
  };

  // Toggle urgency filter
  const handleUrgencyChange = (urgency) => {
    setUrgencyFilter({ ...urgencyFilter, [urgency]: !urgencyFilter[urgency] });
  };

  // Clear all filters and reset to initial state
  const clearFilters = () => {
    setParcelSizeFilter({ Small: false, Medium: false, Large: false });
    setUrgencyFilter({ Normal: false, Urgent: false });
    setSortBy("Highest Payment");
    setFromLocation("");
    setToLocation("");
    setHasSearched(false);
    setHasFiltered(false);
    
    // Reset to show all items sorted by highest payment
    const sortedItems = [...deliveryItems].sort((a, b) => 
      parseInt(b.offeredPayment.replace("₹", "")) - 
      parseInt(a.offeredPayment.replace("₹", ""))
    );
    setFilteredDeliveryItems(sortedItems);
  };

  // Handle search action
  const handleSearch = () => {
    setHasSearched(true);
    applyFilters();
  };

  // Apply filters based on current state
  const applyFilters = () => {
    let filtered = [...deliveryItems];
    
    // Filter by location if search was performed
    if (hasSearched && (fromLocation || toLocation)) {
      filtered = filtered.filter(
        (item) =>
          item.pickupLocation.toLowerCase().includes(fromLocation.toLowerCase()) &&
          item.dropOffLocation.toLowerCase().includes(toLocation.toLowerCase())
      );
    }
    
    // Apply additional filters if any are active
    if (hasFiltered) {
      // Filter by parcel size
      const selectedSizes = Object.keys(parcelSizeFilter).filter(size => parcelSizeFilter[size]);
      if (selectedSizes.length > 0) {
        filtered = filtered.filter(item => selectedSizes.includes(item.parcelSize));
      }
      
      // Filter by urgency
      const selectedUrgencies = Object.keys(urgencyFilter).filter(urgency => urgencyFilter[urgency]);
      if (selectedUrgencies.length > 0) {
        filtered = filtered.filter(item => selectedUrgencies.includes(item.urgency));
      }
    }
    
    // Apply sorting
    if (sortBy === "Highest Payment") {
      filtered.sort((a, b) => 
        parseInt(b.offeredPayment.replace("₹", "")) - 
        parseInt(a.offeredPayment.replace("₹", ""))
      );
    } else if (sortBy === "Closest Pickup") {
      filtered.sort((a, b) => a.postedHoursAgo - b.postedHoursAgo);
    }
    
    setFilteredDeliveryItems(filtered);
    setIsAnimated(false);
    setLoadedItems([]);
  };

  // Handle applying filters from filter panel
  const handleApplyFilters = () => {
    setHasFiltered(true);
    applyFilters();
    setIsFilterOpen(false);
  };

  // Animation for loading items
  useEffect(() => {
    if (filteredDeliveryItems.length > 0 && !isAnimated) {
      const timer = setTimeout(() => {
        setLoadedItems([filteredDeliveryItems[0]]);

        const loadInterval = setInterval(() => {
          setLoadedItems((prev) => {
            if (prev.length >= filteredDeliveryItems.length) {
              clearInterval(loadInterval);
              setIsAnimated(true);
              return filteredDeliveryItems;
            }
            return [...prev, filteredDeliveryItems[prev.length]];
          });
        }, 150);

        return () => {
          clearInterval(loadInterval);
        };
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    } else if (filteredDeliveryItems.length === 0) {
      setLoadedItems([]);
      setIsAnimated(false);
    }
  }, [filteredDeliveryItems]);

  // Get gradient style for card borders
  const getCardBorderStyle = (index) => {
    const gradients = [
      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
      "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-indigo-50 via-blue-50 to-white mx-auto mt-3">
        {/* Search Bar and Filter Section */}
        <div className="container mx-auto px-4 pt-12">
          <div className="p-6 mb-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-[#007BFF]">
              Find Available Deliveries
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="From Location"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="bg-white pl-10 w-full border-2 border-indigo-100 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="To Location"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    className="bg-white pl-10 w-full border-2 border-indigo-100 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button
                  onClick={handleSearch}
                  className="flex-1 md:flex-none bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  Search
                </button>
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex-1 md:flex-none border-2 border-indigo-600 bg-white text-indigo-600 px-6 py-4 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    ></path>
                  </svg>
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Filter Dropdown */}
          {isFilterOpen && (
            <div className="bg-white p-6 rounded-2xl shadow-2xl mb-8 border border-indigo-100 transform transition-all duration-300 animate-fadeIn">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-2xl text-indigo-800">
                  Filters & Sorting Options
                </h3>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="border-b border-indigo-100 pb-2 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-indigo-700">
                    Sort by:
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        value="Highest Payment"
                        checked={sortBy === "Highest Payment"}
                        onChange={() => setSortBy("Highest Payment")}
                        className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">
                        Highest Payment
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        value="Closest Pickup"
                        checked={sortBy === "Closest Pickup"}
                        onChange={() => setSortBy("Closest Pickup")}
                        className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">
                        Closest Pickup
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-indigo-700">
                    Parcel Size:
                  </h4>
                  <div className="space-y-3">
                    {Object.keys(parcelSizeFilter).map((size) => (
                      <label
                        key={size}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={parcelSizeFilter[size]}
                          onChange={() => handleParcelSizeChange(size)}
                          className="form-checkbox h-5 w-5 text-indigo-600 rounded transition duration-150 ease-in-out"
                        />
                        <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">
                          {size}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-indigo-700">
                    Urgency:
                  </h4>
                  <div className="space-y-3">
                    {Object.keys(urgencyFilter).map((urgency) => (
                      <label
                        key={urgency}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={urgencyFilter[urgency]}
                          onChange={() => handleUrgencyChange(urgency)}
                          className="form-checkbox h-5 w-5 text-indigo-600 rounded transition duration-150 ease-in-out"
                        />
                        <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">
                          {urgency}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-8 space-x-4">
                <button
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
                <button
                  className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Delivery Items Grid or No Parcels Message */}
          {filteredDeliveryItems.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64 bg-white rounded-2xl shadow-lg p-10">
              <div className="mb-6">
                <svg
                  className="w-24 h-24 text-indigo-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <p className="text-2xl text-center text-indigo-700 font-semibold">
                {hasSearched || hasFiltered 
                  ? "No parcels match your criteria" 
                  : "No parcels available"}
              </p>
              <p className="text-gray-500 text-center mt-2">
                {hasSearched || hasFiltered
                  ? "Try adjusting your filters or search terms"
                  : "Please check back later!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {loadedItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative bg-white overflow-hidden shadow-lg transform transition-all duration-500 ${
                    acceptedCards[index]
                      ? "grayscale pointer-events-none"
                      : "hover:shadow-2xl hover:-translate-y-2"
                  }`}
                  style={{
                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                    boxShadow:
                      "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
                    borderImage: getCardBorderStyle(index),
                    borderImageSlice: 1,
                    borderWidth: "2px",
                    borderStyle: "solid",
                    
                    filter: acceptedCards[index]
                      ? "grayscale(100%) brightness(90%)"
                      : "none",
                  }}
                >
                  {/* Overlay Tag if accepted */}
                  {acceptedCards[index] && (
                    <div className="absolute top-4 left-4 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                      Delivered
                    </div>
                  )}

                  <div
                    className="h-3"
                    style={{ background: getCardBorderStyle(index) }}
                  ></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="font-bold text-2xl text-gray-800">
                        {item.item}
                      </h2>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                        {item.parcelSize}
                      </span>
                    </div>

                    <div className="mb-6 space-y-3">
                      <div className="flex items-center">
                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-500 mr-4">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 12h14M12 5l7 7-7 7"
                            ></path>
                          </svg>
                        </span>
                        <div>
                          <p className="text-xs text-gray-500">
                            Pickup Location
                          </p>
                          <p className="font-medium text-gray-800">
                            {item.pickupLocation}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-500 mr-4">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            ></path>
                          </svg>
                        </span>
                        <div>
                          <p className="text-xs text-gray-500">
                            Drop-off Location
                          </p>
                          <p className="font-medium text-gray-800">
                            {item.dropOffLocation}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-3 rounded-xl">
                        <p className="text-xs text-gray-500">Deadline</p>
                        <p className="font-medium text-gray-800 flex items-center">
                          <svg
                            className="w-4 h-4 text-gray-400 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                          {item.deliveryDeadline}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl">
                        <p className="text-xs text-gray-500">Urgency</p>
                        <p
                          className={`font-medium flex items-center ${
                            item.urgency === "Urgent"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {item.urgency === "Urgent" ? (
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          )}
                          {item.urgency}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500">Payment</p>
                        <div className="flex flex-col">
                          <p className="text-2xl font-bold text-green-600">
                            {item.offeredPayment}
                          </p>
                          <p className="text-xs text-gray-500">
                            Trusted by {item.trustedUsers}+ users
                          </p>
                        </div>
                      </div>
                      {!acceptedCards[index] && (
                        <button
                          onClick={() => handleAccept(index)}
                          className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                        >
                          Accept
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ExploreDeliveries;