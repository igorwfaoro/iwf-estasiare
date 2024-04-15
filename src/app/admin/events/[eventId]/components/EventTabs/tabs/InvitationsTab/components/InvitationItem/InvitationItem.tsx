import { MdDelete, MdEdit } from 'react-icons/md';
import Card from '../../../../../../../../../../components/Card/Card';
import { InvitationViewModel } from '../../../../../../../../../../models/view-models/invitation.view-model';

interface InvitationItemProps {
  invitation: InvitationViewModel;
  handleEdit: () => void;
  handleDelete: () => void;
}

export default function InvitationItem({
  invitation,
  handleEdit,
  handleDelete
}: InvitationItemProps) {
  const guestsConfirmedText = `${invitation.guestsConfirmed}/${invitation.guestsCount} confirmados`;

  return (
    <Card className="flex gap-2 cursor-pointer bg-white" onClick={handleEdit}>
      <div className="flex justify-between w-full p-2 gap-2">
        <div>
          <h1 className="font-bold">{invitation.description}</h1>
        </div>

        <div className="flex gap-2 text-xl ml-3 items-center">
          <span className='text-sm text-nowrap'>{guestsConfirmedText}</span>

          <button onClick={handleEdit}>
            <MdEdit />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </Card>
  );
}
