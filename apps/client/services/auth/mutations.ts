import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { token } from '~/constants';
import getExpriesDate from '~/utils/getExpriesDate';
import { requestKakaoToken } from './apis';
import { kakaoApi } from '~/services/api';

export const useRequestKakaoToken = () => {
  return useMutation({
    mutationFn: requestKakaoToken,
    onSuccess: tokenInfo => {
      Cookies.set(token.accessToken, tokenInfo.access_token, {
        expires: getExpriesDate(tokenInfo.expires_in),
      });

      Cookies.set(token.refreshToken, tokenInfo.refresh_token, {
        expires: getExpriesDate(tokenInfo.refresh_token_expires_in),
      });

      kakaoApi.defaults.headers.common[
        // eslint-disable-next-line dot-notation
        'Authorization'
      ] = `Bearer ${tokenInfo.access_token}`;
    },
    onError: () => {
      // TODO: 에러 핸들링
    },
  });
};
