import './index.scss';

interface EventPlaylistProps {
  spotifyPlaylistUrl: string;
}

export default function EventPlaylist({
  spotifyPlaylistUrl,
}: EventPlaylistProps) {
  return (
    <div id="event-playlist">
      <iframe
        className="spotify-iframe"
        src={spotifyPlaylistUrl}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
