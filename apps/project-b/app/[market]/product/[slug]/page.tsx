'use client';

import { use, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { useProduct, useUserStore, indexedDBManager } from '@product-portal/shared-lib';
import { Market } from '@product-portal/types';
import { BrandButton } from '../../../../components/BrandButton';
import { MarketAccessGuard } from '@product-portal/shared-components';
import { isFeatureEnabled } from '../../../../lib/feature-flags';
import { FEATURE_FLAGS } from '@product-portal/constants';

interface ProductDetailPageProps {
  params: Promise<{ market: string; slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { market, slug } = use(params);
  const { user } = useUserStore();

  const { data: product, isLoading, error } = useProduct(slug);

  useEffect(() => {
    if (product && isFeatureEnabled(FEATURE_FLAGS.USE_INDEXEDDB, market as Market)) {
      indexedDBManager.saveProducts([product]).then(() => {
        console.log('[IndexedDB] Product saved');
      });
    }
  }, [product, market]);

  if (error || (!isLoading && !product)) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-pulse">Loading product...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const showExtendedInfo = user?.isLoggedIn;

  return (
    <div className="container mx-auto px-4 py-12">
      <MarketAccessGuard currentMarket={market as Market}>
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {product.images.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="mb-6">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.discountPercentage && (
                  <span className="ml-2 text-sm text-red-500">
                    -{product.discountPercentage.toFixed(0)}% OFF
                  </span>
                )}
              </div>

              {showExtendedInfo ? (
                <div className="space-y-4 mb-6 p-4 bg-red-50 rounded-lg">
                  <h3 className="font-semibold text-lg">Extended Information (Logged In Users)</h3>
                  {product.rating && (
                    <p className="text-sm">
                      <span className="font-medium">Rating:</span> {product.rating.toFixed(1)} / 5.0
                    </p>
                  )}
                  {product.stock !== undefined && (
                    <p className="text-sm">
                      <span className="font-medium">Stock:</span> {product.stock} units
                    </p>
                  )}
                  {product.brand && (
                    <p className="text-sm">
                      <span className="font-medium">Brand:</span> {product.brand}
                    </p>
                  )}
                  {product.category && (
                    <p className="text-sm">
                      <span className="font-medium">Category:</span> {product.category}
                    </p>
                  )}
                </div>
              ) : (
                <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Sign in to see extended product information
                  </p>
                </div>
              )}

              <BrandButton fullWidth>Add to Cart</BrandButton>
            </div>
          </div>
        </div>
      </MarketAccessGuard>
    </div>
  );
}
