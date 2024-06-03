import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { fileTypeFromBuffer } from 'file-type';
import { v4 as uuidV4 } from 'uuid';
import { BadError } from '../../errors/types/bad.error';
import { appDayjs } from '../../util/date';

export interface UploadFileResult {
  fileLocation: string;
}

export const createFileServerService = () => {
  const s3 = new S3({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }
  });

  const uploadFile = async (
    file: Buffer | File,
    { fileName, fileExt }: { fileName?: string; fileExt?: string } = {}
  ): Promise<UploadFileResult> => {
    const fileBuffer =
      file instanceof Buffer ? file : Buffer.from(await file.arrayBuffer());

    const fileType = await fileTypeFromBuffer(fileBuffer);

    if (!fileName)
      fileName = `${appDayjs().format('YYYYMMDD-HHmmss.sss')}_${uuidV4()}.${
        fileExt || fileType?.ext || 'bin'
      }`;

    try {
      const result = await new Upload({
        client: s3,
        params: {
          Bucket: process.env.S3_BUCKET,
          Key: `${fileName}`,
          Body: fileBuffer
        }
      }).done();

      return {
        fileLocation: result.Key!
      };
    } catch (error) {
      console.error(error);
      throw new BadError('Erro ao fazer upload de arquivo');
    }
  };

  const deleteFile = async (
    fileLocation: string | undefined | null
  ): Promise<void> => {
    if (!fileLocation) return;

    try {
      await s3.deleteObject({
        Bucket: process.env.S3_BUCKET,
        Key: fileLocation
      });
    } catch (error) {
      console.error(error);
      throw new BadError('Erro ao deletar arquivo');
    }
  };

  return {
    uploadFile,
    deleteFile
  };
};
