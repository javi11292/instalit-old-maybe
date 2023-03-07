/* eslint-disable @typescript-eslint/no-var-requires */

const { GenerateSW } = require("workbox-webpack-plugin");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
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

  webpack(config, { dev }) {
    if (dev || process.env.ANALYZE) return config;

    config.plugins.push(
      new GenerateSW({
        skipWaiting: true,
        include: [],
        swDest: `${__dirname}/public/sw.js`,
        runtimeCaching: [
          {
            urlPattern: /.*/,
            handler: "NetworkFirst",
            options: {
              matchOptions: {
                ignoreVary: true,
              },
            },
          },
        ],
      })
    );

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
