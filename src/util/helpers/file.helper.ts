export const getFilePublicUrl = (fileName: string): string => {
  return `${process.env.S3_URL}/${fileName}`;
};

export const getFilePublicUrlOrNull = (
  fileName: string | undefined | null
): string | null => (fileName ? getFilePublicUrl(fileName) : null);
