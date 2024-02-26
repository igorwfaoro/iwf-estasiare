import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const eventFormDetailWeddingSchema = z.object({
  a: z.string(),
  b: z.string()
});

export type EventFormDetailWeddingSchema = z.infer<
  typeof eventFormDetailWeddingSchema
>;

export const eventFormDetailWeddingUseForm = () =>
  useForm<EventFormDetailWeddingSchema>({
    resolver: zodResolver(eventFormDetailWeddingSchema)
  });
