import React, { useState } from 'react';

const SortOptions = ({ sortOption, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Handle sort change
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };
  
  // Get the display text for the current sort option
  const getSortOptionText = (option) => {
    switch (option) {
      case 'newest': return 'Newest Arrivals';
      case 'best-selling': return 'Best Selling';
      case 'price-asc': return 'Price: Low to High';
      case 'price-desc': return 'Price: High to Low';
      case 'name-asc': return 'Name: A to Z';
      case 'name-desc': return 'Name: Z to A';
      case 'rating': return 'Highest Rated';
      default: return 'Most Relevant';
    }
  };
  
  return (
    <div className="sort-options">
      <label htmlFor="sort-select">Sort by:</label>
      <select 
        id="sort-select" 
        value={sortOption} 
        onChange={handleSortChange}
        aria-label="Sort products"
      >
        <option value="most-relevant">Most Relevant</option>
        <option value="newest">Newest Arrivals</option>
        <option value="best-selling">Best Selling</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
        <option value="rating">Highest Rated</option>
      </select>
    </div>
  );
};

export default SortOptions; 