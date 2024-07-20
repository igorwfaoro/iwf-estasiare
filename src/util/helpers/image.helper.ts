import Resizer from 'react-image-file-resizer';

interface ResizeImageParams {
  file: File;

  maxWidth: number;
  maxHeight: number;
  compressFormat: 'JPEG' | 'PNG' | 'WEBP';

  /** 0 to 100 */
  quality: number;

  outputType: 'base64' | 'blob' | 'file';
}

export const resizeImage = (
  file: File,
  {
    maxWidth = 99999,
    maxHeight = 99999,
    compressFormat = 'PNG',
    quality = 100,
    outputType = 'file'
  }: ResizeImageParams
): Promise<string | File | Blob | ProgressEvent<FileReader>> =>
  new Promise((resolve) =>
    Resizer.imageFileResizer(
      file,
      maxWidth, // new image max width
      maxHeight, // new image max height
      compressFormat, // default type
      quality, // new image quality
      0, // rotation degree
      (result) => resolve(result),
      outputType // output type
    )
  );
