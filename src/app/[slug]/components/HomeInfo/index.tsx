import dayjs from 'dayjs';
import { InfoViewModel } from '../../../models/view-models/info.view-model';
import './index.scss';

interface HomeInfoProps {
  info: InfoViewModel;
}

export default function HomeInfo({ info }: HomeInfoProps) {
  const weddingDateFormatted = dayjs(info.weddingDate).format('DD/MM/YYYY');

  return (
    <section id="wedding-info">
      <span className="info-sub">Vamos casar!</span>
      <span className="info-date">{weddingDateFormatted}</span>
      <span className="info-address">
        {info.weddingAddressDescription}
      </span>
    </section>
  );
}
