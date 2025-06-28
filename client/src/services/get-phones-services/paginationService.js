// Service for handling pagination calculations and logic

// Calculate pagination values for a given dataset
export const calculatePagination = (items, currentPage, itemsPerPage) => {
    // Calculate start and end indices for current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    // Get items for current page
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    
    // Calculate total pages
    const totalPages = Math.ceil(items.length / itemsPerPage);
    
    return {
        currentItems,
        totalPages,
        indexOfFirstItem,
        indexOfLastItem
    };
};

// Generate page numbers for pagination display
export const generatePageNumbers = (currentPage, totalPages, maxVisiblePages = 5) => {
    const pageNumbers = [];
    
    // Calculate start and end page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we don't have enough pages
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Generate array of page numbers
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return {
        pageNumbers,
        startPage,
        endPage
    };
};

// Scroll to top of page smoothly
export const scrollToTop = () => {
    // Use requestAnimationFrame to ensure the scroll happens after state updates
    requestAnimationFrame(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}; 