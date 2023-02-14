import OAuthView from '@views/OAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useToast } from '~/components/common';
import { useOAuthLogin } from '~/services/client/auth';
import { getParamsInPath } from '~/utils';

const OAuthGooglePage = () => {
  const { asPath, replace } = useRouter();
  const { mutate } = useOAuthLogin('google');
  const toast = useToast();

  useEffect(() => {
    const params = getParamsInPath(asPath);

    if (params.error || !params.access_token) {
      toast({
        title: '로그인에 실패하였습니다.',
        description: '다시 시도해주세요.',
        status: 'error',
      });

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
