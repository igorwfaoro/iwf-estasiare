import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

import Skeleton from '../../../../../../components/Skeleton/Skeleton';
import { eventTitleDescription } from '../../../../../../util/helpers/event-title-description.helper';
import { renderInitialsIcon } from '../../../../../../util/helpers/initials-icon.helper';
import { useAdminEventPageContext } from '../../contexts/AdminEventPageContext';

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const { event, eventIsLoading } = useAdminEventPageContext();

  const renderLogo = () =>
    event!.content?.logoImage ? (
      <img className="h-7" src={event!.content.logoImage} />
    ) : (
      renderInitialsIcon(event!, 28)
    );

  if (eventIsLoading)
    return (
      <div className="space-y-4">
        <Skeleton className="w-full h-32 rounded-xl" />
        <Skeleton className="w-40 h-6 rounded-md" />
      </div>
    );

  return !event ? (
    <></>
  ) : (
    <div className="space-y-4">
      <div
        className="w-full h-32 rounded-xl flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${event.content?.bannerImage})`,
          backgroundColor: event.content?.primaryColor
        }}
      >
        <div className="w-full h-[100%] absolute top-0 left-0 bg-black opacity-50 rounded-xl" />
        <div className="text-2xl font-bold flex gap-2 items-center pb-2 text-white z-10">
          {renderLogo()}
          <span>{eventTitleDescription(event)}</span>
        </div>
      </div>

      <div>
        <Link
          href={`/${event.slug}`}
          target="_blank"
          className="text-blue-600 hover:underline font-bold flex items-center gap-2"
        >
          <span>Acessar página do evento</span>
          <FaExternalLinkAlt />
        </Link>
      </div>
    </div>
  );
}
