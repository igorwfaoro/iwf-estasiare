import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '../../../../../../../../../../components/Button/Button';
import Field from '../../../../../../../../../../components/Field/Field';
import { useLoader } from '../../../../../../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../../../../../../contexts/ToastContext';
import { useEventClientService } from '../../../../../../../../../../services/client/event.client-service';
import { onlyNumbers } from '../../../../../../../../../../util/helpers/string.helper';
import { EditModalProps } from '../../types/edit-modal-props';
import { EditModalResult } from '../../types/edit-modal-result';

interface EventContactInfoEditModalProps extends EditModalProps {}
interface EventContactInfoEditModalResult extends EditModalResult {}

const formSchema = z.object({
  description: z.string().optional(),
  phoneNumber: z
    .string()
    .optional()
    .transform((value) => value && onlyNumbers(value)),
  whatsAppNumber: z
    .string()
    .optional()
    .transform((value) => value && onlyNumbers(value)),
  email: z.string().optional()
});

type FormSchema = z.infer<typeof formSchema>;

export default function EventContactInfoEditModal({
  event,
  modalRef
}: EventContactInfoEditModalProps) {
  const eventClientService = useEventClientService();
  const loader = useLoader();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    setValue('description', event.contactInfo?.description || '');
    setValue('phoneNumber', event.contactInfo?.phoneNumber || '');
    setValue('whatsAppNumber', event.contactInfo?.whatsAppNumber || '');
    setValue('email', event.contactInfo?.email || '');
  }, []);

  const handleFormSubmit = (data: FormSchema) => {
    loader.show();

    eventClientService
      .update(event.id, {
        inputData: {
          contactInfo: {
            description: data.description || null,
            phoneNumber:
              (data.phoneNumber && onlyNumbers(data.phoneNumber)) || null,
            whatsAppNumber:
              (data.whatsAppNumber && onlyNumbers(data.whatsAppNumber)) || null,
            email: data.email || null
          }
        }
      })
      .then(() => {
        toast.open('Salvo', 'success');
        modalRef.close({ edited: true } as EventContactInfoEditModalResult);
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
        <Field.Label>Descrição (opcional)</Field.Label>
        <Field.HelpText>Por exemplo: "Contato dos Noivos"</Field.HelpText>
        <Field.Input {...register('description')} />
      </Field>

      <Field>
        <Field.Label>Telefone (opcional)</Field.Label>
        <Field.Input {...register('phoneNumber')} placeholder="11 99999-9999" />
      </Field>

      <Field>
        <Field.Label>WhatsApp (opcional)</Field.Label>
        <Field.HelpText>Deve ser no formato internacional</Field.HelpText>
        <Field.Input
          {...register('whatsAppNumber')}
          placeholder="55 11 99999-9999"
        />
      </Field>

      <Field>
        <Field.Label>E-mail (opcional)</Field.Label>
        <Field.Input {...register('email')} placeholder="username@mail.com" />
        <Field.Error>{errors.email?.message}</Field.Error>
      </Field>

      <Button type="submit">Salvar</Button>
    </form>
  );
}
