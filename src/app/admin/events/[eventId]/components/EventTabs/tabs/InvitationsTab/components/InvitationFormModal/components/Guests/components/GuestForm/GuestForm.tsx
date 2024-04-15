import Card from '../../../../../../../../../../../../../../components/Card/Card';
import z from 'zod';
import {
  guestStatusLabel,
  guestStatusList
} from '../../../../../../../../../../../../../../util/helpers/guest-status.helper';
import { InvitationFormGuest } from '../../../../types/invitation-form-guest';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Field from '../../../../../../../../../../../../../../components/Field/Field';
import Button from '../../../../../../../../../../../../../../components/Button/Button';
import { GuestStatus } from '@prisma/client';
import { useEffect } from 'react';

const formSchema = z.object({
  name: z.string().min(1, 'Informe o nome'),
  status: z
    .enum(guestStatusList as any, {
      required_error: 'Informe o status'
    })
    .default('PENDING' as GuestStatus)
});

type FormSchema = z.infer<typeof formSchema>;

interface GuestFormProps {
  guest?: InvitationFormGuest;
  handleSave: (guest: InvitationFormGuest) => void;
  handleCancel: () => void;
}

export default function GuestForm({
  guest,
  handleSave,
  handleCancel
}: GuestFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    if (guest) {
      setValue('name', guest.name);
      setValue('status', guest.status);
    } else {
      setFocus('name');
    }
  });

  const handleFormSubmit = (data: FormSchema) => {
    handleSave({
      id: guest?.id,
      name: data.name,
      status: data.status
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Card className="flex flex-col md:flex-row gap-1 md:gap-3 md:justify-between bg-white p-3">
        <div className="flex gap-3 w-full">
          <Field className="w-full">
            <Field.Input
              {...register('name')}
              placeholder="Nome"
              className="border border-gray-500 h-8 py-1"
            />
            {errors.name && <Field.Error>{errors.name.message}</Field.Error>}
          </Field>

          <Field className="w-full md:w-64">
            <Field.Select {...register('status')} className="h-8 py-1">
              {guestStatusList.map((item) => (
                <Field.SelectOption key={item} value={item}>
                  {(guestStatusLabel as any)[item]}
                </Field.SelectOption>
              ))}
            </Field.Select>
            {errors.status && (
              <Field.Error>{errors.status.message}</Field.Error>
            )}
          </Field>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            className="h-8 py-1 bg-transparent border border-gray-300 text-gray-600"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="h-8 py-1 bg-transparent border border-primary text-primary"
          >
            Salvar
          </Button>
        </div>
      </Card>
    </form>
  );
}
