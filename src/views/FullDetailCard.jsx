import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import apiStatusConstants from "../utils/apiStatusConstants";
import Navbar from "./Navbar";
import ImageGallery from "./ImageGallery";
import LoadingView from "./LoadingView";
import FailureView from "./FailureView";
import NearbySearch from "./Map";

const FullDetailCard = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  });

  const local = useParams();
  const id = local.propertyId;

  useEffect(() => {
    const fetchData = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: null,
      });

      const api = `http://localhost:3000/properties/${id}`;

      try {
        const response = await axios.get(api);

        setApiResponse({
          status: apiStatusConstants.success,
          data: response.data.property, // Adjust based on your API response structure
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
  }, [id]); // Added dependency `id` to re-fetch data when `id` changes

  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
  const openAgreementModal = () => setIsAgreementModalOpen(true);
  const closeAgreementModal = () => setIsAgreementModalOpen(false);

  const successView = () => {
    const {
      community_name,
      property_description_name,
      location,
      bathroom_id,
      bedroom_id,
      rental_range_min,
      Image_url,
    } = apiResponse.data;
    const { images } = Image_url;
    console.log(apiResponse.data);
    return (
      <div className="mt-16 container mx-auto p-4">
        <ImageGallery allImages={images} />
        <div className="bg-gray-200 p-6 rounded-lg shadow-md mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{community_name}</h2>
            <span className="text-2xl text-gray-600 cursor-pointer">
              &#9825;
            </span>{" "}
            {/* Heart icon */}
          </div>
          <p className="text-gray-700 mb-4">{property_description_name}</p>
          <ul className="text-gray-600 space-y-2 mb-4">
            <li>Location: {location}</li>
            <li>Price: ${rental_range_min}</li>
            <li>Bedrooms: {bedroom_id}</li>
            <li>Bathrooms: {bathroom_id}</li>
            {/* <li>Area: {Area} sqft</li> */}
          </ul>
          <NearbySearch />
          <div className="flex justify-between items-center mt-6">
            {/* <div className="text-gray-700">
              <p className="text-lg">Contact Owner</p>
              <p className="font-bold">{buildingOwnerNumber}</p>
            </div> */}
            <button
              onClick={openAgreementModal}
              className="bg-purple-600 text-white px-4 py-2 rounded-full"
            >
              Chat
            </button>
            {isAgreementModalOpen && (
              <div className="fixed inset-0 p-8 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                  <button
                    className="absolute top-2 right-2 text-gray-500 text-2xl"
                    onClick={closeAgreementModal}
                  >
                    &times;
                  </button>
                  <h3 className="text-xl font-bold mb-4">Agreement Details</h3>
                  <p className="text-gray-700 mb-4">
                    By proceeding, you agree to the following terms:
                  </p>
                  <ul className="text-gray-600 mb-4 space-y-2">
                    <li>Brokerage Fee: Rs 9000</li>
                    <li>Agreement Duration: 12 months</li>
                    <li>Other Terms: Non-refundable service fee applies</li>
                  </ul>
                  <div className="flex justify-end space-x-4">
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                      onClick={closeAgreementModal}
                    >
                      Deny
                    </button>
                    <button
                      className="bg-purple-600 text-white px-4 py-2 rounded"
                      onClick={closeAgreementModal}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const loadingView = () => <LoadingView />;

  const failureView = () => <FailureView />;

  const renderDetailView = () => {
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
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      {renderDetailView()}
    </div>
  );
};

export default FullDetailCard;
