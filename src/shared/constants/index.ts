export const CLIENT_SIDE_URL =
  process.env.NEXT_PUBLIC_STAGE === 'production' ? 'https://api-dev.even-took.com' : `https://api-dev.even-took.com`;

export const SERVER_SIDE_URL =
  process.env.NEXT_PUBLIC_STAGE === 'production' ? 'https://api-dev.even-took.com' : `https://api-dev.even-took.com`;
