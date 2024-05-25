import InitialsIcon from '../../../../../../components/InitialsIcon/InitialsIcon';
import { ProviderViewModel } from '../../../../../../models/view-models/provider.view-model';

interface HeaderProps {
  provider: ProviderViewModel;
}

export default function Header({
  provider: { profileImage, name, bio, primaryColor }
}: HeaderProps) {
  const image = profileImage ? (
    <img
      src={profileImage}
      alt="profile image"
      className="rounded-full w-36 h-36 shadow-custom1"
    />
  ) : (
    <InitialsIcon name={name} size={144} className="shadow-custom1" />
  );

  return (
    <header className="flex flex-col items-center gap-3">
      {image}
      <div className="space-y-2 text-center truncate">
        <h2 className="text-3xl font-bold truncate">{name}</h2>
        {bio && <p className="whitespace-pre-line">{bio}</p>}
      </div>
    </header>
  );
}
