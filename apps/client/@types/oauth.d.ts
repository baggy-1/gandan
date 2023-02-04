declare module Kakao {
  interface TokenResponse {
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
   *
   * @see https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info
   */
  interface UserResponse {
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
