import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5; // Maximum number of page buttons to show
    
    // Logic to show pages around current page
    if (totalPages <= maxPageButtons) {
      // If total pages are less than max buttons, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate start and end of middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, startPage + 2);
      
      // Adjust if needed
      if (endPage - startPage < 2) {
        startPage = Math.max(2, endPage - 2);
      }
      
      // Add ... before middle pages if needed
      if (startPage > 2) {
        pageNumbers.push('ellipsis-start');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ... after middle pages if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('ellipsis-end');
      }
      
      // Always include last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };
  
  // Don't show pagination if only 1 page
  if (totalPages <= 1) {
    return null;
  }
  
  // Handle page change with boundary check
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  return (
    <div className="pagination">
      <button 
        className="pagination-arrow"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <span className="arrow-icon">«</span>
        <span className="arrow-text">Prev</span>
      </button>
      
      <div className="pagination-numbers">
        {getPageNumbers().map((page, index) => {
          if (typeof page === 'number') {
            return (
              <button
                key={index}
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : null}
              >
                {page}
              </button>
            );
          } else {
            return (
              <span 
                key={index} 
                className="pagination-ellipsis"
                aria-hidden="true"
              >
                …
              </span>
            );
          }
        })}
      </div>
      
      <button 
        className="pagination-arrow"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <span className="arrow-text">Next</span>
        <span className="arrow-icon">»</span>
      </button>
    </div>
  );
};

export default Pagination; 