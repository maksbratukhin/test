import { useUserStore } from '@product-portal/shared-lib';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/en',
  }),
  usePathname: () => '/en',
}));

describe('Integration: User Store Management - Project B', () => {
  beforeEach(() => {
    const { logout } = useUserStore.getState();
    logout();
  });

  it('sets user data correctly', () => {
    const { setUser } = useUserStore.getState();

    setUser({
      username: 'user_en',
      market: 'en',
      isLoggedIn: false,
    });

    const { user } = useUserStore.getState();
    expect(user?.isLoggedIn).toBe(true);
    expect(user?.username).toBe('user_en');
  });

  it('allows user to logout', () => {
    const { setUser, logout } = useUserStore.getState();

    setUser({
      username: 'user_en',
      market: 'en',
      isLoggedIn: false,
    });

    logout();
    expect(useUserStore.getState().user).toBe(null);
  });

  it('supports Canadian market', () => {
    const { setUser } = useUserStore.getState();

    setUser({
      username: 'user_ca',
      market: 'ca',
      isLoggedIn: false,
    });

    const { user } = useUserStore.getState();
    expect(user?.market).toBe('ca');
  });
});

describe('Integration: Product Caching Flow - Project B', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('caches products after fetching', async () => {
    const mockProducts = {
      products: [
        {
          id: 1,
          title: 'Product 1',
          price: 99.99,
          description: 'Test',
          rating: 4.5,
          stock: 10,
          brand: 'Brand',
          category: 'cat',
          thumbnail: 'img.jpg',
          images: [],
        },
      ],
      total: 1,
      skip: 0,
      limit: 10,
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    const { fetchProducts, getCachedProducts } = await import('@product-portal/shared-lib');
    await fetchProducts(10);

    const cachedProducts = getCachedProducts();
    expect(cachedProducts.length).toBeGreaterThan(0);
  });

  it('retrieves product from cache', async () => {
    const mockProducts = {
      products: [
        {
          id: 1,
          title: 'Cached Product',
          price: 99.99,
          description: 'Test',
          rating: 4.5,
          stock: 10,
          brand: 'Brand',
          category: 'cat',
          thumbnail: 'img.jpg',
          images: [],
        },
      ],
      total: 1,
      skip: 0,
      limit: 10,
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    const { fetchProducts, fetchProductBySlug } = await import('@product-portal/shared-lib');
    const { products } = await fetchProducts(10);
    const firstProduct = products[0];

    const retrievedProduct = await fetchProductBySlug(firstProduct.slug);

    expect(retrievedProduct).toBeDefined();
    expect(retrievedProduct?.id).toBe(firstProduct.id);
  });
});
