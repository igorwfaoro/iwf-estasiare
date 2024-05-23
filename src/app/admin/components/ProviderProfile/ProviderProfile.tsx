'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MdEdit } from 'react-icons/md';
import Chip from '../../../../components/Chip/Chip';
import InitialsIcon from '../../../../components/InitialsIcon/InitialsIcon';
import { formatToShow } from '../../../../util/helpers/http.helper';

interface ProviderProfileProps {}

export default function ProviderProfile({}: ProviderProfileProps) {
  const { data: sessionData } = useSession();

  if (!sessionData?.user) return <></>;

  const { name, profileImage, bio, link, categories } =
    sessionData.user.provider!;

  const image = profileImage ? (
    <img
      src={profileImage}
      alt="profile image"
      className="rounded-full w-24 h-24"
    />
  ) : (
    <InitialsIcon name={name} size={96} />
  );

  return (
    <div className="flex justify-between gap-2">
      <div className="flex gap-4">
        {image}
        <div className="space-y-2 truncate">
          <h2 className="text-xl font-bold truncate">{name}</h2>

          {bio && <p className="whitespace-pre-line">{bio}</p>}

          {link && (
            <Link
              href={link}
              target="_blank"
              className="text-blue-500 font-bold block truncate"
            >
              {formatToShow(link)}
            </Link>
          )}

          <div className="flex gap-1 flex-wrap md:max-w-[70%] lg:max-w-[50%]">
            {categories?.map((category, i) => (
              <Chip
                key={'category-' + i}
                className="bg-transparent border border-primary text-primary"
              >
                {category.description}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <Link href="/admin/account?tab=provider">
        <MdEdit className="cursor-pointer text-blue-500 text-xl" />
      </Link>
    </div>
  );
}
