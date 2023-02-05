import OAuthView from '@views/OAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getGoogleUser } from '~/services/user';

const OAuthGooglePage = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    const parseParams = asPath.split('#')[1]?.split('&') ?? [];

    const params = Object.fromEntries(
      parseParams.map(param => param.split('='))
    );

    if (params.error || !params.access_token) {
      return;
    }

    getGoogleUser(params.access_token);
  }, [asPath]);

  return <OAuthView />;
};

export default OAuthGooglePage;
