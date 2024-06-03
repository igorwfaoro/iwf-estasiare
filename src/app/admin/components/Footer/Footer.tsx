import { appDayjs } from '../../../../util/date';

export default function Footer() {
  const year = appDayjs().format('YYYY');

  return (
    <div className="flex justify-center p-3 text-sm text-neutral-400">
      <div>Estasiare | {year}</div>
    </div>
  );
}
