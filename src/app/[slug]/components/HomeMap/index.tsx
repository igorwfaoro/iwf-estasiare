import { EventViewModel } from '../../../../models/view-models/event.view-model';
import './index.scss';

interface HomeMapProps {
  // event: EventViewModel;
}

export default function HomeMap({}: HomeMapProps) {
  const apiKey = process.env.GOOGLE_API_KEY;

  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Espaço de Eventos La Casa Piemont, 240 - Estrada VRS 826 - Linha Boêmios, Farroupilha - RS, 95181-899`;

  return (
    <iframe
      id="home-map"
      src={embedUrl}
      style={{ border: 0 }}
      loading="lazy"
    ></iframe>
  );
}
