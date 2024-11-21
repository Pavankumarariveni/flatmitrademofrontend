// import React, { useState } from "react";
// import "tailwindcss/tailwind.css"; // Ensure that Tailwind CSS is imported
// import Navbar from "./Navbar";

// // ProgressBar Component
// const ProgressBar = ({ currentStep }) => {
//   const steps = [
//     { id: 1, label: "City & Builder" },
//     { id: 2, label: "Property Details" },
//     { id: 3, label: "Room Details" },
//     { id: 4, label: "Tenant Preferences" },
//     { id: 5, label: "Additional Info & Images" },
//   ];

//   return (
//     <div className="mt-5">
//       <div className="flex justify-between items-center relative">
//         <div
//           className="absolute w-full"
//           style={{
//             top: "50%",
//             height: "4px",
//             backgroundColor: "#e0e0e0",
//             zIndex: 0,
//           }}
//         ></div>
//         {steps.map((step, index) => (
//           <div
//             key={step.id}
//             className="flex flex-col items-center"
//             style={{ zIndex: 1 }}
//           >
//             <div
//               className={`rounded-full flex justify-center items-center ${
//                 index + 1 <= currentStep ? "bg-blue-500 text-white" : "bg-gray-300"
//               }`}
//               style={{
//                 width: "30px",
//                 height: "30px",
//                 border: "2px solid",
//                 borderColor: index + 1 <= currentStep ? "#007bff" : "#e0e0e0",
//                 fontSize: "14px",
//               }}
//             >
//               {step.id}
//             </div>
//             <p
//               className={`mt-2 ${
//                 index + 1 <= currentStep ? "text-blue-500" : "text-gray-400"
//               }`}
//               style={{ fontSize: "12px" }}
//             >
//               {step.label}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const PostPropertiesView = () => {
//   const [city, setCity] = useState("");
//   const [builder, setBuilder] = useState("");
//   const [community, setCommunity] = useState("");
//   const [description, setDescription] = useState("");
//   const [towerNum, setTowerNum] = useState("");
//   const [floorNum, setFloorNum] = useState("");
//   const [flatNum, setFlatNum] = useState("");
//   const [bedrooms, setBedrooms] = useState(1);
//   const [bathrooms, setBathrooms] = useState(1);
//   const [balcony, setBalcony] = useState(false);
//   const [tenantType, setTenantType] = useState("");
//   const [foodPreference, setFoodPreference] = useState("");
//   const [rentalPrice, setRentalPrice] = useState("");
//   const [numCars, setNumCars] = useState(0);
//   const [numBikes, setNumBikes] = useState(0);
//   const [images, setImages] = useState([]);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setImages((prevImages) => [...prevImages, ...files]);
//   };

//   const isStepValid = () => {
//     switch (currentStep) {
//       case 1:
//         return city && builder && community && description.trim().length > 0;
//       case 2:
//         return towerNum && floorNum && flatNum;
//       case 3:
//         return bedrooms > 0 && bathrooms > 0;
//       case 4:
//         return tenantType && foodPreference && rentalPrice.trim().length > 0;
//       case 5:
//         return numCars >= 0 && numBikes >= 0;
//       default:
//         return false;
//     }
//   };

//   const handleSubmit = (e) => {
//     if (e) e.preventDefault();
//     setIsSubmitted(true);
//   };

//   const renderFormStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="grid grid-cols-1 gap-4">
//             <div>
//               <label className="block text-gray-700">City</label>
//               <select
//                 className="w-full p-2 border rounded-md"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//               >
//                 <option value="">Select city</option>
//                 <option value="Hyderabad">Hyderabad</option>
//                 <option value="Vijayawada">Vijayawada</option>
//                 <option value="Warangal">Warangal</option>
//                 <option value="Noida">Noida</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700">Builder</label>
//               <select
//                 className="w-full p-2 border rounded-md"
//                 value={builder}
//                 onChange={(e) => setBuilder(e.target.value)}
//               >
//                 <option value="">Select Builder</option>
//                 <option value="MyHomeGanga">My Home Ganga</option>
//                 <option value="Aparna">Aparna</option>
//                 <option value="Rajpushpa">Rajpushpa</option>
//                 <option value="MyHomeBuja">My Home Buja</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700">Community</label>
//               <select
//                 className="w-full p-2 border rounded-md"
//                 value={community}
//                 onChange={(e) => setCommunity(e.target.value)}
//               >
//                 <option value="">Select Community</option>
//                 <option value="My Home">My Home</option>
//                 <option value="QTI Town">QTI Town</option>
//                 <option value="QTI Village">QTI Village</option>
//                 <option value="QTI Apartments">QTI Apartments</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700">Description</label>
//               <textarea
//                 className="w-full p-2 border rounded-md"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Enter property description"
//               />
//             </div>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="grid grid-cols-1 gap-4">
//             <div>
//               <label className="block text-gray-700">Tower Number</label>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded-md"
//                 value={towerNum}
//                 onChange={(e) => setTowerNum(e.target.value)}
//                 placeholder="Enter tower number"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Floor Number</label>
//               <input
//                 type="number"
//                 className="w-full p-2 border rounded-md"
//                 value={floorNum}
//                 onChange={(e) => setFloorNum(e.target.value)}
//                 placeholder="Enter floor number"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Flat Number</label>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded-md"
//                 value={flatNum}
//                 onChange={(e) => setFlatNum(e.target.value)}
//                 placeholder="Enter flat number"
//               />
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="grid grid-cols-1 gap-4">
//             <div>
//               <label className="block text-gray-700">Bedrooms</label>
//               <input
//                 type="number"
//                 className="w-full p-2 border rounded-md"
//                 value={bedrooms}
//                 onChange={(e) => setBedrooms(e.target.value)}
//                 placeholder="Enter number of bedrooms"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Bathrooms</label>
//               <input
//                 type="number"
//                 className="w-full p-2 border rounded-md"
//                 value={bathrooms}
//                 onChange={(e) => setBathrooms(e.target.value)}
//                 placeholder="Enter number of bathrooms"
//               />
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 className="mr-2"
//                 checked={balcony}
//                 onChange={(e) => setBalcony(e.target.checked)}
//               />
//               <label className="text-gray-700">Has Balcony</label>
//             </div>
//           </div>
//         );
//       case 4:
//         return (
//           <div className="grid grid-cols-1 gap-4">
//             <div>
//               <label className="block text-gray-700">Tenant Type</label>
//               <select
//                 className="w-full p-2 border rounded-md"
//                 value={tenantType}
//                 onChange={(e) => setTenantType(e.target.value)}
//               >
//                 <option value="">Select tenant type</option>
//                 <option value="Family">Family</option>
//                 <option value="Single">Single</option>
//                 <option value="Any">Any</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700">Food Preference</label>
//               <select
//                 className="w-full p-2 border rounded-md"
//                 value={foodPreference}
//                 onChange={(e) => setFoodPreference(e.target.value)}
//               >
//                 <option value="">Select food preference</option>
//                 <option value="Vegetarian">Vegetarian</option>
//                 <option value="Non-Vegetarian">Non-Vegetarian</option>
//                 <option value="Any">Any</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700">Rental Price</label>
//               <input
//                 type="text"
//                 className="w-full p-2 border rounded-md"
//                 value={rentalPrice}
//                 onChange={(e) => setRentalPrice(e.target.value)}
//                 placeholder="Enter rental price"
//               />
//             </div>
//           </div>
//         );
//       case 5:
//         return (
//           <div className="grid grid-cols-1 gap-4">
//             <div>
//               <label className="block text-gray-700">Number of Cars</label>
//               <input
//                 type="number"
//                 className="w-full p-2 border rounded-md"
//                 value={numCars}
//                 onChange={(e) => setNumCars(e.target.value)}
//                 placeholder="Enter number of cars"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Number of Bikes</label>
//               <input
//                 type="number"
//                 className="w-full p-2 border rounded-md"
//                 value={numBikes}
//                 onChange={(e) => setNumBikes(e.target.value)}
//                 placeholder="Enter number of bikes"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Upload Images</label>
//               <input
//                 type="file"
//                 className="w-full p-2 border rounded-md"
//                 multiple
//                 onChange={handleImageUpload}
//               />
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="max-w-4xl mx-auto mt-24">
//       <h2 className="text-center text-2xl font-semibold mb-4">Add Property</h2>
//       <ProgressBar currentStep={currentStep} />
//       <div className="bg-white shadow-lg p-6 rounded-lg">
//         <form onSubmit={handleSubmit}>
//           {renderFormStep()}
//           <div className="flex justify-between mt-4">
//             <button
//               type="button"
//               className="bg-gray-500 text-white px-6 py-2 rounded-md"
//               disabled={currentStep === 1}
//               onClick={() => setCurrentStep(currentStep - 1)}
//             >
//               Previous
//             </button>
//             <button
//               type="button"
//               className="bg-blue-500 text-white px-6 py-2 rounded-md"
//               disabled={!isStepValid()}
//               onClick={(e) => {
//                 if (currentStep === 5) {
//                   handleSubmit(e); // Pass event to handleSubmit
//                 } else {
//                   setCurrentStep(currentStep + 1);
//                 }
//               }}
//             >
//               {currentStep === 5 ? "Submit" : "Next"}
//             </button>
//           </div>
//           {isSubmitted && (
//             <div className="mt-4 text-green-500">
//               Successfully submitted!
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//     </>
//   );
// };

// export default PostPropertiesView;
import React, { useState } from "react";
import Navbar from "./Navbar";
import tailwindStyles from "../utils/tailwindStyles";

const ProgressBar = ({ currentStep, totalSteps }) => (
  <div className="mt-5">
    <div className="flex justify-between items-center relative">
      <div className="absolute w-full h-1 bg-gray-300 top-1/2 transform -translate-y-1/2"></div>
      {[...Array(totalSteps).keys()].map((_, index) => (
        <div key={index} className="relative z-10">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index + 1 <= currentStep ? "bg-blue-500 text-white" : "bg-gray-300"
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
  const [formData, setFormData] = useState({
    city: "",
    builder: "",
    community: "",
    description: "",
    towerNumber: "",
    floorNumber: "",
    flatNumber: "",
    bedrooms: "",
    bathrooms: "",
    hasBalcony: false,
    tenantType: "",
    foodPreferences: "",
    rentalPrice: "",
    numberOfCars: "",
    numberOfBikes: "",
    images: [],
  });
  console.log(formData.images.length)
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [imagePreviews, setImagePreviews] = useState([]); // For storing image previews
  const [modalImage, setModalImage] = useState(null); // To store the image being shown in the modal

  const dropdownOptions = {
    city: ["New York", "Los Angeles", "Chicago", "Houston", "Miami"],
    builder: ["Builder A", "Builder B", "Builder C"],
    community: ["Community X", "Community Y", "Community Z"],
    tenantType: ["Family", "Bachelor", "Working Professional"],
    foodPreferences: ["Vegetarian", "Non-Vegetarian", "Vegan"],
  };


  const handleInputChange = (e) => {
    const { name, type, files } = e.target;

    if (type === "file") {
      const fileList = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...fileList],
      }));
      // Generate previews
      const previews = fileList.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
    } else {
      const { value, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    e.target.value = ""
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
        panelErrors[field.name] = `Please select a valid ${field.label.toLowerCase()}.`;
      } else if (field.type !== "checkbox" && !value) {
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

  const panels = [
    [
      {
        label: "City",
        name: "city",
        type: "dropdown",
        options: dropdownOptions.city,
      },
      {
        label: "Builder",
        name: "builder",
        type: "dropdown",
        options: dropdownOptions.builder,
      },
      {
        label: "Community",
        name: "community",
        type: "dropdown",
        options: dropdownOptions.community,
      },
      { label: "Description", name: "description", type: "textarea" },
    ],
    [
      { label: "Tower Number", name: "towerNumber", type: "text" },
      { label: "Floor Number", name: "floorNumber", type: "number" },
      { label: "Flat Number", name: "flatNumber", type: "text" },
      { label: "Bedrooms", name: "bedrooms", type: "number" },
    ],
    [
      { label: "Bathrooms", name: "bathrooms", type: "number" },
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
      { label: "Number of Cars", name: "numberOfCars", type: "number" },
      { label: "Number of Bikes", name: "numberOfBikes", type: "number" },
    ],
    [{ label: "Upload Images", name: "images", type: "file" }],
  ];

  const renderInputs = (inputs) =>
    inputs.map((input, idx) => (
      <div key={idx} className="col-span-1">
        <label className="block text-gray-700 mb-2">{input.label}</label>
        {input.type === "textarea" ? (
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
        ) : input.type === "dropdown" ? (
          <select
            name={input.name}
            value={formData[input.name]}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select {input.label}</option>
            {input.options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : input.type == "file" ? (
          <>
            <input
              type="file"
              name={formData.images.length}
              onChange={handleInputChange}
              multiple         
              accept="image/*"     
              className="w-full p-2 border rounded-md"
            />
            {imagePreviews.length > 0  && (
              <div className="grid grid-cols-3 gap-2 mt-4">
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
                        e.stopPropagation(); // Prevent modal open on remove click
                        handleRemoveImage(index);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))} 
              </div>
            )}  
            
          </>
        
        ) : <input
        type={input.type}
        name={input.name}
        value={formData[input.name]}
        onChange={handleInputChange}
        multiple              
        className="w-full p-2 border rounded-md"
      />} 
        {errors[input.name] && (
          <p className="text-red-500 text-sm mt-1">{errors[input.name]}</p>
        )}
      </div>
    ));

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-24">
        <h2 className="text-center text-2xl font-semibold mb-4">Add Property</h2>
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
