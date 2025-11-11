import { MARKETS } from '@product-portal/constants';
import { Market } from '@product-portal/types';
import { Header, Providers, ModalQueue } from '@product-portal/shared-components';
import { brandConfig } from '../../lib/brand-config';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return MARKETS.map((market) => ({
    market,
  }));
}

interface MarketLayoutProps {
  children: React.ReactNode;
  params: Promise<{ market: string }>;
}

export default async function MarketLayout({ children, params }: MarketLayoutProps) {
  const { market } = await params;

  if (!MARKETS.includes(market as Market)) {
    notFound();
  }

  return (
    <Providers>
      <Header market={market as Market} brandConfig={brandConfig} />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <ModalQueue />
    </Providers>
  );
}
