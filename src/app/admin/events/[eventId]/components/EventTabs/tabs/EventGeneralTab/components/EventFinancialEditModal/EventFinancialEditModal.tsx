import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import Field from '../../../../../../../../../../components/Field/Field';
import Button from '../../../../../../../../../../components/Button/Button';
import { createEventClientService } from '../../../../../../../../../../services/client/event.client-service';
import { useLoader } from '../../../../../../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../../../../../../contexts/ToastContext';
import { EditModalProps } from '../../types/edit-modal-props';
import { EditModalResult } from '../../types/edit-modal-result';

export interface EventFinancialEditModalProps extends EditModalProps {}
export interface EventFinancialEditModalResult extends EditModalResult {}

const formSchema = z.object({
  paypalBusinessCode: z.string().min(1, 'Informe o código')
});

type FormSchema = z.infer<typeof formSchema>;

export default function EventFinancialEditModal({
  event,
  modalRef
}: EventFinancialEditModalProps) {
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
    if (event.financial) {
      setValue('paypalBusinessCode', event.financial.paypalBusinessCode || '');
    }
  }, []);

  const handleFormSubmit = (data: FormSchema) => {
    loader.show();

    eventClientService
      .update(event.id, {
        inputData: {
          financial: { paypalBusinessCode: data.paypalBusinessCode }
        }
      })
      .then(() => {
        toast.open('Salvo', 'success');
        modalRef.close({ edited: true } as EventFinancialEditModalResult);
      })
      .catch((error) => {
        toast.open('Erro ao salvar', 'error');
        console.error(error);
      })
      .finally(() => loader.hide());
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="my-4 space-y-4">
      <div>
        Os valores recebidos vão para sua conta do Paypal. Você deve criar uma
        conta ou usar uma já existente.
      </div>

      <Field>
        <Field.Label>Código de Recebimento do Paypal</Field.Label>
        <Field.HelpText>
          Normalmente o código é o e-mail da conta
        </Field.HelpText>
        <Field.Input {...register('paypalBusinessCode')} />
        <Field.Error>{errors.paypalBusinessCode?.message}</Field.Error>
      </Field>

      <div className="flex justify-end">
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
