import { useMutation } from '@tanstack/react-query';
import { loginOAuthKakao, loginOAuthGoogle } from './apis';

export const useOAuthLogin = (provider: OAuth.Provider) => {
  switch (provider) {
    case 'kakao':
      return useMutation({ mutationFn: loginOAuthKakao });
    case 'google':
      return useMutation({ mutationFn: loginOAuthGoogle });
    default:
      throw new Error('Invalid OAuth Provider');
  }
};
