import { set, z } from 'zod';
import Button from '../../../../../../../components/Button/Button';
import Field from '../../../../../../../components/Field/Field';
import { useNewEventContext } from '../../../../contexts/NewEventContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

interface StepContentProps {
  index: number;
}

const formContentSchema = z.object({
  primaryColor: z.string().min(1, 'Informe a cor principal do evento'),
  bannerImage: z.string().min(1, 'Informe a imagem do banner do evento'),
  logoImage: z.string().optional()
});

type FormContentSchema = z.infer<typeof formContentSchema>;

export default function StepContent({ index }: StepContentProps) {
  const {
    stepNext,
    stepPrev,
    setEventCreateData,
    eventCreateData,
    setStepComplete
  } = useNewEventContext();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setValue,
    getValues
  } = useForm<FormContentSchema>({
    resolver: zodResolver(formContentSchema)
  });

  useEffect(() => {
    if (eventCreateData?.content?.primaryColor) {
      setValue('primaryColor', eventCreateData.content.primaryColor);
      setValue('bannerImage', eventCreateData.content.bannerImage);
      setValue('logoImage', eventCreateData.content.logoImage);
    }
  }, []);

  const handleFormSubmit = (data: FormContentSchema) => {
    setEventCreateData((curr) => ({
      ...curr,
      content: {
        primaryColor: data.primaryColor,
        bannerImage: data.bannerImage,
        logoImage: data.logoImage
      }
    }));

    setStepComplete(index);
    stepNext();
  };

  const color = getValues().primaryColor;

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mt-4 flex flex-col gap-2"
    >
      <Field>
        <Field.Label>Qual é a cor principal do seu evento?</Field.Label>
        <div className="flex items-center gap-2">
          <Field.Input {...register('primaryColor')} type="color" />
          {dirtyFields.primaryColor && color && (
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: color }}
            />
          )}
        </div>
        <Field.Error>{errors.primaryColor?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Escolha uma imagem para seu evento - URL da Imagem</Field.Label>
        <Field.Input {...register('bannerImage')} />
        <Field.Error>{errors.bannerImage?.message}</Field.Error>
      </Field>

      <Field>
        <Field.Label>Escolha uma logo para seu evento - URL da Imagem (opcional)</Field.Label>
        <Field.Input {...register('logoImage')} />
        <Field.Error>{errors.logoImage?.message}</Field.Error>
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
