import {
  Dispatch,
  ForwardedRef,
  ReactElement,
  SetStateAction,
  cloneElement,
  forwardRef,
  useImperativeHandle,
  useState
} from 'react';
import { twMerge } from 'tailwind-merge';
import Item, { ItemProps } from './components/Item/Item';
import Content from './components/Item/components/Content/Content';
import Header from './components/Item/components/Header/Header';

interface AccordionProps {
  children?: ReactElement<ItemProps> | ReactElement<ItemProps>[];
  className?: string;
  defaultOpenIndex?: number;
}

export interface AccordionRefType {
  openIndex: number | null;
  setOpenIndex: Dispatch<SetStateAction<number | null>>;
}

const AccordionComponent = forwardRef(
  (
    { children, className, defaultOpenIndex }: AccordionProps,
    ref: ForwardedRef<AccordionRefType>
  ) => {
    const [openIndex, setOpenIndex] = useState<number | null>(
      defaultOpenIndex !== undefined ? defaultOpenIndex : null
    );

    useImperativeHandle(ref, () => ({
      openIndex,
      setOpenIndex
    }));

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
);

const Accordion = Object.assign(AccordionComponent, {
  Item,
  ItemHeader: Header,
  ItemContent: Content
});

export default Accordion;
