import { ReactElement, cloneElement, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Item, { ItemProps } from './components/Item/Item';
import Content from './components/Item/components/Content/Content';
import Header from './components/Item/components/Header/Header';

interface AccordionProps {
  children?: ReactElement<ItemProps> | ReactElement<ItemProps>[];
  className?: string;
  defaultOpenIndex?: number;
}

export default function Accordion({
  children,
  className,
  defaultOpenIndex
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex !== undefined ? defaultOpenIndex : null
  );

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={twMerge('space-y-3', className)}>
      {items.map((child, index) =>
        cloneElement(child!, {
          isOpen: openIndex === index,
          onToggle: () => handleToggle(index)
        })
      )}
    </div>
  );
}

Accordion.Item = Item;
Accordion.ItemHeader = Header;
Accordion.ItemContent = Content;
