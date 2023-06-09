/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  //   experiments: {
  //     topLevelAwait: true,
  //   },
};

module.exports = nextConfig;
