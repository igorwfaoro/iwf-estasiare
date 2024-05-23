import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '../../../../../../../../../../components/Button/Button';
import Field from '../../../../../../../../../../components/Field/Field';
import { Place } from '../../../../../../../../../../components/Field/components/FieldInputAddressAutocomplete/types/place';
import { useLoader } from '../../../../../../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../../../../../../contexts/ToastContext';
import { createEventClientService } from '../../../../../../../../../../services/client/event.client-service';
import { EditModalProps } from '../../types/edit-modal-props';
import { EditModalResult } from '../../types/edit-modal-result';

interface EventAddressEditModalProps extends EditModalProps {}
interface EventAddressEditModalResult extends EditModalResult {}

const formSchema = z.object({
  address: z
    .any()
    .refine(
      (value: Place) => !!value?.formattedAddress,
      'Informe a data do evento'
    )
});

type FormSchema = z.infer<typeof formSchema>;

export default function EventAddressEditModal({
  event,
  modalRef
}: EventAddressEditModalProps) {
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
    setValue('address', event.address);
  }, []);

  const handleFormSubmit = (data: FormSchema) => {
    loader.show();

    eventClientService
      .update(event.id, {
        inputData: {
          address: data.address
        }
      })
      .then(() => {
        toast.open('Salvo', 'success');
        modalRef.close({ edited: true } as EventAddressEditModalResult);
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
        <Field.Label>Onde vai ser?</Field.Label>
        <Field.AddressAutocomplete
          defaultPlaceValue={event.address as Place}
          onAddressSelected={(value) => setValue('address', value)}
        />
        <Field.Error>{errors.address?.message}</Field.Error>
      </Field>

      <Button type="submit">Salvar</Button>
    </form>
  );
}
