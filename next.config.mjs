/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
      // 모든 도메인 허용 (http)
      {
        protocol: 'http',
        hostname: '*',
        pathname: '**',
      },
      // 모든 도메인 허용 (https)
      {
        protocol: 'https',
        hostname: '*',
        pathname: '**',
      },
    ],
    unoptimized: true, // 백엔드 이미지 처리 비용문제로 인해 최적화를 끄고 모든 이미지를 최적화 하지 않음
    domains: ['i.namu.wiki', 'opengraph.githubassets.com', 'even-took.s3.ap-northeast-2.amazonaws.com'],
  },
};

export default nextConfig;
