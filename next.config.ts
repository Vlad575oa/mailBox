import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ferrummail.com',
      },
      {
        protocol: 'https',
        hostname: 'ferrumdecorstudio.shop',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      }
    ],
  },
  experimental: {
    optimizePackageImports: ['react-icons', 'framer-motion', 'react-use'],
    cpus: 1,
    workerThreads: false,
  },
  async headers() {
    return [
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://tagmanager.google.com https://mc.yandex.ru; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' blob: data: https://cdn.shopify.com https://ferrummail.com https://ferrumdecorstudio.shop https://www.googletagmanager.com https://www.google-analytics.com https://stats.g.doubleclick.net https://mc.yandex.ru; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://mc.yandex.ru; frame-src 'self' https://www.googletagmanager.com https://mc.yandex.ru;"
          }
        ]
      }
    ];
  },
  output: 'standalone',
};

export default withNextIntl(nextConfig);
