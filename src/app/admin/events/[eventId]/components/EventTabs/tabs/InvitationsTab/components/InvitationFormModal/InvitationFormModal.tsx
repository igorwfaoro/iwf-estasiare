import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import Field from '../../../../../../../../../../components/Field/Field';
import Button from '../../../../../../../../../../components/Button/Button';
import { ModalRefPropType } from '../../../../../../../../../../contexts/ModalContext';
import { InvitationInputModel } from '../../../../../../../../../../models/input-models/invitation-create.input-model';
import { InvitationFormGuest } from './types/invitation-form-guest';
import Guests from './components/Guests/Guests';
import { InvitationDetailViewModel } from '../../../../../../../../../../models/view-models/invitation-detail.view-model';
import { useToast } from '../../../../../../../../../../contexts/ToastContext';
import { usePrevious } from '@uidotdev/usehooks';
import { arrayEquals } from '../../../../../../../../../../util/helpers/array.helper';

export interface InvitationFormModalProps extends ModalRefPropType {
  invitation?: InvitationDetailViewModel;
}

export interface InvitationFormModalResult {
  invitation: InvitationInputModel;
}

const formSchema = z.object({
  description: z.string().min(1, 'Informe a descrição')
});

type FormSchema = z.infer<typeof formSchema>;

export default function InvitationFormModal({
  invitation,
  modalRef
}: InvitationFormModalProps) {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  const [guests, setGuests] = useState<InvitationFormGuest[]>([]);
  const previousGuests = usePrevious(guests);

  useEffect(() => {
    if (invitation) {
      setValue('description', invitation.description);
      setGuests(invitation.guests || []);
    }
  }, []);

  useEffect(() => {
    setDescriptionByGuests();
  }, [guests]);

  const setDescriptionByGuests = () => {
    if (!previousGuests) return;

    const guestsNamesHasChanges = !arrayEquals(
      previousGuests.map((g) => g.name),
      guests.map((g) => g.name)
    );

    if (!guestsNamesHasChanges) return;

    let text = '';

    if (guests.length === 1) {
      text = guests[0].name.split(' ')[0];
    } else {
      const names = guests.map((g) => g.name.split(' ')[0]);

      const firstPart = names.slice(0, -1).join(', ');
      const lastPart = names[names.length - 1];

      text = `${firstPart} e ${lastPart}`;
    }

    setValue('description', text);
  };

  const handleFormSubmit = (data: FormSchema) => {
    if (!guests.length) {
      toast.open('Informe pelo menos um convidado', 'error');
      return;
    }

    modalRef.close({
      invitation: {
        ...data,
        guests
      }
    } as InvitationFormModalResult);
  };

  return (
    <div>
      <Guests guests={guests} setGuests={setGuests} />
      <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-4">
        <Field>
          <Field.Label>Descrição</Field.Label>
          <Field.Input {...register('description')} />
          <Field.Error>{errors.description?.message}</Field.Error>
        </Field>

        <div className="flex justify-end">
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </div>
  );
}
