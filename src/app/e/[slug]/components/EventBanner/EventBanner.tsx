import { CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';

import Button from '../../../../../components/Button/Button';

export interface EventBannerProps {
  title: string;
  description: string;
  contentClassName?: string;
  textClassName?: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
}

export default function EventBanner({
  title,
  description,
  contentClassName,
  textClassName,
  buttonText,
  buttonLink,
  imageSrc
}: EventBannerProps) {
  const wrapperStyle: CSSProperties = {
    backgroundImage: `url(${imageSrc})`
  };

  return (
    <div className="bg-center bg-cover" style={wrapperStyle}>
      <div
        className={twMerge(
          'p-16 md:py-16 md:px-64 flex flex-col md:flex-row items-center justify-center backdrop-blur-sm backdrop-brightness-50 gap-x-24 gap-y-6',
          contentClassName
        )}
      >
        <div className={twMerge('text-center md:text-left', textClassName)}>
          <h2 className="text-xl text-white font-bold">{title}</h2>
          <p className="text-lg text-white">{description}</p>
        </div>

        <div className="banner-content__button-side">
          <Button
            theme="light"
            href={buttonLink}
            className="bg-transparent border border-white text-white"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
