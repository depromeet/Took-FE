export const CLIENT_SIDE_URL =
  process.env.NEXT_PUBLIC_STAGE === 'production' ? 'https://api.somewhere' : `https://api-dev.somewhere`;

export const SERVER_SIDE_URL =
  process.env.NEXT_PUBLIC_STAGE === 'production' ? 'https://backend.somewhere' : `https://backend-dev.somewhere`;
