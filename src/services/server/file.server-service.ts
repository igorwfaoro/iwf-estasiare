import { v4 as uuidV4 } from 'uuid';
import * as AWS from 'aws-sdk';
import { fileTypeFromBuffer } from 'file-type';

export interface UploadFileResult {
  fileLocation: string;
}

export const createFileServerService = () => {
  const s3: AWS.S3 = new AWS.S3({
    apiVersion: process.env.S3_API_VERSION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }
  });

  const uploadFile = async (
    file: Buffer | File,
    fileName?: string
  ): Promise<UploadFileResult> => {
    const fileBuffer =
      file instanceof Buffer ? file : Buffer.from(await file.arrayBuffer());

    const fileType = await fileTypeFromBuffer(fileBuffer);

    if (!fileName)
      fileName = `${Date.now()}_${uuidV4()}.${fileType?.ext || 'jpg'}`;

    try {
      const result = await s3
        .upload({
          Bucket: process.env.S3_BUCKET,
          Key: `${fileName}`,
          Body: fileBuffer
        })
        .promise();

      return {
        fileLocation: result.Key
      };
    } catch (error) {
      throw new Error('Error uploading file');
    }
  };

  const deleteFile = async (fileLocation: string): Promise<void> => {
    try {
      await s3
        .deleteObject({
          Bucket: process.env.S3_BUCKET,
          Key: fileLocation
        })
        .promise();
    } catch (error) {
      throw new Error('Error deleting file');
    }
  };

  return {
    uploadFile,
    deleteFile
  };
};
