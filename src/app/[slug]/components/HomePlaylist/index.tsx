import './index.scss';

interface HomePlaylistProps {
  spotifyPlaylistUrl: string;
}

export default function HomePlaylist({
  spotifyPlaylistUrl,
}: HomePlaylistProps) {
  return (
    <div id="home-playlist">
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
