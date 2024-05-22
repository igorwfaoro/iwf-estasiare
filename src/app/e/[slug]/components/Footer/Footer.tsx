import dayjs from 'dayjs';
import Link from 'next/link';

import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import Divider from '../../../../../components/Divider/Divider';
import { EventDetailViewModel } from '../../../../../models/view-models/event-detail.view-model';

interface ContactItem {
  icon?: JSX.Element;
  label: string;
  href: string;
  openOnAnotherTab?: boolean;
}

interface FooterProps {
  event: EventDetailViewModel;
}

export function EventFooter({ event }: FooterProps) {
  const year = dayjs().format('YYYY');

  const contactItems: ContactItem[] = (
    [
      event.contactInfo?.phoneNumber && {
        icon: <FaPhone />,
        label: event.contactInfo.phoneNumber,
        href: `tel:${event.contactInfo.phoneNumber}`,
        openOnAnotherTab: true
      },
      event.contactInfo?.whatsAppNumber && {
        icon: <FaWhatsapp />,
        label: event.contactInfo.whatsAppNumber,
        href: `https://wa.me/${event.contactInfo.whatsAppNumber}`,
        openOnAnotherTab: true
      },
      event.contactInfo?.email && {
        icon: <MdMail />,
        label: event.contactInfo.email,
        href: `mailto:${event.contactInfo.email}`,
        openOnAnotherTab: true
      }
    ] as (ContactItem | boolean)[]
  ).filter(Boolean) as ContactItem[];

  return (
    <footer className="flex flex-col justify-center items-center gap-8 px-3 py-16 text-neutral-400">
      {event.contactInfo && (
        <div className="space-y-2">
          <div className="text-2xl font-bold">
            {event.contactInfo.description || 'Contato'}
          </div>

          <div className="space-y-2">
            {contactItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                target={item.openOnAnotherTab ? '_blank' : undefined}
                className="flex items-center gap-2 underline justify-center"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Divider className="md:w-1/4" />

      <div>
        <div className="space-x-2">
          <Link href="/" className="underline">
            Página inicial
          </Link>

          <Link href={`/admin/events/${event.id}`} className="underline">
            Painel
          </Link>
        </div>

        <div className="text-center">Estasiare | {year}</div>
      </div>
    </footer>
  );
}
