import { Dispatch, SetStateAction, useState } from 'react';
import { InvitationFormGuest } from '../../types/invitation-form-guest';
import { MdDelete, MdEdit } from 'react-icons/md';
import GuestForm from './components/GuestForm/GuestForm';
import Card from '../../../../../../../../../../../../components/Card/Card';
import Chip from '../../../../../../../../../../../../components/Chip/Chip';
import {
  guestStatusColor,
  guestStatusLabel
} from '../../../../../../../../../../../../util/helpers/guest-status.helper';
import { FaPlusCircle } from 'react-icons/fa';

interface GuestsProps {
  guests: InvitationFormGuest[];
  setGuests: Dispatch<SetStateAction<InvitationFormGuest[]>>
}

export default function Guests({ guests, setGuests }: GuestsProps) {
  const [guestFormIndex, setGuestFormIndex] = useState<number | null>(null);
  const [showFormNew, setShowFormNew] = useState(false);

  const handleEdit = (index: number) => {
    setGuestFormIndex(index);
  };

  const handleDelete = (guest: InvitationFormGuest) => {
    setGuests(guests.filter((g) => g.id !== guest.id));
  };

  const handleSave = (guest: InvitationFormGuest) => {
    if (guest.id) {
      setGuests(prev => prev.map((g) => (g.id === guest.id ? guest : g)));
    } else {
      setGuests(prev => [...prev, guest]);
    }

    setGuestFormIndex(null);
    setShowFormNew(false);
  };

  return (
    <div className="py-2">
      <h2 className="text-xl font-bold">Convidados</h2>

      <div className="space-y-1">
        {guests.map((guest, i) => (
          <div key={i}>
            {guestFormIndex === i ? (
              <GuestForm
                guest={guest}
                handleSave={handleSave}
                handleCancel={() => setGuestFormIndex(null)}
              />
            ) : (
              <Card className="flex justify-between items-center bg-white p-3">
                <span className="w-full">{guest.name}</span>

                <div className="w-full md:w-52">
                  <Chip
                    className="text-white"
                    style={{ backgroundColor: guestStatusColor[guest.status] }}
                  >
                    {guestStatusLabel[guest.status]}
                  </Chip>
                </div>

                <div className="flex gap-1 text-xl ml-3 items-start">
                  <button onClick={() => handleEdit(i)}>
                    <MdEdit />
                  </button>
                  <button onClick={(e) => handleDelete(guest)}>
                    <MdDelete />
                  </button>
                </div>
              </Card>
            )}
          </div>
        ))}

        <div>
          {showFormNew ? (
            <GuestForm
              handleSave={handleSave}
              handleCancel={() => setGuestFormIndex(null)}
            />
          ) : (
            <div
              className="flex items-center gap-1 underline cursor-pointer"
              onClick={() => setShowFormNew(true)}
            >
              <FaPlusCircle />
              <span>Adicionar convidado</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
