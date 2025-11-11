'use client';

import React from 'react';
import { ProductCard } from '@product-portal/shared-components';
import { Product } from '@product-portal/types';
import { brandConfig } from '../lib/brand-config';
import { useRouter } from 'next/navigation';

interface BrandProductCardProps {
  product: Product;
  market: string;
}

export function BrandProductCard({ product, market }: BrandProductCardProps) {
  const router = useRouter();

  const handleCardClick = (product: Product) => {
    router.push(`/${market}/product/${product.slug}`);
  };

  return (
    <ProductCard
      product={product}
      layout={brandConfig.layout}
      showCategoryTags={brandConfig.showCategoryTags}
      thumbnailCount={brandConfig.productCardThumbnails}
      primaryColor={brandConfig.primaryColor}
      onCardClick={handleCardClick}
    />
  );
}
