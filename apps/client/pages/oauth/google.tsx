import OAuthView from '@views/OAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useOAuthLogin } from '~/services/auth';

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

const getParamsInPath = (path: string) => {
  const parseParams = path.split('#')[1]?.split('&') ?? [];

  return Object.fromEntries(parseParams.map(param => param.split('=')));
};
