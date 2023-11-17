import { KeyboardEvent, useState } from 'react';
import Button from '../../../../../../../../../components/Button';
import Input from '../../../../../../../../../components/Input';
import './index.scss';
import { usePresenceConfirmationContext } from '../../../../contexts/PresenceConfirmationContext';

export default function InvitationSearch() {
  const { getInvitationByCode, gettingInvitation, isAlreadyConfirmed } =
    usePresenceConfirmationContext();

  const [invitationCodeValue, setInvitationCodeValue] = useState<string>();
  const [alreadyTrySearch, setAlreadyTrySearch] = useState(false);

  const inputErrorMessage =
    alreadyTrySearch && !invitationCodeValue
      ? 'Insira o código do convite'
      : null;

  const handleGetInvitation = () => {
    setAlreadyTrySearch(true);

    if (!invitationCodeValue) return;

    getInvitationByCode(invitationCodeValue!);
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
        label="Código do convite"
        inputClassName="input"
        type="number"
        value={invitationCodeValue}
        onChange={(e) => setInvitationCodeValue(e.target.value)}
        errorMessage={inputErrorMessage}
        onKeyUp={handleInputKeyup}
        placeholder="Digite o código"
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
