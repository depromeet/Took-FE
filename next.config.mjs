/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-dev.even-took.com',
        pathname: '*/*',
      },
      {
        protocol: 'https',
        hostname: 'api.even-took.com',
        pathname: '*/*',
      },
      {
        protocol: 'https',
        hostname: 'local.took.com',
        port: '2222',
        pathname: '*/*',
      },
    ],
    // TODO: 추후 제거
    domains: ['i.namu.wiki', 'opengraph.githubassets.com'],
  },
};

export default nextConfig;
