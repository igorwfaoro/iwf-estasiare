import dayjs from 'dayjs';

export default function Footer() {
  const year = dayjs().format('YYYY');

  return (
    <div className="flex justify-center p-3 text-sm text-neutral-400">
      <div>Eventy | {year}</div>
    </div>
  );
}