export type ProviderUpdateInputModel = Partial<Provider>;

interface Provider {
  name: string;
  contactEmail: string;
  contactPhone: string;
  contactWhatsApp: string;
  bio: string;
  link: string;
}
