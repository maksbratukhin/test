import { useUserStore } from '@product-portal/shared-lib';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/en',
  }),
  usePathname: () => '/en',
}));

describe('Integration: User Store Management', () => {
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
    expect(user?.market).toBe('en');
  });

  it('checks login status correctly', () => {
    const { setUser, isLoggedIn } = useUserStore.getState();

    expect(isLoggedIn()).toBe(false);

    setUser({
      username: 'user_en',
      market: 'en',
      isLoggedIn: false,
    });

    expect(isLoggedIn()).toBe(true);
  });

  it('allows user to logout', () => {
    const { setUser, logout } = useUserStore.getState();

    setUser({
      username: 'user_en',
      market: 'en',
      isLoggedIn: false,
    });
    expect(useUserStore.getState().user?.isLoggedIn).toBe(true);

    logout();
    expect(useUserStore.getState().user).toBe(null);
  });

  it('supports multiple markets', () => {
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

describe('Integration: Product Browsing Flow', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches products from API', async () => {
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
        {
          id: 2,
          title: 'Product 2',
          price: 49.99,
          description: 'Test 2',
          rating: 4.0,
          stock: 5,
          brand: 'Brand',
          category: 'cat',
          thumbnail: 'img2.jpg',
          images: [],
        },
      ],
      total: 2,
      skip: 0,
      limit: 10,
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    const { fetchProducts } = await import('@product-portal/shared-lib');
    const result = await fetchProducts(10);

    expect(result.products).toBeDefined();
    expect(result.products.length).toBe(2);
    expect(result.products[0]).toHaveProperty('id');
    expect(result.products[0]).toHaveProperty('title');
    expect(result.products[0]).toHaveProperty('price');
  });

  it('creates slugs for products', async () => {
    const mockProducts = {
      products: [
        {
          id: 1,
          title: 'Test Product One',
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
      limit: 5,
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    const { fetchProducts } = await import('@product-portal/shared-lib');
    const result = await fetchProducts(5);

    result.products.forEach((product) => {
      expect(product.slug).toBeDefined();
      expect(product.slug).toMatch(/^[a-z0-9-]+$/);
      expect(product.slug).toBe('test-product-one');
    });
  });
});
