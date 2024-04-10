import dayjs from 'dayjs';
import Link from 'next/link';
import { EventDetailViewModel } from '../../../../models/view-models/event-detail.view-model';

interface FooterProps {
  event: EventDetailViewModel;
}

export function EventFooter({event}:FooterProps) {
  const year = dayjs().format('YYYY');

  return (
    <div className="flex flex-col justify-center items-center p-3 text-sm text-neutral-400">
      <div>Estasiare | {year}</div>

      <div className="space-x-2">
        <Link href="/" className="underline">
          Página inicial
        </Link>

        <Link href={`/admin/events/${event.id}`} className="underline">
          Painel
        </Link>
      </div>
    </div>
  );
}
