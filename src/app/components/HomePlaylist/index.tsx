import './index.scss';

export default function HomePlaylist() {
  return (
    <div id="home-playlist">
      <iframe
        className="spotify-iframe"
        src="https://open.spotify.com/embed/playlist/4repDc6kVmb39JvP5uq4Eb?utm_source=generator"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
