export const getMaxDataValue = (data) => {
  if (!data || data.length === 0) return 0;
  return Math.max(...data.flat());
};
