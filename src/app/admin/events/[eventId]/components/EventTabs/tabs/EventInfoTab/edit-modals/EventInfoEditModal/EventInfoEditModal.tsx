import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '../../../../../../../../../../components/Button/Button';
import Field from '../../../../../../../../../../components/Field/Field';
import { useLoader } from '../../../../../../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../../../../../../contexts/ToastContext';
import { createEventClientService } from '../../../../../../../../../../services/client/event.client-service';
import { dateStringToInput } from '../../../../../../../../../../util/date';
import {
  eventTypeLabel,
  eventTypeList
} from '../../../../../../../../../../util/helpers/event-type.helper';
import { EditModalProps } from '../../types/edit-modal-props';
import { EditModalResult } from '../../types/edit-modal-result';

interface EventInfoEditModalProps extends EditModalProps {}
interface EventInfoEditModalResult extends EditModalResult {}

const formSchema = z.object({
  eventType: z.enum(eventTypeList as any, {
    required_error: 'Informe o tipo do evento'
  }),
  date: z.string().min(1, 'Informe a data do evento')
});

type FormSchema = z.infer<typeof formSchema>;

export default function EventInfoEditModal({
  event,
  modalRef
}: EventInfoEditModalProps) {
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
    setValue('eventType', event.eventType);
    setValue('date', dateStringToInput(event.date));
  }, []);

  const handleFormSubmit = (data: FormSchema) => {
    loader.show();

    eventClientService
      .update(event.id, {
        inputData: {
          eventType: data.eventType,
          date: data.date
        }
      })
      .then(() => {
        toast.open('Salvo', 'success');
        modalRef.close({ edited: true } as EventInfoEditModalResult);
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
        <Field.Label>Tipo de evento?</Field.Label>
        <Field.Select {...register('eventType')}>
          {eventTypeList.map((eventType) => (
            <Field.SelectOption key={eventType} value={eventType}>
              {(eventTypeLabel as any)[eventType]}
            </Field.SelectOption>
          ))}
        </Field.Select>
        <Field.Error>{errors.eventType?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Data</Field.Label>
        <Field.Input {...register('date')} type="datetime-local" />
        <Field.Error>{errors.date?.message}</Field.Error>
      </Field>

      <Button type="submit">Salvar</Button>
    </form>
  );
}
