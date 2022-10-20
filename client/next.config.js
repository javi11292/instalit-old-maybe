/* eslint-disable @typescript-eslint/no-var-requires */

const production = process.env.NODE_ENV === "production";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: production,
});

const withPWA = require("next-pwa")({
  disable: !production,
  dest: "public",
});

module.exports = withBundleAnalyzer(
  withPWA({
    reactStrictMode: true,
    swcMinify: true,
  })
);
