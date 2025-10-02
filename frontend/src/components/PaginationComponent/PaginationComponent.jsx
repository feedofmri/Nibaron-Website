import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import './PaginationComponent.css';

const PaginationComponent = ({
  currentPage,
  totalPages,
  totalProducts,
  itemsPerPage,
  onPageChange,
  loading
}) => {
  // Calculate the range of items being displayed
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalProducts);

  // Generate page numbers array
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show before and after current page
    const range = [];
    const rangeWithDots = [];

    // Calculate start and end of the range
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add first page
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    // Add main range
    rangeWithDots.push(...range);

    // Add last page
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && !loading) {
      onPageChange(page);
      // Scroll to top of products grid
      document.querySelector('.products-grid')?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container">
      {/* Results Info */}
      <div className="pagination-info">
        <span className="results-text">
          Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of{' '}
          <strong>{totalProducts}</strong> products
        </span>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        {/* First Page */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1 || loading}
          className="pagination-btn pagination-btn-nav"
          title="First Page"
        >
          <ChevronsLeft size={16} />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="pagination-btn pagination-btn-nav"
          title="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        <div className="pagination-numbers">
          {getPageNumbers().map((pageNum, index) => (
            <React.Fragment key={index}>
              {pageNum === '...' ? (
                <span className="pagination-dots">...</span>
              ) : (
                <button
                  onClick={() => handlePageChange(pageNum)}
                  disabled={loading}
                  className={`pagination-btn pagination-btn-number ${
                    currentPage === pageNum ? 'active' : ''
                  }`}
                >
                  {pageNum}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Page */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="pagination-btn pagination-btn-nav"
          title="Next Page"
        >
          <ChevronRight size={16} />
        </button>

        {/* Last Page */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages || loading}
          className="pagination-btn pagination-btn-nav"
          title="Last Page"
        >
          <ChevronsRight size={16} />
        </button>
      </div>

      {/* Page Size Info */}
      <div className="pagination-meta">
        <span className="page-info">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
      </div>
    </div>
  );
};

export default PaginationComponent;
