/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false, // gasimo SWC jer ne radi na ARM64
  compiler: {
    removeConsole: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    };
    return config;
  },
};

module.exports = nextConfig;
