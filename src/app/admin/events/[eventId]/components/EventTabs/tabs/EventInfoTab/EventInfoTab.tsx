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
import EventInfoEditModal from './components/EventInfoEditModal/EventInfoEditModal';
import EventAddressEditModal from './components/EventAddressEditModal/EventAddressEditModal';
import { EditModalProps } from './types/edit-modal-props';
import { EditModalResult } from './types/edit-modal-result';
import { isMobile } from '../../../../../../../../util/helpers/is-mobile.helper';
import EventContentEditModal from './components/EventContentEditModal/EventContentEditModal';
import { EventType } from '@prisma/client';
import EventWeddingDetailEditModal from './components/EventWeddingDetailEditModal/EventWeddingDetailEditModal';

interface EventInfoTabProps {
  eventId: number;
}

interface Item {
  title: string;
  content: (event: EventDetailViewModel) => JSX.Element;
  editModal: {
    title: string;
    component: (event: EventDetailViewModel) => React.FC<any>;
  };
}

export default function EventInfoTab({ eventId }: EventInfoTabProps) {
  const toast = useToast();
  const modal = useModal();
  const eventService = createEventClientService();

  const [event, setEvent] = useState<EventDetailViewModel>();
  const [eventIsLoading, setEventIsLoading] = useState(false);

  const items: Item[] = [
    {
      title: 'Evento',
      content: (event) => {
        const dateFormatted = dayjs(event?.date).format('DD/MM/YYYY HH:mm');

        return (
          <>
            <div className="font-bold">{eventTypeLabel[event!.eventType]}</div>
            <div>{dateFormatted}</div>
          </>
        );
      },
      editModal: {
        title: 'Editar evento',
        component: () => EventInfoEditModal
      }
    },
    {
      title: 'Local',
      content: (event) => <div>{event!.address?.fullDescription}</div>,
      editModal: {
        title: 'Editar local',
        component: () => EventAddressEditModal
      }
    },
    {
      title: 'Conteúdo',
      content: (event) => (
        <div className="space-y-4">
          <img
            src={event.content!.bannerImage}
            alt="Banner Image"
            className="h-20 rounded-lg"
          />

          <div className="flex gap-4">
            <div
              className="h-6 w-12 rounded-xl"
              style={{ backgroundColor: event.content!.primaryColor }}
            />
            {event.content!.logoImage && (
              <img
                src={event.content!.logoImage}
                alt="Logo Image"
                className="h-16"
              />
            )}
          </div>
        </div>
      ),
      editModal: {
        title: 'Editar conteúdo',
        component: () => EventContentEditModal
      }
    },
    {
      title: 'Detalhes',
      content: (event) =>
        ({
          [EventType.WEDDING]: (
            <>
              <div>{event!.weddingDetail?.groomName}</div>
              <div>{event!.weddingDetail?.brideName}</div>
            </>
          )
        })[event.eventType],
      editModal: {
        title: 'Editar detalhes',
        component: (event) =>
          ({
            [EventType.WEDDING]: EventWeddingDetailEditModal
          })[event.eventType]
      }
    }
  ];

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

  const openEditModal = (item: Item) => {
    modal.open({
      component: item.editModal.component(event!),
      title: item.editModal.title,
      props: { event } as EditModalProps,
      width: isMobile() ? '90%' : '50%',
      onClose: (result?: EditModalResult) => {
        if (result?.edited) {
          getEvent();
        }
      }
    });
  };

  const renderLoading = () =>
    Array.from({ length: 4 }).map((_, i) => (
      <EventCardInfo key={i}>
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
        </div>
      </EventCardInfo>
    ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {eventIsLoading
        ? renderLoading()
        : event &&
          items.map((item, i) => (
            <EventCardInfo
              key={i}
              title={item.title}
              handleClickEdit={() => openEditModal(item)}
            >
              {item.content(event)}
            </EventCardInfo>
          ))}
    </div>
  );
}
