import { Flex } from '@chakra-ui/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Suspense } from 'react';
import NewsList from '~/components/common/NewsList';
import { useQueryNews, useQueryNewsById } from '~/services/client/news/queries';
import { getKoreaDate } from '~/utils';

const HomeContainer = () => {
  const { data: newslist } = useQueryNews();

  return (
    <Flex>
      <NewsList newslist={newslist} />
    </Flex>
  );
};

const CreateNewsContainer = ({
  children,
}: {
  children: EmotionJSX.Element;
}) => {
  const { date } = getKoreaDate(new Date());
  const id = `${date}-@-news`;
  useQueryNewsById(id);

  return <>{children}</>;
};

const SuspenseHomeContainer = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <CreateNewsContainer>
        <HomeContainer />
      </CreateNewsContainer>
    </Suspense>
  );
};

export default SuspenseHomeContainer;
