import { useRouter } from 'next/router';
import { useEffect } from 'react';
import OAuthView from '@views/OAuth';
import { useOAuthLogin } from '~/services/client/auth';
import { useToast } from '~/components/common';

const OAuthKakaoPage = () => {
  const { query, replace } = useRouter();
  const { mutate } = useOAuthLogin('kakao');
  const toast = useToast();

  useEffect(() => {
    if (query.error) {
      toast({
        title: '로그인에 실패하였습니다.',
        description: '다시 시도해주세요.',
        status: 'error',
      });

      replace('/');
    }

    if (!query.code || typeof query.code !== 'string') {
      return;
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
