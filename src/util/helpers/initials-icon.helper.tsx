import { EventType } from '@prisma/client';
import { GenericEventParams } from '../types/generic-event';
import InitialsIcon, { InitialsIconProps } from '../../components/InitialsIcon/InitialsIcon';

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
