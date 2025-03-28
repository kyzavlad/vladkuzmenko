/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com', 'github.com'],
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js'
  },
  webpack: (config) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      module: false,
      path: false,
      process: false,
    };
    return config;
  }
};
module.exports = nextConfig;