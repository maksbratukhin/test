import { Market } from '@product-portal/types';
import { marketContent } from '../../../lib/market-content';
import { fetchProducts } from '@product-portal/shared-lib';
import { BrandProductCard } from '../../../components/BrandProductCard';
import { MarketAccessGuard } from '@product-portal/shared-components';

export const revalidate = 300;

interface ProductsPageProps {
  params: Promise<{ market: string }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { market } = await params;
  const content = marketContent[market as Market];
  const { products } = await fetchProducts(30);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{content.productsTitle}</h1>

      <MarketAccessGuard currentMarket={market as Market}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <BrandProductCard key={product.id} product={product} market={market} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available</p>
          </div>
        )}
      </MarketAccessGuard>
    </div>
  );
}
