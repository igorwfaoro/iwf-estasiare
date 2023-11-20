'use client';

import Link from 'next/link';
import './index.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MenuSVGIcon } from '@react-md/material-icons';
import './index.scss';
import { EventViewModel } from '../../../../models/view-models/event.view-model';
import Button from '../../../../components/Button';

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

interface NavbarProps {
  event: EventViewModel;
}

export function Navbar({ event }: NavbarProps) {
  const pathname = usePathname();

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const [navbarTheme, setNavbarTheme] = useState<NavbarType>(
    NavbarType.transparent
  );

  const [lastNavbarTheme, setLastNavbarTheme] =
    useState<NavbarType>(navbarTheme);

  const [useSpacer, setUseSpacer] = useState(false);

  const links: LinkItem[] = [
    {
      path: `/${event.slug}`,
      label: 'Home',
      navbarTheme: NavbarType.transparent,
      changeThemeWhenScroll: true,
    },
    {
      path: `/${event.slug}/gifts`,
      label: 'Presentes',
      navbarTheme: NavbarType.solid,
      navbarUseSpacer: true,
    },
    {
      path: `/${event.slug}/presence-confirmation`,
      label: 'Confirmação de presença',
      navbarTheme: NavbarType.solid,
      navbarUseSpacer: true,
    },
  ];

  useEffect(() => {
    const selectedLink = links.find((l) => l.path === pathname);
    console.log({
      pathname,
      selectedLink,
      theme: selectedLink?.navbarTheme,
    });

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

  return (
    <>
      <div id="app-navbar" className={navbarTheme}>
        <Link href="/" className="logo">
          <img src="/images/favicon.svg" alt="Logo" />
        </Link>

        <Button
          className="button-menu-toggle"
          onClick={toggleMenu}
          icon={MenuSVGIcon}
          theme="light"
          variant="outlined"
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
