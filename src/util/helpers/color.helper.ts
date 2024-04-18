import { COLORS } from '../colors';

export const getContrastColor = (
  hexColor: string,
  contrastRatioRule: number = 0.25
): string => {
  const { r, g, b } = hexToRgb(hexColor);

  const contrastRatio = luminance(r, g, b);

  return contrastRatio > contrastRatioRule ? COLORS.black : COLORS.white;
};

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const luminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};
