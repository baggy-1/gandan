import { useRouter } from 'next/router';
import { useEffect } from 'react';
import OAuthView from '@views/OAuth';
import { useRequestKakaoToken } from '~/services/auth';

const OAuthKakaoPage = () => {
  const { query, replace } = useRouter();
  const { mutate } = useRequestKakaoToken();

  useEffect(() => {
    if (!query.code || typeof query.code !== 'string') {
      return;
    }

    mutate(query.code, {
      onSuccess: () => {
        replace('/');
      },
    });
  }, [query]);

  return <OAuthView />;
};

export default OAuthKakaoPage;
