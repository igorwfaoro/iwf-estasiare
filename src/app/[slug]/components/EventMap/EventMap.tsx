interface EventMapProps {
  addressDescription: string;
}

export default function EventMap({ addressDescription }: EventMapProps) {
  const apiKey = process.env.GOOGLE_API_KEY;

  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${addressDescription}`;

  return (
    <iframe
      className="w-full h-[450px]"
      src={embedUrl}
      style={{ border: 0 }}
      loading="lazy"
    ></iframe>
  );
}
