'use client';

import { useEffect, useState } from 'react';
import { EventDetailViewModel } from '../../../../../../../../models/view-models/event-detail.view-model';
import { useToast } from '../../../../../../../../contexts/ToastContext';
import { createEventClientService } from '../../../../../../../../services/client/event.client-service';
import EventCardInfo from '../../components/EventCardInfo/EventCardInfo';
import { eventTypeLabel } from '../../../../../../../../util/helpers/event-type.helper';
import dayjs from 'dayjs';
import Skeleton from '../../../../../../../../components/Skeleton/Skeleton';
import { useModal } from '../../../../../../../../contexts/ModalContext';
import EventInfoEditModal, {
  EventInfoEditModalProps,
  EventInfoEditModalResult
} from './components/EventInfoEditModal/EventInfoEditModal';

interface EventInfoTabProps {
  eventId: number;
}

export default function EventInfoTab({ eventId }: EventInfoTabProps) {
  const toast = useToast();
  const modal = useModal();
  const eventService = createEventClientService();

  const [event, setEvent] = useState<EventDetailViewModel>();
  const [eventIsLoading, setEventIsLoading] = useState(false);

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = () => {
    setEventIsLoading(true);
    eventService
      .getById(eventId)
      .then(setEvent)
      .catch((error) => {
        toast.open('Erro ao carregar evento', 'error');
        console.error(error);
      })
      .finally(() => setEventIsLoading(false));
  };

  const openEditModal = () => {
    modal.open({
      component: EventInfoEditModal,
      title: 'Editar evento',
      props: { event } as EventInfoEditModalProps,
      onClose: (result: EventInfoEditModalResult | undefined) => {
        if (result?.edited) {
          getEvent();
        }
      }
    });
  };

  const dateFormatted = dayjs(event?.date).format('DD/MM/YYYY HH:mm');

  if (eventIsLoading) {
    return (
      <EventCardInfo>
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </EventCardInfo>
    );
  }

  return !event ? (
    <></>
  ) : (
    <div>
      <EventCardInfo title="Geral" handleClickEdit={openEditModal}>
        <div className="font-bold">{eventTypeLabel[event.eventType]}</div>
        <div className="text-gray-500">{event.address?.shortDescription}</div>
        <div>{dateFormatted}</div>
      </EventCardInfo>
    </div>
  );
}
