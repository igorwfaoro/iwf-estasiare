import { KeyboardEvent, useState } from 'react';
import Button from '../../../../../../../../../components/Button/Button';
import Field from '../../../../../../../../../components/Field/Field';
import { usePresenceConfirmationContext } from '../../../../contexts/PresenceConfirmationContext';
import Card from '../../../../../../../../../components/Card/Card';
import { InvitationDetailViewModel } from '../../../../../../../../../models/view-models/invitation-detail.view-model';

export default function InvitationSearch() {
  const {
    searchInvitations,
    gettingInvitations,
    selectInvitation,
    isAlreadyConfirmed,
    event,
    invitations
  } = usePresenceConfirmationContext();

  const [invitationDescriptionValue, setInvitationDescriptionValue] =
    useState<string>();

  const [alreadyTrySearch, setAlreadyTrySearch] = useState(false);

  const inputErrorMessage =
    alreadyTrySearch && !invitationDescriptionValue
      ? 'Busque pelo seu nome'
      : null;

  const handleSearchInvitation = () => {
    setAlreadyTrySearch(true);

    if (!invitationDescriptionValue) return;

    searchInvitations(invitationDescriptionValue!);
  };

  const handleInputKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchInvitation();
    }
  };

  const handleSelectInvitation = (invitation: InvitationDetailViewModel) =>
    selectInvitation(invitation);

  const buttonText = gettingInvitations ? 'Procurando...' : 'Procurar';

  if (isAlreadyConfirmed) return <></>;

  return (
    <div className="w-full">
      <Field>
        <Field.Label>Busca</Field.Label>
        <Field.HelpText>Busque por algum nome do convite</Field.HelpText>
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
        onClick={handleSearchInvitation}
        disabled={gettingInvitations}
        theme="primary"
        style={{
          borderColor: event.content?.primaryColor,
          color: event.content?.primaryColor
        }}
      >
        {buttonText}
      </Button>

      <div className='mt-4 space-y-2'>
        {invitations.map((invitation, i) => (
          <Card className="flex items-center justify-between bg-white p-3">
            <div>{invitation.description}</div>
            <Button onClick={() => handleSelectInvitation(invitation)} className='py-1'>
              Selecionar
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
