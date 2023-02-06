import { useRouter } from 'next/router';
import { useEffect } from 'react';
import OAuthView from '@views/OAuth';
import { useOAuthLogin } from '~/services/client/auth';

const OAuthKakaoPage = () => {
  const { query, replace } = useRouter();
  const { mutate } = useOAuthLogin('kakao');

  useEffect(() => {
    if (!query.code || typeof query.code !== 'string') {
      return;
    }

    if (query.error) {
      // TODO: 사용자 로그인 취소 알림
      replace('/');
    }

    mutate(query.code, {
      onSettled: () => {
        replace('/');
      },
    });
  }, [query]);

  return <OAuthView />;
};

export default OAuthKakaoPage;
