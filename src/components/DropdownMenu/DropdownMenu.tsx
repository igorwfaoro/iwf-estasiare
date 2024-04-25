import { Fragment, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Link from 'next/link';
import Button, { ButtonTheme } from '../Button/Button';

export interface DropdownMenuItem {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface DropdownMenuProps {
  label?: string;
  className?: string;
  theme?: ButtonTheme;
  items?: DropdownMenuItem[];
}

export default function DropdownMenu({
  label,
  className,
  theme,
  items
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: DropdownMenuItem) => {
    item.onClick && item.onClick();
    setIsOpen(false);
  };

  const renderButtonLink = (menuItem: DropdownMenuItem) =>
    menuItem.onClick ? (
      <button
        onClick={() => handleItemClick(menuItem)}
        className="px-4 py-2 hover:bg-gray-200"
      >
        {menuItem.label}
      </button>
    ) : menuItem.href ? (
      <Link className="px-4 py-2 hover:bg-gray-200" href={menuItem.href}>
        {menuItem.label}
      </Link>
    ) : (
      <></>
    );

  return (
    <>
      <Button
        className={twMerge('relative', className)}
        onClick={() => setIsOpen(!isOpen)}
        theme={theme}
      >
        {label}
      </Button>

      {isOpen && (
        <>
          {/* items */}
          <div
            role="menu"
            className="absolute top-14 bg-white shadow-md flex flex-col rounded-md border border-gray-200 z-50"
          >
            {items?.map((item, i) => (
              <Fragment key={i}>{renderButtonLink(item)}</Fragment>
            ))}
          </div>

          {/* backdrop */}
          <div
            className="z-40 absolute w-full h-screen top-0 left-0"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </>
  );
}
