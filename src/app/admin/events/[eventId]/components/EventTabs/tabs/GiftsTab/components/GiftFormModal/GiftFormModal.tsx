import { GiftInputModel } from '../../../../../../../../../../models/input-models/gift.input-model';
import { GiftViewModel } from '../../../../../../../../../../models/view-models/gift.view-model';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import Field from '../../../../../../../../../../components/Field/Field';
import Button from '../../../../../../../../../../components/Button/Button';
import { ModalRefPropType } from '../../../../../../../../../../contexts/ModalContext';

export interface GiftFormModalProps extends ModalRefPropType {
  gift?: GiftViewModel;
}

export interface GiftFormModalResult {
  gift?: GiftInputModel;
}

const formSchema = z.object({
  description: z.string().min(1, 'Informe a descrição'),
  price: z.number().min(0.1, 'Informe o preço'),
  image: z.string().min(1, 'Informe a URL da imagem')
});

type FormSchema = z.infer<typeof formSchema>;

export default function GiftFormModal({ gift, modalRef }: GiftFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    if (gift) {
      setValue('description', gift.description);
      setValue('price', gift.price);
      setValue('image', gift.image);
    }
  }, []);

  const handleFormSubmit = (data: FormSchema) => {
    modalRef.close({ gift: data } as GiftFormModalResult);
  };

  const image = getValues().image;

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
        <Field.Label>URL Imagem</Field.Label>
        <Field.Input {...register('image')} />
        <Field.Error>{errors.image?.message}</Field.Error>
      </Field>

      {image && <img src={image} className="h-28" />}

      <div className="flex justify-end">
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
