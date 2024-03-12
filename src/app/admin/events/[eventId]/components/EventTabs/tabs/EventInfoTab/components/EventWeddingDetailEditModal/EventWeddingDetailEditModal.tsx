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

interface EventWeddingDetailEditModalProps extends EditModalProps {}
interface EventWeddingDetailEditModalResult extends EditModalResult {}

const formSchema = z.object({
  groomName: z.string().min(1, 'Informe o nome do noivo'),
  brideName: z.string().min(1, 'Informe o nome da noiva')
});

type FormSchema = z.infer<typeof formSchema>;

export default function EventWeddingDetailEditModal({
  event,
  modalRef
}: EventWeddingDetailEditModalProps) {
  const eventClientService = createEventClientService();
  const loader = useLoader();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    setValue('groomName', event.weddingDetail!.groomName);
    setValue('brideName', event.weddingDetail!.brideName);
  }, []);

  const handleFormSubmit = (data: FormSchema) => {
    loader.show();

    eventClientService
      .update(event.id, {
        inputData: {
          weddingDetail: {
            groomName: data.groomName,
            brideName: data.brideName
          }
        }
      })
      .then(() => {
        toast.open('Salvo', 'success');
        modalRef.close({ edited: true } as EventWeddingDetailEditModalResult);
      })
      .catch((error) => {
        toast.open('Erro ao salvar', 'error');
        console.error(error);
      })
      .finally(() => loader.hide());
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mt-4 flex flex-col gap-2 w-full"
    >
      <Field>
        <Field.Label>Nome do Noivo</Field.Label>
        <Field.Input {...register('groomName')} />
        <Field.Error>{errors.groomName?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Nome da Noiva</Field.Label>
        <Field.Input {...register('brideName')} />
        <Field.Error>{errors.brideName?.message}</Field.Error>
      </Field>

      <Button type="submit">Salvar</Button>
    </form>
  );
}
