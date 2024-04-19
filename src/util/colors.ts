import resolveConfig from 'tailwindcss/resolveConfig';
import { DefaultColors } from 'tailwindcss/types/generated/colors';

import themeConfig from '../../tailwind.config';

export const COLORS = resolveConfig(themeConfig).theme
  .colors as DefaultColors & {
  black: string;
  white: string;
  primary: string;
  secondary: string;
  highlight: string;
};
