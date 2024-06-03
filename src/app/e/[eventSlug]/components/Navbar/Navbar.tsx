'use client';

import { MenuSVGIcon } from '@react-md/material-icons';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../../../../../components/Button/Button';
import { EventDetailViewModel } from '../../../../../models/view-models/event-detail.view-model';
import { renderInitialsIcon } from '../../../../../util/helpers/initials-icon.helper';

interface LinkItem {
  path: string;
  label: string;
  navbarUseSpacer?: boolean;
}

interface EventNavbarProps {
  event: EventDetailViewModel;
}

export function EventNavbar({ event }: EventNavbarProps) {
  const pathname = usePathname();

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const links = [
    {
      path: `/e/${event.slug}`,
      label: 'Home'
    },
    event.hasGifts && {
      path: `/e/${event.slug}/gifts`,
      label: 'Presentes'
    },
    event.hasInvitations && {
      path: `/e/${event.slug}/presence-confirmation`,
      label: 'Confirmação de presença'
    },
    event.hasHandbooks && {
      path: `/e/${event.slug}/handbooks`,
      label: 'Manuais'
    }
  ].filter(Boolean) as LinkItem[];

  const toggleMenu = () => setMenuIsOpen((mio) => !mio);
  const closeMenu = () => setMenuIsOpen(false);

  return (
    <nav className="fixed z-[999] flex h-12 w-full flex-col items-end justify-center bg-neutral-50 shadow-sm md:items-center top-0">
      {/* logo */}
      <Link href={`/${event.slug}`} className="absolute left-3 top-2">
        {renderInitialsIcon(event, 34)}
      </Link>

      {/* mobile button menu */}
      <Button
        className="z-20 md:hidden w-16 border-neutral-400 bg-neutral-50 px-4 py-1 fill-gray-500"
        onClick={toggleMenu}
        icon={MenuSVGIcon}
        theme="light"
      />

      {/* mobile menu */}
      {menuIsOpen && (
        <ul className="absolute top-0 flex w-full list-none flex-col items-center bg-neutral-50 p-0">
          {links.map((link, i) => (
            <li
              key={i}
              className={twMerge(
                'w-full border-b border-neutral-100 p-3 ps-7',
                classNames({ 'font-bold': pathname === link.path })
              )}
            >
              <Link
                className="text-neutral-950 no-underline"
                href={link.path}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* desktop items */}
      <ul className="gap-5 p-0 hidden md:flex">
        {links.map((link, i) => (
          <li
            key={i}
            className={classNames({ 'font-bold': pathname === link.path })}
          >
            <Link
              className="text-neutral-950 no-underline transition-all"
              href={link.path}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
