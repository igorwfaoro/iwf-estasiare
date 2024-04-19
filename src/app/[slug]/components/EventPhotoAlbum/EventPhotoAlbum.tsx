'use client';

import { useRef } from 'react';
import {
  FaChevronLeft as IconArrowLeft,
  FaChevronRight as IconArrowRight
} from 'react-icons/fa';

import { EventContentImageViewModel } from '../../../../models/view-models/event-content-image.view-model';

interface EventPhotoAlbumProps {
  images: EventContentImageViewModel[];
}

export default function EventPhotoAlbum({ images }: EventPhotoAlbumProps) {
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
    <div className="p-3">
      <div className="relative">
        <div
          className="flex flex-col h-[484px] flex-wrap justify-center gap-4 overflow-x-auto scroll-smooth scrollbar-h-[2px]"
          ref={photosRef}
        >
          {images.map((p, i) => (
            <img
              key={i}
              alt={`photo ${i + 1}`}
              src={p.image}
              className="max-w-[300px] h-auto"
            />
          ))}
        </div>

        {/* arrows */}
        <>
          <div
            className="absolute text-white text-5xl h-11 top-[242px] cursor-pointer hover:text-gray-100 left-2"
            onClick={() => handleArrowClick('left')}
          >
            <IconArrowLeft className="h-full drop-shadow-md" />
          </div>

          <div
            className="absolute text-white text-5xl h-11 top-[242px] cursor-pointer hover:text-gray-100 right-2"
            onClick={() => handleArrowClick('right')}
          >
            <IconArrowRight className="h-full drop-shadow-md" />
          </div>
        </>
      </div>
    </div>
  );
}
