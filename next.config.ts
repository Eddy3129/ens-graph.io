import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // ENS avatar CDN domains
      {
        protocol: 'https',
        hostname: 'euc.li',
      },
      {
        protocol: 'https',
        hostname: '*.ipfs.nft.storage',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
      {
        protocol: 'https',
        hostname: '*.infura-ipfs.io',
      },
      {
        protocol: 'https',
        hostname: '*.gateway.pinata.cloud',
      },
      // Allow common avatar image hosts
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudflare.com',
      },
    ],
  },
};

export default nextConfig;
