import Button from '../../../../../../../../components/Button/Button';
import Card from '../../../../../../../../components/Card/Card';
import Field from '../../../../../../../../components/Field/Field';
import Skeleton from '../../../../../../../../components/Skeleton/Skeleton';
import { useAdminEventPageContext } from '../../../../contexts/AdminEventPageContext';
import InvitationItem from './components/InvitationItem/InvitationItem';
import { useInvitationsTabContext } from './contexts/InvitationsTabContext';

interface InvitationsTabProps {}

export default function InvitationsTab({}: InvitationsTabProps) {
  const { event } = useAdminEventPageContext();

  const {
    search,
    setSearch,
    isLoading,
    remove,
    filteredInvitations,
    openForm,
    totalGuestsCount,
    totalGuestsConfirmed
  } = useInvitationsTabContext();

  const renderLoading = () => (
    <div className="space-y-3">
      <Skeleton className="h-4 w-52 rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-3">
            <Skeleton className="h-5 w-52 rounded-xl" />
          </Card>
        ))}
      </div>
    </div>
  );

  const enableHeader = !!event && !isLoading;

  const totalGuestsConfirmedText = `${totalGuestsConfirmed}/${totalGuestsCount} confirmados`;

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

      {!event || isLoading ? (
        renderLoading()
      ) : (
        <div className="space-y-3">
          <div className="text-gray-500 text-sm">
            {totalGuestsConfirmedText}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredInvitations.length ? (
              filteredInvitations.map((invitation) => (
                <InvitationItem
                  key={invitation.id}
                  invitation={invitation}
                  handleEdit={() => openForm(invitation.id)}
                  handleDelete={() => remove(invitation.id)}
                />
              ))
            ) : (
              <div>Nenhum convite encontrado</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
