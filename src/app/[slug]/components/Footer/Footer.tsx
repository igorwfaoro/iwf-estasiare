import dayjs from 'dayjs';

export function EventFooter() {
  const year = dayjs().format('YYYY');

  return (
    <div className="flex justify-center p-3 text-sm text-neutral-400">
      <div>Estasiare | {year}</div>
    </div>
  );
}
