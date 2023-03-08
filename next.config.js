/* eslint-disable @typescript-eslint/no-var-requires */

const { GenerateSW } = require("workbox-webpack-plugin");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const getSW = (buildId) => {
  const options = {
    cacheName: buildId,
    matchOptions: {
      ignoreVary: true,
    },
    plugins: [
      {
        cacheKeyWillBeUsed: ({ request }) => {
          const rsc = request.headers.get("rsc");
          const prefetch = request.headers.get("next-router-prefetch");
          const stateTree = request.headers.get("next-router-state-tree");

          const { value } = [rsc, prefetch, stateTree].reduce(
            (acc, header) => {
              if (!header) return acc;

              acc.value = `${acc.value}${acc.separator}${header}`;
              acc.separator = "&";

              return acc;
            },
            { value: request.url.split("?")[0], separator: "?" }
          );

          return value;
        },
      },
    ],
  };

  return new GenerateSW({
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
};

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

  webpack(config, { dev, isServer, buildId }) {
    console.log(buildId);
    if (dev || isServer || process.env.ANALYZE) return config;

    config.plugins.push(getSW(buildId));

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
