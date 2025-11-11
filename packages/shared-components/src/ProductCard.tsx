import React from 'react';
import { ProductCardProps } from '@product-portal/types';
import clsx from 'clsx';

export const ProductCard = ({
  product,
  layout = 'vertical',
  showCategoryTags = false,
  thumbnailCount = 1,
  primaryColor = '#000000',
  onCardClick,
  className,
}: ProductCardProps) => {
  const thumbnails = product.images?.slice(0, thumbnailCount) || [product.thumbnail];

  const handleClick = () => {
    if (onCardClick) {
      onCardClick(product);
    }
  };

  const baseCardStyles = 'border rounded-lg overflow-hidden transition-shadow hover:shadow-lg';
  const layoutStyles = layout === 'horizontal' ? 'flex flex-row' : 'flex flex-col';

  return (
    <div
      className={clsx(baseCardStyles, layoutStyles, className)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className={layout === 'horizontal' ? 'w-1/3' : 'w-full'}>
        {thumbnails.map((thumb, index) => (
          <img
            key={index}
            src={thumb}
            alt={`${product.title} thumbnail ${index + 1}`}
            className="w-full h-48 object-cover"
          />
        ))}
      </div>
      <div className={clsx('p-4', layout === 'horizontal' ? 'w-2/3' : 'w-full')}>
        <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          {product.rating && (
            <span className="text-sm text-gray-500">★ {product.rating.toFixed(1)}</span>
          )}
        </div>
        {showCategoryTags && product.category && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.category.split(',').map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded"
                style={{
                  backgroundColor: `${primaryColor}20`,
                  color: primaryColor,
                }}
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
        {product.stock !== undefined && product.stock < 10 && (
          <p className="text-red-500 text-xs mt-2">Only {product.stock} left in stock!</p>
        )}
      </div>
    </div>
  );
};
