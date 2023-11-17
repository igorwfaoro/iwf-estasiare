import { EventViewModel } from '../../../../models/view-models/event.view-model';
import './index.scss';

interface HomeMapProps {
  event: EventViewModel;
}

export default function HomeMap({ event }: HomeMapProps) {
  return (
    <iframe
      id="home-map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3479.0903286627513!2d-51.316595123788744!3d-29.309025897565974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951ea7eef626ff49%3A0x5682737238ea19df!2sLa%20Casa%20Piemont!5e0!3m2!1spt-BR!2sbr!4v1691465857472!5m2!1spt-BR!2sbr"
      style={{ border: 0 }}
      loading="lazy"
    ></iframe>
  );
}
