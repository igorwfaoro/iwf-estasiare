import Link from 'next/link';
import { FaLinkedin, FaSnapchat, FaTwitter } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { MdEmail, MdFacebook, MdWhatsapp } from 'react-icons/md';
import { ProviderViewModel } from '../../../../models/view-models/provider.view-model';

interface ShareProps {
  provider: ProviderViewModel;
}

interface Item {
  label: string;
  icon: IconType;
  href: string;
  color: string;
}

export default function Share({ provider }: ShareProps) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${provider.slug}`;

  const items: Item[] = [
    {
      label: 'WhatsApp',
      icon: MdWhatsapp,
      href: `https://wa.me/?text=${url}`,
      color: '#25D366'
    },
    {
      label: 'Facebook',
      icon: MdFacebook,
      href: `https://www.facebook.com/sharer.php?u=${url}`,
      color: '#1877F2'
    },
    {
      label: 'X',
      icon: FaTwitter,
      href: `https://x.com/intent/tweet?text=${url}`,
      color: '#1DA1F2'
    },
    {
      label: 'LinkedIn',
      icon: FaLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      color: '#0A66C2'
    },
    {
      label: 'Snapchat',
      icon: FaSnapchat,
      href: `snapchat://creativeKitWeb/camera/1?attachmentUrl=${url}`,
      color: '#FFFC00'
    },
    {
      label: 'E-mail',
      icon: MdEmail,
      href: `mailto:?subject=${provider.name} | Estasiare&body=${url}`,
      color: '#CE3C31'
    }
  ];

  return (
    <section className="flex flex-col items-center gap-2">
      <div className='text-sm font-bold'>Compartilhar</div>
      <div className="flex gap-2 justify-center">
        {items.map(({ icon: Icon, href, label, color }) => (
          <div
            key={label}
            style={{ backgroundColor: color }}
            className="rounded-full p-1"
          >
            <Link href={href} target="_blank">
              <Icon className="text-white" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
