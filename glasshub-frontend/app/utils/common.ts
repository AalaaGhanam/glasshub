export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const isValidBase64Image = (base64: string): boolean => {
  const base64Regex = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/;
  return base64Regex.test(base64);
};
