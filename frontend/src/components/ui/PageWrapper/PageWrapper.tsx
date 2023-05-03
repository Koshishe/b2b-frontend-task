import type { ReactNode } from 'react';
import React from 'react';

import { Header } from '@/components/ui/Header/Header';

import s from './PageWrapper.module.scss';

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => (
  <div className={s.wrapper}>
    <div className={s.container}>
      <Header />
      {children}
    </div>
  </div>
);
