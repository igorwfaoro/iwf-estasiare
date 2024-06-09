import { Icon } from '@iconify/react/dist/iconify.mjs';
import Link from 'next/link';
import Card from '../../../../../../components/Card/Card';
import Chip from '../../../../../../components/Chip/Chip';
import InitialsIcon from '../../../../../../components/InitialsIcon/InitialsIcon';
import { ProviderViewModel } from '../../../../../../models/view-models/provider.view-model';

interface ProviderProps {
  provider: ProviderViewModel;
}

export default function Provider({ provider }: ProviderProps) {
  const { slug, name, profileImage, bio, categories, serviceAreas, links } =
    provider;

  const image = profileImage ? (
    <img
      src={profileImage}
      alt="profile image"
      className="rounded-full w-24 h-24"
    />
  ) : (
    <InitialsIcon name={name} size={96} />
  );

  const linksToShow = links?.filter((l) => l.type?.urlStructure);

  return (
    <Link href={`/${slug}`}>
      <Card className="flex justify-between gap-2 p-4 bg-white min-h-full">
        <div className="flex gap-4">
          {image}
          <div className="space-y-2 truncate">
            <div className="text-xl font-bold">{name}</div>

            {bio && <p className="whitespace-pre-line line-clamp-2">{bio}</p>}

            <div className="flex gap-1 flex-wrap">
              {categories?.map((category, i) => (
                <Chip key={'category-' + i} className="bg-primary text-white">
                  {category.description}
                </Chip>
              ))}
            </div>

            {!!serviceAreas?.length && (
              <div className="text-sm text-gray-600">
                <div className="font-bold">Atende em:</div>
                <div className="flex flex-wrap gap-1">
                  {serviceAreas?.map((sa) => (
                    <Chip
                      key={sa.id}
                      className="bg-white border border-gray-300 text-xs"
                    >
                      {sa.address?.city}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              {linksToShow?.map((link) => (
                <Link key={'link-' + link.id} href={link.url} target="_blank">
                  <Icon
                    className="text-xl text-primary"
                    icon={link.type!.icon}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
