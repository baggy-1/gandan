const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://gandan-news.vercel.app/'
    : 'http://localhost:3000';

const env = {
  KAKAO_REST_API_KEY: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
  KAKAO_REDIRECT_URI: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URI: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
  KAKAO_ID_FLAG: process.env.KAKAO_ID_FLAG,
  GOOGLE_ID_FLAG: process.env.GOOGLE_ID_FLAG,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  NAVER_NEWS_CLIENT_ID: process.env.NAVER_NEWS_CLIENT_ID,
  NAVER_NEWS_CLIENT_SECRET: process.env.NAVER_NEWS_CLIENT_SECRET,
  BASE_URL,
} as const;

export default env;
