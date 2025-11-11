const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@product-portal/constants',
    '@product-portal/types',
    '@product-portal/shared-components',
    '@product-portal/shared-lib',
  ],
  cacheComponents: false,
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
