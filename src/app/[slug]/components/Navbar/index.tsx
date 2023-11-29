'use client';

import Link from 'next/link';
import './index.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MenuSVGIcon } from '@react-md/material-icons';
import './index.scss';
import { EventBySlugViewModel } from '../../../../models/view-models/event-by-slug.view-model';
import Button from '../../../../components/Button/Button';
import InitialsIcon from '../../../../components/InitialsIcon/InitialsIcon';
import { EventType } from '@prisma/client';

enum NavbarType {
  transparent = 'transparent',
  solid = 'solid',
}

interface LinkItem {
  path: string;
  label: string;
  navbarTheme: NavbarType;
  navbarUseSpacer?: boolean;
  changeThemeWhenScroll?: boolean;
}

interface EventNavbarProps {
  event: EventBySlugViewModel;
}

export function EventNavbar({ event }: EventNavbarProps) {
  const pathname = usePathname();

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const [navbarTheme, setNavbarTheme] = useState<NavbarType>(
    NavbarType.transparent
  );

  const [lastNavbarTheme, setLastNavbarTheme] =
    useState<NavbarType>(navbarTheme);

  const [useSpacer, setUseSpacer] = useState(false);

  const links = [
    (event.hasGifts || event.hasInvitations) && {
      path: `/${event.slug}`,
      label: 'Home',
      navbarTheme: NavbarType.transparent,
      changeThemeWhenScroll: true,
    },
    event.hasGifts && {
      path: `/${event.slug}/gifts`,
      label: 'Presentes',
      navbarTheme: NavbarType.solid,
      navbarUseSpacer: true,
    },
    event.hasInvitations && {
      path: `/${event.slug}/presence-confirmation`,
      label: 'Confirmação de presença',
      navbarTheme: NavbarType.solid,
      navbarUseSpacer: true,
    },
  ].filter(Boolean) as LinkItem[];

  useEffect(() => {
    const selectedLink = links.find((l) => l.path === pathname);

    setNavbarTheme(selectedLink?.navbarTheme || NavbarType.transparent);
    setUseSpacer(!!selectedLink?.navbarUseSpacer);

    handleScroll();

    if (selectedLink?.changeThemeWhenScroll) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (selectedLink?.changeThemeWhenScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname]);

  const handleScroll = () => {
    const { scrollY, innerHeight } = window;

    if (scrollY < innerHeight && lastNavbarTheme == NavbarType.solid) {
      setNavbarTheme(NavbarType.transparent);
      setLastNavbarTheme(NavbarType.transparent);
    } else if (
      scrollY >= innerHeight &&
      lastNavbarTheme == NavbarType.transparent
    ) {
      setNavbarTheme(NavbarType.solid);
      setLastNavbarTheme(NavbarType.solid);
    }
  };

  const toggleMenu = () => setMenuIsOpen((mio) => !mio);
  const closeMenu = () => setMenuIsOpen(false);

  const renderInitialsIcon = () =>
    ({
      [EventType.WEDDING]: (
        <InitialsIcon
          name={[
            event.weddingDetail?.groomName!,
            event.weddingDetail?.brideName!,
          ]}
          size={34}
          color={event.content?.primaryColor}
        />
      ),
    }[event.eventType]);

  return (
    <>
      <div id="event-navbar" className={navbarTheme}>
        <Link href={`/${event.slug}`} className="logo">
          {renderInitialsIcon()}
        </Link>

        <Button
          className="button-menu-toggle"
          onClick={toggleMenu}
          icon={MenuSVGIcon}
          theme="light"
        />

        <ul className={classNames('menu', menuIsOpen && 'menu__menu-show')}>
          {links.map((link, i) => (
            <li
              key={i}
              style={{ fontWeight: pathname === link.path ? 'bold' : '' }}
              className="menu__item"
            >
              <Link
                className="menu__item__link"
                href={link.path}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="items">
          {links.map((link, i) => (
            <li
              key={i}
              style={{ fontWeight: pathname === link.path ? 'bold' : '' }}
              className="items__item"
            >
              <Link className="items__item__link" href={link.path}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {useSpacer && <div className="navbar-spacer"></div>}
    </>
  );
}
