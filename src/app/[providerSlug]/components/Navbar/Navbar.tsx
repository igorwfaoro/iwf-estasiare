'use client';

interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  return (
    <nav className="fixed z-[999] flex h-12 w-full flex-col items-end justify-center bg-neutral-50 shadow-sm md:items-center" />
  );
}
