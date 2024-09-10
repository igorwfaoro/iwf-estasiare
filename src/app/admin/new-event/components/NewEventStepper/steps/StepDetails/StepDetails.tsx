import { EventType } from '@prisma/client';
import { useNewEventContext } from '../../../../contexts/NewEventContext';
import WeddingDetail from './components/WeddingDetail/WeddingDetail';

interface StepDetailsProps {
  index: number;
}

export default function StepDetails({ index }: StepDetailsProps) {
  const { eventCreateData } = useNewEventContext();

  if (!eventCreateData?.eventType) return <></>;

  const detailComponent = {
    [EventType.WEDDING]: <WeddingDetail index={index} />
  }[eventCreateData?.eventType];

  return <>{detailComponent}</>;
}
