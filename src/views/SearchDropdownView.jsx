import React, { useState, useRef, useEffect } from "react";

const SearchableDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  isLoading,
  disabled,
  error,
  helperText,
  displayKey,
  valueKey = "id",
  name,
  getCommunityId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [touched, setTouched] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const selectedOption = options.find(
    (opt) => opt[valueKey]?.toString() === value?.toString()
  );

  useEffect(() => {
    if (selectedOption && !touched) {
      setSearchTerm(selectedOption[displayKey] || "");
    }
  }, [selectedOption, displayKey, touched]);

  const filteredOptions = searchTerm
    ? options.filter((option) =>
        option[displayKey].toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setTouched(false);
        if (selectedOption) {
          setSearchTerm(selectedOption[displayKey] || "");
        } else {
          setSearchTerm("");
        }
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedOption, displayKey]);

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setTouched(true);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleOptionClick = (option) => {
    setTouched(false);
    setSearchTerm(option[displayKey]);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onChange({ target: { name, value: option[valueKey] } });
    getCommunityId(option[valueKey]);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        setHighlightedIndex(0);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex >= filteredOptions.length ? 0 : nextIndex;
        });
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prevIndex) => {
          const nextIndex = prevIndex - 1;
          return nextIndex < 0 ? filteredOptions.length - 1 : nextIndex;
        });
        break;

      case "Enter":
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        }
        break;

      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;

      default:
        break;
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
    setTouched(true);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSearchTerm("");
    setTouched(false);
    onChange({ target: { name, value: "" } });
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  // Scroll highlighted option into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0) {
      const optionElement = document.getElementById(
        `option-${highlightedIndex}`
      );
      if (optionElement) {
        optionElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className={`w-full p-2 pr-8 border rounded-md ${
            error ? "border-red-500" : "border-gray-300"
          } ${disabled ? "bg-gray-100" : ""}`}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        {searchTerm && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={handleClear}
            type="button"
          >
            ×
          </button>
        )}
      </div>

      {isLoading && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        </div>
      )}

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                id={`option-${index}`}
                key={option[valueKey]}
                className={`p-2 cursor-pointer ${
                  option[valueKey]?.toString() === value?.toString()
                    ? "bg-blue-50"
                    : ""
                } ${
                  index === highlightedIndex
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option[displayKey]}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {helperText && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
    </div>
  );
};

export default SearchableDropdown;
