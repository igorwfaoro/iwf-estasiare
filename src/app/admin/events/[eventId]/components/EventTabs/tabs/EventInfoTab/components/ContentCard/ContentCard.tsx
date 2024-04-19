import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';

import { EventDetailViewModel } from '../../../../../../../../../../models/view-models/event-detail.view-model';

interface ContentCardProps {
  event: EventDetailViewModel;
}

export default function ContentCard({ event }: ContentCardProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {(event.content?.bannerImage || event.content?.logoImage) && (
          <div>Imagens:</div>
        )}
        <div className="flex items-center gap-4">
          {event.content!.bannerImage && (
            <div
              style={{ backgroundImage: `url(${event.content!.bannerImage})` }}
              className="h-20 w-32 rounded-lg bg-cover bg-center"
            />
          )}
          {event.content!.logoImage && (
            <div
              style={{ backgroundImage: `url(${event.content!.logoImage})` }}
              className="h-16 w-16 rounded-lg bg-cover bg-center"
            />
          )}
        </div>
      </div>

      <div>
        <span>Cor: </span>
        <span
          className="rounded-xl py-1 px-2 font-bold text-white"
          style={{ backgroundColor: event.content!.primaryColor }}
        >
          {event.content?.primaryColor}
        </span>
      </div>

      {event.content?.spotifyPlaylistUrl && (
        <Link
          href={event.content.spotifyPlaylistUrl}
          target="_blank"
          className="flex gap-1 items-center underline"
        >
          <FaSpotify className="text-green-600 font-bold" />
          <span className="text-green-600 font-bold">Playlist Spotify</span>
        </Link>
      )}
    </div>
  );
}
