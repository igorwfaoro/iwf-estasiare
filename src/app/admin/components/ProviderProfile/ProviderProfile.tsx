'use client';

import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MdEdit } from 'react-icons/md';
import Chip from '../../../../components/Chip/Chip';
import InitialsIcon from '../../../../components/InitialsIcon/InitialsIcon';
import { COLORS } from '../../../../util/colors';
import { colorIsLight } from '../../../../util/helpers/color.helper';
import { formatToShow } from '../../../../util/helpers/http.helper';

interface ProviderProfileProps {}

export default function ProviderProfile({}: ProviderProfileProps) {
  const { data: sessionData } = useSession();

  if (!sessionData?.user) return <></>;

  const { slug, name, profileImage, bio, link, primaryColor, categories } =
    sessionData.user.provider!;

  const color = primaryColor || COLORS.primary;
  const primaryColorIsLight = colorIsLight(color);

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
          <Link
            href={`/${slug}`}
            className="text-xl font-bold text-blue-500 truncate"
          >
            {name}
          </Link>

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
                className={classNames('bg-transparent border', {
                  'border-neutral-800 text-neutral-800': primaryColorIsLight,
                  'text-white': !primaryColorIsLight
                })}
                style={{
                  ...(!primaryColorIsLight && { backgroundColor: color })
                }}
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
