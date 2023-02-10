import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { loginOAuthKakao, loginOAuthGoogle } from './apis';
import { token } from '~/constants';
import { getExpriesDate } from '~/utils';
import api from '../api';

export const useOAuthLogin = (provider: OAuth.Provider) => {
  const mutationFn = getProviderMutationFn(provider);

  return useMutation({
    mutationFn,
    onSuccess: tokenInfo => {
      Cookies.set(token.accessToken, tokenInfo.access_token, {
        expires: getExpriesDate(tokenInfo.expires_in),
      });

      Cookies.set(token.refreshToken, tokenInfo.refresh_token, {
        expires: getExpriesDate(tokenInfo.refresh_token_expires_in),
      });

      api.defaults.headers.common[
        // eslint-disable-next-line dot-notation
        'Authorization'
      ] = `Bearer ${tokenInfo.access_token}`;
    },
  });
};

const getProviderMutationFn = (provider: OAuth.Provider) => {
  switch (provider) {
    case 'kakao':
      return loginOAuthKakao;
    case 'google':
      return loginOAuthGoogle;
    default:
      throw new Error('Invalid OAuth Provider');
  }
};
