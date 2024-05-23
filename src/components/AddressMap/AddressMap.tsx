import { twMerge } from 'tailwind-merge';
import { AddressViewModel } from '../../models/view-models/address.view-model';

interface AddressMapProps {
  address: AddressViewModel;
  className?: string;
}

export default function AddressMap({ address, className }: AddressMapProps) {
  const apiKey = process.env.GOOGLE_API_KEY;

  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${address.formattedAddress}`;

  return (
    <iframe
      className={twMerge('w-full h-[450px]', className)}
      src={embedUrl}
      style={{ border: 0 }}
      loading="lazy"
    ></iframe>
  );
}
