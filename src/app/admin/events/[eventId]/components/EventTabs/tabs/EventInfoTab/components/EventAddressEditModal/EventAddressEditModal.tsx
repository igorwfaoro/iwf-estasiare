import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import Field from '../../../../../../../../../../components/Field/Field';
import Button from '../../../../../../../../../../components/Button/Button';
import { createEventClientService } from '../../../../../../../../../../services/client/event.client-service';
import { useLoader } from '../../../../../../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../../../../../../contexts/ToastContext';
import { EditModalResult } from '../../types/edit-modal-result';
import { EditModalProps } from '../../types/edit-modal-props';
import useAddressAutocomplete from '../../../../../../../../../../hooks/useAddressAutocomplete';

interface EventAddressEditModalProps extends EditModalProps {}
interface EventAddressEditModalResult extends EditModalResult {}

const formSchema = z.object({
  address: z.string().min(1, 'Informe o endereço do evento')
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

  const { ref: addressAutocompleteRef } =
    useAddressAutocomplete<HTMLInputElement>({
      onPlaceSelected: (place: { formatted_address: string }) =>
        setValue('address', place.formatted_address)
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
        <Field.Input ref={addressAutocompleteRef} />
        <Field.Error>{errors.address?.message}</Field.Error>
      </Field>

      <Button type="submit">Salvar</Button>
    </form>
  );
}
