import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '../../../../../../../../../../components/Button/Button';
import Field from '../../../../../../../../../../components/Field/Field';
import { DEFAULT_INPUT_ACCEPT_FILE_TYPES } from '../../../../../../../../../../constants/file-types';
import { useImageCrop } from '../../../../../../../../../../contexts/ImageCropContext';
import { ModalRefPropType } from '../../../../../../../../../../contexts/ModalContext';
import { GiftViewModel } from '../../../../../../../../../../models/view-models/gift.view-model';
import { fileToDataURL } from '../../../../../../../../../../util/helpers/file.helper';
import { resizeImage } from '../../../../../../../../../../util/helpers/image.helper';

export interface GiftFormModalProps extends ModalRefPropType {
  gift?: GiftViewModel;
}

export interface GiftFormModalResult {
  data: {
    gift: GiftInputModel;
    imageFile: File;
  };
}

const formSchema = z.object({
  description: z.string().min(1, 'Informe a descrição'),
  price: z.number().min(0.1, 'Informe o preço')
});

type FormSchema = z.infer<typeof formSchema>;

export default function GiftFormModal({ gift, modalRef }: GiftFormModalProps) {
  const imageCrop = useImageCrop();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const [imageFile, setImageFile] = useState<File>();
  const [imageThumbnail, setImageThumbnail] = useState<string>();

  useEffect(() => {
    if (gift) {
      setValue('description', gift.description);
      setValue('price', gift.price);
      setImageThumbnail(gift.image);
    }
  }, []);

  const handleFormSubmit = (data: FormSchema) => {
    modalRef.close({
      data: { gift: data, imageFile: imageFile }
    } as GiftFormModalResult);
  };

  const handleInputFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    const cropResult = await imageCrop.open(file);

    if (!cropResult?.file) return;

    const resultFile = (await resizeImage(cropResult.file, {
      quality: 90,
      maxWidth: 1200,
      maxHeight: 1200,
      compressFormat: 'JPEG'
    })) as File;

    setImageFile(resultFile);
    setImageThumbnail(await fileToDataURL(resultFile));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Field>
        <Field.Label>Descrição</Field.Label>
        <Field.Input {...register('description')} />
        <Field.Error>{errors.description?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Preço</Field.Label>
        <Field.Input
          {...register('price', { valueAsNumber: true })}
          type="number"
          step="0.01"
        />
        <Field.Error>{errors.price?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Imagem</Field.Label>
        <Field.Input
          type="file"
          accept={DEFAULT_INPUT_ACCEPT_FILE_TYPES.join(', ')}
          onChange={(event) => handleInputFileChange(event)}
        />
      </Field>

      <div>
        {imageThumbnail && <img src={imageThumbnail} className="h-28 mb-6" />}
      </div>

      <div className="flex justify-end">
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
