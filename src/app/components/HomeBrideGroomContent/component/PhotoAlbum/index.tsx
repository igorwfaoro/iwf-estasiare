'use client';

import { BRIDE_GROOM_PHOTOS } from './photos';
import './index.scss';
import {
  FaChevronLeft as IconArrowLeft,
  FaChevronRight as IconArrowRight,
} from 'react-icons/fa';
import { useRef } from 'react';

export default function PhotoAlbum() {
  const photos = BRIDE_GROOM_PHOTOS;

  const photosRef = useRef<HTMLDivElement>(null);

  const handleArrowClick = (direction: 'left' | 'right') => {
    if (!photosRef.current) return;

    const scrollIndicator = direction === 'left' ? -1 : 1;

    photosRef.current.scrollTo(
      photosRef.current.scrollLeft + 400 * scrollIndicator,
      0
    );
  };

  return (
    <div id="photo-album">
      <div className="photos" ref={photosRef}>
        {photos.map((p, i) => (
          <img
            key={i}
            alt={`bride and groom ${i + 1}`}
            src={p}
          />
        ))}
      </div>

      <div
        className="arrow arrow-left no-select"
        onClick={() => handleArrowClick('left')}
      >
        <IconArrowLeft />
      </div>

      <div
        className="arrow arrow-right no-select"
        onClick={() => handleArrowClick('right')}
      >
        <IconArrowRight />
      </div>
    </div>
  );
}
