export const BASE_URL =
  process.env.NEXT_PUBLIC_STAGE === 'production' ? 'https://api.somewhere' : `https://api-dev.somewhere`;
