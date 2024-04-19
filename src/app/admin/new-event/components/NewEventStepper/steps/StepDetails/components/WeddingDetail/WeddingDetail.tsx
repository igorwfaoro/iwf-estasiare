import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '../../../../../../../../../components/Button/Button';
import Field from '../../../../../../../../../components/Field/Field';
import { useNewEventContext } from '../../../../../../contexts/NewEventContext';

interface WeddingDetailProps {
  index: number;
}

const formWeddingDetailSchema = z.object({
  groomName: z.string().min(1, 'Informe o nome do noivo'),
  brideName: z.string().min(1, 'Informe o nome da noiva')
});

type FormWeddingDetailSchema = z.infer<typeof formWeddingDetailSchema>;

export default function WeddingDetail({ index }: WeddingDetailProps) {
  const {
    setEventCreateData,
    eventCreateData,
    setStepComplete,
    stepPrev,
    stepNext
  } = useNewEventContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormWeddingDetailSchema>({
    resolver: zodResolver(formWeddingDetailSchema)
  });

  useEffect(() => {
    if (eventCreateData?.weddingDetail?.groomName) {
      setValue('groomName', eventCreateData.weddingDetail.groomName);
      setValue('brideName', eventCreateData.weddingDetail.brideName);
    }
  }, []);

  const handleFormSubmit = (data: FormWeddingDetailSchema) => {
    setEventCreateData((curr) => ({
      ...curr,
      weddingDetail: {
        groomName: data.groomName,
        brideName: data.brideName
      }
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
        <Field.Label>Nome do Noivo</Field.Label>
        <Field.Input {...register('groomName')} />
        <Field.Error>{errors.groomName?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Nome da Noiva</Field.Label>
        <Field.Input {...register('brideName')} />
        <Field.Error>{errors.brideName?.message}</Field.Error>
      </Field>

      <div className="flex justify-between">
        <Button theme="light" type="button" onClick={stepPrev}>
          Voltar
        </Button>
        <Button type="submit">Próximo</Button>
      </div>
    </form>
  );
}
