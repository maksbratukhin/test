import { Market, MarketContent } from '@product-portal/types';

export const marketContent: Record<Market, MarketContent> = {
  en: {
    welcomeTitle: '🇺🇸 Welcome to Project B (US Market)',
    welcomeDescription:
      'Explore our premium products with a bold red experience. Find what you need in our extensive catalog for the United States market.',
    loginTitle: '🇺🇸 Sign In - US Market',
    productsTitle: 'Featured Products (USD)',
    currency: 'USD',
    locale: 'en-US',
  },
  ca: {
    welcomeTitle: '🇨🇦 Bienvenue à Project B (Marché Canadien)',
    welcomeDescription:
      'Explorez nos produits premium avec une expérience rouge audacieuse. Trouvez ce dont vous avez besoin dans notre vaste catalogue pour le marché canadien.',
    loginTitle: '🇨🇦 Connectez-vous - Marché Canadien',
    productsTitle: 'Produits en vedette (CAD)',
    currency: 'CAD',
    locale: 'fr-CA',
  },
};
