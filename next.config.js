/* eslint-disable @typescript-eslint/no-var-requires */

const { GenerateSW } = require("workbox-webpack-plugin");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const options = {
  matchOptions: {
    ignoreVary: true,
    ignoreSearch: true,
  },
  plugins: [
    {
      cacheKeyWillBeUsed: ({ request }) => {
        const rsc = request.headers.get("rsc");
        const prefetch = request.headers.get("next-router-prefetch");
        const stateTree = request.headers.get("next-router-state-tree");

        return [rsc, prefetch, stateTree].reduce((acc, header) => {
          return header ? `${acc}_${header}` : acc;
        }, request.url);
      },
    },
  ],
};

const sw = new GenerateSW({
  skipWaiting: true,
  include: [],
  swDest: `${__dirname}/public/sw.js`,
  runtimeCaching: [
    {
      urlPattern: ({ url }) => url.pathname.match(/^\/api/),
      handler: "NetworkFirst",
      options,
    },
    {
      urlPattern: /.*/,
      handler: "CacheFirst",
      options,
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: false,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
  },

  webpack(config, { dev, isServer }) {
    if (dev || isServer || process.env.ANALYZE) return config;

    config.plugins.push(sw);

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
