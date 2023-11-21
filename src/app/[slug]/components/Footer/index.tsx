import dayjs from 'dayjs';
import './index.scss';

export function EventFooter() {
  const year = dayjs().format('YYYY');

  return (
    <div id="event-footer">
      <div>Eventy | {year}</div>
    </div>
  );
}
