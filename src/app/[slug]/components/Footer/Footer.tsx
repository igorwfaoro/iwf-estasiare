import dayjs from 'dayjs';
import Link from 'next/link';

export function EventFooter() {
  const year = dayjs().format('YYYY');

  return (
    <div className="flex flex-col justify-center items-center p-3 text-sm text-neutral-400">
      <div>Estasiare | {year}</div>
      <Link href="/" className="underline">
        Ir para página inicial
      </Link>
    </div>
  );
}
