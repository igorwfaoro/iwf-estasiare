import { createContext, useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import ImageCrop, {
  ImageCropProps,
  ImageCropResult
} from '../components/ImageCrop/ImageCrop';
import CustomModal from '../components/Modal/Modal';
import { isMobile } from '../util/helpers/is-mobile.helper';

export interface ImageCropOptions {
  /** The aspect ratio of the crop, e.g. 1 for a square or 16 / 9 for landscape. */
  aspect?: number;
}

export interface ImageCropRef {
  id: string;
  component: React.FC<any>;
  props?: any;
  title?: string;
  close: (result?: ImageCropResult | undefined) => void;
}

export interface IImageCropProvider {
  open: (file: File, options?: ImageCropOptions) => Promise<ImageCropResult | undefined>;
}

interface ImageCropProviderProps {
  children: JSX.Element;
}

const ImageCropContext = createContext<IImageCropProvider | undefined>(
  undefined
);

const ImageCropProvider = (props: ImageCropProviderProps) => {
  const [alertList, setImageCropList] = useState<ImageCropRef[]>([]);

  const close = (id: string) => {
    setImageCropList(alertList.filter((modal) => modal.id !== id));
  };

  const open = (
    file: File,
    options: ImageCropOptions = {}
  ): Promise<ImageCropResult | undefined> => {
    return new Promise((resolve) => {
      const id = uuidV4();
      const modal: ImageCropRef = {
        id,
        component: ImageCrop,
        title: 'Ajustar Imagem',
        props: { file, ...options } as ImageCropProps,
        close: (result?: ImageCropResult | undefined) => {
          close(id);
          resolve(result);
        }
      };

      setImageCropList((ml) => [...ml, modal]);
    });
  };

  return (
    <ImageCropContext.Provider value={{ open }}>
      {props.children}
      {alertList.map((modal) => (
        <CustomModal
          key={modal.id}
          close={modal.close}
          title={modal.title}
          width={isMobile() ? '90%' : '50%'}
        >
          <modal.component {...modal.props} modalRef={modal} />
        </CustomModal>
      ))}
    </ImageCropContext.Provider>
  );
};

export default ImageCropProvider;

export const useImageCrop = () => useContext(ImageCropContext)!;
