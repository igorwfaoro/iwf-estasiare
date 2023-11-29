'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MenuSVGIcon } from '@react-md/material-icons';
import { EventBySlugViewModel } from '../../../../models/view-models/event-by-slug.view-model';
import Button from '../../../../components/Button/Button';
import InitialsIcon from '../../../../components/InitialsIcon/InitialsIcon';
import { EventType } from '@prisma/client';

interface LinkItem {
    path: string;
    label: string;
    navbarUseSpacer?: boolean;
}

interface EventNavbarProps {
    event: EventBySlugViewModel;
}

export function EventNavbar({ event }: EventNavbarProps) {
    const pathname = usePathname();

    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const links = [
        (event.hasGifts || event.hasInvitations) && {
            path: `/${event.slug}`,
            label: 'Home'
        },
        event.hasGifts && {
            path: `/${event.slug}/gifts`,
            label: 'Presentes'
        },
        event.hasInvitations && {
            path: `/${event.slug}/presence-confirmation`,
            label: 'Confirmação de presença'
        }
    ].filter(Boolean) as LinkItem[];

    const toggleMenu = () => setMenuIsOpen((mio) => !mio);
    const closeMenu = () => setMenuIsOpen(false);

    const renderInitialsIcon = () =>
        ({
            [EventType.WEDDING]: (
                <InitialsIcon
                    name={[
                        event.weddingDetail?.groomName!,
                        event.weddingDetail?.brideName!
                    ]}
                    size={34}
                    color={event.content?.primaryColor}
                />
            )
        })[event.eventType];

    return (
        <nav className="fixed z-[999] flex h-12 w-full flex-col items-end justify-center bg-neutral-50 shadow-sm md:items-center">
            {/* logo */}
            <Link href="/" className="absolute left-3 top-2">
                {renderInitialsIcon()}
            </Link>

            {/* mobile button menu */}
            <Button
                className="z-20 md:hidden w-16 border-neutral-400 bg-neutral-50 px-4"
                onClick={toggleMenu}
                icon={MenuSVGIcon}
                theme="light"
            />

            {/* mobile menu */}
            {menuIsOpen && (
                <ul className="absolute top-0 flex w-full list-none flex-col items-center bg-neutral-50 p-0">
                    {links.map((link, i) => (
                        <li
                            key={i}
                            className="w-full border-b border-neutral-100 p-3 ps-7"
                        >
                            <Link
                                className="text-neutral-950 no-underline"
                                href={link.path}
                                onClick={closeMenu}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            {/* desktop items */}
            <ul className="gap-5 p-0 hidden md:flex">
                {links.map((link, i) => (
                    <li key={i}>
                        <Link
                            className="text-neutral-950 no-underline transition-all"
                            href={link.path}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
