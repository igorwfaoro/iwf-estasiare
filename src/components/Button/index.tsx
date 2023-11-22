import {
  CSSProperties,
  HTMLAttributeAnchorTarget,
  MouseEventHandler,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import colors from '../../styles/colors.module.scss';
import './index.scss';

export type ButtonTheme = 'primary' | 'secondary' | 'light' | 'highlight';

export type ButtonVariant = 'outlined' | 'contained';

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon?: any;
  link?: string;
  linkTarget?: HTMLAttributeAnchorTarget;
  disabled?: boolean;
  theme?: ButtonTheme;
  variant?: ButtonVariant;
  color?: string;
}

export default function Button(props: ButtonProps) {
  const Icon = props.icon;

  const theme = props.theme || 'primary';
  const variant = props.variant || 'contained';

  const themeConfig = {
    primary: {
      color: props.color ?? colors['color-primary'],
      contrast: colors['color-white'],
    },
    secondary: {
      color: props.color ?? colors['color-secondary'],
      contrast: colors['color-white'],
    },
    light: {
      color: props.color ?? colors['color-neutral-100'],
      contrast: colors['color-neutral-950'],
    },
    highlight: {
      color: props.color ?? colors['color-highlight'],
      contrast: colors['color-white'],
    },
  }[theme];

  const themeStyle: CSSProperties = {
    backgroundColor:
      variant === 'contained' ? themeConfig.color : 'transparent',
    color: variant === 'contained' ? themeConfig.contrast : themeConfig.color,
    borderColor: variant === 'outlined' ? themeConfig.color : 'transparent',
    borderWidth: variant === 'outlined' ? '1px' : '0px',
    borderStyle: variant === 'outlined' ? 'solid' : 'none',
  };

  const content = (
    <>
      {Icon && <Icon />} {props.children}
    </>
  );

  return props.link ? (
    <Link
      className={classNames('app-button', props.className)}
      style={themeStyle}
      href={props.link}
      target={props.linkTarget}
    >
      {content}
    </Link>
  ) : (
    <button
      className={classNames('app-button', props.className)}
      style={themeStyle}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {content}
    </button>
  );
}
