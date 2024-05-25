'use client';

import { MenuSVGIcon } from '@react-md/material-icons';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

import Button, { ButtonTheme } from '../../../../components/Button/Button';
import DropdownMenu, {
  DropdownMenuItem
} from '../../../../components/DropdownMenu/DropdownMenu';

interface LinkItem {
  label: string;
  path: string;
  show?: boolean;
}

interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  const { data: sessionData } = useSession();

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const links = (
    [
      {
        label: 'Home',
        path: '/admin'
      },
      {
        label: 'Novo Evento',
        path: '/admin/new-event'
      },
      {
        label: 'Meus Links',
        path: '/admin/provider-links',
        show: !!sessionData?.user.provider
      },
      {
        label: 'Minha Conta',
        path: '/admin/account'
      }
    ] as LinkItem[]
  ).filter((it) => it.show !== false);

  const dropdownMenuitems: DropdownMenuItem[] = [
    {
      label: 'Minha conta',
      href: '/admin/account'
    },
    {
      label: 'Logout',
      onClick: () => signOut()
    }
  ];

  const toggleMenu = () => setMenuIsOpen((mio) => !mio);
  const closeMenu = () => setMenuIsOpen(false);

  const UserButton = ({ theme = 'light' }: { theme?: ButtonTheme }) =>
    sessionData?.user && (
      <DropdownMenu
        className="py-1"
        label={sessionData?.user.name}
        theme={theme}
        items={dropdownMenuitems}
      />
    );

  return (
    <nav className="fixed z-[999] flex h-12 w-full flex-col items-end justify-center bg-neutral-50 md:items-center shadow-custom1">
      {/* logo */}
      <Link href="/admin" className="absolute left-3 top-2">
        <img src="/images/icon.svg" alt="logo" className="h-8" />
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
        <ul className="absolute top-0 flex w-full list-none flex-col items-center bg-neutral-50 p-0 shadow-2xl">
          {links.map((link, i) => (
            <li key={i} className="w-full border-b border-neutral-100 p-3 ps-7">
              <Link
                className="text-neutral-950 no-underline"
                href={link.path}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <div className="py-4">
            <UserButton theme="primary" />
          </div>
        </ul>
      )}

      {/* desktop items */}
      <ul className="gap-5 p-0 hidden md:flex">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              className="text-neutral-950 no-underline transition-all"
              href={link.path}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* right items */}
      <div className="absolute right-3 top-2 hidden md:block">
        <UserButton />
      </div>
    </nav>
  );
}
