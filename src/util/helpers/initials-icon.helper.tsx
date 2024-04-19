import { EventType } from '@prisma/client';

import InitialsIcon from '../../components/InitialsIcon/InitialsIcon';
import { GenericEventParams } from '../types/generic-event';

export const renderInitialsIcon = (
  { eventType, weddingDetail, content }: GenericEventParams,
  size: number
) =>
  ({
    [EventType.WEDDING]: (
      <InitialsIcon
        name={[weddingDetail?.groomName!, weddingDetail?.brideName!]}
        size={size}
        color={content?.primaryColor}
      />
    )
  })[eventType];
