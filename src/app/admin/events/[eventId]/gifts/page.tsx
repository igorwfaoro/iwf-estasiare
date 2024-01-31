import GiftsProvider from './contexts/GiftsContext';

interface GiftsProps {
  params: { eventId: number };
}

export default function Gifts({ params }: GiftsProps) {
  return (
    <GiftsProvider eventId={params.eventId}>
      <h1>Gifts</h1>
    </GiftsProvider>
  );
}
