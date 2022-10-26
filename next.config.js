/* eslint-disable @typescript-eslint/no-var-requires */

const production = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
  disable: !production,
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = withPWA(nextConfig);
