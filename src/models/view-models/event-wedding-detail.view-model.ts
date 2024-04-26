import { GiftRegistryViewModel } from './gift-registry.view-model';

export interface EventWeddingDetailViewModel {
  id: number;
  brideName: string;
  groomName: string;

  giftRegistries?: GiftRegistryViewModel[] | null;
}
