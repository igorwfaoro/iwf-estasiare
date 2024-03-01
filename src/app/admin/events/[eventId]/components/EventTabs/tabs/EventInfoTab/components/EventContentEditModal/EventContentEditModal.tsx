import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import Field from '../../../../../../../../../../components/Field/Field';
import Button from '../../../../../../../../../../components/Button/Button';
import { createEventClientService } from '../../../../../../../../../../services/client/event.client-service';
import { useLoader } from '../../../../../../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../../../../../../contexts/ToastContext';
import { EditModalResult } from '../../types/edit-modal-result';
import { EditModalProps } from '../../types/edit-modal-props';

interface EventContentEditModalProps extends EditModalProps {}
interface EventContentEditModalResult extends EditModalResult {}

const formSchema = z.object({
  primaryColor: z.string().min(1, 'Informe a cor principal do evento'),
  bannerImage: z.string().min(1, 'Informe a imagem do banner do evento'),
  logoImage: z.string().optional()
});

type FormSchema = z.infer<typeof formSchema>;

export default function EventContentEditModal({
  event,
  modalRef
}: EventContentEditModalProps) {
  const eventClientService = createEventClientService();
  const loader = useLoader();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setValue,
    watch
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    setValue('primaryColor', event.content!.primaryColor);
    setValue('bannerImage', event.content!.bannerImage);
    setValue('logoImage', event.content!.logoImage || '');
  }, []);

  const handleFormSubmit = (data: FormSchema) => {
    loader.show();

    eventClientService
      .update(event.id, {
        content: {
          primaryColor: data.primaryColor,
          bannerImage: data.bannerImage,
          logoImage: data.logoImage
        }
      })
      .then(() => {
        toast.open('Salvo', 'success');
        modalRef.close({ edited: true } as EventContentEditModalResult);
      })
      .catch((error) => {
        toast.open('Erro ao salvar', 'error');
        console.error(error);
      })
      .finally(() => loader.hide());
  };

  const color = watch().primaryColor || event.content?.primaryColor;

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mt-4 flex flex-col gap-2 w-full"
    >
      <Field>
        <Field.Label>Qual é a cor principal do seu evento?</Field.Label>
        <div className="flex items-center gap-2">
          <Field.Input {...register('primaryColor')} type="color" />
          {color && (
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: color }}
            />
          )}
        </div>
        <Field.Error>{errors.primaryColor?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Escolha uma imagem para seu evento</Field.Label>
        <Field.Input {...register('bannerImage')} />
        <Field.Error>{errors.bannerImage?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Escolha uma logo para seu evento (opcional)</Field.Label>
        <Field.Input {...register('logoImage')} />
        <Field.Error>{errors.logoImage?.message}</Field.Error>
      </Field>

      <Button type="submit">Salvar</Button>
    </form>
  );
}
