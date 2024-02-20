import { KeyboardEvent, useState } from 'react';
import Button from '../../../../../../../../../components/Button/Button';
import Field from '../../../../../../../../../components/Field/Field';
import { usePresenceConfirmationContext } from '../../../../contexts/PresenceConfirmationContext';

export default function InvitationSearch() {
  const { getInvitation, gettingInvitation, isAlreadyConfirmed, event } =
    usePresenceConfirmationContext();

  const [invitationDescriptionValue, setInvitationDescriptionValue] =
    useState<string>();
  const [alreadyTrySearch, setAlreadyTrySearch] = useState(false);

  const inputErrorMessage =
    alreadyTrySearch && !invitationDescriptionValue
      ? 'Insira a descrição do convite'
      : null;

  const handleGetInvitation = () => {
    setAlreadyTrySearch(true);

    if (!invitationDescriptionValue) return;

    getInvitation(invitationDescriptionValue!);
  };

  const handleInputKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGetInvitation();
    }
  };

  const buttonText = gettingInvitation ? 'Procurando...' : 'Procurar';

  if (isAlreadyConfirmed) return <></>;

  return (
    <div className="w-full">
      <Field>
        <Field.Label>Nomes que estão no convite</Field.Label>
        <Field.HelpText>
          Escreva exatamente como está escrito no convite
        </Field.HelpText>
        <Field.Input
          className="text-xl p-3 font-bold"
          value={invitationDescriptionValue}
          onChange={(e) => setInvitationDescriptionValue(e.target.value)}
          onKeyUp={handleInputKeyup}
        />
        {inputErrorMessage && <Field.Error>{inputErrorMessage}</Field.Error>}
      </Field>

      <Button
        className="w-full bg-transparent border"
        onClick={handleGetInvitation}
        disabled={gettingInvitation}
        theme="primary"
        style={{
          borderColor: event.content?.primaryColor,
          color: event.content?.primaryColor
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
}
