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

interface StepGeneralProps {}

const formGeneralSchema = z.object({
  type: z.enum(eventTypeList as any, {
    required_error: 'Informe o tipo do evento'
  }),
  date: z.string({ required_error: 'Informe a data do evento' }),
  address: z.string({ required_error: 'Informe o endereço do evento' })
});

type FormGeneralSchema = z.infer<typeof formGeneralSchema>;

export default function StepGeneral({}: StepGeneralProps) {
  const { stepNext } = useNewEventContext();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormGeneralSchema>({
    resolver: zodResolver(formGeneralSchema)
  });

  const handleFormSubmit = (data: FormGeneralSchema) => {
    console.log(data);
    stepNext();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mt-4 flex flex-col gap-2"
    >
      <Field>
        <Field.Label>Qual é o tipo do seu evento?</Field.Label>
        <Field.Select {...register('type')}>
          {eventTypeList.map((eventType) => (
            <Field.SelectOption key={eventType}>
              {(eventTypeLabel as any)[eventType]}
            </Field.SelectOption>
          ))}
        </Field.Select>
        <Field.Error>{errors.type?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Quando vai ser?</Field.Label>
        <Field.Input {...register('date')} type="datetime-local" />
        <Field.Error>{errors.date?.message}</Field.Error>
      </Field>

      <Button type="submit">Próximo</Button>
    </form>
  );
}
