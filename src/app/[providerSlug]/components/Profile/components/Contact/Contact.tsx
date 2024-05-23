import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { MdMail, MdPhone, MdWhatsapp } from 'react-icons/md';
import { ProviderViewModel } from '../../../../../../models/view-models/provider.view-model';

interface ContactProps {
  provider: ProviderViewModel;
}

interface Item {
  label: string;
  icon: IconType;
  value: string;
  href: string;
}

export default function Contact({
  provider: { contactEmail, contactPhone, contactWhatsApp }
}: ContactProps) {
  const items = (
    [
      !!contactWhatsApp && {
        label: 'Whatsapp',
        icon: MdWhatsapp,
        value: contactWhatsApp,
        href: `https://wa.me/${contactWhatsApp}`
      },
      !!contactPhone && {
        label: 'Telefone',
        icon: MdPhone,
        value: contactWhatsApp,
        href: `tel:${contactWhatsApp}`
      },
      !!contactEmail && {
        label: 'Whatsapp',
        icon: MdMail,
        value: contactEmail,
        href: `mailto:${contactEmail}`
      }
    ] as (false | Item)[]
  ).filter(Boolean) as Item[];

  return (
    <section className="flex flex-col">
      {items.map(({ label, icon: Icon, value, href }) => (
        <div
          key={label}
          className="[&:not(:last-child)]:border-b border-gray-300 flex gap-3 justify-between items-center pb-2 mb-2"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Icon />
              <span className="text-sm">{label}</span>
            </div>

            <div className="font-bold">{value}</div>
          </div>

          <Link href={href} target="_blank" className="text-blue-500">
            <FaExternalLinkAlt size={16} />
          </Link>
        </div>
      ))}
    </section>
  );
}
