/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint configuration - ignore during builds to prevent build failures
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Enable experimental features
  experimental: {
    // Enable Turbopack for faster development builds
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    // Enable optimized package imports
    optimizePackageImports: ['lucide-react'],
  },

  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization settings
  images: {
    // Enable image optimization
    formats: ['image/webp', 'image/avif'],
    // Add any external image domains you might use
    domains: [
      'localhost',
      'example.com',
      // Add your image hosting domains here
    ],
    // Image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        // Cache static assets
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects for better UX
  async redirects() {
    return [
      // Redirect from old paths if needed
      // {
      //   source: '/old-dashboard',
      //   destination: '/dashboard',
      //   permanent: true,
      // },
    ];
  },

  // Rewrites for API routes or external services
  async rewrites() {
    return [
      // Example: Proxy API requests to external service
      // {
      //   source: '/api/external/:path*',
      //   destination: 'https://api.external-service.com/:path*',
      // },
    ];
  },

  // Environment variables available to the client
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Enable SWC minifier for better performance
  swcMinify: true,

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Custom webpack configurations
    
    // Optimize bundle analyzer in development
    if (dev && !isServer) {
      config.devtool = 'eval-source-map';
    }

    // Handle SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Optimize lodash imports
    config.resolve.alias = {
      ...config.resolve.alias,
      'lodash': 'lodash-es',
    };

    return config;
  },

  // TypeScript configuration
  typescript: {
    // Allow builds to complete even with type errors (for development)
    ignoreBuildErrors: false,
  },

  // Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;