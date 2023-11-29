import { CSSProperties } from 'react';
import Button from '../../../../components/Button/Button';

export interface EventBannerProps {
    title: string;
    description: string;
    direction?: 'row' | 'column';
    buttonText: string;
    buttonLink: string;
    imageSrc: string;
}

export default function EventBanner({
    title,
    description,
    direction = 'column',
    buttonText,
    buttonLink,
    imageSrc
}: EventBannerProps) {
    const wrapperStyle: CSSProperties = {
        backgroundImage: `url(${imageSrc})`
    };

    const contentStyle: CSSProperties = {
        flexDirection: direction
    };

    const textStyle: CSSProperties = {
        textAlign: direction === 'row' ? 'left' : 'center'
    };

    return (
        <div className="bg-center bg-cover" style={wrapperStyle}>
            <div
                className="p-16 md:py-16 md:px-64 flex flex-col md:flex-row items-center justify-center backdrop-blur-sm backdrop-brightness-60 gap-x-24 gap-y-6"
                style={contentStyle}
            >
                <div className="sm:text-center" style={textStyle}>
                    <h2 className="text-xl text-white">{title}</h2>
                    <p className="text-lg text-white">{description}</p>
                </div>

                <div className="banner-content__button-side">
                    <Button
                        theme="light"
                        link={buttonLink}
                        className="bg-transparent border border-white text-white"
                    >
                        {buttonText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
