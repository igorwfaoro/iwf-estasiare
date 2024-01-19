'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { onlyNumbers } from '../../../../util/helpers/string.helper';
import { EventViewModel } from '../../../../models/view-models/event.view-model';
import { twMerge } from 'tailwind-merge';
import ListControls from './components/ListControls/ListControls';
import Skeleton from '../../../../components/Skeleton/Skeleton';
import EventCard from '../../../../components/EventCard/EventCard';

const CONTROL_BUTTON_WIDTH = 42;

interface EventsListProps {
  isLoading: boolean;
  items: EventViewModel[];
}

export default function EventsList({ items, isLoading }: EventsListProps) {
  const itemsScrollRef = useRef<ScrollContainer>(null);
  const scrollingCardItemRef = useRef<HTMLDivElement>(null);

  const [showArrowLeft, setShowArrowLeft] = useState(false);
  const [showArrowRight, setShowArrowRight] = useState(false);

  useEffect(() => {
    const scrollElement = itemsScrollRef.current?.getElement();

    scrollElement?.addEventListener('scroll', handleOnScroll);

    window.addEventListener('resize', onResize);

    onResize();

    return () => {
      scrollElement?.removeEventListener('scroll', handleOnScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [items]);

  const onResize = () => {
    if (getItemWidth() * items.length < getClientWidth()) {
      setShowArrowLeft(false);
      setShowArrowRight(false);
      return;
    }

    scrollTo(0);
    handleOnScroll();
  };

  const handleOnScroll = () => {
    if (getCurrentScroll() > getMaxScroll() - CONTROL_BUTTON_WIDTH) {
      setShowArrowLeft(true);
      setShowArrowRight(false);
      return;
    }

    if (getCurrentScroll() < CONTROL_BUTTON_WIDTH) {
      setShowArrowLeft(false);
      setShowArrowRight(true);
      return;
    }

    setShowArrowLeft(true);
    setShowArrowRight(true);
  };

  const getClientWidth = () =>
    itemsScrollRef.current?.getElement().clientWidth || 0;

  const getMaxScroll = () =>
    (itemsScrollRef.current?.getElement().scrollWidth || 0) - getClientWidth();

  const getCurrentScroll = () =>
    itemsScrollRef.current?.getElement().scrollLeft || 0;

  const scrollTo = (value: number) =>
    itemsScrollRef.current?.getElement().scrollTo({ left: value });

  const getItemWidth = () => {
    const itemsGapWidth = Number(
      onlyNumbers(
        window
          .getComputedStyle(document.querySelector('.events-list-items')!)
          .getPropertyValue('gap')
      )
    );
    const itemWidth = scrollingCardItemRef.current?.clientWidth || 0;

    return itemWidth + itemsGapWidth;
  };

  const handleClickButtonLeft = () => {
    scrollTo(getCurrentScroll() - getItemWidth());
  };

  const handleClickButtonRight = () => {
    scrollTo(getCurrentScroll() + getItemWidth());
  };

  const gradientClass = (() => {
    if (!showArrowLeft && !showArrowRight) return '';
    if (showArrowLeft && showArrowRight)
      return 'gradient-mask-l-80 gradient-mask-r-80 md:gradient-mask-l-90 md:gradient-mask-r-90';
    if (showArrowLeft) return 'gradient-mask-l-80 md:gradient-mask-l-90';
    if (showArrowRight) return 'gradient-mask-r-80 md:gradient-mask-r-90';
  })();

  const renderLoading = () =>
    Array.from({ length: 8 }).map(() => (
      <Skeleton className="h-52 rounded-xl min-w-[60%] max-w-[60%] md:min-w-[25%] md:max-w-[25%]" />
    ));

  return (
    <div className="relative">
      <ScrollContainer
        className={twMerge(
          'events-list-items',
          'flex gap-10 scroll-smooth py-3',
          gradientClass
        )}
        ref={itemsScrollRef as any}
      >
        {!!items.length
          ? items.map((item, i) => (
              <EventCard
                key={i}
                event={item}
                scrollingCardItemRef={scrollingCardItemRef}
                className="min-w-[60%] max-w-[60%] md:min-w-[25%] md:max-w-[25%]"
              />
            ))
          : renderLoading()}
      </ScrollContainer>

      <ListControls
        controlButtonWidth={CONTROL_BUTTON_WIDTH}
        handleClickButtonLeft={handleClickButtonLeft}
        handleClickButtonRight={handleClickButtonRight}
        showArrowLeft={showArrowLeft}
        showArrowRight={showArrowRight}
      />
    </div>
  );
}
