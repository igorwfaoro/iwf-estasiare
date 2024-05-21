'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MdEdit } from 'react-icons/md';
import InitialsIcon from '../../../../components/InitialsIcon/InitialsIcon';
import { ProviderViewModel } from '../../../../models/view-models/provider.view-model';

interface ProviderProfileProps {}

export default function ProviderProfile({}: ProviderProfileProps) {
  const {
    data: {
      user: {
        provider: {
          name,
          contactEmail,
          contactPhone,
          contactWhatsApp,
          profileImage,
          bio,
          link,
          categories
        }
      }
    }
  } = useSession() as { data: { user: { provider: ProviderViewModel } } };

  const image = profileImage ? (
    <img src={profileImage} alt="profile image" className="rounded-full w-24" />
  ) : (
    <InitialsIcon name={name} />
  );

  return (
    <div className="flex justify-between gap-2">
      <div className="flex gap-4">
        {image}
        <div className="space-y-1">
          <h2 className="text-xl font-bold">{name}</h2>
          {bio && <p>{bio}</p>}
          {link && (
            <Link
              href={link}
              target="_blank"
              className="text-blue-500 font-bold block"
            >
              {link}
            </Link>
          )}
        </div>
      </div>

      <Link href="/admin/account?tab=provider">
        <MdEdit className="cursor-pointer text-blue-500 text-xl" />
      </Link>
    </div>
  );
}
