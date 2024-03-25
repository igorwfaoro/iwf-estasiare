import { z } from 'zod';
import Button from '../../../../../../../components/Button/Button';
import Field from '../../../../../../../components/Field/Field';
import {
  eventTypeLabel,
  eventTypeList
} from '../../../../../../../util/helpers/event-type.helper';
import { useNewEventContext } from '../../../../contexts/NewEventContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { dateStringToInput } from '../../../../../../../util/helpers/date.helper';

interface StepGeneralProps {
  index: number;
}

const formGeneralSchema = z.object({
  eventType: z.enum(eventTypeList as any, {
    required_error: 'Informe o tipo do evento'
  }),
  date: z.string().min(1, 'Informe a data do evento'),
  address: z.string().min(1, 'Informe a data do evento')
});

type FormGeneralSchema = z.infer<typeof formGeneralSchema>;

export default function StepGeneral({ index }: StepGeneralProps) {
  const { stepNext, setEventCreateData, eventCreateData, setStepComplete } =
    useNewEventContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormGeneralSchema>({
    resolver: zodResolver(formGeneralSchema)
  });

  const [addressInitialValue, setAddressInitialValue] = useState('');

  useEffect(() => {
    if (eventCreateData?.date) {
      setValue('eventType', eventCreateData.eventType);
      setValue('date', dateStringToInput(eventCreateData.date));

      setValue('address', eventCreateData.address || '');
      setAddressInitialValue(eventCreateData.address || '');
    }
  }, []);

  const handleFormSubmit = (data: FormGeneralSchema) => {
    setEventCreateData((curr) => ({
      ...curr,
      eventType: data.eventType,
      date: data.date,
      address: data.address
    }));

    setStepComplete(index);
    stepNext();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mt-4 flex flex-col gap-2"
    >
      <Field>
        <Field.Label>Qual é o tipo do seu evento?</Field.Label>
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
        <Field.Label>Quando vai ser?</Field.Label>
        <Field.Input {...register('date')} type="datetime-local" />
        <Field.Error>{errors.date?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Onde vai ser?</Field.Label>
        <Field.AddressAutocomplete
          initialValue={addressInitialValue}
          onAddressSelected={(value) => setValue('address', value)}
        />
        <Field.Error>{errors.address?.message}</Field.Error>
      </Field>

      <Button type="submit">Próximo</Button>
    </form>
  );
}
