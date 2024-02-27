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
  date: z.string().min(1, 'Informe a data do evento'),
  address: z.string().min(1, 'Informe o endereço')
});

type FormGeneralSchema = z.infer<typeof formGeneralSchema>;

export default function EventInfoEditModal({
  event,
  modalRef
}: EventInfoEditModalProps) {
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
    setValue('date', event.date as string);
    setValue('address', event.address?.fullDescription || '');
  }, []);

  const handleFormSubmit = (data: FormGeneralSchema) => {
    console.log(data);
    console.log('TODO: save');
    modalRef.close({ edited: true });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mt-4 flex flex-col gap-2"
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

      <Field>
        <Field.Label>Local</Field.Label>
        <Field.Input {...register('address')} />
        <Field.Error>{errors.address?.message}</Field.Error>
      </Field>

      <Button type="submit">Salvar</Button>
    </form>
  );
}
