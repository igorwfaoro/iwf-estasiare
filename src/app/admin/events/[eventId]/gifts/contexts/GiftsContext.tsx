'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useLoader } from '../../../../../../contexts/LoaderContext';
import { useToast } from '../../../../../../contexts/ToastContext';
import { createGiftClientService } from '../../../../../../services/client/gift.client-service';
import { GiftViewModel } from '../../../../../../models/view-models/gift.view-model';
import { mapHttpError } from '../../../../../../http/http';
import { AxiosError } from 'axios';

export interface IGiftsProvider {
  getGifts: () => void;
}

interface GiftsProviderProps {
  children: JSX.Element;
  eventId: number;
}

const GiftsContext = createContext<IGiftsProvider | undefined>(undefined);

const GiftsProvider = ({ children, eventId }: GiftsProviderProps) => {
  const loader = useLoader();
  const toast = useToast();

  const giftsClientService = createGiftClientService();

  const [gifts, setGifts] = useState<GiftViewModel[]>([]);
  const [giftsIsLoading, setGiftsIsLoading] = useState(false);

  useEffect(() => {
    getGifts();
  }, []);

  const getGifts = (): void => {
    setGiftsIsLoading(true);
    giftsClientService
      .getAllByEvent(eventId)
      .then((response) => {
        setGifts(response);
      })
      .catch((error: AxiosError) => {
        toast.open(mapHttpError(error), 'error');
      })
      .finally(() => setGiftsIsLoading(false));
  };

  return (
    <GiftsContext.Provider value={{ getGifts }}>
      {children}
    </GiftsContext.Provider>
  );
};

export default GiftsProvider;

export const useGifts = () => useContext(GiftsContext)!;
