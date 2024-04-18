import { FaHeart as IconHeart } from 'react-icons/fa';
import { getContrastColor } from '../../util/helpers/color.helper';
import { COLORS } from '../../util/colors';

export interface InitialsIconProps {
  name: string | [string, string];
  color?: string;
  size?: number;
}

export default function InitialsIcon({
  name,
  size = 32,
  color: colorProp
}: InitialsIconProps) {
  const color = colorProp || COLORS.primary;

  const initials = (Array.isArray(name) ? name.map((x) => x[0]) : [name[0]])
    .map((x) => x.toUpperCase())
    .sort();

  return (
    <div
      className="flex items-center justify-center rounded-full p-[2px]"
      style={{
        height: size,
        width: size,
        fontSize: size / 2.3,
        backgroundColor: color
      }}
    >
      {initials.map((x, i) => (
        <div key={i} className="flex items-center">
          <div className="font-bold" style={{ color: getContrastColor(color) }}>
            {x}
          </div>

          {initials.length > 1 && i < initials.length - 1 && (
            <IconHeart
              className="px-[1px]"
              style={{ width: size / 4, fill: getContrastColor(color) }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
