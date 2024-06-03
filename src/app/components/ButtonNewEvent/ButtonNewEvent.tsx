import Button from '../../../components/Button/Button';

interface ButtonNewEventProps {
  className?: string;
}

export default function ButtonNewEvent({ className }: ButtonNewEventProps) {
  return (
    <Button className={className} theme="highlight" href="/admin/new-event">
      Crie seu evento!
    </Button>
  );
}
