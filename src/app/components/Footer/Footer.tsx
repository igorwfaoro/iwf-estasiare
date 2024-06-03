import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import Divider from '../../../components/Divider/Divider';
import { appDayjs } from '../../../util/date';

export default function Footer() {
  const year = appDayjs().format('YYYY');

  return (
    <footer className="flex flex-col justify-center items-center gap-8 px-3 py-16 text-neutral-400 bg-white">
      <div className="space-y-2">
        <div className="text-2xl font-bold">Nos siga nas redes sociais</div>

        <div>
          <Link
            href="https://www.instagram.com/estasiare.evento/"
            target="_blank"
            className="flex items-center gap-2 underline justify-center"
          >
            <FaInstagram />
            <span>@estasiare.evento</span>
          </Link>
        </div>
      </div>

      <Divider className="md:w-1/4" />

      <div>Estasiare | {year}</div>
    </footer>
  );
}
