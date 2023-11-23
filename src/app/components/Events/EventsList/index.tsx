'use client';

import Skeleton from 'react-loading-skeleton';
import './index.scss';
import { EventViewModel } from '../../../../models/view-models/event.view-model';
import { useEffect, useRef, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { onlyNumbers } from '../../../../util/helpers/string.helper';
import classNames from 'classnames';
import {
  ChevronLeftSVGIcon as IconArrowLeft,
  ChevronRightSVGIcon as IconArrowRight,
} from '@react-md/material-icons';
import Card from '../../../../components/Card';
import dayjs from 'dayjs';
import Link from 'next/link';

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
          .getComputedStyle(document.querySelector('#events-list .items')!)
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
    if (showArrowLeft && showArrowRight) return 'items-gradient-all';
    if (showArrowLeft) return 'items-gradient-left';
    if (showArrowRight) return 'items-gradient-right';
  })();

  const renderLoading = () =>
    Array.from({ length: 6 }).map(() => (
      <div className="event-link">
        <Skeleton
          count={1}
          style={{
            width: '100%',
            height: 200,
            lineHeight: 'none',
            borderRadius: 16,
          }}
        />
      </div>
    ));

  return (
    <div id="events-list">
      <ScrollContainer
        className={classNames('items', gradientClass)}
        ref={itemsScrollRef as any}
      >
        {!!items.length
          ? items.map((item, i) => (
              <Link href={`/${item.slug}`} className="event-link">
                <Card
                  key={i}
                  className="event-card"
                  elementRef={scrollingCardItemRef}
                  style={{
                    backgroundImage: `url(${item.content?.bannerImage})`,
                  }}
                >
                  <div className="content">
                    <div className="event-title">{item.titleDescription}</div>
                    <div className="event-date">
                      {dayjs(item.date).format('DD/MM/YYYY')}
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          : renderLoading()}
      </ScrollContainer>

      <div className="controls">
        <div className="control-button">
          {showArrowLeft && (
            <button onClick={handleClickButtonLeft}>
              <IconArrowLeft className="icon" />
            </button>
          )}
        </div>
        <div className="control-button">
          {showArrowRight && (
            <button onClick={handleClickButtonRight}>
              <IconArrowRight className="icon" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
