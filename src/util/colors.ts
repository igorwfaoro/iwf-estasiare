import { DefaultColors } from 'tailwindcss/types/generated/colors';
import themeConfig from '../../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

export const COLORS = resolveConfig(themeConfig).theme
  .colors as DefaultColors & {
  black: string;
  white: string;
  primary: string;
  secondary: string;
  highlight: string;
};
