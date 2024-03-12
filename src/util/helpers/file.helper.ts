const getPublicUrl = (fileName: string): string => {
  return fileName ? `${CONFIG.STORAGE_URL}/${fileName}` : null;
};
