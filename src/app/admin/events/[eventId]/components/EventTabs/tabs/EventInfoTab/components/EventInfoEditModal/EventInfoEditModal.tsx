import { z } from 'zod';
import { ModalRefPropType } from '../../../../../../../../../../contexts/ModalContext';
import { EventDetailViewModel } from '../../../../../../../../../../models/view-models/event-detail.view-model';
import {
  eventTypeLabel,
  eventTypeList
} from '../../../../../../../../../../util/helpers/event-type.helper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import Field from '../../../../../../../../../../components/Field/Field';
import Button from '../../../../../../../../../../components/Button/Button';
import { createEventClientService } from '../../../../../../../../../../services/client/event.client-service';
import { useLoader } from '../../../../../../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../../../../../../contexts/ToastContext';
import { dateStringToInput } from '../../../../../../../../../../util/helpers/date.helper';

export interface EventInfoEditModalProps extends ModalRefPropType {
  event: EventDetailViewModel;
}

export interface EventInfoEditModalResult {
  edited?: boolean;
}

const formGeneralSchema = z.object({
  eventType: z.enum(eventTypeList as any, {
    required_error: 'Informe o tipo do evento'
  }),
  date: z.string().min(1, 'Informe a data do evento')
});

type FormGeneralSchema = z.infer<typeof formGeneralSchema>;

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
  } = useForm<FormGeneralSchema>({
    resolver: zodResolver(formGeneralSchema)
  });

  useEffect(() => {
    setValue('eventType', event.eventType);
    setValue('date', dateStringToInput(event.date));
  }, []);

  const handleFormSubmit = (data: FormGeneralSchema) => {
    loader.show();

    eventClientService
      .update(event.id, {
        eventType: data.eventType,
        date: data.date
      })
      .then(() => {
        toast.open('Evento editado', 'success');
        modalRef.close({ edited: true });
      })
      .catch((error) => {
        toast.open('Erro ao editar evento', 'error');
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
