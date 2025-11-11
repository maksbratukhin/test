'use client';

import React from 'react';
import { Market } from '@product-portal/types';
import { useUserStore } from '@product-portal/shared-lib';
import Link from 'next/link';

interface MarketAccessGuardProps {
  currentMarket: Market;
  children: React.ReactNode;
}

export function MarketAccessGuard({ currentMarket, children }: MarketAccessGuardProps) {
  const { user } = useUserStore();

  if (!user?.isLoggedIn) {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-blue-800">Login Required</h3>
            <p className="mt-2 text-sm text-blue-700">
              Please log in to view products in this market.
            </p>
            <div className="mt-4">
              <Link
                href={`/${currentMarket}/login`}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Login to {currentMarket === 'en' ? '🇺🇸 US' : '🇨🇦 Canadian'} Market
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user.market !== currentMarket) {
    const marketNames = {
      en: '🇺🇸 US Market',
      ca: '🇨🇦 Canadian Market',
    };

    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-6 my-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">🔒 Market Access Restricted</h3>
            <p className="mt-2 text-sm text-red-700">
              You are logged in for the <strong>{marketNames[user.market as Market]}</strong> but
              you&apos;re trying to access products from the{' '}
              <strong>{marketNames[currentMarket]}</strong>.
            </p>
            <p className="mt-2 text-sm text-red-700">
              Products are market-specific. Please access products from your own market or log out
              and login with credentials for this market.
            </p>
            <div className="mt-4 space-x-4">
              <Link
                href={`/${user.market}/products`}
                className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Go to Your Market ({marketNames[user.market as Market]})
              </Link>
              <button
                onClick={() => {
                  useUserStore.getState().logout();
                  window.location.href = `/${currentMarket}/login`;
                }}
                className="inline-block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Logout & Login to {marketNames[currentMarket]}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
