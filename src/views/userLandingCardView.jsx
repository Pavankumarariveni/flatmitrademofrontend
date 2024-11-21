// src/components/PropertyListingCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import tailwindStyles from "../utils/tailwindStyles";

const PropertyListingCard = ({ propertyId, imageUrl, title, details }) => {
  return (
    <div className={`${tailwindStyles.card} flex flex-col md:flex-row p-4 rounded shadow-sm md:ml-80 w-full`}>
      <img
        src={imageUrl}
        alt={title}
        className="w-full md:w-64 h-40 object-cover rounded mb-4 md:mb-0"
      />
      <div className="md:ml-4 flex-grow">
        <h2 className={`${tailwindStyles.heading} text-sm md:text-xl font-semibold`}>{title}</h2>
        <p className={`${tailwindStyles.paragraph}`}>{details}</p>
        <div className="mt-2 flex space-x-4 justify-end">
          <Link
            to={`/fdc/${propertyId}`}
            className={`${tailwindStyles.secondaryButton} py-2 px-4 rounded`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingCard;
