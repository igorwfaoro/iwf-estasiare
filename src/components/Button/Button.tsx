import { ComponentProps, HTMLAttributeAnchorTarget } from 'react';
import Link from 'next/link';
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
    base: 'rounded-md px-4 h-10 font-bold uppercase shadow-sm transition-all ease-in-out hover:brightness-90 disabled:cursor-not-allowed disabled:border-none disabled:bg-gray-400 disabled:text-gray-300',
    variants: {
        theme: {
            primary: 'bg-primary text-white',
            secondary: 'bg-secondary text-white',
            light: 'bg-neutral-100 text-neutral-950',
            highlight: 'bg-highlight text-white'
        }
    },
    defaultVariants: {
        theme: 'primary'
    }
});

type ButtonProps = ComponentProps<'button'> &
    VariantProps<typeof button> & {
        icon?: any;
        link?: string;
        linkTarget?: HTMLAttributeAnchorTarget;
    };

export default function Button({
    children,
    icon: Icon,
    link,
    linkTarget,
    theme,
    onClick,
    disabled,
    className
}: ButtonProps) {
    const content = (
        <>
            {Icon && <Icon />} {children}
        </>
    );

    const buttonClasses = button({ theme, className });

    return link ? (
        <Link className={buttonClasses} href={link} target={linkTarget}>
            {content}
        </Link>
    ) : (
        <button className={buttonClasses} onClick={onClick} disabled={disabled}>
            {content}
        </button>
    );
}
