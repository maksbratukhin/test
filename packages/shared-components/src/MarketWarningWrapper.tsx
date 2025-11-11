'use client';

import React from 'react';
import { Market } from '@product-portal/types';
import { useUserStore } from '@product-portal/shared-lib';
import { MarketWarning } from './MarketWarning';

interface MarketWarningWrapperProps {
  currentMarket: Market;
}

export function MarketWarningWrapper({ currentMarket }: MarketWarningWrapperProps) {
  const { user } = useUserStore();

  if (!user?.isLoggedIn || user.market === currentMarket) {
    return null;
  }

  return <MarketWarning userMarket={user.market as Market} currentMarket={currentMarket} />;
}
