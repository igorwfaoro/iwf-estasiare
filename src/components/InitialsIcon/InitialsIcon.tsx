import { COLORS } from '../../util/colors';
import { getContrastColor } from '../../util/helpers/color.helper';

export interface InitialsIconProps {
  name: string | [string, string];
  color?: string;
  size?: number;
  icon?: React.FC<any>;
}

export default function InitialsIcon({
  name,
  size = 32,
  color: colorProp,
  icon: Icon
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

          {!!Icon && initials.length > 1 && i < initials.length - 1 && (
            <Icon
              className="px-[1px]"
              style={{ width: size / 4, fill: getContrastColor(color) }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
