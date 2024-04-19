'use client';

import AdminPageBase from '../../components/AdminPageBase/AdminPageBase';
import EventTabs from './components/EventTabs/EventTabs';
import Header from './components/Header/Header';
import AdminEventPageProvider from './contexts/AdminEventPageContext';

interface AdminEventPageProps {
  params: { eventId: number };
}

export default function AdminEventPage({ params }: AdminEventPageProps) {
  return (
    <AdminEventPageProvider eventId={params.eventId}>
      <AdminPageBase className="space-y-4">
        <Header />
        <EventTabs />
      </AdminPageBase>
    </AdminEventPageProvider>
  );
}
