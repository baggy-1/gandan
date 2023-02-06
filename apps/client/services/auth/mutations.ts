import { useMutation } from '@tanstack/react-query';
import { loginOAuthKakao, loginOAuthGoogle, requestKakaoToken } from './apis';
import { getKaKaoUser } from '~/services/user';

export const useRequestKakaoToken = () => {
  return useMutation({
    mutationFn: requestKakaoToken,
    // eslint-disable-next-line camelcase
    onSuccess: ({ access_token }) => {
      getKaKaoUser(access_token);
      // TODO: 카카오 유저 정보를 서버에 전달 -> 기존 ? 로그인 : 회원가입
    },
  });
};

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
