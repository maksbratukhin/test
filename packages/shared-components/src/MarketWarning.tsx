import React from 'react';
import { Market } from '@product-portal/types';

interface MarketWarningProps {
  userMarket: Market;
  currentMarket: Market;
}

export function MarketWarning({ userMarket, currentMarket }: MarketWarningProps) {
  if (userMarket === currentMarket) {
    return null;
  }

  const marketNames = {
    en: '🇺🇸 US Market',
    ca: '🇨🇦 Canadian Market',
  };

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <span className="font-medium">Market Mismatch Warning:</span> You are logged in for the{' '}
            <strong>{marketNames[userMarket]}</strong> but you&apos;re viewing the{' '}
            <strong>{marketNames[currentMarket]}</strong>. Prices and content may not be accurate
            for your region.
          </p>
        </div>
      </div>
    </div>
  );
}
