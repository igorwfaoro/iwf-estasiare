import { CSSProperties } from 'react';
import './index.scss';
import Button, { ButtonTheme, ButtonVariant } from '../../../../components/Button';

type Direction = 'row' | 'column';

export interface HomeBannerProps {
  title: string;
  description: string;
  direction?: Direction;
  buttonText: string;
  buttonLink: string;
  buttonTheme?: ButtonTheme;
  buttonVariant?: ButtonVariant;
  imageSrc: string;
}

export default function HomeBanner({
  title,
  description,
  direction = 'column',
  buttonText,
  buttonLink,
  imageSrc,
  buttonTheme = 'light',
  buttonVariant = 'outlined',
}: HomeBannerProps) {
  const wrapperStyle: CSSProperties = {
    backgroundImage: `url(${imageSrc})`,
  };

  const contentStyle: CSSProperties = {
    flexDirection: direction,
  };

  const textStyle: CSSProperties = {
    textAlign: direction === 'row' ? 'left' : 'center',
  };

  return (
    <div id="home-banner" style={wrapperStyle}>
      <div className="banner-content" style={contentStyle}>
        <div className="banner-content__text-side" style={textStyle}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className="banner-content__button-side">
          <Button theme={buttonTheme} variant={buttonVariant} link={buttonLink}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
