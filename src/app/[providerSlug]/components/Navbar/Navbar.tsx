'use client';

import { MenuSVGIcon } from '@react-md/material-icons';
import Button from '../../../../components/Button/Button';

interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  return (
    <nav className="fixed z-[999] flex h-12 w-full flex-col items-end justify-center bg-neutral-50 shadow-sm md:items-center">
      <Button
        className="z-20 w-16 border-neutral-400 bg-neutral-50 px-4 py-1 fill-gray-500"
        icon={MenuSVGIcon}
        theme="light"
      />
    </nav>
  );
}
