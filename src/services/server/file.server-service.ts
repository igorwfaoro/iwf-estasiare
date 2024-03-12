import { v4 as uuidV4 } from 'uuid';
import * as AWS from 'aws-sdk';
import * as fileType from 'file-type';

const createFileServerService = () => {
  const s3: AWS.S3 = new AWS.S3({
    apiVersion: process.env.S3_API_VERSION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }
  });

  const uploadFromUploadedFile = async (
    file: UploadedFile,
  ): Promise<{ fileLocation: string }> => {
    const type = await fileType.fromBuffer(file.data);

    const fileName = `${Date.now()}_${uuidV4()}.${type.ext}`;
    return uploadFile(file.data, fileName);
  };

  const uploadFile = async (
    file: Buffer,
    fileName: string
  ): Promise<{ fileLocation: string }> => {
    try {
      const result = await s3
        .upload({
          Bucket: process.env.S3_BUCKET,
          Key: `${fileName}`,
          Body: file
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
    uploadFromUploadedFile,
    uploadFile,
    deleteFile
  };
};
