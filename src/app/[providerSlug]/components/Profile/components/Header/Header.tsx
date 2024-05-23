import Link from 'next/link';
import InitialsIcon from '../../../../../../components/InitialsIcon/InitialsIcon';
import { ProviderViewModel } from '../../../../../../models/view-models/provider.view-model';
import { formatToShow } from '../../../../../../util/helpers/http.helper';

interface HeaderProps {
  provider: ProviderViewModel;
}

export default function Header({
  provider: { profileImage, name, bio, link }
}: HeaderProps) {
  const image = profileImage ? (
    <img
      src={profileImage}
      alt="profile image"
      className="rounded-full w-36 h-36"
    />
  ) : (
    <InitialsIcon name={name} size={144} />
  );

  return (
    <header className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
      {image}
      <div className="space-y-2 text-center sm:text-left truncate">
        <h2 className="text-3xl font-bold truncate">{name}</h2>

        {bio && <p className="whitespace-pre-line">{bio}</p>}

        {link && (
          <Link
            href={link}
            target="_blank"
            className="text-blue-500 font-bold block truncate"
          >
            {formatToShow(link)}
          </Link>
        )}
      </div>
    </header>
  );
}
