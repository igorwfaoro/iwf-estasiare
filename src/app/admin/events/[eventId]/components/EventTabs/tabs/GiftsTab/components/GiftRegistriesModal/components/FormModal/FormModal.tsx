import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../../../../../../../../../../../../components/Button/Button';
import Field from '../../../../../../../../../../../../components/Field/Field';
import { ModalRefPropType } from '../../../../../../../../../../../../contexts/ModalContext';
import { GiftRegistryInputModel } from '../../../../../../../../../../../../models/input-models/gift-registry.input-model';
import { GiftRegistryViewModel } from '../../../../../../../../../../../../models/view-models/gift-registry.view-model';

export interface FormModalProps extends ModalRefPropType {
  giftRegistry?: GiftRegistryViewModel;
}

export interface FormModalResult {
  giftRegistry?: GiftRegistryInputModel;
}

const formSchema = z.object({
  storeName: z.string().min(1, 'Informe o nome da loja'),
  description: z.string().optional(),
  url: z.string().optional()
});

type FormSchema = z.infer<typeof formSchema>;

export default function FormModal({ giftRegistry, modalRef }: FormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    if (giftRegistry) {
      setValue('storeName', giftRegistry.storeName);
      setValue('description', giftRegistry.description || undefined);
      setValue('url', giftRegistry.url || undefined);
    }
  }, []);

  const handleFormSubmit = (data: FormSchema) => {
    modalRef.close({ giftRegistry: data } as FormModalResult);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Field>
        <Field.Label>Nome da loja</Field.Label>
        <Field.HelpText>
          Informe o nome da loja que você criou a lista de presentes
        </Field.HelpText>
        <Field.Input {...register('storeName')} />
        <Field.Error>{errors.storeName?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Descrição (opcional)</Field.Label>
        <Field.HelpText>
          Você pode descrever informações sobre a lista de presentes, códigos
          fornecidos pela loja, etc.
        </Field.HelpText>
        <Field.Input {...register('description')} />
      </Field>

      <Field>
        <Field.Label>Link da lista (opcional)</Field.Label>
        <Field.HelpText>
          Se você tem o link da lista de presentes, pode informa-lo aqui
        </Field.HelpText>
        <Field.Input {...register('url')} />
      </Field>

      <div className="flex justify-end z-[99999]">
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
