export const MARKETS = ['en', 'ca'] as const;

export const BRANDS = ['project-a', 'project-b'] as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product',
} as const;

export const PRODUCT_SHUFFLE_INTERVAL = 5 * 60 * 1000;

export const PRODUCT_REVALIDATE_TIME = 300;

export const WEBSOCKET_RECONNECT_DELAY = 3000;

export const INDEXEDDB_NAME = 'product-portal-db';
export const INDEXEDDB_VERSION = 1;
export const INDEXEDDB_STORE_NAME = 'products';

export const MODAL_QUEUE_MAX_SIZE = 10;

export const FEATURE_FLAGS = {
  SHOW_CATEGORY_TAGS: 'show_category_tags',
  ENABLE_WEBSOCKET: 'enable_websocket',
  USE_INDEXEDDB: 'use_indexeddb',
  SHOW_MODAL_QUEUE: 'show_modal_queue',
} as const;
