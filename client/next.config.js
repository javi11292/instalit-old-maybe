/* eslint-disable @typescript-eslint/no-var-requires */

const production = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
  disable: !production,
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
});
