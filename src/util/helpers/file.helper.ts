export const getFilePublicUrl = (fileName: string): string => {
  return `${process.env.S3_URL}/${fileName}`;
};

export const getFilePublicUrlOrNull = (
  fileName: string | undefined | null
): string | null => (fileName ? getFilePublicUrl(fileName) : null);

export const fileToDataURL = (file: File): Promise<string> => {
  const reader = new FileReader();

  return new Promise((resolve) => {
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
};
