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
    if (imgRef.current) {
      const { clientWidth, clientHeight } = imgRef.current;

      const params: Crop & PixelCrop = {
        unit: 'px',
        x: clientWidth / 2 - ((clientWidth / 100) * 40) / 2,
        y: clientHeight / 2 - ((clientHeight / 100) * 40) / 2,
        width: (clientWidth / 100) * 40,
        height: ((clientHeight / 100) * 40) / (aspect || 1)
      };

      setCrop(params);
      setCompletedCrop(params);
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
    cropParams: PixelCrop
  ) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = cropParams.width;
    canvas.height = cropParams.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      image,
      cropParams.x * scaleX,
      cropParams.y * scaleY,
      cropParams.width * scaleX,
      cropParams.height * scaleY,
      0,
      0,
      cropParams.width,
      cropParams.height
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
      const croppedImageFile = await getCroppedImage(
        imgRef.current,
        completedCrop!
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
        aspect={aspect}
        className="max-h-[80vh]"
        onChange={setCrop}
        onComplete={setCompletedCrop}
        keepSelection
        ruleOfThirds
      >
        <img
          ref={imgRef}
          src={fileImage}
          alt="Image to Crop"
          onLoad={onImageLoad}
        />
      </ReactCrop>

      <div className="flex justify-center gap-2">
        <Button theme="primary-outline" onClick={modalRef.close}>
          Cancelar
        </Button>
        <Button onClick={handleSaveClick}>Salvar</Button>
      </div>
    </div>
  );
};

export default ImageCrop;
