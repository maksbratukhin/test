import { BrandConfig } from '@product-portal/types';
import { FEATURE_FLAGS } from '@product-portal/constants';

export const brandConfig: BrandConfig = {
  name: 'Project A',
  primaryColor: '#22c55e',
  secondaryColor: '#16a34a',
  layout: 'vertical',
  menuPosition: 'top',
  showCategoryTags: false,
  productCardThumbnails: 1,
  buttonVariant: 'primary',
  alertMessage: 'Hello from Green Project',
  featureFlags: {
    [FEATURE_FLAGS.SHOW_CATEGORY_TAGS]: false,
    [FEATURE_FLAGS.ENABLE_WEBSOCKET]: true,
    [FEATURE_FLAGS.USE_INDEXEDDB]: true,
    [FEATURE_FLAGS.SHOW_MODAL_QUEUE]: true,
  },
};
