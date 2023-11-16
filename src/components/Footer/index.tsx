import dayjs from 'dayjs';
import './index.scss';

export function Footer() {
  const year = dayjs().format('YYYY');

  return (
    <div id="app-footer">
      <div>Pristen | {year}</div>
    </div>
  );
}
