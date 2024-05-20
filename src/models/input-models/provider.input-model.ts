export interface ProviderInputModel {
  name: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  contactWhatsApp?: string | null;
  bio?: string | null;
  link?: string | null;
  categories?: number[];
}
