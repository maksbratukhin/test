import { Product, ProductListResponse } from '@product-portal/types';

let lastShuffleTime = Date.now();

export async function fetchProducts(limit: number = 30): Promise<ProductListResponse> {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&select=id,title,description,price,discountPercentage,rating,stock,brand,category,thumbnail,images`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();

  const currentTime = Date.now();
  if (currentTime - lastShuffleTime >= 300000) {
    console.log('[Product Shuffle] Content modified - shuffling first 10 products');
    data.products = shuffleFirstN(data.products, 10);
    lastShuffleTime = currentTime;
  }

  const productsWithSlugs = data.products.map((product: Product) => ({
    ...product,
    slug: createSlug(product.title),
  }));

  cacheProducts(productsWithSlugs);

  return {
    ...data,
    products: productsWithSlugs,
  };
}

export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (!response.ok) {
      return null;
    }

    const product = await response.json();

    return {
      ...product,
      slug: createSlug(product.title),
    };
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const cachedProducts = getCachedProducts();

    const cachedProduct = cachedProducts.find((p) => createSlug(p.title) === slug);
    if (cachedProduct) {
      return cachedProduct;
    }

    const response = await fetch(
      'https://dummyjson.com/products/search?q=' + slug.replace(/-/g, ' ')
    );

    if (!response.ok) {
      return null;
    }

    const data: ProductListResponse = await response.json();

    if (data.products.length === 0) {
      return null;
    }

    const product = data.products.find((p) => createSlug(p.title) === slug);

    if (!product) {
      return data.products[0]
        ? {
            ...data.products[0],
            slug: createSlug(data.products[0].title),
          }
        : null;
    }

    return {
      ...product,
      slug: createSlug(product.title),
    };
  } catch (error) {
    console.error('Failed to fetch product by slug:', error);
    return null;
  }
}

let productsCache: Product[] = [];

export function cacheProducts(products: Product[]): void {
  productsCache = products;
}

export function getCachedProducts(): Product[] {
  return productsCache;
}

function shuffleFirstN<T>(array: T[], n: number): T[] {
  const result = [...array];
  const itemsToShuffle = result.splice(0, Math.min(n, array.length));

  for (let i = itemsToShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [itemsToShuffle[i], itemsToShuffle[j]] = [itemsToShuffle[j], itemsToShuffle[i]];
  }

  return [...itemsToShuffle, ...result];
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function mockFetchUnreleasedProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: 9999,
      title: 'Unreleased Premium Product',
      description: 'This is a mocked unreleased product endpoint',
      price: 999.99,
      rating: 5.0,
      stock: 0,
      brand: 'Premium Brand',
      category: 'unreleased',
      thumbnail: 'https://via.placeholder.com/300',
      images: ['https://via.placeholder.com/300'],
      slug: 'unreleased-premium-product',
    },
  ];
}
