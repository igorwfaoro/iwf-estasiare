import { FavoriteSVGIcon as HeartIcon } from '@react-md/material-icons';

interface InitialsIconProps {
  name: string | [string, string];
  color?: string;
  size?: number;
}

export default function InitialsIcon({
  name,
  size = 32,
  color
}: InitialsIconProps) {
  const initials = (Array.isArray(name) ? name.map((x) => x[0]) : [name[0]])
    .map((x) => x.toUpperCase())
    .sort();

  return (
    <div
      className="bg-primary flex items-center justify-center rounded-full p-[2px]"
      style={{
        height: size,
        width: size,
        fontSize: size / 2.3,
        backgroundColor: color
      }}
    >
      {initials.map((x, i) => (
        <div key={i} className='flex'>
          <div className="text-white font-bold">{x}</div>
          {initials.length > 1 && i < initials.length - 1 && (
            <HeartIcon className="fill-white" style={{ width: size / 4 }} />
          )}
        </div>
      ))}
    </div>
  );
}
