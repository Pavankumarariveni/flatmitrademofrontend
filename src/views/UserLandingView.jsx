import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./Navbar";
import FilterSection from "./FilterView";
import PropertyListingCard from "./userLandingCardView";
import LoadingView from "./LoadingView";
import FailureView from "./FailureView";
import apiStatusConstants from "../utils/apiStatusConstants";

const UserLandingView = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: null,
      });

      const api = "http://localhost:3000/properties";
      try {
        const response = await axios.get(api);
        setApiResponse({
          status: apiStatusConstants.success,
          data: response.data.properties,
          errorMsg: null,
        });
      } catch (error) {
        setApiResponse({
          status: apiStatusConstants.failure,
          data: null,
          errorMsg: error.response?.data?.message || "Fetch Failed",
        });
      }
    };

    fetchData();
  }, []);

  const successView = () => {
    return (
      <div className="lg:w-3/4 space-y-6 mb-20">
        <div className="w-3/4">
          <input
            type="text"
            className="form-control border border-gray-300 rounded-md px-2 py-1 lg:ml-36 xl:ml-44"
            placeholder="Search Properties..." // Search input for searching property listings
          />
        </div>
        {apiResponse.data.map((property) => (
          <PropertyListingCard
            key={property.property_id}
            propertyId={property.property_id}
            imageUrl={property.Image_url.images[0]}
            title={property.property_description_name}
            details={property.location}
          />
        ))}
      </div>
    );
  };

  const loadingView = () => <LoadingView />;

  const failureView = () => <FailureView />;

  const renderListings = () => {
    switch (apiResponse.status) {
      case apiStatusConstants.inProgress:
        return loadingView();
      case apiStatusConstants.success:
        return successView();
      case apiStatusConstants.failure:
        return failureView();
      default:
        return;
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-4 mt-24">
        <div className="relative flex flex-col lg:flex-row justify-center gap-6">
          {/* Filter Section */}
          <FilterSection />
          {/* User Listings View */}
          {renderListings()}
        </div>
      </div>
    </>
  );
};

export default UserLandingView;
