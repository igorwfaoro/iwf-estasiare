'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useToast } from '../../../../../contexts/ToastContext';
import { EventDetailViewModel } from '../../../../../models/view-models/event-detail.view-model';
import { createEventClientService } from '../../../../../services/client/event.client-service';

export interface IAdminEventPageProvider {
  event: EventDetailViewModel | undefined;
  eventIsLoading: boolean;
  getEvent: () => void;
}

interface AdminEventPageProviderProps {
  eventId: number;
  children: any;
}

const AdminEventPageContext = createContext<
  IAdminEventPageProvider | undefined
>(undefined);

const AdminEventPageProvider = ({
  eventId,
  children
}: AdminEventPageProviderProps) => {
  const toast = useToast();
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
      })
      .finally(() => setEventIsLoading(false));
  };

  const returnValue = useMemo(
    () => ({
      event,
      eventIsLoading,
      getEvent
    }),
    [event, eventIsLoading]
  );

  return (
    <AdminEventPageContext.Provider value={returnValue}>
      {children}
    </AdminEventPageContext.Provider>
  );
};

export default AdminEventPageProvider;

export const useAdminEventPageContext = () =>
  useContext(AdminEventPageContext)!;
