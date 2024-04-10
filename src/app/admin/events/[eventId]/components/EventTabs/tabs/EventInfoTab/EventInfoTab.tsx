'use client';

import { EventDetailViewModel } from '../../../../../../../../models/view-models/event-detail.view-model';
import EventCardInfo from '../../components/EventCardInfo/EventCardInfo';
import Skeleton from '../../../../../../../../components/Skeleton/Skeleton';
import { useModal } from '../../../../../../../../contexts/ModalContext';
import EventInfoEditModal from './edit-modals/EventInfoEditModal/EventInfoEditModal';
import EventAddressEditModal from './edit-modals/EventAddressEditModal/EventAddressEditModal';
import { EditModalProps } from './types/edit-modal-props';
import { EditModalResult } from './types/edit-modal-result';
import { isMobile } from '../../../../../../../../util/helpers/is-mobile.helper';
import EventContentEditModal from './edit-modals/EventContentEditModal/EventContentEditModal';
import { EventType } from '@prisma/client';
import EventWeddingDetailEditModal from './edit-modals/EventWeddingDetailEditModal/EventWeddingDetailEditModal';
import { useAdminEventPageContext } from '../../../../contexts/AdminEventPageContext';
import EventFinancialEditModal from './edit-modals/EventFinancialEditModal/EventFinancialEditModal';
import GeneralCard from './components/GeneralCard/GeneralCard';
import AddressCard from './components/AddressCard/AddressCard';
import ContentCard from './components/ContentCard/ContentCard';
import DetailsCard from './components/DetailsCard/DetailsCard';
import FinancialCard from './components/FinancialCard/FinancialCard';

interface EventInfoTabProps {}

interface Item {
  title: string;
  content: (event: EventDetailViewModel) => JSX.Element;
  editModal: {
    title: string;
    component: (event: EventDetailViewModel) => React.FC<any>;
  };
}

export default function EventInfoTab({}: EventInfoTabProps) {
  const modal = useModal();

  const { event, eventIsLoading, getEvent } = useAdminEventPageContext();

  const items: Item[] = (
    [
      {
        title: 'Evento',
        content: (event) => <GeneralCard event={event} />,
        editModal: {
          title: 'Editar evento',
          component: () => EventInfoEditModal
        }
      },
      {
        title: 'Local',
        content: (event) => <AddressCard event={event} />,
        editModal: {
          title: 'Editar local',
          component: () => EventAddressEditModal
        }
      },
      {
        title: 'Conteúdo',
        content: (event) => <ContentCard event={event} />,
        editModal: {
          title: 'Editar conteúdo',
          component: () => EventContentEditModal
        }
      },
      {
        title: 'Detalhes',
        content: (event) => <DetailsCard event={event} />,
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
        content: () => <FinancialCard event={event} />,
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
