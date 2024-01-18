'use client';

import { MenuSVGIcon } from '@react-md/material-icons';
import Link from 'next/link';
import { useState } from 'react';
import Button from '../../../components/Button/Button';

interface LinkItem {
  label: string;
  path: string;
}

interface HomeNavbarProps {}

export default function HomeNavbar({}: HomeNavbarProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const links: LinkItem[] = [
    {
      label: 'Home',
      path: `/`
    },
    {
      label: 'Eventos',
      path: `#events`
    },
    {
      label: 'Sobre',
      path: '#about'
    }
  ];

  const toggleMenu = () => setMenuIsOpen((mio) => !mio);
  const closeMenu = () => setMenuIsOpen(false);

  const ButtonRegister = ({ className }: { className?: string }) => (
    <Button className={className} theme="highlight">
      Crie seu evento!
    </Button>
  );

  return (
    <nav className="fixed z-[999] flex h-12 w-full flex-col items-end justify-center bg-neutral-50 shadow-sm md:items-center">
      {/* logo */}
      <Link href="/" className="absolute left-3 top-2">
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
        <ul className="absolute top-0 flex w-full list-none flex-col items-center bg-neutral-50 p-0">
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
          <ButtonRegister className="mb-4 px-2 py-1" />
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
      <div className="absolute right-3 top-2">
        <ButtonRegister className="px-2 py-1 hidden md:block" />
      </div>
    </nav>
  );
}
