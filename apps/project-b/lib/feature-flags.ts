import { Market, FeatureFlagConfig } from '@product-portal/types';
import { FEATURE_FLAGS } from '@product-portal/constants';

export const featureFlagConfig: FeatureFlagConfig = {
  [FEATURE_FLAGS.SHOW_CATEGORY_TAGS]: {
    en: true,
    ca: true,
  },
  [FEATURE_FLAGS.ENABLE_WEBSOCKET]: {
    en: true,
    ca: true,
  },
  [FEATURE_FLAGS.USE_INDEXEDDB]: {
    en: true,
    ca: true,
  },
  [FEATURE_FLAGS.SHOW_MODAL_QUEUE]: {
    en: true,
    ca: true,
  },
};

export const isFeatureEnabled = (flag: string, market: Market): boolean => {
  return featureFlagConfig[flag]?.[market] ?? false;
};
