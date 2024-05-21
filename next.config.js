// next.config.js

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "vitals.vercel-insights.com",
      },
    ],
  },
};

module.exports = nextConfig;
