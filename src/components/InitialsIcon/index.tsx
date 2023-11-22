import './index.scss';
import { FavoriteSVGIcon as HeartIcon } from '@react-md/material-icons';

interface InitialsIconProps {
  name: string | [string, string];
  color?: string;
  size?: number;
}

export default function InitialsIcon({
  name,
  size = 32,
  color,
}: InitialsIconProps) {
  const initials = (Array.isArray(name) ? name.map((x) => x[0]) : [name[0]])
    .map((x) => x.toUpperCase())
    .sort();

  return (
    <div
      className="initials-icon"
      style={{
        height: size,
        width: size,
        backgroundColor: color,
        fontSize: size / 2.3,
      }}
    >
      {initials.map((x, i) => (
        <>
          <div className="initial">{x}</div>
          {initials.length > 1 && i < initials.length - 1 && (
            <HeartIcon style={{ width: size / 4 }} />
          )}
        </>
      ))}
    </div>
  );
}
