'use client';

import { useEffect, useState } from 'react';
import { useToast } from '../../../../../../../../contexts/ToastContext';
import { createGiftClientService } from '../../../../../../../../services/client/gift.client-service';
import { GiftViewModel } from '../../../../../../../../models/view-models/gift.view-model';

interface GiftsTabProps {}

export default function GiftsTab({}: GiftsTabProps) {
  const giftService = createGiftClientService();

  const toast = useToast();

  const [gifts, setGifts] = useState<GiftViewModel[]>([]);

  const [firstLoading, setFirstLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    getGifts();
  }, []);

  const getGifts = () => {};

  return <h1>GiftsTab</h1>;
}
