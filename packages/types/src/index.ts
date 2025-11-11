import { MARKETS, BRANDS, FEATURE_FLAGS } from '@product-portal/constants';

export type Market = (typeof MARKETS)[number];
export type Brand = (typeof BRANDS)[number];
export type FeatureFlagKey = (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS];

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail: string;
  images?: string[];
  slug: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  username: string;
  email: string;
  market: Market;
  isLoggedIn: boolean;
}

export interface Credentials {
  username: string;
  password: string;
  market: Market;
}

export interface MarketContent {
  welcomeTitle: string;
  welcomeDescription: string;
  loginTitle: string;
  productsTitle: string;
  currency: string;
  locale: string;
}

export interface BrandConfig {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  layout: 'vertical' | 'horizontal';
  menuPosition: 'top' | 'bottom' | 'left' | 'right';
  showCategoryTags: boolean;
  productCardThumbnails: number;
  buttonVariant: 'primary' | 'secondary';
  alertMessage: string;
  featureFlags: Record<FeatureFlagKey, boolean>;
}

export interface ProductCardProps {
  product: Product;
  layout?: 'vertical' | 'horizontal';
  showCategoryTags?: boolean;
  thumbnailCount?: number;
  primaryColor?: string;
  onCardClick?: (product: Product) => void;
  className?: string;
}

export interface ModalQueueItem {
  id: string;
  title: string;
  content: React.ReactNode;
  priority?: number;
  onClose?: () => void;
}

export interface WebSocketMessage {
  type: 'product_update' | 'notification' | 'alert';
  payload: unknown;
  timestamp: number;
}

export interface FeatureFlagConfig {
  [key: string]: {
    en: boolean;
    ca: boolean;
  };
}
