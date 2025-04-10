import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCategories } from '../../../redux/slices/categorySlice';

const FilterPanel = ({ onCategoryFilter, onPriceRangeFilter, activeFilters = {}, onReset }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [dropdownOpen, setDropdownOpen] = useState({ categories: false, price: false });
  
  // Refs for dropdown handling
  const categoryDropdownRef = useRef(null);
  const priceDropdownRef = useRef(null);
  
  const products = useSelector(state => state.products.products);
  // Get categories directly from the Redux store
  const { categories, loading: categoriesLoading } = useSelector(state => state.categories);
  
  // Fetch all categories when component mounts
  useEffect(() => {
    console.log('Dispatching fetchAllCategories');
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // Debug: Log categories when they change
  useEffect(() => {
    console.log('Categories from Redux store:', categories);
  }, [categories]);
  
  // Extract price range from products
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      // Calculate price range
      if (products.some(product => typeof product.price === 'number')) {
        const prices = products
          .filter(product => typeof product.price === 'number')
          .map(product => product.price);
          
        if (prices.length > 0) {
          const minProductPrice = Math.floor(Math.min(...prices));
          const maxProductPrice = Math.ceil(Math.max(...prices) * 1.1);
          
          setPriceRange({ min: minProductPrice, max: maxProductPrice });
          
          // Only reset price inputs if they're at default values
          if (minPrice === 0) setMinPrice(minProductPrice);
          if (maxPrice === 1000) setMaxPrice(maxProductPrice);
        }
      }
    }
  }, [products]);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setDropdownOpen(prev => ({ ...prev, categories: false }));
      }
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target)) {
        setDropdownOpen(prev => ({ ...prev, price: false }));
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle dropdown state
  const toggleDropdown = (dropdown) => {
    setDropdownOpen(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };
  
  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    console.log(`Category selected in dropdown: ${categoryId}`);
    setSelectedCategory(categoryId);
    
    // Convert to integer or null
    const categoryIdValue = categoryId === '' ? null : parseInt(categoryId, 10);
    console.log(`Passing category ID to parent: ${categoryIdValue}`);
    
    // Call the parent handler function
    onCategoryFilter(categoryIdValue);
    
    // Close dropdown
    setDropdownOpen(prev => ({ ...prev, categories: false }));
  };
  
  // Handle price range filter
  const handlePriceFilter = () => {
    console.log(`Applying price filter: ${minPrice} - ${maxPrice}`);
    
    // Validate price range before applying filter
    if (minPrice === null || maxPrice === null || isNaN(minPrice) || isNaN(maxPrice)) {
      console.error('Invalid price range values. Min:', minPrice, 'Max:', maxPrice);
      return;
    }
    
    if (minPrice < 0 || maxPrice < 0) {
      console.error('Price values cannot be negative');
      return;
    }
    
    if (minPrice > maxPrice) {
      console.error('Min price cannot be greater than max price');
      return;
    }
    
    // Call the parent handler function with validated values
    onPriceRangeFilter(minPrice, maxPrice);
    
    // Close the dropdown
    setDropdownOpen(prev => ({ ...prev, price: false }));
  };
  
  // Handle price input change with validation
  const handlePriceInputChange = (value, setter, min, max) => {
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      setter(numValue);
    }
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    // Reset local state
    setSelectedCategory('');
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
    
    // Close any open dropdowns
    setDropdownOpen({ categories: false, price: false });
    
    // If there's an onReset prop, call it
    if (onReset && typeof onReset === 'function') {
      onReset();
    } else {
      // Otherwise use the individual filter handlers
      onCategoryFilter(null);
      
      // Only call price range filter if it has changed
      if (minPrice !== priceRange.min || maxPrice !== priceRange.max) {
        onPriceRangeFilter(null, null);
      }
    }
    
    console.log('All filters have been reset');
  };
  
  // Get the currently selected category name
  const getSelectedCategoryName = () => {
    if (selectedCategory === '') return 'Category';
    
    console.log('Selected category ID:', selectedCategory);
    console.log('Available categories:', categories);
    
    const category = Array.isArray(categories) && categories.find(c => c.id?.toString() === selectedCategory);
    console.log('Found category:', category);
    
    return category ? category.name : 'Category';
  };
  
  // Format price display to be more compact
  const formatPrice = (price) => {
    if (price >= 1000) {
      return `${(price / 1000).toFixed(1)}k`;
    }
    return price;
  };
  
  // Update selectedCategory when activeFilters changes
  useEffect(() => {
    if (activeFilters.category) {
      setSelectedCategory(activeFilters.category.toString());
    } else {
      setSelectedCategory('');
    }
  }, [activeFilters.category]);
  
  // Update price range inputs when activeFilters changes
  useEffect(() => {
    if (activeFilters.priceRange) {
      setMinPrice(activeFilters.priceRange.minPrice);
      setMaxPrice(activeFilters.priceRange.maxPrice);
    }
  }, [activeFilters.priceRange]);
  
  return (
    <>
      {/* Categories Dropdown */}
      <div 
        className="filter-dropdown-container" 
        ref={categoryDropdownRef}
      >
        <button 
          className={`filter-dropdown-toggle ${dropdownOpen.categories ? 'active' : ''} ${selectedCategory ? 'selected' : ''}`}
          onClick={() => toggleDropdown('categories')}
        >
          <span>{getSelectedCategoryName()}</span>
          <span className="dropdown-arrow">▼</span>
        </button>
        
        {dropdownOpen.categories && (
          <div className="filter-dropdown-menu category-dropdown">
            <div 
              className={`dropdown-item ${selectedCategory === '' ? 'selected' : ''}`}
              onClick={() => handleCategoryChange('')}
            >
              All Categories
            </div>
            
            {categoriesLoading ? (
              <div className="dropdown-item loading">Loading categories...</div>
            ) : Array.isArray(categories) && categories.length > 0 ? (
              categories.map(category => (
                <div 
                  key={category.id}
                  className={`dropdown-item ${selectedCategory === category.id?.toString() ? 'selected' : ''}`}
                  onClick={() => handleCategoryChange(category.id?.toString())}
                >
                  {category.name || `Category ${category.id}`}
                </div>
              ))
            ) : (
              <div className="dropdown-item">No categories found</div>
            )}
          </div>
        )}
      </div>
      
      {/* Price Range Dropdown */}
      <div 
        className="filter-dropdown-container" 
        ref={priceDropdownRef}
      >
        <button 
          className={`filter-dropdown-toggle ${dropdownOpen.price ? 'active' : ''}`}
          onClick={() => toggleDropdown('price')}
        >
          <span>Price: ${formatPrice(minPrice)}-${formatPrice(maxPrice)}</span>
          <span className="dropdown-arrow">▼</span>
        </button>
        
        {dropdownOpen.price && (
          <div className="filter-dropdown-menu price-dropdown">
            <div className="price-inputs">
              <div className="price-input-group">
                <label htmlFor="min-price">Min:</label>
                <input
                  type="number"
                  id="min-price"
                  value={minPrice}
                  min={priceRange.min}
                  max={maxPrice}
                  onChange={(e) => handlePriceInputChange(
                    e.target.value, 
                    setMinPrice, 
                    priceRange.min, 
                    maxPrice
                  )}
                />
              </div>
              
              <div className="price-input-group">
                <label htmlFor="max-price">Max:</label>
                <input
                  type="number"
                  id="max-price"
                  value={maxPrice}
                  min={minPrice}
                  max={priceRange.max}
                  onChange={(e) => handlePriceInputChange(
                    e.target.value, 
                    setMaxPrice, 
                    minPrice, 
                    priceRange.max
                  )}
                />
              </div>
            </div>
            
            <button 
              className="apply-price-btn"
              onClick={handlePriceFilter}
            >
              Apply
            </button>
          </div>
        )}
      </div>
      
      {/* Reset Button */}
      <button 
        className="reset-filters-btn"
        onClick={handleResetFilters}
      >
        Reset
      </button>
    </>
  );
};

export default FilterPanel; 