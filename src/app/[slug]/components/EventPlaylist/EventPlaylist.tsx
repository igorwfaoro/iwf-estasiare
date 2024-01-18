interface EventPlaylistProps {
  spotifyPlaylistUrl: string;
}

export default function EventPlaylist({
  spotifyPlaylistUrl
}: EventPlaylistProps) {
  return (
    <div className="p-3">
      <iframe
        className="rounded-xl w-full h-[352px]"
        src={spotifyPlaylistUrl}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
