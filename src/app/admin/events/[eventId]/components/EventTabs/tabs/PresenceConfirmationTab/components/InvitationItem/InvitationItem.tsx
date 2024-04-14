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
  return (
    <Card className="flex gap-2 cursor-pointer bg-white" onClick={handleEdit}>
      <div className="flex justify-between w-full p-2">
        <div>
          <h1 className="font-bold">{invitation.description}</h1>
        </div>

        <div className="flex gap-1 text-xl ml-3 items-start">
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
