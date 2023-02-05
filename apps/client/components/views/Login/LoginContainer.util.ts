import { env } from '~/constants';

const KAKAO_PATH = '/oauth/authorize';
const KAKAO_QUERIES = {
  client_id: env.KAKAO_REST_API_KEY ?? '',
  redirect_uri: env.KAKAO_REDIRECT_URI ?? '',
  response_type: 'code',
};
const kakaoLoginQuery = new URLSearchParams(KAKAO_QUERIES).toString();

export const kakaoLoginUrl = `https://kauth.kakao.com${KAKAO_PATH}?${kakaoLoginQuery}`;

const GOOGLE_QUERIES = {
  client_id: env.GOOGLE_CLIENT_ID ?? '',
  redirect_uri: env.GOOGLE_REDIRECT_URI ?? '',
  response_type: 'token',
  scope:
    'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
};
const googleLoginQuery = new URLSearchParams(GOOGLE_QUERIES).toString();
const GOOGLE_PATH = '/o/oauth2/v2/auth';

export const googleLoginUrl = `https://accounts.google.com${GOOGLE_PATH}?${googleLoginQuery}`;
