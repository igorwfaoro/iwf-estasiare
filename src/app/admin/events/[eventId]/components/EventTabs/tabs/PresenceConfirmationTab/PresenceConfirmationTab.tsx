import Button from '../../../../../../../../components/Button/Button';
import Card from '../../../../../../../../components/Card/Card';
import Field from '../../../../../../../../components/Field/Field';
import Skeleton from '../../../../../../../../components/Skeleton/Skeleton';
import InvitationItem from './components/InvitationItem/InvitationItem';
import { usePresenceConfirmationTabContext } from './contexts/PresenceConfirmationTabContext';

interface PresenceConfirmationTabProps {}

export default function PresenceConfirmationTab({}: PresenceConfirmationTabProps) {
  const {
    search,
    setSearch,
    isLoading,
    remove,
    filteredInvitations,
    openForm
  } = usePresenceConfirmationTabContext();

  const renderLoading = () =>
    Array.from({ length: 6 }).map((_, i) => (
      <Card key={i} className="flex gap-2">
        <Skeleton className="h-20 w-28 bg-center bg-cover rounded-xl m-3" />
        <div className="space-y-2 p-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
      </Card>
    ));

  const enableHeader = !isLoading;

  return (
    <>
      <div className="mb-4 flex justify-between gap-2 w-full">
        <Field.Input
          placeholder="Digite sua busca"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          containerClassName="w-full"
          handleClickSearchButton={() => true}
          disabled={!enableHeader}
        />

        <Button
          onClick={() => openForm()}
          className="px-4 md:px-10"
          disabled={!enableHeader}
        >
          Novo
        </Button>
      </div>

      {isLoading ? (
        renderLoading()
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredInvitations.map((invitation) => (
            <InvitationItem
              key={invitation.id}
              invitation={invitation}
              handleEdit={() => openForm(invitation.id)}
              handleDelete={() => remove(invitation.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
