import { BrandConfig } from '@product-portal/types';
import { FEATURE_FLAGS } from '@product-portal/constants';

export const brandConfig: BrandConfig = {
  name: 'Project B',
  primaryColor: '#ef4444',
  secondaryColor: '#dc2626',
  layout: 'horizontal',
  menuPosition: 'bottom',
  showCategoryTags: true,
  productCardThumbnails: 2,
  buttonVariant: 'secondary',
  alertMessage: 'Hello from Red Project',
  featureFlags: {
    [FEATURE_FLAGS.SHOW_CATEGORY_TAGS]: true,
    [FEATURE_FLAGS.ENABLE_WEBSOCKET]: true,
    [FEATURE_FLAGS.USE_INDEXEDDB]: true,
    [FEATURE_FLAGS.SHOW_MODAL_QUEUE]: true,
  },
};
