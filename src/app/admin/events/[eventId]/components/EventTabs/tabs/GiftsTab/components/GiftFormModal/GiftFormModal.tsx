import { GiftViewModel } from '../../../../../../../../../../models/view-models/gift.view-model';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useEffect, useState } from 'react';
import Field from '../../../../../../../../../../components/Field/Field';
import Button from '../../../../../../../../../../components/Button/Button';
import { ModalRefPropType } from '../../../../../../../../../../contexts/ModalContext';
import { DEFAULT_INPUT_ACCEPT_FILE_TYPES } from '../../../../../../../../../../constants/file-types';
import { fileToDataURL } from '../../../../../../../../../../util/helpers/file.helper';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
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

    setImageFile(file);
    setImageThumbnail(await fileToDataURL(file));
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
