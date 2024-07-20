import { useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss';
import { ModalRefPropType } from '../../contexts/ModalContext';
import Button from '../Button/Button';

export interface ImageCropProps extends ModalRefPropType {
  file: File;

  /** The aspect ratio of the crop, e.g. 1 for a square or 16 / 9 for landscape. */
  aspect?: number;
}

export interface ImageCropResult {
  file: File;
}

const ImageCrop = ({ file, aspect, modalRef }: ImageCropProps) => {
  const [fileImage, setFileImage] = useState<string>();

  const imgRef = useRef<HTMLImageElement>(null);

  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50
  });

  const onImageLoad = () => {
    if (aspect && imgRef.current) {
      const { clientWidth } = imgRef.current;

      setCrop({
        unit: 'px',
        x: 0,
        y: 0,
        width: (clientWidth / 100) * 40,
        height: ((clientWidth / 100) * 40) / aspect
      });
    }
  };

  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => setFileImage(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const getCroppedImage = async (
    image: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      image,
      x * scaleX,
      y * scaleY,
      width * scaleX,
      height * scaleY,
      0,
      0,
      width,
      height
    );

    return new Promise<File>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        const file = new File([blob], 'cropped-image.png', {
          type: 'image/png'
        });
        resolve(file);
      }, 'image/png');
    });
  };

  const handleSaveClick = async () => {
    if (!imgRef.current) {
      return;
    }

    try {
      const c = completedCrop || crop;
      const croppedImageFile = await getCroppedImage(
        imgRef.current,
        c.x,
        c.y,
        c.width,
        c.height
      );

      modalRef.close({ file: croppedImageFile } as ImageCropResult);
    } catch (e) {
      console.error('Failed to get cropped image', e);
    }
  };

  return (
    <div className="p-4 flex items-center flex-col gap-4">
      <ReactCrop
        crop={crop}
        keepSelection
        aspect={aspect}
        className="max-h-[80vh]"
        onChange={setCrop}
        onComplete={setCompletedCrop}
      >
        <img
          ref={imgRef}
          src={fileImage}
          alt="Image to Crop"
          onLoad={onImageLoad}
        />
      </ReactCrop>

      <div className="flex justify-center gap-">
        <Button theme="primary-outline" onClick={modalRef.close}>
          Cancelar
        </Button>
        <Button onClick={handleSaveClick}>Salvar</Button>
      </div>
    </div>
  );
};

export default ImageCrop;
