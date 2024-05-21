'use client';

import { useSession } from 'next-auth/react';
import Card from '../../../components/Card/Card';
import Tabs, { TabItem } from '../../../components/Tabs/Tabs';
import AdminPageBase from '../components/AdminPageBase/AdminPageBase';
import ProviderTab from './tabs/ProviderTab/ProviderTab';
import UserTab from './tabs/UserTab/UserTab';

interface AccountPageProps {}

export default function AccountPage({}: AccountPageProps) {
  const { data } = useSession();

  const tabs: TabItem[] = [
    {
      key: 'user',
      label: 'Usuário',
      component: <UserTab />
    },
    {
      key: 'provider',
      label: 'Fornecedor',
      component: <ProviderTab />
    }
  ];

  return (
    <AdminPageBase>
      <AdminPageBase.Title>Minha conta</AdminPageBase.Title>
      <Card className="border-t-0">
        <Tabs
          tabs={tabs}
          isLoading={!data?.user}
          contentClassName="bg-white rounded-2xl"
          tabActiveClassName="bg-white"
        />
      </Card>
    </AdminPageBase>
  );
}
