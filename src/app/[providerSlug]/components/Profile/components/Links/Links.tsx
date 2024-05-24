import { Icon } from '@iconify/react';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { ProviderViewModel } from '../../../../../../models/view-models/provider.view-model';

interface LinksProps {
  provider: ProviderViewModel;
}

export default function Links({ provider: { links } }: LinksProps) {
  if (!links) return <></>;

  links = links.sort((a, b) => a.index - b.index);

  return (
    <section className="flex flex-col">
      {links.map(({ label, url, urlKey, type }) => (
        <div
          key={label}
          className="[&:not(:last-child)]:border-b border-gray-300 flex gap-3 justify-between items-center pb-2 mb-2"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Icon icon={type!.icon} />
              <span className="text-sm">{label}</span>
            </div>

            <div className="font-bold">{urlKey || url}</div>
          </div>

          <Link href={url} target="_blank" className="text-blue-500">
            <FaExternalLinkAlt size={16} />
          </Link>
        </div>
      ))}
    </section>
  );
}
