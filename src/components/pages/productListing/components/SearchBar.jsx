import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput.trim());
    // Remove focus from input after submission on mobile
    if (window.innerWidth < 768) {
      inputRef.current?.blur();
    }
  };
  
  // Clear search input and results
  const handleClear = () => {
    setSearchInput('');
    onSearch('');
    // Focus back on input after clearing
    inputRef.current?.focus();
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    // Optionally, you can implement auto-search after typing
    // if you want search-as-you-type functionality
  };
  
  // Focus the input when the component mounts (optional)
  useEffect(() => {
    // Only auto-focus on larger screens
    if (window.innerWidth >= 768) {
      // inputRef.current?.focus();
    }
  }, []);
  
  return (
    <div className={`search-bar ${isFocused ? 'focused' : ''}`}>
      <form onSubmit={handleSubmit}>
        <div className="search-input-container">
          <span className="search-icon">🔍</span>
          
          <input
            ref={inputRef}
            type="text"
            placeholder="Search mystical items..."
            value={searchInput}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label="Search products"
          />
          
          {searchInput && (
            <button 
              type="button" 
              className="clear-search-btn"
              onClick={handleClear}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          
          <button 
            type="submit" 
            className="search-btn"
            aria-label="Submit search"
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar; 