// Pagination component for catalog navigation

const Pagination = ({ 
    currentPage, 
    totalPages, 
    pageNumbers, 
    startPage, 
    endPage, 
    onPageChange 
}) => {
    // Don't render pagination if there's only one page or no pages
    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            {/* Previous page button */}
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
                type="button"
            >
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            
            {/* First page button with ellipsis */}
            {startPage > 1 && (
                <>
                    <button 
                        onClick={() => onPageChange(1)} 
                        className="pagination-btn"
                        type="button"
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="pagination-ellipsis">...</span>}
                </>
            )}

            {/* Page number buttons */}
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                    type="button"
                >
                    {number}
                </button>
            ))}

            {/* Last page button with ellipsis */}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
                    <button 
                        onClick={() => onPageChange(totalPages)} 
                        className="pagination-btn"
                        type="button"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            {/* Next page button */}
            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
                type="button"
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default Pagination; 