import { z } from 'zod';
import { eventTypeList } from '../../../../util/helpers/event-type.helper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const eventFormGeneralSchema = z.object({
  type: z.enum(eventTypeList as any, {
    required_error: 'Informe o tipo do evento'
  }),
  date: z.string({ required_error: 'Informe a data do evento' }),
  address: z.string({ required_error: 'Informe o endereço do evento' })
});

export type EventFormGeneralSchema = z.infer<typeof eventFormGeneralSchema>;

export const eventFormGeneralUseForm = () =>
  useForm<EventFormGeneralSchema>({
    resolver: zodResolver(eventFormGeneralSchema)
  });
