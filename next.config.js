/* eslint-disable @typescript-eslint/no-var-requires */

const { GenerateSW } = require("workbox-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  webpack(config, { dev }) {
    if (dev) return config;

    config.plugins.push(
      new GenerateSW({
        clientsClaim: true,
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

module.exports = nextConfig;
