import range from "lodash/range";

export const getPagination = (totalPages: number, currentPage: number, siblings: number) => {
  const totalNumbers = 7 + siblings;
  if (totalNumbers >= totalPages) {
    return range(1, totalPages + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblings, 1);
  const rightSiblingIndex = Math.min(currentPage + siblings, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblings;
    const leftRange = range(1, leftItemCount + 1);
    return [...leftRange, "...", totalPages];
  } else if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblings;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages + 1);
    return [1, "...", ...rightRange];
  } else {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex + 1);
    return [1, "...", ...middleRange, "...", totalPages];
  }
};
