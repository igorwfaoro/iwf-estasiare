import { MdDelete, MdEdit } from 'react-icons/md';
import { EventHandbookViewModel } from '../../../../../../../../../../models/view-models/event-handbook.view-model';
import Card from '../../../../../../../../../../components/Card/Card';

interface HandbookItemProps {
  handbook: EventHandbookViewModel;
  handleEdit: (handbook: EventHandbookViewModel) => void;
  handleDelete: (handbook: EventHandbookViewModel) => void;
}

export default function HandbookItem({
  handbook,
  handleEdit,
  handleDelete
}: HandbookItemProps) {
  return (
    <Card key={handbook.id} className="flex justify-between w-full p-2">
      <div>
        <h1 className="font-bold">{handbook.title}</h1>
        <div>{handbook.description}</div>
      </div>

      <div className="flex gap-1 text-xl ml-3 items-start">
        <button onClick={() => handleEdit(handbook)}>
          <MdEdit />
        </button>
        <button onClick={() => handleDelete(handbook)}>
          <MdDelete />
        </button>
      </div>
    </Card>
  );
}
