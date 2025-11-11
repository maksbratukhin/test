'use client';

import React from 'react';
import { ProductCard } from './ProductCard';
import { Product, BrandConfig } from '@product-portal/types';

interface BrandProductCardProps {
  product: Product;
  market: string;
  brandConfig: BrandConfig;
  onNavigate: (path: string) => void;
}

export function BrandProductCard({
  product,
  market,
  brandConfig,
  onNavigate,
}: BrandProductCardProps) {
  const handleCardClick = (product: Product) => {
    onNavigate(`/${market}/product/${product.slug}`);
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
