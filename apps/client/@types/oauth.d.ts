declare module OAuth {
  type Provider = 'kakao' | 'google';
  interface Token {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
  }
}

declare module Kakao {
  interface Token {
    access_token: string;
    expires_in: number;
    id_token: string;
    refresh_token: string;
    refresh_token_expires_in: number;
    scope: string;
    token_type: string;
  }

  /**
   * @desc 카카오 로그인 사용자 정보 응답
   * @ 필수동의: 닉네임
   * @ 선택동의: 프로필 사진, 이메일
   *
   * @see https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info
   */
  interface User {
    id: number;
    connected_at: string;
    kakao_account: {
      profile: {
        nickname: string;
        profile_image_url?: string;
        thumbnail_image_url?: string;
        is_default_image?: boolean;
      };
      email?: string;
    };
  }
}

declare module Google {
  interface User {
    email: string;
    family_name: string;
    given_name: string;
    id: string;
    locale: string;
    name: string;
    picture: string;
    verified_email: boolean;
  }
}
