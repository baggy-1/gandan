import { env } from '~/constants';

const KAKAO_PATH = '/oauth/authorize';
const KAKAO_QUERIES = {
  client_id: env.KAKAO_REST_API_KEY ?? '',
  redirect_uri: env.KAKAO_REDIRECT_URL ?? '',
  response_type: 'code',
};

const kakaoLoginQuery = new URLSearchParams(KAKAO_QUERIES).toString();

export const kakaoLoginUrl = `https://kauth.kakao.com${KAKAO_PATH}?${kakaoLoginQuery}`;
