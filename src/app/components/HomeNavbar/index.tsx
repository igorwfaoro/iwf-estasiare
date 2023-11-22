'use client';

import { MenuSVGIcon } from '@react-md/material-icons';
import Link from 'next/link';
import { useState } from 'react';
import './index.scss';
import Button from '../../../components/Button';
import classNames from 'classnames';

interface LinkItem {
  label: string;
  path: string;
}

interface HomeNavbarProps {}

export default function HomeNavbar({}: HomeNavbarProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const links: LinkItem[] = [
    {
      label: 'Home',
      path: `/`,
    },
    {
      label: 'Eventos',
      path: `#events`,
    },
    {
      label: 'Sobre',
      path: '#about',
    },
  ];

  const toggleMenu = () => setMenuIsOpen((mio) => !mio);
  const closeMenu = () => setMenuIsOpen(false);

  return (
    <nav id="home-navbar">
      <Link href="/" className="logo">
        <img src="/images/icon.svg" alt="logo" />
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
          <li key={i} className="menu__item">
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
          <li key={i} className="items__item">
            <Link className="items__item__link" href={link.path}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="right">
        <Button
          className="register-button"
          variant="outlined"
          theme="highlight"
        >
          Crie seu evento!
        </Button>
      </div>
    </nav>
  );
}
