import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "./Navbar";
import tailwindStyles from "../utils/tailwindStyles";
import SearchableDropdown from "./SearchDropdownView";

// ... (ProgressBar component remains the same)
const ProgressBar = ({ currentStep, totalSteps }) => (
  <div className="mt-5 pl-5 pr-5 mb-5">
    <div className="flex justify-between items-center relative">
      <div className="absolute w-full h-1 bg-gray-300 top-1/2 transform -translate-y-1/2"></div>
      {[...Array(totalSteps).keys()].map((_, index) => (
        <div key={index} className="relative z-10">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index + 1 <= currentStep
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PostPropertiesView = () => {
  // State for dropdown options
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [builderList, setBuilderList] = useState([]);
  const [communityList, setCommunityList] = useState([]);
  const [communityId, setCommunityId] = useState("");
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [isLoadingBuilder, setIsLoadingBuilder] = useState(false);
  const [isLoadingCommunity, setIsLoadingCommunity] = useState(false);
  const [stateError, setStateError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [builderError, setBuilderError] = useState(null);
  const [communityError, setCommunityError] = useState(null);

  const dropdownOptions = {
    bedrooms: [
      { id: "1", bedroom_name: "1 BHK" },
      { id: "2", bedroom_name: "2 BHK" },
      { id: "3", bedroom_name: "3 BHK" },
      { id: "4", bedroom_name: "4 BHK" },
      { id: "5", bedroom_name: "5+ BHK" },
    ],
    bathrooms: [
      { id: "1", bathroom_name: "1" },
      { id: "2", bathroom_name: "2" },
      { id: "3", bathroom_name: "3" },
      { id: "4", bathroom_name: "4" },
      { id: "5", bathroom_name: "5+" },
    ],
    tenantType: [
      { id: "family", tenant_name: "Family" },
      { id: "bachelor", tenant_name: "Bachelor" },
      { id: "students", tenant_name: "Students" },
      { id: "couple", tenant_name: "Couple" },
    ],
    foodPreferences: [
      { id: "veg", food_name: "Vegetarian" },
      { id: "non-veg", food_name: "Non-Vegetarian" },
      { id: "both", food_name: "Both" },
    ],
    parking: [
      { id: "1", parking_name: "1" },
      { id: "2", parking_name: "2" },
      { id: "3", parking_name: "3" },
      { id: "4", parking_name: "4" },
    ],
  };

  // const dropdownOptions = {
  //   tenantType: ["Family", "Bachelor", "Working Professional"],
  //   foodPreferences: ["Vegetarian", "Non-Vegetarian", "Vegan", "Both"],
  // };

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [imagePreviews, setImagePreviews] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  const [formData, setFormData] = useState({
    state: "",
    city: "",
    builder: "",
    community: "",
    mapUrl: "",
    towerNumber: "",
    floorNumber: "",
    flatNumber: "",
    bedrooms: "",
    bathrooms: "",
    hasBalcony: false,
    tenantType: "",
    foodPreferences: "",
    rentalPrice: "",
    // numberOfCars: "",
    // numberOfBikes: "",
    parking: "",
    images: [],
  });
  const imagesCount = String(formData.images.length);

  // Fetch state list when component mounts
  useEffect(() => {
    const fetchStateList = async () => {
      setIsLoadingState(true);
      setStateError(null);
      try {
        const response = await axios.get("http://localhost:5000/api/stateList");
        setStateList(response.data);
      } catch (err) {
        setStateError("Failed to fetch state list. Please try again later.");
        console.error("Error fetching state list:", err);
      } finally {
        setIsLoadingState(false);
      }
    };

    fetchStateList();
  }, []);

  // Fetch city list when state changes
  useEffect(() => {
    const fetchCityList = async () => {
      if (!formData.state) {
        setCityList([]);
        return;
      }

      setIsLoadingCity(true);
      setCityError(null);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cityList?state_id=${formData.state}`
        );
        setCityList(response.data);
      } catch (err) {
        setCityError("Failed to fetch city list. Please try again later.");
        console.error("Error fetching city list:", err);
      } finally {
        setIsLoadingCity(false);
      }
    };

    fetchCityList();
  }, [formData.state]);

  // Fetch builder list when city changes
  useEffect(() => {
    const fetchBuilderList = async () => {
      if (!formData.city) {
        setBuilderList([]);
        return;
      }

      setIsLoadingBuilder(true);
      setBuilderError(null);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/buildersList?city_id=${formData.city}`
        );
        setBuilderList(response.data);
      } catch (err) {
        setBuilderError(
          "Failed to fetch builder list. Please try again later."
        );
        console.error("Error fetching builder list:", err);
      } finally {
        setIsLoadingBuilder(false);
      }
    };
    fetchBuilderList();
  }, [formData.city]);

  // Fetch community list when builder changes
  useEffect(() => {
    const fetchCommunityList = async () => {
      if (!formData.builder) {
        setCommunityList([]);
        return;
      }

      setIsLoadingCommunity(true);
      setCommunityError(null);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/communitiesList?builder_id=${formData.builder}`
        );
        setCommunityList(response.data);
      } catch (err) {
        setCommunityError(
          "Failed to fetch builder list. Please try again later."
        );
        console.error("Error fetching builder list:", err);
      } finally {
        setIsLoadingCommunity(false);
      }
    };
    fetchCommunityList();
  }, [formData.builder]);

  if (communityId != "") {
    formData.mapUrl = communityList[communityId - 1].map_url;
    console.log(formData.mapUrl);
  }

  const handleInputChange = (e) => {
    const { name, type, files } = e.target;

    if (type === "file") {
      const fileList = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...fileList],
      }));
      const previews = fileList.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
    } else {
      const { value, checked } = e.target;

      if (name === "state") {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          city: "", // Reset city when state changes
          builder: "", // Reset builder when state changes
        }));
      } else if (name === "city") {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          builder: "", // Reset builder when city changes
          community: "", // Reset community when builder changes
        }));
      } else if (name === "builder") {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          community: "", // Reset community when builder changes
        }));
      } else if (name === "community") {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          bedrooms: "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }));
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const validatePanel = (panelFields) => {
    const panelErrors = {};
    panelFields.forEach((field) => {
      const value = formData[field.name];
      if (field.type === "dropdown" && !value) {
        panelErrors[field.name] =
          `Please select a valid ${field.label.toLowerCase()}.`;
      } else if (field.type !== "checkbox" && field.type !== "a" && !value) {
        panelErrors[field.name] = `${field.label} is required.`;
      } else if (
        (field.name === "floorNumber" || field.name === "rentalPrice") &&
        isNaN(value)
      ) {
        panelErrors[field.name] = `${field.label} must be a number.`;
      }
    });
    return panelErrors;
  };

  const handleNext = () => {
    const panelFields = panels[currentStep - 1];
    const panelErrors = validatePanel(panelFields);

    if (Object.keys(panelErrors).length > 0) {
      setErrors(panelErrors);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Form submitted successfully!");
  };

  // ... (other state declarations and handlers remain the same)

  const panels = [
    [
      {
        label: "State",
        name: "state",
        type: "dropdown",
        options: stateList,
      },
      {
        label: "City",
        name: "city",
        type: "dropdown",
        options: cityList,
      },
      {
        label: "Builder",
        name: "builder",
        type: "dropdown",
        options: builderList,
      },
      {
        label: "Community",
        name: "community",
        type: "dropdown",
        options: communityList,
      },
      { label: "Map", name: "map", type: "a", options: formData.mapUrl },
    ],
    [
      { label: "Tower Number", name: "towerNumber", type: "text" },
      { label: "Floor Number", name: "floorNumber", type: "number" },
      { label: "Flat Number", name: "flatNumber", type: "text" },
      // { label: "Bedrooms", name: "bedrooms", type: "number"},
      {
        label: "Bedrooms",
        name: "bedrooms",
        type: "dropdown",
        options: dropdownOptions.bedrooms,
      },
    ],
    [
      {
        label: "Bathrooms",
        name: "bathrooms",
        type: "dropdown",
        options: dropdownOptions.bathrooms,
      },
      { label: "Has Balcony", name: "hasBalcony", type: "checkbox" },
      {
        label: "Tenant Type",
        name: "tenantType",
        type: "dropdown",
        options: dropdownOptions.tenantType,
      },
      {
        label: "Food Preferences",
        name: "foodPreferences",
        type: "dropdown",
        options: dropdownOptions.foodPreferences,
      },
    ],
    [
      { label: "Rental Price", name: "rentalPrice", type: "text" },
      // { label: "Number of Cars", name: "numberOfCars", type: "number" },
      // { label: "Number of Bikes", name: "numberOfBikes", type: "number" },
      {
        label: "Parking",
        name: "parking",
        type: "dropdown",
        options: dropdownOptions.parking,
      },
    ],
    [{ label: "Upload Images", name: "images", type: "file" }],
  ];
  // ... (rest of the panels remain the same)

  const renderInputs = (inputs) =>
    inputs.map((input, idx) => (
      <>
        <div key={idx} className="col-span-1">
          <label className="block text-gray-700 mb-2">{input.label}</label>
          {input.type === "dropdown" ? (
            <div>
              {input.name === "state" ? (
                <SearchableDropdown
                  name={input.name}
                  options={stateList}
                  value={formData[input.name]}
                  onChange={handleInputChange}
                  placeholder={`Search ${input.label}`}
                  isLoading={isLoadingState}
                  disabled={isLoadingState}
                  error={stateError}
                  displayKey="state_name"
                  valueKey="id"
                />
              ) : input.name === "city" ? (
                <SearchableDropdown
                  name={input.name}
                  options={cityList}
                  value={formData[input.name]}
                  onChange={handleInputChange}
                  placeholder={`Search ${input.label}`}
                  isLoading={isLoadingCity}
                  disabled={isLoadingCity || !formData.state}
                  error={cityError}
                  helperText={
                    !formData.state ? "Please select a state first" : ""
                  }
                  displayKey="city_name"
                  valueKey="id"
                />
              ) : input.name === "builder" ? (
                <SearchableDropdown
                  name={input.name}
                  options={builderList}
                  value={formData[input.name]}
                  onChange={handleInputChange}
                  placeholder={`Search ${input.label}`}
                  isLoading={isLoadingBuilder}
                  disabled={isLoadingBuilder || !formData.city}
                  error={builderError}
                  helperText={
                    !formData.city ? "Please select a city first" : ""
                  }
                  displayKey="builder_name"
                  valueKey="id"
                />
              ) : input.name === "community" ? (
                <SearchableDropdown
                  name={input.name}
                  options={communityList}
                  value={formData[input.name]}
                  onChange={handleInputChange}
                  placeholder={`Search ${input.label}`}
                  isLoading={isLoadingCommunity}
                  disabled={isLoadingCommunity || !formData.builder}
                  error={communityError}
                  helperText={
                    !formData.builder ? "Please select a builder first" : ""
                  }
                  displayKey="community_name"
                  valueKey="id"
                  getCommunityId={setCommunityId}
                />
              ) : (
                <SearchableDropdown
                  name={input.name}
                  options={input.options}
                  value={formData[input.name]}
                  onChange={handleInputChange}
                  placeholder={`Select ${input.label}`}
                  displayKey={
                    input.name === "bedrooms"
                      ? "bedroom_name"
                      : input.name === "bathrooms"
                        ? "bathroom_name"
                        : input.name === "tenantType"
                          ? "tenant_name"
                          : input.name === "foodPreferences"
                            ? "food_name"
                            : input.name === "parking"
                              ? "parking_name"
                              : "name"
                  }
                  valueKey="id"
                />
              )}
            </div>
          ) : input.type === "textarea" ? (
            <textarea
              name={input.name}
              value={formData[input.name]}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows={3}
            />
          ) : input.type === "checkbox" ? (
            <input
              type="checkbox"
              name={input.name}
              checked={formData[input.name]}
              onChange={handleInputChange}
              className="w-5 h-5"
            />
          ) : input.type === "file" ? (
            <>
              <input
                type="file"
                onChange={handleInputChange}
                value={""}
                multiple
                accept="image/*"
                className="w-full p-2 border rounded-md"
              />
              {imagePreviews.length > 0 && (
                <div className="w-full mx-auto px-4">
                  <p>{formData.images.length} Files Choosen</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer"
                        onClick={() => openModal(preview)}
                      >
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md border"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveImage(index);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : input.type === "a" ? (
            <a></a>
          ) : (
            <input
              type={input.type}
              name={input.name}
              value={formData[input.name]}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          )}
          {errors[input.name] && (
            <p className="text-red-500 text-sm mt-1">{errors[input.name]}</p>
          )}
        </div>
        {input.type === "a" && (
          <div
            className="col-span-2 z-10"
            style={{ height: "300px", width: "100%" }}
          >
            <MapContainer
              center={[17.398956, 78.355061]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[17.398956, 78.355061]}>
                <Popup>You are here</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </>
    ));

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-24">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Add Property
        </h2>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {renderInputs(panels[currentStep - 1])}
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className={`${tailwindStyles.thirdButton} px-6 py-2 rounded-md`}
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((prev) => prev - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className={`${tailwindStyles.secondaryButton} px-6 py-2 rounded-md`}
                onClick={currentStep === totalSteps ? handleSubmit : handleNext}
              >
                {currentStep === totalSteps ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {modalImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 shadow-lg relative w-3/4 h-3/4 flex items-center justify-center">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            <img
              src={modalImage}
              alt="Modal View"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostPropertiesView;
