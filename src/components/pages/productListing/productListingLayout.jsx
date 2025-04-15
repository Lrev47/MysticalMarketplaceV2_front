import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { 
  fetchAllProducts, 
  fetchProductsByCategory,
  fetchProductsByPriceRange,
  fetchFilteredProducts
} from '../../../redux/slices/productSlice';
import { fetchAllCategories } from '../../../redux/slices/categorySlice';

// Import components
import ProductList from './components/ProductList';
import FilterPanel from './components/FilterPanel';
import SortOptions from './components/SortOptions';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

// Import styles
import './style/productListing.css';

const ProductListingLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector(state => state.products);
  
  // Local state for UI controls
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [sortOption, setSortOption] = useState('most-relevant');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Track active filters
  const [activeFilters, setActiveFilters] = useState({
    category: null,
    priceRange: null
  });
  
  // Extract query parameters on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const sortParam = searchParams.get('sort');
    
    // Initialize filters from URL parameters
    const initialFilters = { ...activeFilters };
    let filtersChanged = false;
    
    if (categoryParam) {
      const categoryId = parseInt(categoryParam, 10);
      if (!isNaN(categoryId)) {
        initialFilters.category = categoryId;
        filtersChanged = true;
      }
    }
    
    if (minPriceParam && maxPriceParam) {
      const minPrice = parseFloat(minPriceParam);
      const maxPrice = parseFloat(maxPriceParam);
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        initialFilters.priceRange = { minPrice, maxPrice };
        filtersChanged = true;
      }
    }
    
    // Apply sort option from URL if present
    if (sortParam) {
      setSortOption(sortParam);
    }
    
    if (filtersChanged) {
      setActiveFilters(initialFilters);
      applyAllFilters(initialFilters);
    } else {
      // No filters in URL, fetch all products
      dispatch(fetchAllProducts());
    }
  }, [dispatch]);
  
  // Function to apply all active filters
  const applyAllFilters = (filters = activeFilters) => {
    const { category, priceRange } = filters;
    console.log('Applying combined filters:', { category, priceRange });
    
    if (category && priceRange) {
      // Apply both category and price range filters
      console.log(`Applying combined filters: Category ${category} and Price range ${priceRange.minPrice}-${priceRange.maxPrice}`);
      dispatch(fetchFilteredProducts({ categoryId: category, ...priceRange }));
    } else if (category) {
      // Only category filter is active
      console.log(`Applying category filter: ${category}`);
      dispatch(fetchProductsByCategory(category));
    } else if (priceRange) {
      // Only price range filter is active
      console.log(`Applying price range filter: ${priceRange.minPrice}-${priceRange.maxPrice}`);
      dispatch(fetchProductsByPriceRange(priceRange));
    } else {
      // No filters active, show all products
      console.log('No filters active, showing all products');
      dispatch(fetchAllProducts());
    }
  };
  
  // Update URL with current filter parameters
  const updateUrlWithFilters = () => {
    const params = new URLSearchParams();
    
    // Add filters to URL
    if (activeFilters.category) {
      params.set('category', activeFilters.category);
    }
    
    if (activeFilters.priceRange) {
      params.set('minPrice', activeFilters.priceRange.minPrice);
      params.set('maxPrice', activeFilters.priceRange.maxPrice);
    }
    
    // Add sort option to URL
    if (sortOption !== 'most-relevant') {
      params.set('sort', sortOption);
    }
    
    // Update URL without page reload
    const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : '');
    window.history.pushState({}, '', newUrl);
  };
  
  // Calculate pagination parameters
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Create arrays for rendering (consider using useMemo for performance in real app)
  const productsArray = products || [];
  let searchFilteredProducts = productsArray;
  
  // Apply search filter
  if (searchQuery) {
    searchFilteredProducts = productsArray.filter(product => {
      return (
        (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }
  
  // Apply sort based on sort option
  let sortedProducts = searchFilteredProducts;
  
  switch (sortOption) {
    case 'price-asc':
      sortedProducts = [...searchFilteredProducts].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sortedProducts = [...searchFilteredProducts].sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      sortedProducts = [...searchFilteredProducts].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      sortedProducts = [...searchFilteredProducts].sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'newest':
      sortedProducts = [...searchFilteredProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'best-selling':
      sortedProducts = [...searchFilteredProducts].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
      break;
    case 'rating':
      sortedProducts = [...searchFilteredProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    default:
      // most-relevant: 
      // Using product id as fallback sort for demo, could be more sophisticated
      sortedProducts = searchFilteredProducts;
  }
  
  // Get current products to display
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  
  // Calculate total pages
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    
    // Scroll to top of products list
    setTimeout(() => {
      window.scrollTo({
        top: document.querySelector('.product-list')?.offsetTop - 100 || 0,
        behavior: 'smooth'
      });
    }, 100);
  };
  
  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  };
  
  // Handle sorting change
  const handleSortChange = (option) => {
    setSortOption(option);
    
    // Update URL with new sort option
    setTimeout(() => updateUrlWithFilters(), 0);
  };
  
  // Handle category filter
  const handleCategoryFilter = (categoryId) => {
    // Update active filters
    const newFilters = { ...activeFilters, category: categoryId };
    setActiveFilters(newFilters);
    
    // Apply all active filters
    applyAllFilters(newFilters);
    
    // Update URL
    setTimeout(() => updateUrlWithFilters(), 0);
    
    setCurrentPage(1); // Reset to first page on filter
  };
  
  // Handle price range filter
  const handlePriceRangeFilter = (minPrice, maxPrice) => {
    // Validate input
    if (minPrice === '' || maxPrice === '') {
      console.error('Min and max price must be provided');
      return;
    }
    
    // Convert to numbers
    minPrice = parseFloat(minPrice);
    maxPrice = parseFloat(maxPrice);
    
    if (isNaN(minPrice) || isNaN(maxPrice)) {
      console.error('Min and max price must be numbers');
      return;
    }
    
    if (minPrice < 0 || maxPrice < 0) {
      console.error('Min and max price must be positive');
      return;
    }
    
    if (minPrice > maxPrice) {
      console.error('Min price cannot be greater than max price:', minPrice, maxPrice);
      return;
    }
    
    // Update active filters
    const newFilters = { ...activeFilters, priceRange: { minPrice, maxPrice } };
    setActiveFilters(newFilters);
    
    // Apply all active filters
    applyAllFilters(newFilters);
    
    // Update URL
    setTimeout(() => updateUrlWithFilters(), 0);
    
    setCurrentPage(1); // Reset to first page on filter
    setSortOption('most-relevant'); // Reset sorting to most-relevant
  };
  
  // Function to clear all filters
  const clearAllFilters = () => {
    setActiveFilters({ category: null, priceRange: null });
    dispatch(fetchAllProducts());
    
    // Clear URL parameters
    window.history.pushState({}, '', window.location.pathname);
    
    setCurrentPage(1);
    setSortOption('most-relevant');
  };
  
  // Initial data load
  useEffect(() => {
    // Fetch categories to populate the dropdown
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <div className="product-listing-page">
      {/* Page Header */}
      <div className="product-listing-header">
        <h1>Mystical Products</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {/* Active Filters Summary */}
      {(activeFilters.category || activeFilters.priceRange) && (
        <div className="active-filters">
          <span>Active Filters:</span>
          {activeFilters.category && (
            <div className="filter-tag">
              Category: {activeFilters.category}
              <button onClick={() => handleCategoryFilter(null)}>×</button>
            </div>
          )}
          {activeFilters.priceRange && (
            <div className="filter-tag">
              Price: ${activeFilters.priceRange.minPrice} - ${activeFilters.priceRange.maxPrice}
              <button onClick={() => {
                const newFilters = {...activeFilters, priceRange: null};
                setActiveFilters(newFilters);
                applyAllFilters(newFilters);
                updateUrlWithFilters();
              }}>×</button>
            </div>
          )}
          <button className="clear-all-filters" onClick={clearAllFilters}>
            Clear All
          </button>
        </div>
      )}
      
      {/* Unified Filter/Sort Bar */}
      <div className="filter-bar">
        <div className="filter-controls">
          <FilterPanel 
            onCategoryFilter={handleCategoryFilter}
            onPriceRangeFilter={handlePriceRangeFilter}
            activeFilters={activeFilters}
            onReset={clearAllFilters}
          />
        </div>
        <div className="sort-controls">
          <SortOptions 
            sortOption={sortOption} 
            onSortChange={handleSortChange} 
          />
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="product-list-container">
        {/* Loading state */}
        {loading ? (
          <div className="loading-container">
            <LoadingSpinner />
            <p>Loading products...</p>
          </div>
        ) : error ? (
          /* Error state */
          <div className="error-container">
            <h2>Error Loading Products</h2>
            <p>{error}</p>
            <button onClick={() => dispatch(fetchAllProducts())}>
              Try Again
            </button>
          </div>
        ) : sortedProducts.length === 0 ? (
          /* Empty state */
          <div className="empty-state">
            <h2>No Products Found</h2>
            <p>Try adjusting your filters or search terms.</p>
            <button onClick={clearAllFilters}>
              Reset Filters
            </button>
          </div>
        ) : (
          /* Product grid with pagination */
          <>
            <ProductList products={currentItems} />
            
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductListingLayout; 