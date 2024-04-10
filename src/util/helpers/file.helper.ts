export const getFileBucketUrl = (fileName: string) =>
  `${process.env.S3_URL}/${fileName}`;

export const getFileApiUrl = (fileName: string): string =>
  fileName.startsWith('http') ? fileName : `/api/file/${fileName}`;

export const getFileApiUrlOrNull = (
  fileName: string | undefined | null
): string | null => (fileName ? getFileApiUrl(fileName) : null);

export const fileToDataURL = (file: File): Promise<string> => {
  const reader = new FileReader();

  return new Promise((resolve) => {
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
};
