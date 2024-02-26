import Button from '../../../../../../../components/Button/Button';
import Field from '../../../../../../../components/Field/Field';
import { useNewEventContext } from '../../../../contexts/NewEventContext';
import { EventFormGeneralSchema } from '../../../../forms/general';

interface StepAddressProps {}

export default function StepAddress({}: StepAddressProps) {
  const {
    formGeneral: {
      register,
      formState: { errors },
      handleSubmit
    },
    stepNext
  } = useNewEventContext();

  const handleFormSubmit = (data: EventFormGeneralSchema) => {
    console.log(data);
    stepNext();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mt-4 flex flex-col gap-2"
    >
      <Field>
        <Field.Label>Onde vai ser?</Field.Label>
        <Field.Input {...register('address')} />
        <Field.Error>{errors.address?.message}</Field.Error>
      </Field>

      <Button type="submit">Próximo</Button>
    </form>
  );
}
