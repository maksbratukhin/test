'use client';

import Link from 'next/link';
import { useUserStore } from '@product-portal/shared-lib';
import { Market, BrandConfig } from '@product-portal/types';

interface HeaderProps {
  market: Market;
  brandConfig: BrandConfig;
}

export function Header({ market, brandConfig }: HeaderProps) {
  const { user, logout } = useUserStore();

  return (
    <header className="shadow-md" style={{ backgroundColor: brandConfig.primaryColor }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${market}`} className="text-2xl font-bold text-white">
            {brandConfig.name}
          </Link>

          <nav className="flex items-center gap-6">
            <Link href={`/${market}`} className="text-white hover:opacity-80">
              Home
            </Link>
            <Link href={`/${market}/products`} className="text-white hover:opacity-80">
              Products
            </Link>
            {user?.isLoggedIn ? (
              <>
                <span className="text-white text-sm">Welcome, {user.username}</span>
                <button onClick={logout} className="text-white hover:opacity-80 text-sm underline">
                  Logout
                </button>
              </>
            ) : (
              <Link href={`/${market}/login`} className="text-white hover:opacity-80">
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
