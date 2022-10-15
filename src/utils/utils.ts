export const formatCurrency = (number: any) => {
  number = typeof number !== 'number' ? Number(number) : number;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    compactDisplay: 'short',
    maximumSignificantDigits: 3,
  }).format(number);
};

export const formatPercent = (number: any) => {
  number = typeof number !== 'number' ? Number(number) : number;
  return new Intl.NumberFormat('en-US', { style: 'unit', unit: 'percent' }).format(number);
};

export const calcPagination = (currentPage, pageSize) => {
  return {
    start: currentPage * pageSize,
    limit: (currentPage + 1) * pageSize,
  };
};
