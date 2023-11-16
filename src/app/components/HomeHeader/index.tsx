import dayjs from 'dayjs';
import { InfoViewModel } from '../../../models/view-models/info.view-model';
import './index.scss';

interface HomeHeaderProps {
  info: InfoViewModel;
}

export default function HomeHeader({ info }: HomeHeaderProps) {
  const weddingDateFormatted = dayjs(info.weddingDate).format('DD/MM/YYYY');

  return (
    <header id="home-header">
      <div className="content">
        <img className="content_logo" src="/images/logo-ig.svg" alt="Logo" />

        <h1>
          {info.groomName} & {info.brideName}
        </h1>

        <span className="content_sub">{weddingDateFormatted}</span>
      </div>
    </header>
  );
}
