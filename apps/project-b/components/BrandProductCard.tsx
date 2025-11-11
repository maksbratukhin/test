'use client';

import React from 'react';
import { BrandProductCard as SharedBrandProductCard } from '@product-portal/shared-components';
import { Product } from '@product-portal/types';
import { brandConfig } from '../lib/brand-config';
import { useRouter } from 'next/navigation';

interface BrandProductCardProps {
  product: Product;
  market: string;
}

export function BrandProductCard({ product, market }: BrandProductCardProps) {
  const router = useRouter();

  return (
    <SharedBrandProductCard
      product={product}
      market={market}
      brandConfig={brandConfig}
      onNavigate={router.push}
    />
  );
}
