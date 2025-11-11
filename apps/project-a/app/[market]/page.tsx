'use client';

import { use, useEffect } from 'react';
import Link from 'next/link';
import { Market } from '@product-portal/types';
import { marketContent } from '../../lib/market-content';
import { BrandButton } from '../../components/BrandButton';
import { websocketManager, useUserStore } from '@product-portal/shared-lib';
import { MarketWarning } from '@product-portal/shared-components';
import { isFeatureEnabled } from '../../lib/feature-flags';
import { FEATURE_FLAGS } from '@product-portal/constants';

export default function WelcomePage({ params }: { params: Promise<{ market: string }> }) {
  const { market } = use(params);
  const content = marketContent[market as Market];
  const { user } = useUserStore();

  useEffect(() => {
    if (isFeatureEnabled(FEATURE_FLAGS.ENABLE_WEBSOCKET, market as Market)) {
      if (!websocketManager.isConnected()) {
        websocketManager.connect();
      }

      const unsubscribe = websocketManager.subscribe((message) => {
        console.log('[WebSocket] Message received:', message);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [market]);

  return (
    <div className="container mx-auto px-4 py-12">
      {user?.isLoggedIn && user.market !== market && (
        <MarketWarning userMarket={user.market as Market} currentMarket={market as Market} />
      )}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">{content.welcomeTitle}</h1>
        <p className="text-xl text-gray-600 mb-8">{content.welcomeDescription}</p>

        <div className="flex gap-4 justify-center">
          <Link href={`/${market}/products`}>
            <BrandButton>Browse Products</BrandButton>
          </Link>
          <Link href={`/${market}/login`}>
            <BrandButton>Sign In</BrandButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
