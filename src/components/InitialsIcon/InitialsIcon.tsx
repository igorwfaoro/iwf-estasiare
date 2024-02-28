import { FaHeart as IconHeart } from "react-icons/fa";


export interface InitialsIconProps {
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
        <div key={i} className="flex items-center">
          <div className="text-white font-bold">{x}</div>

          {initials.length > 1 && i < initials.length - 1 && (
            <IconHeart className="fill-white px-[1px]" style={{ width: size / 4 }} />
          )}
        </div>
      ))}
    </div>
  );
}
