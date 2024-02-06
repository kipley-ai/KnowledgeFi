export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPages - 1, totalPages];
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [
		1,
		"...",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"...",
		totalPages,
	];
};

export const generatePagination2 = (currentPage: number, totalPages: number): (number | string)[] => {
  // Always show the first two and last two pages if they exist
  const edgePageCount = 3;
  // Pages to show directly around the current page
  const surroundingPageCount = 1;

  let pages: (number | string)[] = [];

  // Calculate the first and last pages to be shown directly around the current page
  let startPage = Math.max(currentPage - surroundingPageCount, 1);
  let endPage = Math.min(currentPage + surroundingPageCount, totalPages);

  // Always include the first page and possibly an ellipsis
  if (currentPage > edgePageCount + 1) {
    pages.push(1, 2, '...');
  } else {
    for (let i = 1; i < startPage; i++) {
      pages.push(i);
    }
  }

  // Add the current page and its surroundings
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Always include the last page and possibly an ellipsis
  if (endPage < totalPages - edgePageCount) {
    pages.push('...', totalPages);
  } else {
    for (let i = endPage + 1; i <= totalPages; i++) {
      pages.push(i);
    }
  }

  return pages;
};
