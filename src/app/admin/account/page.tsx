'use client';

import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Card from '../../../components/Card/Card';
import Tabs, { TabItem } from '../../../components/Tabs/Tabs';
import AdminPageBase from '../components/AdminPageBase/AdminPageBase';
import Provider from './components/Provider/Provider';
import User from './components/User/User';

interface AccountPageProps {}

export default function AccountPage({}: AccountPageProps) {
  const searchParams = useSearchParams();

  const { data: sessionData } = useSession();

  const tabs: TabItem[] = [
    {
      key: 'user',
      label: 'Usuário',
      component: <User />
    },
    {
      key: 'provider',
      label: 'Fornecedor',
      component: <Provider />
    }
  ];

  const userIsProvider = !!sessionData?.user.provider;

  const successMessage = searchParams.get('successMessage');

  return (
    <AdminPageBase>
      <AdminPageBase.Title>Minha conta</AdminPageBase.Title>

      {successMessage && (
        <Card className="p-4 bg-green-500 text-white font-bold mb-4">
          {successMessage}
        </Card>
      )}

      {userIsProvider ? (
        <Card className="border-t-0">
          <Tabs
            tabs={tabs}
            isLoading={!sessionData?.user}
            contentClassName="bg-white rounded-2xl"
            tabActiveClassName="bg-white"
          />
        </Card>
      ) : (
        <Card className="bg-white p-4">
          <User />
        </Card>
      )}
    </AdminPageBase>
  );
}
