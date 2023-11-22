'use client';

import { useEffect, useState } from 'react';
import { createEventClientService } from '../../../client-services/event.client-service';
import './index.scss';
import { EventViewModel } from '../../../models/view-models/event.view-model';
import { useToast } from '../../../contexts/ToastContext';
import { Col, Row } from 'react-grid-system';
import Card from '../../../components/Card';
import dayjs from 'dayjs';

interface EventsProps {}

export default function Events({}: EventsProps) {
  const eventClientService = createEventClientService();
  const toast = useToast();

  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRecommended();
  }, []);

  const [events, setEvents] = useState<EventViewModel[]>([]);

  const getRecommended = () => {
    setIsLoading(true);
    eventClientService
      .recommended(10)
      .then((response) => setEvents(response))
      .finally(() => {
        setIsFirstLoading(false);
        setIsLoading(false);
      });
  };

  const searchEvents = () => {
    // TODO: search events
  };

  return (
    <section id="events">
      <h3>Eventos</h3>
      <Row className="list">
        {events.map((event) => (
          <Col md={4}>
            <Card>
              <div className="event-title">{event.titleDescription}</div>
              <div className="event-date">
                {dayjs(event.date).format('DD/MM/YYYY')}
              </div>
              <img
                style={{ width: '100%' }}
                src={event.content?.bannerImage}
                alt={`Image ${event.titleDescription}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
