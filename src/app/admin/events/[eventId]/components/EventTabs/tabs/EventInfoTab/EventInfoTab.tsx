'use client';

import { useEffect, useState } from 'react';
import { EventDetailViewModel } from '../../../../../../../../models/view-models/event-detail.view-model';
import { useToast } from '../../../../../../../../contexts/ToastContext';
import { createEventClientService } from '../../../../../../../../services/client/event.client-service';
import EventCardInfo from '../../components/EventCardInfo/EventCardInfo';
import { eventTypeLabel } from '../../../../../../../../util/helpers/event-type.helper';
import dayjs from 'dayjs';
import Skeleton from '../../../../../../../../components/Skeleton/Skeleton';
import {
  ModalOptions,
  useModal
} from '../../../../../../../../contexts/ModalContext';
import EventInfoEditModal, {
  EventInfoEditModalProps,
  EventInfoEditModalResult
} from './components/EventInfoEditModal/EventInfoEditModal';
import { isMobile } from '../../../../../../../../util/helpers/is-mobile.helper';

interface EventInfoTabProps {
  eventId: number;
}

export default function EventInfoTab({ eventId }: EventInfoTabProps) {
  const toast = useToast();
  const modal = useModal();
  const eventService = createEventClientService();

  const [event, setEvent] = useState<EventDetailViewModel>();
  const [eventIsLoading, setEventIsLoading] = useState(false);

  const editModals = {
    general: {
      component: EventInfoEditModal,
      title: 'Editar evento',
      props: { event } as EventInfoEditModalProps,
      width: isMobile() ? '90%' : '50%',
      onClose: (result: EventInfoEditModalResult | undefined) => {
        if (result?.edited) {
          getEvent();
        }
      }
    } as ModalOptions,
    address: {
      component: EventInfoEditModal,
      title: 'Editar evento',
      props: { event } as EventInfoEditModalProps,
      width: isMobile() ? '90%' : '50%',
      onClose: (result: EventInfoEditModalResult | undefined) => {
        if (result?.edited) {
          getEvent();
        }
      }
    } as ModalOptions
  };

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

  const openEditModal = (config: ModalOptions) => {
    modal.open(config);
  };

  const dateFormatted = dayjs(event?.date).format('DD/MM/YYYY HH:mm');

  if (eventIsLoading) {
    return (
      <EventCardInfo>
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
        </div>
      </EventCardInfo>
    );
  }

  return !event ? (
    <></>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <EventCardInfo
        title="Geral"
        handleClickEdit={() => openEditModal(editModals.general)}
      >
        <div className="font-bold">{eventTypeLabel[event.eventType]}</div>
        <div>{dateFormatted}</div>
      </EventCardInfo>

      <EventCardInfo
        title="Local"
        handleClickEdit={() => openEditModal(editModals.address)}
      >
        <div>{event.address?.fullDescription}</div>
      </EventCardInfo>

      <EventCardInfo
        title="Conteúdo"
        handleClickEdit={() => openEditModal(editModals.address)}
      >
        <div>{event.address?.fullDescription}</div>
      </EventCardInfo>

      <EventCardInfo
        title="Casamento"
        handleClickEdit={() => openEditModal(editModals.address)}
      >
        <div>{event.weddingDetail?.groomName}</div>
        <div>{event.weddingDetail?.brideName}</div>
      </EventCardInfo>
    </div>
  );
}
