import React from 'react';

import { Logo } from '@/components/svg';

import s from './Header.module.scss';

export const Header = () => (
  <header className={s.content}>
    <Logo />
  </header>
);
