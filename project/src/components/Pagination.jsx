// Pagination component - Reusable component for navigating through pages of content
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  // Function to generate array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // If we have more than 1 page
    if (totalPages > 1) {
      // Calculate range around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Add ellipsis if there's a gap after first page
      if (start > 2) {
        pages.push('...');
      }
      
      // Add pages around current page
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      // Add ellipsis if there's a gap before last page
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page (if it's not the same as first page)
      pages.push(totalPages);
    }
    
    return pages;
  };

  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors duration-200
          ${currentPage === 1 
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
            : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-50 hover:border-purple-400'
          }
        `}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Number Buttons */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              // Ellipsis indicator
              <span className="px-2 py-2 text-gray-500">...</span>
            ) : (
              // Page number button
              <button
                onClick={() => onPageChange(page)}
                className={`
                  w-10 h-10 rounded-lg border text-sm font-medium transition-colors duration-200
                  ${currentPage === page
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-50 hover:border-purple-400'
                  }
                `}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          flex items-center gap-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors duration-200
          ${currentPage === totalPages 
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
            : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-50 hover:border-purple-400'
          }
        `}
        aria-label="Go to next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Page Info */}
      <div className="hidden md:flex items-center ml-4 text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}

export default Pagination;