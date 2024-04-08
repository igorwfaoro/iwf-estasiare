import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import Field from '../../../../../../../../../../components/Field/Field';
import Button from '../../../../../../../../../../components/Button/Button';
import { ModalRefPropType } from '../../../../../../../../../../contexts/ModalContext';
import { EventFinancialViewModel } from '../../../../../../../../../../models/view-models/event-financial.view-model';

export interface GiftFinancialInfoModalProps extends ModalRefPropType {
  financial: EventFinancialViewModel;
}

export interface GiftFinancialInfoModalResult {
  financial?: {
    paypalBusinessCode: string;
  };
}

const formSchema = z.object({
  paypalBusinessCode: z.string().min(1, 'Obrigatório')
});

type FormSchema = z.infer<typeof formSchema>;

export default function GiftFinancialInfoModal({
  financial,
  modalRef
}: GiftFinancialInfoModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    if (financial) {
      setValue('paypalBusinessCode', financial.paypalBusinessCode || '');
    }
  }, []);

  const handleFormSubmit = (data: FormSchema) => {
    modalRef.close({
      financial: data
    } as GiftFinancialInfoModalResult);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
