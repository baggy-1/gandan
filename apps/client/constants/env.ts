const env = {
  KAKAO_REST_API_KEY: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
  REDIRECT_URL: process.env.NEXT_PUBLIC_REDIRECT_URI,
} as const;

export default env;
