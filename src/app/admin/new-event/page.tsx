import Card from '../../../components/Card/Card';
import NewEventStepper from './components/NewEventStepper/NewEventStepper';
import NewEventProvider from './contexts/NewEventContext';

interface AdminNewEventProps {}

export default function AdminNewEvent({}: AdminNewEventProps) {
  return (
    <div className="flex flex-col items-center">
      <Card className="max-w-2xl w-full p-4 mt-4 space-y-4">
        <h1 className="text-2xl font-bold">Criar novo Evento</h1>

        <NewEventProvider>
          <NewEventStepper />
        </NewEventProvider>
      </Card>
    </div>
  );
}
