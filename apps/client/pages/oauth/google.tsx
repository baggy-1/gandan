import OAuthView from '@views/OAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useOAuthLogin } from '~/services/client/auth';
import { getParamsInPath } from '~/utils';

const OAuthGooglePage = () => {
  const { asPath, replace } = useRouter();
  const { mutate } = useOAuthLogin('google');

  useEffect(() => {
    const params = getParamsInPath(asPath);

    if (params.error || !params.access_token) {
      // TODO: 사용자 로그인 실패 알림
      replace('/');
      return;
    }

    mutate(params.access_token, {
      onSettled: () => {
        replace('/');
      },
    });
  }, [asPath]);

  return <OAuthView />;
};

export default OAuthGooglePage;
