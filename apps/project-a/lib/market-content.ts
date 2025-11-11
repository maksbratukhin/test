import { Market, MarketContent } from '@product-portal/types';

export const marketContent: Record<Market, MarketContent> = {
  en: {
    welcomeTitle: '🇺🇸 Welcome to Project A (US Market)',
    welcomeDescription:
      'Discover amazing products with our green-themed experience. Browse through our carefully curated collection for the United States market.',
    loginTitle: '🇺🇸 Sign In - US Market',
    productsTitle: 'Our Products (USD)',
    currency: 'USD',
    locale: 'en-US',
  },
  ca: {
    welcomeTitle: '🇨🇦 Bienvenue à Project A (Marché Canadien)',
    welcomeDescription:
      'Découvrez des produits incroyables avec notre expérience à thème vert. Parcourez notre collection soigneusement sélectionnée pour le marché canadien.',
    loginTitle: '🇨🇦 Connectez-vous - Marché Canadien',
    productsTitle: 'Nos Produits (CAD)',
    currency: 'CAD',
    locale: 'fr-CA',
  },
};
