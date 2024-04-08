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
import { useAdminEventPageContext } from '../../../../contexts/AdminEventPageContext';
import EventFinancialEditModal from './components/EventFinancialEditModal/EventFinancialEditModal';

interface EventGeneralTabProps {}

interface Item {
  title: string;
  content: (event: EventDetailViewModel) => JSX.Element;
  editModal: {
    title: string;
    component: (event: EventDetailViewModel) => React.FC<any>;
  };
}

export default function EventGeneralTab({}: EventGeneralTabProps) {
  const modal = useModal();

  const { event, eventIsLoading, getEvent } = useAdminEventPageContext();

  const items: Item[] = (
    [
      {
        title: 'Evento',
        content: (event) => {
          const dateFormatted = dayjs(event?.date).format('DD/MM/YYYY HH:mm');

          return (
            <>
              <div>
                <span>Tipo de evento: </span>
                <span className="font-bold">
                  {eventTypeLabel[event!.eventType]}
                </span>
              </div>
              <div>
                <span>Quando: </span>
                <span className="font-bold">{dateFormatted}</span>
              </div>
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
        content: (event) => <div>{event!.address}</div>,
        editModal: {
          title: 'Editar local',
          component: () => EventAddressEditModal
        }
      },
      {
        title: 'Conteúdo',
        content: (event) => (
          <div className="space-y-4">
            {event.content!.bannerImage && (
              <img
                src={event.content!.bannerImage}
                alt="Banner Image"
                className="h-20 rounded-lg"
              />
            )}

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
                <div>
                  <span>Noivo: </span>
                  <span className="font-bold">
                    {event!.weddingDetail?.groomName}
                  </span>
                </div>
                <div>
                  <span>Noiva: </span>
                  <span className="font-bold">
                    {event!.weddingDetail?.brideName}
                  </span>
                </div>
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
      },
      !!event?.financial?.paypalBusinessCode && {
        title: 'Dados Financeiros',
        content: () => (
          <>
            <span>Código Paypal: </span>
            <span className="font-bold">
              {event!.financial?.paypalBusinessCode}
            </span>
          </>
        ),
        editModal: {
          title: 'Editar dados financeiros',
          component: () => EventFinancialEditModal
        }
      }
    ] as (Item | boolean)[]
  ).filter(Boolean) as Item[];

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
