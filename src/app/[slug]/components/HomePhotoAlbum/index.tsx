'use client';

import { useRef } from 'react';
import {
  FaChevronLeft as IconArrowLeft,
  FaChevronRight as IconArrowRight,
} from 'react-icons/fa';
import './index.scss';
import { EventViewModel } from '../../../../models/view-models/event.view-model';
import { EventContentImageViewModel } from '../../../../models/view-models/event-content-image.view-model';

interface HomePhotoAlbumProps {
  images: EventContentImageViewModel[];
}

export default function HomePhotoAlbum({ images }: HomePhotoAlbumProps) {
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
    <div id="home-photo-album">
      <div className="album">
        <div className="photos" ref={photosRef}>
          {images.map((p, i) => (
            <img key={i} alt={`photo ${i + 1}`} src={p.image} />
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
    </div>
  );
}
