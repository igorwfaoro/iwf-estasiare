import { KeyboardEvent, useState } from 'react';
import Button from '../../../../../../../../../components/Button';
import Input from '../../../../../../../../../components/Input';
import './index.scss';
import { usePresenceConfirmationContext } from '../../../../contexts/PresenceConfirmationContext';

export default function InvitationSearch() {
  const { getInvitation, gettingInvitation, isAlreadyConfirmed } =
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
    <div id="invitation-search">
      <Input
        label="Nomes que estão no convite"
        helpText="Escreva exatamente como está escrito no convite"
        inputClassName="input"
        value={invitationDescriptionValue}
        onChange={(e) => setInvitationDescriptionValue(e.target.value)}
        errorMessage={inputErrorMessage}
        onKeyUp={handleInputKeyup}
      />
      <Button
        className="button-search"
        onClick={handleGetInvitation}
        disabled={gettingInvitation}
        theme="primary"
        variant="outlined"
      >
        {buttonText}
      </Button>
    </div>
  );
}
