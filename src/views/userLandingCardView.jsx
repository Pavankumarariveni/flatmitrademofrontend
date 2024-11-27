// src/components/PropertyListingCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import tailwindStyles from "../utils/tailwindStyles";
import AuthModal from "./AuthModalView";

const PropertyListingCard = ({ propertyId, imageUrl, title, details }) => {
  const navigate = useNavigate();
  // Modal controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onclickViewDetails = () => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken === undefined) {
      openModal();
    } else {
      navigate(`/fdc/${propertyId}`);
    }
  };
  return (
    <>
      <div
        className={`${tailwindStyles.card} flex flex-col md:flex-row p-4 rounded shadow-sm lg:ml-32 xl:ml-44 w-full`}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full md:w-64 h-40 object-cover rounded mb-4 md:mb-0"
        />
        <div className="md:ml-4 flex-grow">
          <h2
            className={`${tailwindStyles.heading} text-sm md:text-xl font-semibold`}
          >
            {title}
          </h2>
          <p className={`${tailwindStyles.paragraph}`}>{details}</p>
          <div className="mt-2 flex space-x-4 justify-end">
            {/* <Link
              to={`/fdc/${propertyId}`}
              className={`${tailwindStyles.secondaryButton} py-2 px-4 rounded`}
            >
              View Details
            </Link> */}
            <button
              className={`${tailwindStyles.secondaryButton} py-2 px-4 rounded`}
              onClick={onclickViewDetails}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default PropertyListingCard;
